"use client";

import {
  useEffect,
  useState,
  type FormEvent,
} from "react";
import Link from "next/link";
import {
  determineFloridaLicensePath,
  daysUntil,
  formatPlainDate,
  isInstructorRecord,
  normalizeLicenseNumber,
  numericLicensePart,
  type FloridaLicenseRecord,
  type PathResult,
  type RenewalAnswer,
} from "@/lib/florida-license-path";

const DATA_BASE =
  "/data/florida-real-estate-licenses";

const NAME_SEARCH_ENDPOINT =
  "/api/florida-license-name-search";

const SAVED_LICENSE_KEY =
  "greyson-florida-license-number";

const SAVED_RENEWAL_KEY =
  "greyson-florida-renewal-answer";

const dbprGeneralSearch =
  "https://www.myfloridalicense.com/portalsearches/VerifyLicensee";

type LicenseMeta = {
  available: boolean;
  fetchedAt?: string;
  sourceLastModified?: string | null;
  instructorSourceLastModified?: string | null;
  instructorSourceAvailable?: boolean;
};

type NameLicenseType =
  | "sales-associate"
  | "broker"
  | "instructor";

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

type NameStage =
  | "name"
  | "license-type"
  | "middle"
  | "county"
  | "matches";

function titleCaseName(
  value: string,
) {
  return value
    .toLowerCase()
    .replace(
      /(^|[\s'-])([a-z])/g,
      (
        _,
        separator,
        letter,
      ) =>
        `${separator}${letter.toUpperCase()}`,
    );
}

function formatLicensedName(
  value: string,
) {
  const trimmed =
    value.trim();

  if (!trimmed) {
    return "Florida licensee";
  }

  const parts =
    trimmed
      .split(",")
      .map((part) =>
        part.trim(),
      )
      .filter(Boolean);

  if (
    parts.length >= 2
  ) {
    return titleCaseName(
      `${parts
        .slice(1)
        .join(" ")} ${parts[0]}`,
    );
  }

  return titleCaseName(
    trimmed,
  );
}

function formatCounty(
  value: string,
) {
  const trimmed =
    value.trim();

  if (!trimmed) {
    return "";
  }

  return `${titleCaseName(
    trimmed,
  )} County`;
}

function formatSourceDate(
  meta: LicenseMeta | null,
  record: FloridaLicenseRecord,
) {
  const source =
    isInstructorRecord(
      record,
    )
      ? meta
          ?.instructorSourceLastModified ||
        meta
          ?.sourceLastModified ||
        meta?.fetchedAt
      : meta
          ?.sourceLastModified ||
        meta?.fetchedAt;

  if (!source) {
    return "latest available weekly file";
  }

  const date =
    new Date(source);

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return "latest available weekly file";
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

function daysCopy(
  path: PathResult,
) {
  const days =
    daysUntil(
      path.deadlineDate,
    );

  if (
    days === null
  ) {
    return "";
  }

  if (
    days > 1
  ) {
    return `${days.toLocaleString()} days remaining`;
  }

  if (
    days === 1
  ) {
    return "1 day remaining";
  }

  if (
    days === 0
  ) {
    return "Deadline is today";
  }

  if (
    days === -1
  ) {
    return "1 day past this date";
  }

  return `${Math.abs(
    days,
  ).toLocaleString()} days past this date`;
}

export function FindMyPath() {
  const [
    stage,
    setStage,
  ] = useState<
    | "doors"
    | "number"
    | "name"
    | "renewal"
    | "result"
  >("doors");

  const [
    licenseNumber,
    setLicenseNumber,
  ] = useState("");

  const [
    record,
    setRecord,
  ] =
    useState<FloridaLicenseRecord | null>(
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
    renewalAnswer,
    setRenewalAnswer,
  ] =
    useState<RenewalAnswer | null>(
      null,
    );

  const [
    pathResult,
    setPathResult,
  ] =
    useState<PathResult | null>(
      null,
    );

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

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
    nameStage,
    setNameStage,
  ] =
    useState<NameStage>(
      "name",
    );

  const [
    countyOptions,
    setCountyOptions,
  ] =
    useState<string[]>([]);

  const [
    nameMatches,
    setNameMatches,
  ] =
    useState<NameSearchMatch[]>(
      [],
    );

  useEffect(() => {
    let savedLicense = "";
    let savedRenewal:
      RenewalAnswer | null =
      null;

    try {
      savedLicense =
        window.localStorage.getItem(
          SAVED_LICENSE_KEY,
        ) || "";

      const rawRenewal =
        window.localStorage.getItem(
          SAVED_RENEWAL_KEY,
        );

      if (
        rawRenewal ===
          "first" ||
        rawRenewal ===
          "later" ||
        rawRenewal ===
          "unsure"
      ) {
        savedRenewal =
          rawRenewal;
      }
    } catch {
      return;
    }

    if (!savedLicense) {
      return;
    }

    setLicenseNumber(
      savedLicense,
    );

    setRenewalAnswer(
      savedRenewal,
    );

    void lookupLicense(
      savedLicense,
      savedRenewal,
      true,
    );
  }, []);

  function savePathContext(
    value: string,
    answer:
      RenewalAnswer | null,
  ) {
    try {
      window.localStorage.setItem(
        SAVED_LICENSE_KEY,
        normalizeLicenseNumber(
          value,
        ),
      );

      if (answer) {
        window.localStorage.setItem(
          SAVED_RENEWAL_KEY,
          answer,
        );
      } else {
        window.localStorage.removeItem(
          SAVED_RENEWAL_KEY,
        );
      }
    } catch {
      // The path still works if local storage is unavailable.
    }
  }

  function clearSavedPath() {
    try {
      window.localStorage.removeItem(
        SAVED_LICENSE_KEY,
      );

      window.localStorage.removeItem(
        SAVED_RENEWAL_KEY,
      );
    } catch {
      // Clear visible state anyway.
    }

    setRecord(null);
    setPathResult(null);
    setRenewalAnswer(null);
    setLicenseNumber("");
    resetNameSearch();
    setError("");
    setStage("doors");
  }

  function resetNameSearch() {
    setFirstName("");
    setLastName("");
    setNameLicenseType(null);
    setSkipLicenseType(false);
    setMiddleName("");
    setSkipMiddle(false);
    setCounty("");
    setCountyOptions([]);
    setNameMatches([]);
    setNameStage("name");
  }

  async function lookupLicense(
    rawValue: string,
    knownRenewal:
      RenewalAnswer | null =
      renewalAnswer,
    returning = false,
  ) {
    const normalized =
      normalizeLicenseNumber(
        rawValue,
      );

    const digits =
      numericLicensePart(
        normalized,
      );

    setError("");
    setLoading(true);

    try {
      if (
        !normalized ||
        digits.length < 3
      ) {
        setError(
          "Enter your Florida license number.",
        );

        setStage("number");

        return;
      }

      const metaResponse =
        await fetch(
          `${DATA_BASE}/meta.json`,
          {
            cache: "no-store",
          },
        );

      if (!metaResponse.ok) {
        throw new Error();
      }

      const metaData =
        (await metaResponse.json()) as LicenseMeta;

      setMeta(metaData);

      if (
        !metaData.available
      ) {
        setError(
          "Greyson's Florida license data is temporarily unavailable. Verify your record live with DBPR.",
        );

        return;
      }

      if (
        normalized.startsWith(
          "ZH",
        ) &&
        metaData
          .instructorSourceAvailable ===
          false
      ) {
        setError(
          "Greyson's instructor-record source is temporarily unavailable. Verify the permit live with DBPR.",
        );

        return;
      }

      const bucket =
        digits
          .slice(-3)
          .padStart(
            3,
            "0",
          );

      const response =
        await fetch(
          `${DATA_BASE}/${bucket}.json`,
          {
            cache: "no-store",
          },
        );

      if (!response.ok) {
        setError(
          "Greyson did not find this license in the current weekly file. Null-and-void records are not included. Verify the record live with DBPR.",
        );

        return;
      }

      const records =
        (await response.json()) as FloridaLicenseRecord[];

      let match =
        records.find(
          (candidate) =>
            normalizeLicenseNumber(
              candidate.i,
            ) === normalized,
        );

      if (!match) {
        const hasPrefix =
          /[A-Z]/.test(
            normalized,
          );

        if (!hasPrefix) {
          const numericMatches =
            records.filter(
              (candidate) =>
                numericLicensePart(
                  candidate.i,
                ) === digits,
            );

          if (
            numericMatches.length ===
            1
          ) {
            match =
              numericMatches[0];
          }
        }
      }

      if (!match) {
        setError(
          "Greyson did not find an exact match. Check the license number or verify it live with DBPR.",
        );

        return;
      }

      setRecord(match);
      setLicenseNumber(
        match.i,
      );

      if (
        isInstructorRecord(
          match,
        )
      ) {
        const result =
          determineFloridaLicensePath(
            match,
          );

        setPathResult(
          result,
        );

        savePathContext(
          match.i,
          null,
        );

        setStage("result");

        return;
      }

      if (
        knownRenewal
      ) {
        const result =
          determineFloridaLicensePath(
            match,
            knownRenewal,
          );

        setRenewalAnswer(
          knownRenewal,
        );

        setPathResult(
          result,
        );

        savePathContext(
          match.i,
          knownRenewal,
        );

        setStage("result");

        return;
      }

      if (returning) {
        setPathResult(null);
      }

      setStage("renewal");
    } catch {
      setError(
        "Greyson could not complete the lookup right now. Verify your record live with Florida DBPR.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function submitNumber(
    event:
      FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    await lookupLicense(
      licenseNumber,
      null,
    );
  }

  function answerRenewal(
    answer: RenewalAnswer,
  ) {
    if (!record) {
      return;
    }

    const result =
      determineFloridaLicensePath(
        record,
        answer,
      );

    setRenewalAnswer(
      answer,
    );

    setPathResult(
      result,
    );

    savePathContext(
      record.i,
      answer,
    );

    setStage("result");
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
      skipCounty?: boolean;
    },
  ) {
    const first =
      firstName.trim();

    const last =
      lastName.trim();

    if (
      first.length < 2 ||
      last.length < 2
    ) {
      setError(
        "Enter both your first and last name.",
      );

      return;
    }

    const requestedType =
      options?.licenseType !==
      undefined
        ? options.licenseType
        : nameLicenseType;

    const requestedSkipType =
      options?.skipLicenseType !==
      undefined
        ? options.skipLicenseType
        : skipLicenseType;

    const requestedMiddle =
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

    setError("");
    setLoading(true);

    try {
      const body: {
        firstName: string;
        lastName: string;
        licenseType?:
          NameLicenseType;
        skipLicenseType?:
          boolean;
        middleName?:
          string;
        skipMiddle?:
          boolean;
        county?:
          string;
        skipCounty?:
          boolean;
        supportsCounty:
          true;
      } = {
        firstName: first,
        lastName: last,
        supportsCounty: true,
      };

      if (requestedType) {
        body.licenseType =
          requestedType;
      }

      if (
        requestedSkipType
      ) {
        body.skipLicenseType =
          true;
      }

      if (
        requestedMiddle.trim()
      ) {
        body.middleName =
          requestedMiddle.trim();
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

      if (
        options?.skipCounty
      ) {
        body.skipCounty =
          true;
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
        setError(
          data.error ||
            "Greyson could not complete the name search.",
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
          "middle",
        );

        return;
      }

      if (
        data.status ===
        "needs_county"
      ) {
        setCountyOptions(
          data.counties || [],
        );

        setNameStage(
          "county",
        );

        return;
      }

      if (
        data.status ===
        "too_many_matches"
      ) {
        setError(
          "Too many similar records remain. Use Florida DBPR's live search to identify the exact license.",
        );

        return;
      }

      if (
        data.status ===
        "no_matches"
      ) {
        setError(
          "Greyson did not find an exact match in the weekly file. Try the legal name on the license or verify it live with DBPR.",
        );

        return;
      }

      if (
        data.status ===
        "matches"
      ) {
        const matches =
          data.matches || [];

        if (
          matches.length === 1
        ) {
          await lookupLicense(
            matches[0].id,
            null,
          );

          return;
        }

        setNameMatches(
          matches,
        );

        setNameStage(
          "matches",
        );
      }
    } catch {
      setError(
        "Greyson could not complete the name search right now.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function submitName(
    event:
      FormEvent<HTMLFormElement>,
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

  async function chooseNameType(
    value:
      NameLicenseType | null,
  ) {
    setNameLicenseType(
      value,
    );

    const skip =
      value === null;

    setSkipLicenseType(
      skip,
    );

    await runNameSearch({
      licenseType: value,
      skipLicenseType:
        skip,
      middleName: "",
      skipMiddle: false,
      county: "",
    });
  }

  async function submitMiddle(
    event:
      FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!middleName.trim()) {
      setError(
        "Enter your middle name or initial, or choose I Don't Know.",
      );

      return;
    }

    setSkipMiddle(false);

    await runNameSearch({
      licenseType:
        nameLicenseType,
      skipLicenseType,
      middleName,
      skipMiddle: false,
      county: "",
    });
  }

  async function skipMiddleName() {
    setMiddleName("");
    setSkipMiddle(true);

    await runNameSearch({
      licenseType:
        nameLicenseType,
      skipLicenseType,
      middleName: "",
      skipMiddle: true,
      county: "",
    });
  }

  async function submitCounty(
    event:
      FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!county) {
      setError(
        "Choose your county, or select I Don't Know.",
      );

      return;
    }

    await runNameSearch({
      licenseType:
        nameLicenseType,
      skipLicenseType,
      middleName,
      skipMiddle,
      county,
    });
  }

  async function skipCounty() {
    setCounty("");

    await runNameSearch({
      licenseType:
        nameLicenseType,
      skipLicenseType,
      middleName,
      skipMiddle,
      county: "",
      skipCounty: true,
    });
  }

  function openNumber() {
    setError("");
    setStage("number");
  }

  function openName() {
    setError("");
    resetNameSearch();
    setStage("name");
  }

  function restart() {
    setRecord(null);
    setPathResult(null);
    setRenewalAnswer(null);
    setError("");
    setStage("doors");
  }

  return (
    <div className="path-finder">
      <style>
        {`
          .path-finder {
            width: 100%;
          }

          .path-shell {
            max-width: 760px;
            margin: 0 auto;
          }

          .path-intro {
            text-align: center;
            margin-bottom: 34px;
          }

          .path-intro h1,
          .path-intro h2 {
            margin-bottom: 14px;
          }

          .path-intro p {
            color: #5f5c56;
            max-width: 620px;
            margin-left: auto;
            margin-right: auto;
          }

          .path-doors {
            display: grid;
            gap: 14px;
          }

          .path-door {
            min-height: 86px;
            padding: 22px 24px;
            border: 1px solid rgba(17, 23, 23, 0.22);
            background: #faf7f1;
            color: #111717;
            font: inherit;
            font-size: 1.05rem;
            font-weight: 700;
            text-align: left;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            transition:
              transform 0.2s ease,
              background-color 0.2s ease,
              color 0.2s ease,
              box-shadow 0.2s ease;
          }

          .path-panel {
            border: 1px solid rgba(17, 23, 23, 0.18);
            background: #faf7f1;
            padding: clamp(26px, 5vw, 44px);
          }

          .path-label {
            display: block;
            margin-bottom: 8px;
            color: #7d5f3a;
            font-size: 0.72rem;
            font-weight: 800;
            letter-spacing: 0.12em;
            text-transform: uppercase;
          }

          .path-input {
            width: 100%;
            min-height: 58px;
            border: 1px solid rgba(17, 23, 23, 0.4);
            background: #fffdf9;
            color: #111717;
            padding: 0 16px;
            border-radius: 0;
            font: inherit;
            font-size: 1rem;
          }

          .path-grid {
            display: grid;
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
            gap: 14px;
          }

          .path-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 20px;
          }

          .path-primary,
          .path-secondary {
            min-height: 50px;
            padding: 0 20px;
            border: 1px solid #111717;
            font: inherit;
            font-size: 14px;
            font-weight: 700;
            cursor: pointer;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }

          .path-primary {
            background: #111717;
            color: #f5f0e7;
          }

          .path-secondary {
            background: transparent;
            color: #111717;
          }

          .path-text-button {
            border: 0;
            background: transparent;
            padding: 0;
            color: #5f5c56;
            font: inherit;
            font-size: 13px;
            cursor: pointer;
            text-decoration: underline;
            text-underline-offset: 4px;
          }

          .path-question-buttons {
            display: grid;
            gap: 10px;
            margin-top: 24px;
          }

          .path-question-buttons button {
            min-height: 54px;
          }

          .path-error {
            margin: 18px 0 0;
            padding: 14px 16px;
            border-left: 3px solid #8a2d25;
            background: rgba(138, 45, 37, 0.06);
            color: #6f261f;
            line-height: 1.6;
          }

          .path-result {
            border: 1px solid rgba(17, 23, 23, 0.18);
            background: #faf7f1;
            overflow: hidden;
          }

          .path-result-main {
            padding: clamp(30px, 6vw, 58px);
          }

          .path-result--urgent {
            border-color: rgba(138, 45, 37, 0.42);
          }

          .path-result--urgent .path-result-main {
            background: #f7ece8;
          }

          .path-result-name {
            margin: 0;
            font-family: var(--font-serif), Georgia, serif;
            font-size: clamp(1.5rem, 4vw, 2.2rem);
          }

          .path-result-license {
            margin: 6px 0 28px;
            color: #6e6b65;
            font-size: 0.9rem;
          }

          .path-date-label {
            margin: 0 0 8px;
            color: #7d5f3a;
            font-size: 0.68rem;
            font-weight: 800;
            letter-spacing: 0.14em;
            text-transform: uppercase;
          }

          .path-date {
            margin: 0;
            font-family: var(--font-serif), Georgia, serif;
            font-size: clamp(3rem, 9vw, 6rem);
            line-height: 0.98;
            overflow-wrap: anywhere;
          }

          .path-days {
            margin: 12px 0 0;
            color: #6e6b65;
            font-size: 0.86rem;
          }

          .path-status {
            margin: 32px 0 0;
            padding-top: 24px;
            border-top: 1px solid rgba(17, 23, 23, 0.14);
            font-size: clamp(1.05rem, 2.3vw, 1.25rem);
            line-height: 1.6;
          }

          .path-answer {
            padding: clamp(28px, 5vw, 46px);
            background: #1f2d30;
            color: #f5f0e7;
          }

          .path-answer .eyebrow {
            color: #d6bd9c;
          }

          .path-answer h2 {
            color: #f5f0e7;
            font-size: clamp(2rem, 5vw, 3.5rem);
            margin-bottom: 16px;
          }

          .path-reason {
            color: rgba(245, 240, 231, 0.8);
            max-width: 650px;
            line-height: 1.7;
          }

          .path-answer .path-primary {
            margin-top: 12px;
            background: #f5f0e7;
            color: #111717;
            border-color: #f5f0e7;
          }

          .path-result-footer {
            padding: 18px clamp(24px, 5vw, 46px);
            border-top: 1px solid rgba(17, 23, 23, 0.12);
            display: flex;
            flex-wrap: wrap;
            gap: 10px 18px;
            align-items: center;
            color: #6e6b65;
            font-size: 0.78rem;
            line-height: 1.5;
          }

          .path-result-footer a {
            color: #111717;
            text-decoration: underline;
            text-underline-offset: 3px;
          }

          .path-match-list {
            display: grid;
            gap: 10px;
            margin-top: 20px;
          }

          .path-match {
            width: 100%;
            padding: 18px;
            border: 1px solid rgba(17, 23, 23, 0.18);
            background: #fffdf9;
            text-align: left;
            font: inherit;
            cursor: pointer;
          }

          .path-match strong {
            display: block;
            margin-bottom: 5px;
          }

          .path-match span {
            color: #6e6b65;
            font-size: 0.84rem;
          }

          @media (hover: hover) and (pointer: fine) {
            .path-door:hover,
            .path-secondary:hover,
            .path-match:hover {
              background: #111717;
              color: #f5f0e7;
              transform: translateY(-2px);
              box-shadow: 0 12px 28px rgba(17, 23, 23, 0.1);
            }

            .path-match:hover span {
              color: rgba(245, 240, 231, 0.75);
            }
          }

          @media (max-width: 650px) {
            .path-grid {
              grid-template-columns: 1fr;
            }

            .path-primary,
            .path-secondary {
              width: 100%;
            }

            .path-result-footer {
              display: grid;
            }
          }
        `}
      </style>

      <div className="path-shell">
        {stage ===
          "doors" && (
          <>
            <div className="path-intro">
              <p className="eyebrow">
                FIND MY EXACT PATH
              </p>

              <h1>
                Let&apos;s find your next step.
              </h1>

              <p>
                Start with the one thing you know.
                Greyson will ask only what it needs
                to point you toward the likely
                Florida education requirement.
              </p>
            </div>

            <div className="path-doors">
              <button
                type="button"
                className="path-door"
                onClick={
                  openNumber
                }
              >
                <span>
                  I know my license number
                </span>
                <span aria-hidden="true">
                  →
                </span>
              </button>

              <button
                type="button"
                className="path-door"
                onClick={
                  openName
                }
              >
                <span>
                  I don&apos;t know my number
                </span>
                <span aria-hidden="true">
                  →
                </span>
              </button>
            </div>
          </>
        )}

        {stage ===
          "number" && (
          <div className="path-panel">
            <p className="eyebrow">
              FIND MY EXACT PATH
            </p>

            <h2>
              Enter your Florida license number.
            </h2>

            <form
              onSubmit={
                submitNumber
              }
            >
              <label
                className="path-label"
                htmlFor="path-license-number"
              >
                Florida license number
              </label>

              <input
                id="path-license-number"
                className="path-input"
                type="text"
                value={
                  licenseNumber
                }
                onChange={(event) => {
                  setLicenseNumber(
                    event.target.value,
                  );

                  setError("");
                }}
                placeholder="Example: SL1234567"
                autoCapitalize="characters"
                autoComplete="off"
                spellCheck={false}
              />

              <div className="path-actions">
                <button
                  className="path-primary"
                  type="submit"
                  disabled={
                    loading
                  }
                >
                  {loading
                    ? "Checking..."
                    : "Continue →"}
                </button>

                <button
                  type="button"
                  className="path-text-button"
                  onClick={() =>
                    setStage(
                      "doors",
                    )
                  }
                >
                  Back
                </button>
              </div>
            </form>

            {error && (
              <p
                className="path-error"
                role="alert"
              >
                {error}
              </p>
            )}
          </div>
        )}

        {stage ===
          "name" && (
          <div className="path-panel">
            <p className="eyebrow">
              FIND MY LICENSE
            </p>

            {nameStage ===
              "name" && (
              <>
                <h2>
                  Start with your legal name.
                </h2>

                <form
                  onSubmit={
                    submitName
                  }
                >
                  <div className="path-grid">
                    <label>
                      <span className="path-label">
                        First name
                      </span>

                      <input
                        className="path-input"
                        value={
                          firstName
                        }
                        onChange={(event) => {
                          setFirstName(
                            event.target.value,
                          );

                          setError("");
                        }}
                        autoComplete="given-name"
                      />
                    </label>

                    <label>
                      <span className="path-label">
                        Last name
                      </span>

                      <input
                        className="path-input"
                        value={
                          lastName
                        }
                        onChange={(event) => {
                          setLastName(
                            event.target.value,
                          );

                          setError("");
                        }}
                        autoComplete="family-name"
                      />
                    </label>
                  </div>

                  <div className="path-actions">
                    <button
                      className="path-primary"
                      type="submit"
                      disabled={
                        loading
                      }
                    >
                      {loading
                        ? "Searching..."
                        : "Find My License →"}
                    </button>

                    <button
                      type="button"
                      className="path-text-button"
                      onClick={() =>
                        setStage(
                          "doors",
                        )
                      }
                    >
                      Back
                    </button>
                  </div>
                </form>
              </>
            )}

            {nameStage ===
              "license-type" && (
              <>
                <h2>
                  Which license type is yours?
                </h2>

                <div className="path-question-buttons">
                  <button
                    className="path-secondary"
                    type="button"
                    onClick={() =>
                      void chooseNameType(
                        "sales-associate",
                      )
                    }
                  >
                    Sales Associate
                  </button>

                  <button
                    className="path-secondary"
                    type="button"
                    onClick={() =>
                      void chooseNameType(
                        "broker",
                      )
                    }
                  >
                    Broker / Broker Associate
                  </button>

                  <button
                    className="path-secondary"
                    type="button"
                    onClick={() =>
                      void chooseNameType(
                        "instructor",
                      )
                    }
                  >
                    Real Estate Instructor
                  </button>

                  <button
                    className="path-text-button"
                    type="button"
                    onClick={() =>
                      void chooseNameType(
                        null,
                      )
                    }
                  >
                    I&apos;m not sure
                  </button>
                </div>
              </>
            )}

            {nameStage ===
              "middle" && (
              <>
                <h2>
                  What is your middle name or initial?
                </h2>

                <form
                  onSubmit={
                    submitMiddle
                  }
                >
                  <label>
                    <span className="path-label">
                      Middle name or initial
                    </span>

                    <input
                      className="path-input"
                      value={
                        middleName
                      }
                      onChange={(event) => {
                        setMiddleName(
                          event.target.value,
                        );

                        setError("");
                      }}
                      autoComplete="additional-name"
                    />
                  </label>

                  <div className="path-actions">
                    <button
                      className="path-primary"
                      type="submit"
                      disabled={
                        loading
                      }
                    >
                      Continue →
                    </button>

                    <button
                      type="button"
                      className="path-text-button"
                      onClick={() =>
                        void skipMiddleName()
                      }
                    >
                      I don&apos;t know
                    </button>
                  </div>
                </form>
              </>
            )}

            {nameStage ===
              "county" && (
              <>
                <h2>
                  Which county is on your record?
                </h2>

                <form
                  onSubmit={
                    submitCounty
                  }
                >
                  <label>
                    <span className="path-label">
                      County
                    </span>

                    <select
                      className="path-input"
                      value={
                        county
                      }
                      onChange={(event) => {
                        setCounty(
                          event.target.value,
                        );

                        setError("");
                      }}
                    >
                      <option value="">
                        Select county
                      </option>

                      {countyOptions.map(
                        (option) => (
                          <option
                            value={
                              option
                            }
                            key={
                              option
                            }
                          >
                            {formatCounty(
                              option,
                            )}
                          </option>
                        ),
                      )}
                    </select>
                  </label>

                  <div className="path-actions">
                    <button
                      className="path-primary"
                      type="submit"
                      disabled={
                        loading
                      }
                    >
                      Continue →
                    </button>

                    <button
                      type="button"
                      className="path-text-button"
                      onClick={() =>
                        void skipCounty()
                      }
                    >
                      I don&apos;t know
                    </button>
                  </div>
                </form>
              </>
            )}

            {nameStage ===
              "matches" && (
              <>
                <h2>
                  Which record is yours?
                </h2>

                <div className="path-match-list">
                  {nameMatches.map(
                    (match) => (
                      <button
                        type="button"
                        className="path-match"
                        key={
                          match.id
                        }
                        onClick={() =>
                          void lookupLicense(
                            match.id,
                            null,
                          )
                        }
                      >
                        <strong>
                          {formatLicensedName(
                            match.name,
                          )}
                        </strong>

                        <span>
                          {match.licenseType}
                          {match.county
                            ? ` · ${formatCounty(
                                match.county,
                              )}`
                            : ""}
                        </span>
                      </button>
                    ),
                  )}
                </div>
              </>
            )}

            {error && (
              <p
                className="path-error"
                role="alert"
              >
                {error}
              </p>
            )}

            {error && (
              <p
                style={{
                  marginBottom: 0,
                }}
              >
                <a
                  href={
                    dbprGeneralSearch
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Search Florida DBPR ↗
                </a>
              </p>
            )}
          </div>
        )}

        {stage ===
          "renewal" &&
          record && (
          <div className="path-panel">
            <p className="eyebrow">
              ONE QUESTION
            </p>

            <h2>
              Is this the first renewal for this license?
            </h2>

            <p
              style={{
                color: "#5f5c56",
              }}
            >
              {formatLicensedName(
                record.n,
              )} · {record.i}
            </p>

            <div className="path-question-buttons">
              <button
                type="button"
                className="path-primary"
                onClick={() =>
                  answerRenewal(
                    "first",
                  )
                }
              >
                Yes — first renewal
              </button>

              <button
                type="button"
                className="path-secondary"
                onClick={() =>
                  answerRenewal(
                    "later",
                  )
                }
              >
                No — I&apos;ve renewed before
              </button>

              <button
                type="button"
                className="path-text-button"
                onClick={() =>
                  answerRenewal(
                    "unsure",
                  )
                }
              >
                I&apos;m not sure
              </button>
            </div>
          </div>
        )}

        {stage ===
          "result" &&
          record &&
          pathResult && (
          <div
            className={
              pathResult.urgent
                ? "path-result path-result--urgent"
                : "path-result"
            }
          >
            <div className="path-result-main">
              <p className="path-result-name">
                {formatLicensedName(
                  record.n,
                )}
              </p>

              <p className="path-result-license">
                {record.i} · {record.r}
              </p>

              <p className="path-date-label">
                {pathResult.deadlineLabel}
              </p>

              <p className="path-date">
                {formatPlainDate(
                  pathResult.deadlineDate,
                )}
              </p>

              {daysCopy(
                pathResult,
              ) && (
                <p className="path-days">
                  {daysCopy(
                    pathResult,
                  )}
                </p>
              )}

              <p className="path-status">
                {pathResult.statusText}
              </p>
            </div>

            <div className="path-answer">
              <p className="eyebrow">
                {pathResult.eyebrow}
              </p>

              <h2>
                {pathResult.title}
              </h2>

              <p className="path-reason">
                <strong>
                  Why:
                </strong>{" "}
                {pathResult.reason}
              </p>

              {pathResult.href.startsWith(
                "http",
              ) ? (
                <a
                  className="path-primary"
                  href={
                    pathResult.href
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {pathResult.buttonText}
                </a>
              ) : (
                <Link
                  className="path-primary"
                  href={
                    pathResult.href
                  }
                >
                  {pathResult.buttonText}
                </Link>
              )}
            </div>

            <div className="path-result-footer">
              <span>
                DBPR weekly data as of{" "}
                {formatSourceDate(
                  meta,
                  record,
                )}.
              </span>

              <a
                href={
                  dbprGeneralSearch
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                Verify live on DBPR ↗
              </a>

              <button
                type="button"
                className="path-text-button"
                onClick={() =>
                  void lookupLicense(
                    record.i,
                    renewalAnswer,
                    true,
                  )
                }
              >
                Check again
              </button>

              <button
                type="button"
                className="path-text-button"
                onClick={
                  clearSavedPath
                }
              >
                Not you?
              </button>

              <span>
                Greyson Institute is not DBPR.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
