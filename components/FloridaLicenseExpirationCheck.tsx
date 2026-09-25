"use client";

import {
  useEffect,
  useState,
  type FormEvent,
  type MouseEvent,
} from "react";
import Link from "next/link";
import { LicenseRenewalCalendarButton } from "@/components/LicenseRenewalCalendarButton";
import { LicenseExpirationCountdown } from "@/components/LicenseExpirationCountdown";

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
  | "middle-name"
  | "county"
  | "results"
  | "details"
  | "no-matches"
  | "too-many";

type NameSearchMatch = {
  id: string;
  name: string;
  licenseType: string;
  primaryStatus: string;
  secondaryStatus: string;
  expirationDate: string;
  county?: string;
};

type NameSearchResponse = {
  ok: boolean;
  status?:
    | "matches"
    | "no_matches"
    | "needs_license_type"
    | "needs_middle_initial"
    | "needs_county"
    | "too_many_matches";
  matches?: NameSearchMatch[];
  counties?: string[];
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

function numericPart(
  value: string,
) {
  return value.replace(/\D/g, "");
}

function titleCaseName(
  value: string,
) {
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
  const trimmed =
    value.trim();

  if (!trimmed) {
    return "Name not listed";
  }

  const commaParts =
    trimmed
      .split(",")
      .map((part) =>
        part.trim(),
      )
      .filter(Boolean);

  if (
    commaParts.length >= 2
  ) {
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

  return titleCaseName(
    trimmed,
  );
}

function formatCountyName(
  value: string,
) {
  if (!value) {
    return "Not listed";
  }

  return `${titleCaseName(
    value,
  )} County`;
}

function formatDbprDate(
  value: string,
) {
  if (!value) {
    return "Not listed";
  }

  const slashDate =
    value.match(
      /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/,
    );

  if (slashDate) {
    const [
      ,
      month,
      day,
      year,
    ] = slashDate;

    const date =
      new Date(
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

  const compactDate =
    value.match(
      /^(\d{4})(\d{2})(\d{2})$/,
    );

  if (compactDate) {
    const [
      ,
      year,
      month,
      day,
    ] = compactDate;

    const date =
      new Date(
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

    if (
      month !== undefined
    ) {
      const shortYear =
        Number(rawYear);

      const year =
        rawYear.length === 2
          ? shortYear <= 69
            ? 2000 + shortYear
            : 1900 + shortYear
          : shortYear;

      const date =
        new Date(
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
    skipLicenseType,
    setSkipLicenseType,
  ] = useState(false);

  const [
    middleName,
    setMiddleName,
  ] = useState("");

  const [
    skipMiddle,
    setSkipMiddle,
  ] = useState(false);

  const [
    county,
    setCounty,
  ] = useState("");

  const [
    countyOptions,
    setCountyOptions,
  ] =
    useState<string[]>([]);

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
    selectedNameMatch,
    setSelectedNameMatch,
  ] =
    useState<NameSearchMatch | null>(
      null,
    );

  const [
    copiedLicenseNumber,
    setCopiedLicenseNumber,
  ] = useState("");

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
      // Local storage may be unavailable.
    }
  }, []);

  function resetNameProgress() {
    setNameLicenseType(null);
    setSkipLicenseType(false);
    setMiddleName("");
    setSkipMiddle(false);
    setCounty("");
    setCountyOptions([]);
    setNameStage("form");
    setNameMatches([]);
    setSelectedNameMatch(
      null,
    );
    setCopiedLicenseNumber("");
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
      // Clear visible state anyway.
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
      numericPart(
        normalized,
      );

    setError("");
    setMessage("");
    setSavedLicenseMessage("");
    setCopiedLicenseNumber("");
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
            cache:
              "no-store",
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

        setHasSearched(true);

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
            cache:
              "no-store",
          },
        );

      if (
        !bucketResponse.ok
      ) {
        setError(
          "We could not find that license in the current weekly file. Please verify it with Florida DBPR.",
        );

        setHasSearched(true);

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

        setHasSearched(true);

        return;
      }

      const numericMatches =
        records.filter(
          (record) =>
            numericPart(
              record.i,
            ) ===
            digits,
        );

      if (
        numericMatches.length ===
        1
      ) {
        setResult(
          numericMatches[0],
        );

        setHasSearched(true);

        return;
      }

      if (
        numericMatches.length >
        1
      ) {
        setError(
          "More than one Florida record matches those digits. Enter the complete license number, including the letters at the beginning.",
        );

        setHasSearched(true);

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
      setIsSearching(false);
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
      skipLicenseType?: boolean;
      middleName?: string;
      skipMiddle?: boolean;
      county?: string;
    },
  ) {
    const trimmedFirst =
      firstName.trim();

    const trimmedLast =
      lastName.trim();

    if (
      trimmedFirst.length < 2 ||
      trimmedLast.length < 2
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

    const requestedSkipLicenseType =
      options?.skipLicenseType !==
      undefined
        ? options.skipLicenseType
        : skipLicenseType;

    const requestedMiddleName =
      options?.middleName !==
      undefined
        ? options.middleName
        : middleName;

    const requestedSkipMiddle =
      options?.skipMiddle !==
      undefined
        ? options.skipMiddle
        : skipMiddle;

    const requestedCounty =
      options?.county !==
      undefined
        ? options.county
        : county;

    setNameSearchError("");
    setNameMatches([]);
    setSelectedNameMatch(
      null,
    );
    setCopiedLicenseNumber("");
    setNameIsSearching(true);

    try {
      const body: {
        firstName: string;
        lastName: string;
        licenseType?: NameLicenseType;
        skipLicenseType?: boolean;
        middleName?: string;
        skipMiddle?: boolean;
        county?: string;
        supportsCounty: true;
      } = {
        firstName:
          trimmedFirst,
        lastName:
          trimmedLast,
        supportsCounty: true,
      };

      if (
        requestedLicenseType
      ) {
        body.licenseType =
          requestedLicenseType;
      }

      if (
        requestedSkipLicenseType
      ) {
        body.skipLicenseType =
          true;
      }

      if (
        requestedMiddleName.trim()
      ) {
        body.middleName =
          requestedMiddleName.trim();
      }

      if (
        requestedSkipMiddle
      ) {
        body.skipMiddle =
          true;
      }

      if (
        requestedCounty.trim()
      ) {
        body.county =
          requestedCounty.trim();
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
            body:
              JSON.stringify(
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
          "middle-name",
        );

        return;
      }

      if (
        data.status ===
        "needs_county"
      ) {
        setCountyOptions(
          data.counties ||
            [],
        );

        setNameStage(
          "county",
        );

        return;
      }

      if (
        data.status ===
        "matches"
      ) {
        setNameMatches(
          data.matches ||
            [],
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

    setNameLicenseType(null);
    setSkipLicenseType(false);
    setMiddleName("");
    setSkipMiddle(false);
    setCounty("");
    setCountyOptions([]);

    await runNameSearch({
      licenseType: null,
      skipLicenseType:
        false,
      middleName: "",
      skipMiddle: false,
      county: "",
    });
  }

  async function chooseLicenseType(
    value: NameLicenseType,
  ) {
    setNameLicenseType(
      value,
    );

    setSkipLicenseType(false);
    setMiddleName("");
    setSkipMiddle(false);
    setCounty("");
    setCountyOptions([]);
    setNameSearchError("");

    await runNameSearch({
      licenseType: value,
      skipLicenseType:
        false,
      middleName: "",
      skipMiddle: false,
      county: "",
    });
  }

  async function licenseTypeUnknown() {
    setNameLicenseType(null);
    setSkipLicenseType(true);
    setMiddleName("");
    setSkipMiddle(false);
    setCounty("");
    setCountyOptions([]);
    setNameSearchError("");

    await runNameSearch({
      licenseType: null,
      skipLicenseType:
        true,
      middleName: "",
      skipMiddle: false,
      county: "",
    });
  }

  async function handleMiddleSearch(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const value =
      middleName.trim();

    if (!value) {
      setNameSearchError(
        "Enter your middle name or initial, or choose I Don't Know.",
      );

      return;
    }

    setSkipMiddle(false);
    setCounty("");
    setCountyOptions([]);
    setNameSearchError("");

    await runNameSearch({
      licenseType:
        nameLicenseType,
      skipLicenseType,
      middleName: value,
      skipMiddle: false,
      county: "",
    });
  }

  async function middleNameUnknown() {
    setMiddleName("");
    setSkipMiddle(true);
    setCounty("");
    setCountyOptions([]);
    setNameSearchError("");

    await runNameSearch({
      licenseType:
        nameLicenseType,
      skipLicenseType,
      middleName: "",
      skipMiddle: true,
      county: "",
    });
  }

  async function handleCountySearch(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!county) {
      setNameSearchError(
        "Choose your county, or select I Don't Know.",
      );

      return;
    }

    setNameSearchError("");

    await runNameSearch({
      licenseType:
        nameLicenseType,
      skipLicenseType,
      middleName,
      skipMiddle,
      county,
    });
  }

  function countyUnknown() {
    setNameSearchError("");

    setNameStage(
      "too-many",
    );
  }

  function viewNameMatch(
    match: NameSearchMatch,
  ) {
    setSelectedNameMatch(
      match,
    );

    setCopiedLicenseNumber("");
    setNameSearchError("");

    setNameStage(
      "details",
    );
  }

  function backToMatches() {
    setSelectedNameMatch(
      null,
    );

    setCopiedLicenseNumber("");
    setNameSearchError("");

    setNameStage(
      "results",
    );
  }

  async function copyLicenseNumber(
    value: string,
  ) {
    const normalized =
      normalizeLicenseNumber(
        value,
      );

    if (!normalized) {
      return;
    }

    try {
      await navigator.clipboard.writeText(
        normalized,
      );

      setCopiedLicenseNumber(
        normalized,
      );
    } catch {
      setCopiedLicenseNumber("");

      setNameSearchError(
        "Your browser could not copy the license number automatically. You can still select and copy it manually.",
      );
    }
  }

  async function confirmNameMatch() {
    if (
      !selectedNameMatch
    ) {
      return;
    }

    const chosen =
      selectedNameMatch;

    setNameMode(false);
    resetNameProgress();

    await lookupLicenseNumber(
      chosen.id,
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

          select.fl-license-input {
            appearance: auto;
          }

          .fl-license-helper {
            color: #6e6b65;
            font-size: 0.84rem;
            line-height: 1.6;
            margin: 8px 0 0;
          }

          .fl-license-search-button,
          .fl-name-result-button,
          .fl-remember-button,
          .fl-license-primary,
          .fl-license-secondary,
          .fl-name-secondary-button,
          .fl-forget-button,
          .fl-license-renewal-button {
            border: 1px solid #111717;
            background: #faf7f1;
            color: #111717;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font: inherit;
            font-weight: 650;
            cursor: pointer;
            text-decoration: none;
            transition:
              background-color 0.2s ease,
              color 0.2s ease,
              transform 0.2s ease,
              box-shadow 0.2s ease;
          }

          .fl-license-search-button {
            min-height: 52px;
            margin-top: 20px;
            padding: 0 22px;
            font-size: 14px;
            letter-spacing: 0.035em;
          }

          .fl-license-search-button:disabled,
          .fl-name-result-button:disabled,
          .fl-name-secondary-button:disabled {
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
            font-size: 13px;
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
            font-size: 13px;
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

          .fl-name-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 18px;
          }

          .fl-name-secondary-button {
            min-height: 46px;
            padding: 0 17px;
            font-size: 13px;
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
            font-size: 13px;
          }

          .fl-name-detail {
            margin-top: 22px;
            border: 1px solid rgba(17, 23, 23, 0.18);
            background: #faf7f1;
          }

          .fl-name-detail-header {
            padding: 24px;
            background: #1f2d30;
            color: #f5f0e7;
          }

          .fl-name-detail-header h4 {
            margin: 0 0 7px;
            color: #f5f0e7;
            font-family: var(--font-serif), Georgia, serif;
            font-size: clamp(1.55rem, 3vw, 2rem);
          }

          .fl-name-detail-number {
            margin: 0;
            color: rgba(245, 240, 231, 0.78);
            font-size: 1rem;
            font-weight: 650;
          }

          .fl-copy-license-button {
            min-height: 38px;
            margin-top: 14px;
            padding: 0 14px;
            border: 1px solid #f5f0e7;
            background: #f5f0e7;
            color: #111717;
            font: inherit;
            font-size: 12px;
            font-weight: 700;
            cursor: pointer;
            transition:
              background-color 0.2s ease,
              color 0.2s ease,
              transform 0.2s ease,
              box-shadow 0.2s ease;
          }

          .fl-name-detail-grid {
            display: grid;
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
          }

          .fl-name-detail-item {
            padding: 18px 22px;
            border-right: 1px solid rgba(17, 23, 23, 0.12);
            border-bottom: 1px solid rgba(17, 23, 23, 0.12);
          }

          .fl-name-detail-label {
            margin: 0 0 5px;
            color: #7d5f3a;
            font-size: 0.67rem;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
          }

          .fl-name-detail-value {
            margin: 0;
            color: #111717;
            line-height: 1.5;
          }

          .fl-name-detail-note {
            padding: 18px 22px;
            color: #5f5c56;
            font-size: 0.84rem;
            line-height: 1.6;
          }

          .fl-name-confirm-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            padding: 0 22px 22px;
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
            color: rgba(245, 240, 231, 0.75);
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
            font-size: 13px;
          }

          .fl-license-renewal-button[aria-pressed="true"] {
            background: #eee6d9;
            color: #111717;
            border-color: #7d5f3a;
          }

          .fl-license-guidance {
            margin-top: 18px;
            padding: 20px;
            background: #eee6d9;
            border-left: 3px solid #7d5f3a;
          }

          .fl-license-guidance a {
            color: #111717;
            font-weight: 650;
            text-underline-offset: 4px;
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
            font-size: 14px;
            letter-spacing: 0.03em;
          }

          .fl-license-message,
          .fl-license-error {
            max-width: 760px;
            margin: 18px 0 0;
            padding: 14px 16px;
            font-size: 0.9rem;
            line-height: 1.6;
          }

          .fl-license-message {
            background: rgba(255, 255, 255, 0.48);
            border-left: 3px solid #7d5f3a;
            color: #3f3d38;
          }

          .fl-license-error {
            background: rgba(255, 255, 255, 0.45);
            border-left: 3px solid #8a2d25;
            color: #6f261f;
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
            .fl-name-result-button:hover:not(:disabled),
            .fl-remember-button:hover,
            .fl-license-primary:hover,
            .fl-license-secondary:hover,
            .fl-name-secondary-button:hover:not(:disabled),
            .fl-forget-button:hover,
            .fl-license-renewal-button:hover,
            .fl-copy-license-button:hover {
              background: #111717;
              color: #f5f0e7;
              transform: translateY(-2px);
              box-shadow:
                0 10px 24px
                rgba(17, 23, 23, 0.12);
            }
          }

          @media (max-width: 650px) {
            .fl-license-result-grid,
            .fl-name-grid,
            .fl-name-detail-grid {
              grid-template-columns: 1fr;
            }

            .fl-license-actions,
            .fl-license-renewal-buttons,
            .fl-name-type-buttons,
            .fl-name-actions,
            .fl-saved-license-actions,
            .fl-name-confirm-actions {
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
            .fl-forget-button,
            .fl-copy-license-button {
              width: 100%;
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
          maxWidth:
            "780px",
          marginBottom:
            "14px",
        }}
      >
        Check when your Florida real estate
        license expires.
      </h2>

      <p
        style={{
          color:
            "#4d4b46",
          maxWidth:
            "820px",
          marginBottom:
            0,
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
            <p className="eyebrow">
              SAVED IN THIS BROWSER
            </p>

            <p className="fl-saved-license-number">
              {savedLicenseNumber}
            </p>

            <p className="fl-saved-license-copy">
              Greyson remembers only this
              license number in this browser.
              Your current status and expiration
              date are checked again from the
              latest available DBPR weekly
              record each time you ask.
            </p>

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
                value={
                  licenseNumber
                }
                onChange={(event) => {
                  setLicenseNumber(
                    event.target.value,
                  );

                  setError("");
                  setMessage("");
                  setCopiedLicenseNumber("");
                  setResult(null);
                  setRenewalChoice(null);
                  setHasSearched(false);
                }}
                placeholder="Example: SL1234567"
                autoComplete="off"
                autoCapitalize="characters"
                spellCheck={false}
              />

              <p className="fl-license-helper">
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
            name. Greyson will ask for another
            clue only when it is actually needed.
          </p>

          <form
            onSubmit={
              handleNameSearch
            }
          >
            <div className="fl-name-grid">
              <div>
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
                      event.target.value,
                    );

                    resetNameProgress();
                  }}
                  autoComplete="given-name"
                />
              </div>

              <div>
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
                      event.target.value,
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

                <h4>
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
                    disabled={
                      nameIsSearching
                    }
                  >
                    I&apos;m Not Sure
                  </button>
                </div>
              </div>
            )}

          {nameStage ===
            "middle-name" && (
              <div className="fl-name-prompt">
                <p className="eyebrow">
                  HELP US NARROW IT DOWN
                </p>

                <h4>
                  What is your middle name or initial?
                </h4>

                <p className="fl-name-panel-copy">
                  You can enter your full middle
                  name or just the first letter.
                  If DBPR has no middle name on
                  your record, Greyson will keep
                  that record as a possible match.
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
                        "420px",
                      marginTop:
                        "16px",
                    }}
                  >
                    <label
                      className="fl-license-label"
                      htmlFor="fl-middle-name"
                    >
                      Middle name or initial
                    </label>

                    <input
                      id="fl-middle-name"
                      className="fl-license-input"
                      type="text"
                      value={
                        middleName
                      }
                      onChange={(event) => {
                        setMiddleName(
                          event.target.value,
                        );

                        setNameSearchError(
                          "",
                        );
                      }}
                      placeholder="Example: Nicole or N"
                      autoComplete="additional-name"
                    />
                  </div>

                  <div className="fl-name-actions">
                    <button
                      type="submit"
                      className="fl-license-search-button"
                      style={{
                        marginTop: 0,
                      }}
                      disabled={
                        nameIsSearching
                      }
                    >
                      {nameIsSearching
                        ? "Searching..."
                        : "Continue"}
                    </button>

                    <button
                      type="button"
                      className="fl-name-secondary-button"
                      onClick={
                        middleNameUnknown
                      }
                      disabled={
                        nameIsSearching
                      }
                    >
                      I Don&apos;t Know
                    </button>
                  </div>
                </form>
              </div>
            )}

          {nameStage ===
            "county" && (
              <div className="fl-name-prompt">
                <p className="eyebrow">
                  ONE LAST CLUE
                </p>

                <h4>
                  What county is associated with
                  your Florida license record?
                </h4>

                <p className="fl-name-panel-copy">
                  Greyson uses county only to
                  narrow the remaining matches.
                  Street addresses are not used
                  or displayed.
                </p>

                <form
                  onSubmit={
                    handleCountySearch
                  }
                >
                  <div
                    className="fl-license-field-wrap"
                    style={{
                      maxWidth:
                        "420px",
                      marginTop:
                        "16px",
                    }}
                  >
                    <label
                      className="fl-license-label"
                      htmlFor="fl-county"
                    >
                      County
                    </label>

                    <select
                      id="fl-county"
                      className="fl-license-input"
                      value={
                        county
                      }
                      onChange={(event) => {
                        setCounty(
                          event.target.value,
                        );

                        setNameSearchError(
                          "",
                        );
                      }}
                    >
                      <option value="">
                        Select county
                      </option>

                      {countyOptions.map(
                        (option) => (
                          <option
                            key={
                              option
                            }
                            value={
                              option
                            }
                          >
                            {formatCountyName(
                              option,
                            )}
                          </option>
                        ),
                      )}
                    </select>
                  </div>

                  <div className="fl-name-actions">
                    <button
                      type="submit"
                      className="fl-license-search-button"
                      style={{
                        marginTop: 0,
                      }}
                      disabled={
                        nameIsSearching
                      }
                    >
                      {nameIsSearching
                        ? "Searching..."
                        : "Continue"}
                    </button>

                    <button
                      type="button"
                      className="fl-name-secondary-button"
                      onClick={
                        countyUnknown
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

                <h4>
                  Which record looks like yours?
                </h4>

                <p className="fl-name-panel-copy">
                  Open a record to see its
                  license number and county
                  before confirming it is yours.
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

                          {match.county && (
                            <span>
                              {formatCountyName(
                                match.county,
                              )}
                            </span>
                          )}

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
                            viewNameMatch(
                              match,
                            )
                          }
                        >
                          View Details →
                        </button>
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}

          {nameStage ===
            "details" &&
            selectedNameMatch && (
              <div className="fl-name-prompt">
                <p className="eyebrow">
                  REVIEW THIS LICENSE
                </p>

                <h4>
                  Does this look like your record?
                </h4>

                <p className="fl-name-panel-copy">
                  Review the details before
                  confirming. Greyson has not
                  saved or identified this
                  license as yours yet.
                </p>

                <div className="fl-name-detail">
                  <div className="fl-name-detail-header">
                    <h4>
                      {formatLicensedName(
                        selectedNameMatch.name,
                      )}
                    </h4>

                    <p className="fl-name-detail-number">
                      {selectedNameMatch.id}
                    </p>

                    <button
                      type="button"
                      className="fl-copy-license-button"
                      onClick={() =>
                        copyLicenseNumber(
                          selectedNameMatch.id,
                        )
                      }
                    >
                      {copiedLicenseNumber ===
                      normalizeLicenseNumber(
                        selectedNameMatch.id,
                      )
                        ? "Copied!"
                        : "Copy License Number"}
                    </button>
                  </div>

                  <div className="fl-name-detail-grid">
                    <div className="fl-name-detail-item">
                      <p className="fl-name-detail-label">
                        License Type
                      </p>

                      <p className="fl-name-detail-value">
                        {selectedNameMatch.licenseType ||
                          "Not listed"}
                      </p>
                    </div>

                    <div className="fl-name-detail-item">
                      <p className="fl-name-detail-label">
                        Status
                      </p>

                      <p className="fl-name-detail-value">
                        {nameMatchStatus(
                          selectedNameMatch,
                        )}
                      </p>
                    </div>

                    <div className="fl-name-detail-item">
                      <p className="fl-name-detail-label">
                        County
                      </p>

                      <p className="fl-name-detail-value">
                        {selectedNameMatch.county
                          ? formatCountyName(
                              selectedNameMatch.county,
                            )
                          : "Not listed"}
                      </p>
                    </div>

                    <div className="fl-name-detail-item">
                      <p className="fl-name-detail-label">
                        Expiration Date
                      </p>

                      <p className="fl-name-detail-value">
                        {formatDbprDate(
                          selectedNameMatch.expirationDate,
                        )}
                      </p>
                    </div>
                  </div>

                  <p className="fl-name-detail-note">
                    Greyson intentionally does
                    not display street or mailing
                    addresses in the public
                    name-search flow. County is
                    used only to help distinguish
                    similar records.
                  </p>

                  <div className="fl-name-confirm-actions">
                    <button
                      type="button"
                      className="fl-name-result-button"
                      onClick={
                        confirmNameMatch
                      }
                    >
                      Yes — This Is My License →
                    </button>

                    <button
                      type="button"
                      className="fl-name-secondary-button"
                      onClick={
                        backToMatches
                      }
                    >
                      ← Back to Matches
                    </button>
                  </div>
                </div>
              </div>
            )}

          {nameStage ===
            "no-matches" && (
              <div className="fl-name-notice">
                <strong>
                  We didn&apos;t find an exact match.
                </strong>

                <p>
                  Try the legal first and last
                  name used on your Florida
                  license. A recently changed
                  name or a record that is not
                  included in the weekly
                  downloadable file may require
                  Florida DBPR&apos;s live search.
                </p>

                <a
                  href={
                    dbprGeneralSearch
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Search Florida DBPR ↗
                </a>
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
            <p className="eyebrow eyebrow--light">
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

            <button
              type="button"
              className="fl-copy-license-button"
              onClick={() =>
                copyLicenseNumber(
                  result.i,
                )
              }
            >
              {copiedLicenseNumber ===
              normalizeLicenseNumber(
                result.i,
              )
                ? "Copied!"
                : "Copy License Number"}
            </button>
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

              <LicenseExpirationCountdown
                expirationDate={result.x}
              />
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

          <LicenseRenewalCalendarButton
            licenseNumber={result.i}
            licenseeName={formatLicensedName(
              result.n,
            )}
            expirationDate={result.x}
          />

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

              <h3>
                Your record appears to show an
                involuntarily inactive status.
              </h3>

              <p>
                Reactivation requirements can
                differ depending on how long the
                license has been inactive. Verify
                the live DBPR record before
                selecting education.
              </p>

              <Link href="/courses#reactivation">
                Understand Inactive License Options →
              </Link>
            </div>
          ) : (
            <div className="fl-license-renewal-question">
              <p className="eyebrow">
                HELP ME FIND MY EDUCATION PATH
              </p>

              <h3>
                Is this your first renewal?
              </h3>

              <p>
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

                    <Link href="/florida-45-hour-post-license-requirements">
                      Understand the 45-Hour Requirement →
                    </Link>
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

                    <Link href="/courses#broker">
                      Explore the Broker Education Path →
                    </Link>
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

                    <Link href="/florida-14-hour-real-estate-continuing-education">
                      Understand the 14-Hour CE Requirement →
                    </Link>
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

                    <Link href="/courses#reactivation">
                      Understand Inactive License Options →
                    </Link>
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

                    <Link href="/contact">
                      Ask Greyson Institute →
                    </Link>
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
        file. Name search may use license type,
        middle-name information, and county from
        DBPR public records only to narrow
        possible matches; street addresses are
        not used or displayed.
      </p>
    </div>
  );
}
