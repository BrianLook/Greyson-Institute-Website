"use client";

import {
  useEffect,
  useState,
  type FormEvent,
  type MouseEvent,
} from "react";
import Link from "next/link";

const DATA_BASE =
  "/data/florida-real-estate-licenses";

const NAME_SEARCH_ENDPOINT =
  "/api/florida-license-name-search";

const SAVED_LICENSE_KEY =
  "greyson-florida-license-number";

const dbprLicenseNumberSearch =
  "https://www.myfloridalicense.com/portalsearches/VerifyLicensee?Mode=0&SearchType=SearchByLicenseNumber";

const dbprGeneralSearch =
  "https://www.myfloridalicense.com/portalsearches/VerifyLicensee";

type LicenseRecord = {
  i: string;
  n: string;
  r: string;
  p: string;
  s: string;
  o: string;
  e: string;
  x: string;
};

type LicenseMeta = {
  available: boolean;
  source?: string;
  fetchedAt?: string;
  sourceLastModified?: string | null;
  recordCount?: number;
  nullAndVoidIncluded?: boolean;
  error?: string;
};

type RenewalChoice =
  | "first"
  | "later"
  | "unsure"
  | null;

type NameLicenseType =
  | "sales-associate"
  | "broker";

type NameSearchStage =
  | "form"
  | "license-type"
  | "middle-initial"
  | "results"
  | "no-matches"
  | "too-many";

type NameSearchMatch = {
  id: string;
  name: string;
  licenseType: string;
  primaryStatus: string;
  secondaryStatus: string;
  expirationDate: string;
};

type NameSearchResponse = {
  ok: boolean;
  status?:
    | "matches"
    | "no_matches"
    | "needs_license_type"
    | "needs_middle_initial"
    | "too_many_matches";
  matches?: NameSearchMatch[];
  error?: string;
};

function normalizeLicenseNumber(
  value: string,
) {
  return value
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");
}

function numericPart(value: string) {
  return value.replace(/\D/g, "");
}

function titleCaseName(value: string) {
  return value
    .toLowerCase()
    .replace(
      /(^|[\s'-])([a-z])/g,
      (_, separator, letter) =>
        `${separator}${letter.toUpperCase()}`,
    );
}

function formatLicensedName(
  value: string,
) {
  const trimmed = value.trim();

  if (!trimmed) {
    return "Name not listed";
  }

  const commaParts = trimmed
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  if (commaParts.length >= 2) {
    const lastName =
      commaParts[0];

    const givenNames =
      commaParts
        .slice(1)
        .join(" ");

    return titleCaseName(
      `${givenNames} ${lastName}`,
    );
  }

  return titleCaseName(trimmed);
}

function formatDbprDate(value: string) {
  if (!value) {
    return "Not listed";
  }

  const slashDate = value.match(
    /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/,
  );

  if (slashDate) {
    const [, month, day, year] =
      slashDate;

    const date = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
    );

    return new Intl.DateTimeFormat(
      "en-US",
      {
        month: "long",
        day: "numeric",
        year: "numeric",
      },
    ).format(date);
  }

  const compactDate = value.match(
    /^(\d{4})(\d{2})(\d{2})$/,
  );

  if (compactDate) {
    const [, year, month, day] =
      compactDate;

    const date = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
    );

    return new Intl.DateTimeFormat(
      "en-US",
      {
        month: "long",
        day: "numeric",
        year: "numeric",
      },
    ).format(date);
  }

  const dbprShortDate =
    value.match(
      /^(\d{1,2})-([A-Za-z]{3})-(\d{2}|\d{4})$/,
    );

  if (dbprShortDate) {
    const [
      ,
      day,
      monthText,
      rawYear,
    ] = dbprShortDate;

    const months: Record<
      string,
      number
    > = {
      JAN: 0,
      FEB: 1,
      MAR: 2,
      APR: 3,
      MAY: 4,
      JUN: 5,
      JUL: 6,
      AUG: 7,
      SEP: 8,
      OCT: 9,
      NOV: 10,
      DEC: 11,
    };

    const month =
      months[
        monthText.toUpperCase()
      ];

    if (month !== undefined) {
      const shortYear =
        Number(rawYear);

      const year =
        rawYear.length === 2
          ? shortYear <= 69
            ? 2000 + shortYear
            : 1900 + shortYear
          : shortYear;

      const date = new Date(
        year,
        month,
        Number(day),
      );

      return new Intl.DateTimeFormat(
        "en-US",
        {
          month: "long",
          day: "numeric",
          year: "numeric",
        },
      ).format(date);
    }
  }

  return value;
}

function formatSourceDate(
  meta: LicenseMeta | null,
) {
  const sourceDate =
    meta?.sourceLastModified ||
    meta?.fetchedAt;

  if (!sourceDate) {
    return "the latest available weekly DBPR file";
  }

  const date =
    new Date(sourceDate);

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return "the latest available weekly DBPR file";
  }

  return new Intl.DateTimeFormat(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    },
  ).format(date);
}

function combinedStatus(
  record: LicenseRecord,
) {
  const parts = [
    record.p,
    record.s,
  ].filter(Boolean);

  return parts.length > 0
    ? parts.join(" / ")
    : "Not listed";
}

function nameMatchStatus(
  match: NameSearchMatch,
) {
  const parts = [
    match.primaryStatus,
    match.secondaryStatus,
  ].filter(Boolean);

  return parts.length > 0
    ? parts.join(" / ")
    : "Not listed";
}

function isSalesAssociate(
  record: LicenseRecord,
) {
  return record.r
    .toLowerCase()
    .includes(
      "sales associate",
    );
}

function isBroker(
  record: LicenseRecord,
) {
  return record.r
    .toLowerCase()
    .includes("broker");
}

function isActive(
  record: LicenseRecord,
) {
  return [
    record.p,
    record.s,
  ].some(
    (value) =>
      value
        .trim()
        .toLowerCase() ===
      "active",
  );
}

function isInvoluntarilyInactive(
  record: LicenseRecord,
) {
  const status =
    `${record.p} ${record.s}`.toLowerCase();

  return (
    status.includes(
      "involuntary",
    ) ||
    status.includes(
      "involuntarily",
    )
  );
}

export function FloridaLicenseExpirationCheck() {
  const [
    licenseNumber,
    setLicenseNumber,
  ] = useState("");

  const [
    savedLicenseNumber,
    setSavedLicenseNumber,
  ] = useState("");

  const [
    savedLicenseMessage,
    setSavedLicenseMessage,
  ] = useState("");

  const [
    message,
    setMessage,
  ] = useState("");

  const [
    error,
    setError,
  ] = useState("");

  const [
    result,
    setResult,
  ] =
    useState<LicenseRecord | null>(
      null,
    );

  const [
    meta,
    setMeta,
  ] =
    useState<LicenseMeta | null>(
      null,
    );

  const [
    isSearching,
    setIsSearching,
  ] = useState(false);

  const [
    hasSearched,
    setHasSearched,
  ] = useState(false);

  const [
    renewalChoice,
    setRenewalChoice,
  ] =
    useState<RenewalChoice>(
      null,
    );

  const [
    nameMode,
    setNameMode,
  ] = useState(false);

  const [
    firstName,
    setFirstName,
  ] = useState("");

  const [
    lastName,
    setLastName,
  ] = useState("");

  const [
    nameLicenseType,
    setNameLicenseType,
  ] =
    useState<NameLicenseType | null>(
      null,
    );

  const [
    middleInitial,
    setMiddleInitial,
  ] = useState("");

  const [
    nameStage,
    setNameStage,
  ] =
    useState<NameSearchStage>(
      "form",
    );

  const [
    nameMatches,
    setNameMatches,
  ] =
    useState<
      NameSearchMatch[]
    >([]);

  const [
    nameSearchError,
    setNameSearchError,
  ] = useState("");

  const [
    nameIsSearching,
    setNameIsSearching,
  ] = useState(false);

  const cleanedLicenseNumber =
    normalizeLicenseNumber(
      licenseNumber,
    );

  useEffect(() => {
    try {
      const stored =
        window.localStorage.getItem(
          SAVED_LICENSE_KEY,
        );

      if (!stored) {
        return;
      }

      const normalized =
        normalizeLicenseNumber(
          stored,
        );

      if (normalized) {
        setSavedLicenseNumber(
          normalized,
        );
      }
    } catch {
      /*
        Some browser privacy settings can
        disable local storage. The checker
        still works normally without it.
      */
    }
  }, []);

  function resetNameProgress() {
    setNameLicenseType(null);
    setMiddleInitial("");
    setNameStage("form");
    setNameMatches([]);
    setNameSearchError("");
  }

  function openNameSearch() {
    setNameMode(true);

    setError("");
    setMessage("");
    setSavedLicenseMessage("");
    setResult(null);
    setRenewalChoice(null);
    setHasSearched(false);

    resetNameProgress();
  }

  function returnToNumberSearch() {
    setNameMode(false);

    resetNameProgress();

    setError("");
    setMessage("");
    setSavedLicenseMessage("");
  }

  function rememberCurrentLicense() {
    if (!result?.i) {
      return;
    }

    const normalized =
      normalizeLicenseNumber(
        result.i,
      );

    try {
      window.localStorage.setItem(
        SAVED_LICENSE_KEY,
        normalized,
      );

      setSavedLicenseNumber(
        normalized,
      );

      setSavedLicenseMessage(
        `${normalized} is now remembered in this browser. Greyson will use the license number to check the latest available DBPR record when you return.`,
      );
    } catch {
      setSavedLicenseMessage(
        "Your browser would not allow Greyson to save this license locally. The license checker will still work normally.",
      );
    }
  }

  function forgetSavedLicense() {
    try {
      window.localStorage.removeItem(
        SAVED_LICENSE_KEY,
      );
    } catch {
      /*
        Clear the visible saved state even
        if local storage is unavailable.
      */
    }

    setSavedLicenseNumber("");
    setSavedLicenseMessage(
      "The saved license has been cleared from this browser.",
    );
  }

  async function checkSavedLicense() {
    if (!savedLicenseNumber) {
      return;
    }

    setNameMode(false);
    resetNameProgress();

    setSavedLicenseMessage("");

    await lookupLicenseNumber(
      savedLicenseNumber,
    );
  }

  async function lookupLicenseNumber(
    value: string,
  ) {
    const normalized =
      normalizeLicenseNumber(
        value,
      );

    const digits =
      numericPart(normalized);

    setError("");
    setMessage("");
    setSavedLicenseMessage("");
    setResult(null);
    setRenewalChoice(null);
    setHasSearched(false);

    if (
      !normalized ||
      digits.length < 3
    ) {
      setError(
        "Enter your Florida real estate license number first.",
      );

      return;
    }

    setLicenseNumber(
      normalized,
    );

    setIsSearching(true);

    try {
      const metaResponse =
        await fetch(
          `${DATA_BASE}/meta.json`,
          {
            cache: "no-store",
          },
        );

      if (
        !metaResponse.ok
      ) {
        throw new Error(
          "Greyson could not load the Florida license index.",
        );
      }

      const metaData =
        (await metaResponse.json()) as LicenseMeta;

      setMeta(metaData);

      if (
        !metaData.available
      ) {
        setError(
          "The Greyson license index is temporarily unavailable. Please verify your license directly with Florida DBPR.",
        );

        setHasSearched(
          true,
        );

        return;
      }

      const bucketKey =
        digits
          .slice(-3)
          .padStart(3, "0");

      const bucketResponse =
        await fetch(
          `${DATA_BASE}/${bucketKey}.json`,
          {
            cache: "no-store",
          },
        );

      if (
        !bucketResponse.ok
      ) {
        setError(
          "We could not find that license in the current weekly file. Please verify it with Florida DBPR.",
        );

        setHasSearched(
          true,
        );

        return;
      }

      const records =
        (await bucketResponse.json()) as LicenseRecord[];

      const exactMatch =
        records.find(
          (record) =>
            normalizeLicenseNumber(
              record.i,
            ) ===
            normalized,
        );

      if (exactMatch) {
        setResult(
          exactMatch,
        );

        setHasSearched(
          true,
        );

        return;
      }

      const numericMatches =
        records.filter(
          (record) =>
            numericPart(
              record.i,
            ) === digits,
        );

      if (
        numericMatches.length ===
        1
      ) {
        setResult(
          numericMatches[0],
        );

        setHasSearched(
          true,
        );

        return;
      }

      if (
        numericMatches.length >
        1
      ) {
        setError(
          "More than one Florida record matches those digits. Enter the complete license number, including the letters at the beginning.",
        );

        setHasSearched(
          true,
        );

        return;
      }

      setError(
        "No match was found in Greyson's current weekly DBPR file. That does not necessarily mean you were never licensed or that the license is invalid. Verify the record live with Florida DBPR.",
      );

      setHasSearched(true);
    } catch {
      setError(
        "We could not complete the Greyson lookup right now. Please verify your license directly with Florida DBPR.",
      );

      setHasSearched(true);
    } finally {
      setIsSearching(
        false,
      );
    }
  }

  async function handleLookup(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    await lookupLicenseNumber(
      licenseNumber,
    );
  }

  async function runNameSearch(
    options?: {
      licenseType?:
        | NameLicenseType
        | null;
      middleInitial?: string;
    },
  ) {
    const trimmedFirst =
      firstName.trim();

    const trimmedLast =
      lastName.trim();

    if (
      trimmedFirst.length <
        2 ||
      trimmedLast.length <
        2
    ) {
      setNameSearchError(
        "Enter both your first and last name.",
      );

      return;
    }

    const requestedLicenseType =
      options?.licenseType !==
      undefined
        ? options.licenseType
        : nameLicenseType;

    const requestedMiddleInitial =
      options?.middleInitial !==
      undefined
        ? options.middleInitial
        : middleInitial;

    setNameSearchError("");
    setNameMatches([]);
    setNameIsSearching(true);

    try {
      const body: {
        firstName: string;
        lastName: string;
        licenseType?: NameLicenseType;
        middleInitial?: string;
      } = {
        firstName:
          trimmedFirst,
        lastName:
          trimmedLast,
      };

      if (
        requestedLicenseType
      ) {
        body.licenseType =
          requestedLicenseType;
      }

      if (
        requestedMiddleInitial.trim()
      ) {
        body.middleInitial =
          requestedMiddleInitial
            .trim()
            .charAt(0);
      }

      const response =
        await fetch(
          NAME_SEARCH_ENDPOINT,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(
              body,
            ),
          },
        );

      const data =
        (await response.json()) as NameSearchResponse;

      if (
        !response.ok ||
        !data.ok
      ) {
        setNameSearchError(
          data.error ||
            "We could not complete the name search right now.",
        );

        return;
      }

      if (
        data.status ===
        "needs_license_type"
      ) {
        setNameStage(
          "license-type",
        );

        return;
      }

      if (
        data.status ===
        "needs_middle_initial"
      ) {
        setNameStage(
          "middle-initial",
        );

        return;
      }

      if (
        data.status ===
        "matches"
      ) {
        setNameMatches(
          data.matches || [],
        );

        setNameStage(
          "results",
        );

        return;
      }

      if (
        data.status ===
        "no_matches"
      ) {
        setNameStage(
          "no-matches",
        );

        return;
      }

      if (
        data.status ===
        "too_many_matches"
      ) {
        setNameStage(
          "too-many",
        );

        return;
      }

      setNameSearchError(
        "We could not complete the name search right now.",
      );
    } catch {
      setNameSearchError(
        "We could not complete the name search right now. Please try again or use Florida DBPR's official search.",
      );
    } finally {
      setNameIsSearching(
        false,
      );
    }
  }

  async function handleNameSearch(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setNameLicenseType(
      null,
    );

    setMiddleInitial("");

    await runNameSearch({
      licenseType: null,
      middleInitial: "",
    });
  }

  async function chooseLicenseType(
    value: NameLicenseType,
  ) {
    setNameLicenseType(
      value,
    );

    setMiddleInitial("");

    await runNameSearch({
      licenseType: value,
      middleInitial: "",
    });
  }

  function licenseTypeUnknown() {
    setNameLicenseType(
      null,
    );

    setMiddleInitial("");

    setNameSearchError(
      "",
    );

    setNameStage(
      "middle-initial",
    );
  }

  async function handleMiddleSearch(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const initial =
      middleInitial
        .trim()
        .charAt(0);

    if (!initial) {
      setNameSearchError(
        "Enter your middle initial if you know it.",
      );

      return;
    }

    await runNameSearch({
      licenseType:
        nameLicenseType,
      middleInitial:
        initial,
    });
  }

  async function chooseNameMatch(
    match: NameSearchMatch,
  ) {
    setNameMode(false);

    resetNameProgress();

    await lookupLicenseNumber(
      match.id,
    );
  }

  async function handleDbprClick(
    event: MouseEvent<HTMLAnchorElement>,
  ) {
    if (
      !cleanedLicenseNumber
    ) {
      event.preventDefault();

      setMessage("");

      setError(
        "Enter your Florida real estate license number first.",
      );

      return;
    }

    setError("");

    try {
      await navigator.clipboard.writeText(
        cleanedLicenseNumber,
      );

      setMessage(
        `License number ${cleanedLicenseNumber} copied. On the DBPR page, paste it into License Number, leave the optional additional search fields blank, and click Submit.`,
      );
    } catch {
      setMessage(
        `On the DBPR page, enter ${cleanedLicenseNumber} in License Number, leave the optional additional search fields blank, and click Submit.`,
      );
    }
  }

  const currentLicenseIsSaved =
    Boolean(
      result?.i &&
        savedLicenseNumber &&
        normalizeLicenseNumber(
          result.i,
        ) ===
          savedLicenseNumber,
    );

  return (
    <div className="fl-license-check">
      <style>
        {`
          .fl-license-check {
            background: #eee6d9;
            border: 1px solid rgba(17, 23, 23, 0.16);
            padding: clamp(30px, 5vw, 50px);
          }

          .fl-license-field-wrap {
            max-width: 680px;
            margin-top: 28px;
          }

          .fl-license-label {
            display: block;
            margin-bottom: 9px;
            color: #111717;
            font-size: 0.78rem;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }

          .fl-license-input {
            width: 100%;
            min-height: 56px;
            border: 1px solid rgba(17, 23, 23, 0.4);
            background: #faf7f1;
            color: #111717;
            padding: 0 16px;
            border-radius: 0;
            font: inherit;
            font-size: 1rem;
            outline: none;
            transition:
              border-color 0.2s ease,
              box-shadow 0.2s ease;
          }

          .fl-license-input:focus {
            border-color: #111717;
            box-shadow:
              0 0 0 3px
              rgba(125, 95, 58, 0.16);
          }

          .fl-license-helper {
            color: #6e6b65;
            font-size: 0.84rem;
            line-height: 1.6;
            margin: 8px 0 0;
          }

          .fl-license-search-button {
            min-height: 52px;
            margin-top: 20px;
            padding: 0 22px;
            border: 1px solid #111717;
            background: #111717;
            color: #f5f0e7;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font: inherit;
            font-size: 14px;
            font-weight: 650;
            letter-spacing: 0.035em;
            cursor: pointer;
            transition:
              transform 0.2s ease,
              background-color 0.2s ease,
              box-shadow 0.2s ease;
          }

          .fl-license-search-button:disabled {
            cursor: wait;
            opacity: 0.65;
          }

          .fl-saved-license {
            max-width: 820px;
            margin-top: 28px;
            padding: 24px;
            border: 1px solid rgba(17, 23, 23, 0.18);
            background: #faf7f1;
          }

          .fl-saved-license-top {
            display: flex;
            justify-content: space-between;
            gap: 18px;
            align-items: flex-start;
          }

          .fl-saved-license-number {
            margin: 5px 0 0;
            color: #111717;
            font-family: var(--font-serif), Georgia, serif;
            font-size: clamp(1.5rem, 3vw, 2rem);
          }

          .fl-saved-license-copy {
            margin: 10px 0 0;
            max-width: 610px;
            color: #5f5c56;
            font-size: 0.86rem;
            line-height: 1.65;
          }

          .fl-saved-license-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 18px;
          }

          .fl-forget-button {
            min-height: 46px;
            padding: 0 16px;
            border: 1px solid rgba(17, 23, 23, 0.5);
            background: transparent;
            color: #111717;
            font: inherit;
            font-size: 13px;
            font-weight: 650;
            cursor: pointer;
          }

          .fl-remember-panel {
            margin: 4px 28px 26px;
            padding: 22px;
            border: 1px solid rgba(17, 23, 23, 0.14);
            background: #eee6d9;
          }

          .fl-remember-title {
            margin: 0 0 7px;
            color: #111717;
            font-family: var(--font-serif), Georgia, serif;
            font-size: 1.4rem;
          }

          .fl-remember-copy {
            margin: 0;
            max-width: 700px;
            color: #4d4b46;
            font-size: 0.87rem;
            line-height: 1.65;
          }

          .fl-remember-button {
            min-height: 46px;
            margin-top: 16px;
            padding: 0 18px;
            border: 1px solid #111717;
            background: #111717;
            color: #f5f0e7;
            font: inherit;
            font-size: 13px;
            font-weight: 650;
            cursor: pointer;
            transition:
              transform 0.2s ease,
              background-color 0.2s ease,
              box-shadow 0.2s ease;
          }

          .fl-saved-confirmation {
            margin: 16px 0 0;
            padding: 14px 16px;
            border-left: 3px solid #7d5f3a;
            background: rgba(255, 255, 255, 0.5);
            color: #3f3d38;
            font-size: 0.86rem;
            line-height: 1.6;
          }

          .fl-name-toggle {
            margin-top: 18px;
          }

          .fl-name-toggle-button {
            border: 0;
            padding: 0;
            background: transparent;
            color: #111717;
            font: inherit;
            font-size: 0.92rem;
            font-weight: 650;
            cursor: pointer;
            text-decoration: underline;
            text-decoration-color: #7d5f3a;
            text-underline-offset: 5px;
          }

          .fl-name-panel {
            margin-top: 28px;
            max-width: 820px;
            padding: clamp(22px, 4vw, 32px);
            border: 1px solid rgba(17, 23, 23, 0.18);
            background: rgba(250, 247, 241, 0.72);
          }

          .fl-name-panel-title {
            margin: 0 0 8px;
            color: #111717;
            font-family: var(--font-serif), Georgia, serif;
            font-size: clamp(1.5rem, 3vw, 2rem);
          }

          .fl-name-panel-copy {
            max-width: 680px;
            margin: 0;
            color: #4d4b46;
            line-height: 1.65;
          }

          .fl-name-grid {
            display: grid;
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
            gap: 14px;
            margin-top: 22px;
          }

          .fl-name-field .fl-license-label {
            margin-bottom: 8px;
          }

          .fl-name-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 18px;
          }

          .fl-name-secondary-button {
            min-height: 46px;
            padding: 0 17px;
            border: 1px solid #111717;
            background: transparent;
            color: #111717;
            font: inherit;
            font-size: 13px;
            font-weight: 650;
            cursor: pointer;
            transition:
              background-color 0.2s ease,
              color 0.2s ease,
              transform 0.2s ease;
          }

          .fl-name-prompt {
            margin-top: 22px;
            padding-top: 22px;
            border-top: 1px solid rgba(17, 23, 23, 0.14);
          }

          .fl-name-type-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 15px;
          }

          .fl-name-results {
            display: grid;
            gap: 12px;
            margin-top: 22px;
          }

          .fl-name-result-card {
            padding: 20px;
            border: 1px solid rgba(17, 23, 23, 0.16);
            background: #faf7f1;
          }

          .fl-name-result-card h4 {
            margin: 0 0 8px;
            color: #111717;
            font-family: var(--font-serif), Georgia, serif;
            font-size: 1.35rem;
          }

          .fl-name-result-details {
            display: flex;
            flex-wrap: wrap;
            gap: 6px 16px;
            margin-bottom: 14px;
            color: #5f5c56;
            font-size: 0.88rem;
            line-height: 1.5;
          }

          .fl-name-result-button {
            min-height: 42px;
            padding: 0 15px;
            border: 1px solid #111717;
            background: #111717;
            color: #f5f0e7;
            font: inherit;
            font-size: 13px;
            font-weight: 650;
            cursor: pointer;
          }

          .fl-name-error {
            margin: 16px 0 0;
            color: #7a2c25;
            font-size: 0.88rem;
            font-weight: 600;
            line-height: 1.55;
          }

          .fl-name-notice {
            margin-top: 20px;
            padding: 18px;
            border-left: 3px solid #7d5f3a;
            background: rgba(255, 255, 255, 0.5);
            color: #4d4b46;
            line-height: 1.65;
          }

          .fl-license-result {
            margin-top: 34px;
            border: 1px solid rgba(17, 23, 23, 0.18);
            background: #faf7f1;
          }

          .fl-license-result-header {
            padding: 28px;
            background: #1f2d30;
            color: #f5f0e7;
          }

          .fl-license-result-name {
            color: #f5f0e7;
            margin: 0 0 6px;
            font-size: clamp(1.8rem, 4vw, 2.7rem);
            overflow-wrap: anywhere;
          }

          .fl-license-result-license {
            margin: 0;
            color: rgba(245, 240, 231, 0.72);
            font-size: 0.9rem;
          }

          .fl-license-result-grid {
            display: grid;
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
          }

          .fl-license-result-item {
            padding: 24px 28px;
            border-right: 1px solid rgba(17, 23, 23, 0.14);
            border-bottom: 1px solid rgba(17, 23, 23, 0.14);
            min-width: 0;
          }

          .fl-license-result-label {
            margin: 0 0 7px;
            color: #7d5f3a;
            font-size: 0.68rem;
            font-weight: 700;
            letter-spacing: 0.14em;
            text-transform: uppercase;
          }

          .fl-license-result-value {
            margin: 0;
            color: #111717;
            font-size: 1rem;
            line-height: 1.5;
            overflow-wrap: anywhere;
          }

          .fl-license-expiration {
            font-family: var(--font-serif), Georgia, serif;
            font-size: clamp(1.65rem, 3vw, 2.25rem);
          }

          .fl-license-data-note {
            padding: 18px 28px;
            color: #5f5c56;
            font-size: 0.84rem;
            line-height: 1.6;
          }

          .fl-license-renewal-question {
            margin-top: 24px;
            padding: 26px;
            border-top: 1px solid rgba(17, 23, 23, 0.14);
          }

          .fl-license-renewal-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 16px;
          }

          .fl-license-renewal-button {
            min-height: 44px;
            padding: 0 16px;
            border: 1px solid #111717;
            background: transparent;
            color: #111717;
            font: inherit;
            font-size: 13px;
            font-weight: 650;
            cursor: pointer;
            transition:
              background-color 0.2s ease,
              color 0.2s ease,
              transform 0.2s ease;
          }

          .fl-license-renewal-button[aria-pressed="true"] {
            background: #111717;
            color: #f5f0e7;
          }

          .fl-license-guidance {
            margin-top: 18px;
            padding: 20px;
            background: #eee6d9;
            border-left: 3px solid #7d5f3a;
          }

          .fl-license-guidance p {
            margin-top: 0;
          }

          .fl-license-guidance p:last-child {
            margin-bottom: 0;
          }

          .fl-license-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            margin-top: 24px;
          }

          .fl-license-primary,
          .fl-license-secondary {
            min-height: 50px;
            padding: 0 20px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            font-size: 14px;
            font-weight: 650;
            letter-spacing: 0.03em;
            text-decoration: none;
            transition:
              transform 0.2s ease,
              background-color 0.2s ease,
              color 0.2s ease,
              box-shadow 0.2s ease;
          }

          .fl-license-primary {
            background: #111717;
            border: 1px solid #111717;
            color: #f5f0e7;
          }

          .fl-license-secondary {
            background: transparent;
            border: 1px solid #111717;
            color: #111717;
          }

          .fl-license-message {
            max-width: 760px;
            margin: 18px 0 0;
            padding: 14px 16px;
            background: rgba(255, 255, 255, 0.48);
            border-left: 3px solid #7d5f3a;
            color: #3f3d38;
            font-size: 0.9rem;
            line-height: 1.6;
          }

          .fl-license-error {
            max-width: 760px;
            margin: 18px 0 0;
            padding: 14px 16px;
            background: rgba(255, 255, 255, 0.45);
            border-left: 3px solid #8a2d25;
            color: #6f261f;
            font-size: 0.9rem;
            line-height: 1.6;
          }

          .fl-license-note {
            max-width: 820px;
            margin: 26px 0 0;
            padding-top: 22px;
            border-top: 1px solid rgba(17, 23, 23, 0.14);
            color: #5f5c56;
            font-size: 0.86rem;
            line-height: 1.7;
          }

          @media (hover: hover) and (pointer: fine) {
            .fl-license-search-button:hover:not(:disabled),
            .fl-license-primary:hover,
            .fl-name-result-button:hover,
            .fl-remember-button:hover {
              background: #1f2d30;
              transform: translateY(-3px);
              box-shadow:
                0 12px 28px
                rgba(17, 23, 23, 0.14);
            }

            .fl-license-secondary:hover,
            .fl-license-renewal-button:hover,
            .fl-name-secondary-button:hover,
            .fl-forget-button:hover {
              background: #111717;
              color: #f5f0e7;
              transform: translateY(-2px);
            }
          }

          @media (max-width: 650px) {
            .fl-license-result-grid,
            .fl-name-grid {
              grid-template-columns: 1fr;
            }

            .fl-license-actions,
            .fl-license-renewal-buttons,
            .fl-name-type-buttons,
            .fl-name-actions,
            .fl-saved-license-actions {
              display: grid;
              grid-template-columns: 1fr;
            }

            .fl-license-primary,
            .fl-license-secondary,
            .fl-license-search-button,
            .fl-license-renewal-button,
            .fl-name-secondary-button,
            .fl-name-result-button,
            .fl-remember-button,
            .fl-forget-button {
              width: 100%;
            }

            .fl-saved-license-top {
              display: block;
            }

            .fl-remember-panel {
              margin-left: 18px;
              margin-right: 18px;
            }
          }
        `}
      </style>

      <p className="eyebrow">
        FLORIDA LICENSE CHECK
      </p>

      <h2
        style={{
          fontSize:
            "clamp(2rem, 4vw, 3rem)",
          maxWidth: "780px",
          marginBottom: "14px",
        }}
      >
        Check when your Florida real estate
        license expires.
      </h2>

      <p
        style={{
          color: "#4d4b46",
          maxWidth: "820px",
          marginBottom: 0,
        }}
      >
        Enter your Florida real estate license
        number, or let Greyson help find it by
        name. We use Florida DBPR&apos;s weekly
        public records and always recommend
        verifying the live DBPR record before
        renewing or practicing.
      </p>

      {savedLicenseNumber &&
        !result &&
        !nameMode && (
          <div className="fl-saved-license">
            <div className="fl-saved-license-top">
              <div>
                <p
                  className="eyebrow"
                  style={{
                    marginBottom:
                      "4px",
                  }}
                >
                  SAVED IN THIS BROWSER
                </p>

                <p className="fl-saved-license-number">
                  {savedLicenseNumber}
                </p>

                <p className="fl-saved-license-copy">
                  Greyson remembers only this
                  license number in this browser.
                  Your current status and
                  expiration date are checked
                  again from the latest available
                  DBPR weekly record each time
                  you ask.
                </p>
              </div>
            </div>

            <div className="fl-saved-license-actions">
              <button
                type="button"
                className="fl-license-search-button"
                style={{
                  marginTop: 0,
                }}
                onClick={
                  checkSavedLicense
                }
                disabled={
                  isSearching
                }
              >
                {isSearching
                  ? "Checking License..."
                  : "Check My Current License →"}
              </button>

              <button
                type="button"
                className="fl-forget-button"
                onClick={
                  forgetSavedLicense
                }
              >
                Forget This License
              </button>
            </div>
          </div>
        )}

      {!nameMode ? (
        <>
          <form
            onSubmit={
              handleLookup
            }
          >
            <div className="fl-license-field-wrap">
              <label
                className="fl-license-label"
                htmlFor="florida-license-number"
              >
                Florida license number
              </label>

              <input
                id="florida-license-number"
                className="fl-license-input"
                type="text"
                value={licenseNumber}
                onChange={(event) => {
                  setLicenseNumber(
                    event.target
                      .value,
                  );

                  setError("");
                  setMessage("");
                  setSavedLicenseMessage(
                    "",
                  );
                  setResult(null);
                  setRenewalChoice(
                    null,
                  );
                  setHasSearched(
                    false,
                  );
                }}
                placeholder="Example: SL1234567"
                autoComplete="off"
                autoCapitalize="characters"
                spellCheck={false}
                aria-describedby="florida-license-number-help"
              />

              <p
                id="florida-license-number-help"
                className="fl-license-helper"
              >
                Your number may be on your
                Florida license copy or pocket
                card, in your MyFloridaLicense
                account, or available from your
                broker or manager.
              </p>
            </div>

            <button
              className="fl-license-search-button"
              type="submit"
              disabled={
                isSearching
              }
            >
              {isSearching
                ? "Checking License..."
                : "Check License Expiration"}
            </button>
          </form>

          <div className="fl-name-toggle">
            <button
              type="button"
              className="fl-name-toggle-button"
              onClick={
                openNameSearch
              }
              aria-expanded={
                nameMode
              }
            >
              I don&apos;t know my license number →
            </button>
          </div>
        </>
      ) : (
        <div className="fl-name-panel">
          <p className="eyebrow">
            FIND MY LICENSE
          </p>

          <h3 className="fl-name-panel-title">
            Don&apos;t know your license number?
          </h3>

          <p className="fl-name-panel-copy">
            Start with only your first and last
            name. If several Florida licensees
            have the same name, Greyson will ask
            one additional question at a time
            until the list is short enough to
            identify your record.
          </p>

          <form
            onSubmit={
              handleNameSearch
            }
          >
            <div className="fl-name-grid">
              <div className="fl-name-field">
                <label
                  className="fl-license-label"
                  htmlFor="fl-first-name"
                >
                  First name
                </label>

                <input
                  id="fl-first-name"
                  className="fl-license-input"
                  type="text"
                  value={
                    firstName
                  }
                  onChange={(event) => {
                    setFirstName(
                      event.target
                        .value,
                    );

                    resetNameProgress();
                  }}
                  autoComplete="given-name"
                />
              </div>

              <div className="fl-name-field">
                <label
                  className="fl-license-label"
                  htmlFor="fl-last-name"
                >
                  Last name
                </label>

                <input
                  id="fl-last-name"
                  className="fl-license-input"
                  type="text"
                  value={
                    lastName
                  }
                  onChange={(event) => {
                    setLastName(
                      event.target
                        .value,
                    );

                    resetNameProgress();
                  }}
                  autoComplete="family-name"
                />
              </div>
            </div>

            <button
              className="fl-license-search-button"
              type="submit"
              disabled={
                nameIsSearching
              }
            >
              {nameIsSearching
                ? "Searching..."
                : "Find My License"}
            </button>
          </form>

          {nameStage ===
            "license-type" && (
            <div className="fl-name-prompt">
              <p className="eyebrow">
                ONE MORE QUESTION
              </p>

              <h4
                style={{
                  fontSize:
                    "1.35rem",
                  marginBottom:
                    "8px",
                }}
              >
                We found several people with
                your name.
              </h4>

              <p className="fl-name-panel-copy">
                What kind of Florida real
                estate license do you have?
              </p>

              <div className="fl-name-type-buttons">
                <button
                  type="button"
                  className="fl-name-secondary-button"
                  onClick={() =>
                    chooseLicenseType(
                      "sales-associate",
                    )
                  }
                  disabled={
                    nameIsSearching
                  }
                >
                  Sales Associate
                </button>

                <button
                  type="button"
                  className="fl-name-secondary-button"
                  onClick={() =>
                    chooseLicenseType(
                      "broker",
                    )
                  }
                  disabled={
                    nameIsSearching
                  }
                >
                  Broker / Broker Associate
                </button>

                <button
                  type="button"
                  className="fl-name-secondary-button"
                  onClick={
                    licenseTypeUnknown
                  }
                >
                  I&apos;m Not Sure
                </button>
              </div>
            </div>
          )}

          {nameStage ===
            "middle-initial" && (
            <div className="fl-name-prompt">
              <p className="eyebrow">
                HELP US NARROW IT DOWN
              </p>

              <h4
                style={{
                  fontSize:
                    "1.35rem",
                  marginBottom:
                    "8px",
                }}
              >
                What is your middle initial?
              </h4>

              <p className="fl-name-panel-copy">
                Enter the first letter of your
                middle name as it appears on your
                Florida license record.
              </p>

              <form
                onSubmit={
                  handleMiddleSearch
                }
              >
                <div
                  className="fl-license-field-wrap"
                  style={{
                    maxWidth:
                      "180px",
                    marginTop:
                      "16px",
                  }}
                >
                  <label
                    className="fl-license-label"
                    htmlFor="fl-middle-initial"
                  >
                    Middle initial
                  </label>

                  <input
                    id="fl-middle-initial"
                    className="fl-license-input"
                    type="text"
                    maxLength={1}
                    value={
                      middleInitial
                    }
                    onChange={(event) => {
                      setMiddleInitial(
                        event.target
                          .value,
                      );

                      setNameSearchError(
                        "",
                      );
                    }}
                    autoCapitalize="characters"
                    spellCheck={false}
                  />
                </div>

                <div className="fl-name-actions">
                  <button
                    className="fl-license-search-button"
                    type="submit"
                    disabled={
                      nameIsSearching
                    }
                    style={{
                      marginTop: 0,
                    }}
                  >
                    {nameIsSearching
                      ? "Searching..."
                      : "Continue"}
                  </button>

                  <button
                    type="button"
                    className="fl-name-secondary-button"
                    onClick={() =>
                      setNameStage(
                        "too-many",
                      )
                    }
                  >
                    I Don&apos;t Know
                  </button>
                </div>
              </form>
            </div>
          )}

          {nameStage ===
            "results" &&
            nameMatches.length >
              0 && (
              <div className="fl-name-prompt">
                <p className="eyebrow">
                  POSSIBLE MATCHES
                </p>

                <h4
                  style={{
                    fontSize:
                      "1.35rem",
                    marginBottom:
                      "8px",
                  }}
                >
                  Which record is yours?
                </h4>

                <p className="fl-name-panel-copy">
                  Greyson will not assume which
                  person is you. Choose your
                  record below.
                </p>

                <div className="fl-name-results">
                  {nameMatches.map(
                    (match) => (
                      <div
                        className="fl-name-result-card"
                        key={
                          match.id
                        }
                      >
                        <h4>
                          {formatLicensedName(
                            match.name,
                          )}
                        </h4>

                        <div className="fl-name-result-details">
                          <span>
                            {match.licenseType ||
                              "License type not listed"}
                          </span>

                          <span>
                            {nameMatchStatus(
                              match,
                            )}
                          </span>

                          <span>
                            Expires{" "}
                            {formatDbprDate(
                              match.expirationDate,
                            )}
                          </span>
                        </div>

                        <button
                          type="button"
                          className="fl-name-result-button"
                          onClick={() =>
                            chooseNameMatch(
                              match,
                            )
                          }
                        >
                          That&apos;s Me →
                        </button>
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}

          {nameStage ===
            "no-matches" && (
            <div className="fl-name-notice">
              <strong>
                We didn&apos;t find an exact
                match.
              </strong>

              <p
                style={{
                  marginBottom: 0,
                }}
              >
                Try the legal first and last
                name used on your Florida
                license. A recently changed
                name or a record that is not
                included in the weekly
                downloadable file may require
                Florida DBPR&apos;s live search.
              </p>
            </div>
          )}

          {nameStage ===
            "too-many" && (
            <div className="fl-name-notice">
              <strong>
                We still have too many similar
                records to identify you safely.
              </strong>

              <p>
                Rather than show a long public
                list of licensees, use Florida
                DBPR&apos;s official search for
                this search.
              </p>

              <a
                href={
                  dbprGeneralSearch
                }
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontWeight: 650,
                  textDecoration:
                    "underline",
                  textUnderlineOffset:
                    "4px",
                }}
              >
                Search Florida DBPR ↗
              </a>
            </div>
          )}

          {nameSearchError && (
            <p
              className="fl-name-error"
              role="alert"
            >
              {nameSearchError}
            </p>
          )}

          <div className="fl-name-actions">
            <button
              type="button"
              className="fl-name-secondary-button"
              onClick={
                returnToNumberSearch
              }
            >
              ← I Know My License Number
            </button>
          </div>
        </div>
      )}

      {savedLicenseMessage && (
        <p
          className="fl-saved-confirmation"
          aria-live="polite"
        >
          {savedLicenseMessage}
        </p>
      )}

      {error && (
        <p
          className="fl-license-error"
          role="alert"
        >
          {error}
        </p>
      )}

      {result && (
        <div
          className="fl-license-result"
          aria-live="polite"
        >
          <div className="fl-license-result-header">
            <p
              className="eyebrow eyebrow--light"
              style={{
                marginBottom:
                  "10px",
              }}
            >
              FLORIDA DBPR WEEKLY RECORD
            </p>

            <h3 className="fl-license-result-name">
              {formatLicensedName(
                result.n,
              )}
            </h3>

            <p className="fl-license-result-license">
              {result.i}
            </p>
          </div>

          <div className="fl-license-result-grid">
            <div className="fl-license-result-item">
              <p className="fl-license-result-label">
                License Type
              </p>

              <p className="fl-license-result-value">
                {result.r ||
                  "Not listed"}
              </p>
            </div>

            <div className="fl-license-result-item">
              <p className="fl-license-result-label">
                Status
              </p>

              <p className="fl-license-result-value">
                {combinedStatus(
                  result,
                )}
              </p>
            </div>

            <div className="fl-license-result-item">
              <p className="fl-license-result-label">
                Expiration Date
              </p>

              <p className="fl-license-result-value fl-license-expiration">
                {formatDbprDate(
                  result.x,
                )}
              </p>
            </div>

            <div className="fl-license-result-item">
              <p className="fl-license-result-label">
                Original License Date
              </p>

              <p className="fl-license-result-value">
                {formatDbprDate(
                  result.o,
                )}
              </p>
            </div>
          </div>

          <div className="fl-license-data-note">
            DBPR public-record data as of{" "}
            <strong>
              {formatSourceDate(
                meta,
              )}
            </strong>
            . This weekly file is a convenience
            reference and may lag recent changes.
          </div>

          <div className="fl-remember-panel">
            <p className="eyebrow">
              {currentLicenseIsSaved
                ? "REMEMBERED IN THIS BROWSER"
                : "MAKE NEXT TIME EASIER"}
            </p>

            <h3 className="fl-remember-title">
              {currentLicenseIsSaved
                ? "Greyson remembers this license number."
                : "Remember this license in this browser."}
            </h3>

            <p className="fl-remember-copy">
              {currentLicenseIsSaved
                ? "Only the license number is saved locally in this browser. Greyson still checks the latest available DBPR record when you return."
                : "Save only this license number locally in this browser so you do not have to find or type it again next time. Greyson will not save the expiration date or status."}
            </p>

            {!currentLicenseIsSaved ? (
              <button
                type="button"
                className="fl-remember-button"
                onClick={
                  rememberCurrentLicense
                }
              >
                Remember This License in This Browser →
              </button>
            ) : (
              <button
                type="button"
                className="fl-forget-button"
                style={{
                  marginTop:
                    "16px",
                }}
                onClick={
                  forgetSavedLicense
                }
              >
                Forget This License
              </button>
            )}
          </div>

          {isInvoluntarilyInactive(
            result,
          ) ? (
            <div className="fl-license-renewal-question">
              <p className="eyebrow">
                IMPORTANT STATUS
              </p>

              <h3
                style={{
                  fontSize:
                    "1.65rem",
                  marginBottom:
                    "10px",
                }}
              >
                Your record appears to show an
                involuntarily inactive status.
              </h3>

              <p
                style={{
                  color:
                    "#4d4b46",
                  maxWidth:
                    "760px",
                }}
              >
                Reactivation requirements can
                differ depending on how long the
                license has been inactive. Verify
                the live DBPR record before
                selecting education.
              </p>

              <Link
                href="/courses#reactivation"
                style={{
                  fontWeight: 600,
                  textDecoration:
                    "underline",
                  textUnderlineOffset:
                    "4px",
                }}
              >
                Explore Reactivation Education →
              </Link>
            </div>
          ) : (
            <div className="fl-license-renewal-question">
              <p className="eyebrow">
                HELP ME FIND MY EDUCATION PATH
              </p>

              <h3
                style={{
                  fontSize:
                    "1.65rem",
                  marginBottom:
                    "10px",
                }}
              >
                Is this your first renewal?
              </h3>

              <p
                style={{
                  color:
                    "#4d4b46",
                  maxWidth:
                    "740px",
                  marginBottom:
                    0,
                }}
              >
                Your expiration date alone does
                not determine which education
                you need.
              </p>

              <div className="fl-license-renewal-buttons">
                <button
                  type="button"
                  className="fl-license-renewal-button"
                  aria-pressed={
                    renewalChoice ===
                    "first"
                  }
                  onClick={() =>
                    setRenewalChoice(
                      "first",
                    )
                  }
                >
                  Yes — first renewal
                </button>

                <button
                  type="button"
                  className="fl-license-renewal-button"
                  aria-pressed={
                    renewalChoice ===
                    "later"
                  }
                  onClick={() =>
                    setRenewalChoice(
                      "later",
                    )
                  }
                >
                  No — I&apos;ve renewed before
                </button>

                <button
                  type="button"
                  className="fl-license-renewal-button"
                  aria-pressed={
                    renewalChoice ===
                    "unsure"
                  }
                  onClick={() =>
                    setRenewalChoice(
                      "unsure",
                    )
                  }
                >
                  I&apos;m not sure
                </button>
              </div>

              {renewalChoice ===
                "first" &&
                isSalesAssociate(
                  result,
                ) && (
                  <div className="fl-license-guidance">
                    <p>
                      <strong>
                        Based on this record and
                        your answer, you most
                        likely need Florida&apos;s
                        45-hour sales-associate
                        post-license education
                        before the initial license
                        expires.
                      </strong>
                    </p>

                    <p>
                      <Link
                        href="/florida-45-hour-post-license-requirements"
                        style={{
                          fontWeight:
                            600,
                          textDecoration:
                            "underline",
                          textUnderlineOffset:
                            "4px",
                        }}
                      >
                        Understand the 45-Hour
                        Requirement →
                      </Link>
                    </p>
                  </div>
                )}

              {renewalChoice ===
                "first" &&
                isBroker(
                  result,
                ) && (
                  <div className="fl-license-guidance">
                    <p>
                      <strong>
                        Based on this record and
                        your answer, you most
                        likely need Florida
                        broker post-license
                        education for your first
                        renewal.
                      </strong>
                    </p>

                    <p>
                      <Link
                        href="/courses#broker"
                        style={{
                          fontWeight:
                            600,
                          textDecoration:
                            "underline",
                          textUnderlineOffset:
                            "4px",
                        }}
                      >
                        Explore the Broker
                        Education Path →
                      </Link>
                    </p>
                  </div>
                )}

              {renewalChoice ===
                "later" &&
                isActive(
                  result,
                ) && (
                  <div className="fl-license-guidance">
                    <p>
                      <strong>
                        Based on this record and
                        your answer, you most
                        likely fall under
                        Florida&apos;s regular
                        continuing-education
                        renewal cycle.
                      </strong>
                    </p>

                    <p>
                      <Link
                        href="/florida-14-hour-real-estate-continuing-education"
                        style={{
                          fontWeight:
                            600,
                          textDecoration:
                            "underline",
                          textUnderlineOffset:
                            "4px",
                        }}
                      >
                        Understand the 14-Hour
                        CE Requirement →
                      </Link>
                    </p>
                  </div>
                )}

              {renewalChoice ===
                "later" &&
                !isActive(
                  result,
                ) && (
                  <div className="fl-license-guidance">
                    <p>
                      <strong>
                        Your record does not
                        appear to show an active
                        status.
                      </strong>
                    </p>

                    <p>
                      Inactive-license
                      requirements can differ
                      from the standard
                      active-license renewal
                      path. Verify your status
                      with DBPR before
                      purchasing education.
                    </p>

                    <p>
                      <Link
                        href="/courses#reactivation"
                        style={{
                          fontWeight:
                            600,
                          textDecoration:
                            "underline",
                          textUnderlineOffset:
                            "4px",
                        }}
                      >
                        Explore Reactivation
                        Education →
                      </Link>
                    </p>
                  </div>
                )}

              {renewalChoice ===
                "unsure" && (
                <div className="fl-license-guidance">
                  <p>
                    <strong>
                      Don&apos;t guess.
                    </strong>
                  </p>

                  <p>
                    Whether this is your first
                    renewal can change the
                    education requirement.
                    Confirm your renewal history
                    with DBPR or contact Greyson
                    Institute before enrolling.
                  </p>

                  <p>
                    <Link
                      href="/contact"
                      style={{
                        fontWeight:
                          600,
                        textDecoration:
                          "underline",
                        textUnderlineOffset:
                          "4px",
                      }}
                    >
                      Ask Greyson Institute →
                    </Link>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {hasSearched && (
        <div className="fl-license-actions">
          <a
            className="fl-license-primary"
            href={
              dbprLicenseNumberSearch
            }
            target="_blank"
            rel="noopener noreferrer"
            onClick={
              handleDbprClick
            }
          >
            Verify Live on Florida DBPR ↗
          </a>

          <a
            className="fl-license-secondary"
            href={
              dbprGeneralSearch
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            Search DBPR by Name ↗
          </a>
        </div>
      )}

      {message && (
        <p
          className="fl-license-message"
          aria-live="polite"
        >
          {message}
        </p>
      )}

      <p className="fl-license-note">
        <strong>Important:</strong> Greyson
        Institute is not the Florida Department
        of Business and Professional Regulation.
        This lookup is a convenience check using
        DBPR&apos;s weekly public-record
        download. DBPR&apos;s live license
        search remains the official source for
        current status and expiration
        information. Null-and-void records are
        not included in the weekly downloadable
        file.
      </p>
    </div>
  );
}
