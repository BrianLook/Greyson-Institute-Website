"use client";

import {
  useState,
  type FormEvent,
  type MouseEvent,
} from "react";
import Link from "next/link";

const DATA_BASE =
  "/data/florida-real-estate-licenses";

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

function normalizeLicenseNumber(value: string) {
  return value
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");
}

function numericPart(value: string) {
  return value.replace(/\D/g, "");
}

function formatDbprDate(value: string) {
  if (!value) {
    return "Not listed";
  }

  const slashDate = value.match(
    /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/,
  );

  if (slashDate) {
    const [, month, day, year] = slashDate;

    const date = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
    );

    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  }

  const compactDate = value.match(
    /^(\d{4})(\d{2})(\d{2})$/,
  );

  if (compactDate) {
    const [, year, month, day] = compactDate;

    const date = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
    );

    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  }

  return value;
}

function formatSourceDate(meta: LicenseMeta | null) {
  const sourceDate =
    meta?.sourceLastModified || meta?.fetchedAt;

  if (!sourceDate) {
    return "the latest available weekly DBPR file";
  }

  const date = new Date(sourceDate);

  if (Number.isNaN(date.getTime())) {
    return "the latest available weekly DBPR file";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function combinedStatus(record: LicenseRecord) {
  const parts = [record.p, record.s].filter(Boolean);

  return parts.length > 0
    ? parts.join(" / ")
    : "Not listed";
}

function isSalesAssociate(record: LicenseRecord) {
  return record.r
    .toLowerCase()
    .includes("sales associate");
}

function isBroker(record: LicenseRecord) {
  return record.r.toLowerCase().includes("broker");
}

function isActive(record: LicenseRecord) {
  return `${record.p} ${record.s}`
    .toLowerCase()
    .includes("active");
}

function isInvoluntarilyInactive(
  record: LicenseRecord,
) {
  const status = `${record.p} ${record.s}`.toLowerCase();

  return (
    status.includes("involuntary") ||
    status.includes("involuntarily")
  );
}

export function FloridaLicenseExpirationCheck() {
  const [licenseNumber, setLicenseNumber] =
    useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] =
    useState<LicenseRecord | null>(null);
  const [meta, setMeta] =
    useState<LicenseMeta | null>(null);
  const [isSearching, setIsSearching] =
    useState(false);
  const [hasSearched, setHasSearched] =
    useState(false);
  const [renewalChoice, setRenewalChoice] =
    useState<RenewalChoice>(null);

  const cleanedLicenseNumber =
    normalizeLicenseNumber(licenseNumber);

  async function handleLookup(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setMessage("");
    setResult(null);
    setRenewalChoice(null);
    setHasSearched(false);

    const digits = numericPart(
      cleanedLicenseNumber,
    );

    if (!cleanedLicenseNumber || digits.length < 3) {
      setError(
        "Enter your Florida real estate license number first.",
      );
      return;
    }

    setIsSearching(true);

    try {
      const metaResponse = await fetch(
        `${DATA_BASE}/meta.json`,
        {
          cache: "no-store",
        },
      );

      if (!metaResponse.ok) {
        throw new Error(
          "Greyson could not load the Florida license index.",
        );
      }

      const metaData =
        (await metaResponse.json()) as LicenseMeta;

      setMeta(metaData);

      if (!metaData.available) {
        setError(
          "The Greyson license index is temporarily unavailable. Please verify your license directly with Florida DBPR.",
        );

        setHasSearched(true);
        return;
      }

      const bucketKey = digits
        .slice(-3)
        .padStart(3, "0");

      const bucketResponse = await fetch(
        `${DATA_BASE}/${bucketKey}.json`,
        {
          cache: "no-store",
        },
      );

      if (!bucketResponse.ok) {
        setError(
          "We could not find that license in the current weekly file. Please verify it with Florida DBPR.",
        );

        setHasSearched(true);
        return;
      }

      const records =
        (await bucketResponse.json()) as LicenseRecord[];

      const exactMatch = records.find(
        (record) =>
          normalizeLicenseNumber(record.i) ===
          cleanedLicenseNumber,
      );

      if (exactMatch) {
        setResult(exactMatch);
        setHasSearched(true);
        return;
      }

      const numericMatches = records.filter(
        (record) =>
          numericPart(record.i) === digits,
      );

      if (numericMatches.length === 1) {
        setResult(numericMatches[0]);
        setHasSearched(true);
        return;
      }

      if (numericMatches.length > 1) {
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

  async function handleDbprClick(
    event: MouseEvent<HTMLAnchorElement>,
  ) {
    if (!cleanedLicenseNumber) {
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
            box-shadow: 0 0 0 3px rgba(125, 95, 58, 0.16);
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
            .fl-license-primary:hover {
              background: #1f2d30;
              transform: translateY(-3px);
              box-shadow: 0 12px 28px rgba(17, 23, 23, 0.14);
            }

            .fl-license-secondary:hover,
            .fl-license-renewal-button:hover {
              background: #111717;
              color: #f5f0e7;
              transform: translateY(-2px);
            }
          }

          @media (max-width: 650px) {
            .fl-license-result-grid {
              grid-template-columns: 1fr;
            }

            .fl-license-actions,
            .fl-license-renewal-buttons {
              display: grid;
              grid-template-columns: 1fr;
            }

            .fl-license-primary,
            .fl-license-secondary,
            .fl-license-search-button,
            .fl-license-renewal-button {
              width: 100%;
            }
          }
        `}
      </style>

      <p className="eyebrow">
        FLORIDA LICENSE CHECK
      </p>

      <h2
        style={{
          fontSize: "clamp(2rem, 4vw, 3rem)",
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
        number to check Greyson Institute&apos;s
        convenience copy of Florida DBPR&apos;s
        weekly public records. Always verify the
        live DBPR record before renewing or
        practicing.
      </p>

      <form onSubmit={handleLookup}>
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
                event.target.value,
              );
              setError("");
              setMessage("");
              setResult(null);
              setRenewalChoice(null);
              setHasSearched(false);
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
            Enter the full license number when
            possible, including the letters at the
            beginning, such as SL or BK.
          </p>
        </div>

        <button
          className="fl-license-search-button"
          type="submit"
          disabled={isSearching}
        >
          {isSearching
            ? "Checking License..."
            : "Check License Expiration"}
        </button>
      </form>

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
              style={{ marginBottom: "10px" }}
            >
              FLORIDA DBPR WEEKLY RECORD
            </p>

            <h3 className="fl-license-result-name">
              {result.n}
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
                {result.r || "Not listed"}
              </p>
            </div>

            <div className="fl-license-result-item">
              <p className="fl-license-result-label">
                Status
              </p>

              <p className="fl-license-result-value">
                {combinedStatus(result)}
              </p>
            </div>

            <div className="fl-license-result-item">
              <p className="fl-license-result-label">
                Expiration Date
              </p>

              <p className="fl-license-result-value fl-license-expiration">
                {formatDbprDate(result.x)}
              </p>
            </div>

            <div className="fl-license-result-item">
              <p className="fl-license-result-label">
                Original License Date
              </p>

              <p className="fl-license-result-value">
                {formatDbprDate(result.o)}
              </p>
            </div>
          </div>

          <div className="fl-license-data-note">
            DBPR public-record data as of{" "}
            <strong>
              {formatSourceDate(meta)}
            </strong>
            . This weekly file is a convenience
            reference and may lag recent changes.
          </div>

          {isInvoluntarilyInactive(result) ? (
            <div className="fl-license-renewal-question">
              <p className="eyebrow">
                IMPORTANT STATUS
              </p>

              <h3
                style={{
                  fontSize: "1.65rem",
                  marginBottom: "10px",
                }}
              >
                Your record appears to show an
                involuntarily inactive status.
              </h3>

              <p
                style={{
                  color: "#4d4b46",
                  maxWidth: "760px",
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
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
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
                  fontSize: "1.65rem",
                  marginBottom: "10px",
                }}
              >
                Is this your first renewal?
              </h3>

              <p
                style={{
                  color: "#4d4b46",
                  maxWidth: "740px",
                  marginBottom: 0,
                }}
              >
                Your expiration date alone does not
                determine which education you need.
              </p>

              <div className="fl-license-renewal-buttons">
                <button
                  type="button"
                  className="fl-license-renewal-button"
                  aria-pressed={
                    renewalChoice === "first"
                  }
                  onClick={() =>
                    setRenewalChoice("first")
                  }
                >
                  Yes — first renewal
                </button>

                <button
                  type="button"
                  className="fl-license-renewal-button"
                  aria-pressed={
                    renewalChoice === "later"
                  }
                  onClick={() =>
                    setRenewalChoice("later")
                  }
                >
                  No — I&apos;ve renewed before
                </button>

                <button
                  type="button"
                  className="fl-license-renewal-button"
                  aria-pressed={
                    renewalChoice === "unsure"
                  }
                  onClick={() =>
                    setRenewalChoice("unsure")
                  }
                >
                  I&apos;m not sure
                </button>
              </div>

              {renewalChoice === "first" &&
                isSalesAssociate(result) && (
                  <div className="fl-license-guidance">
                    <p>
                      <strong>
                        Based on this record and your
                        answer, you most likely need
                        Florida&apos;s 45-hour
                        sales-associate post-license
                        education before the initial
                        license expires.
                      </strong>
                    </p>

                    <p>
                      <Link
                        href="/florida-45-hour-post-license-requirements"
                        style={{
                          fontWeight: 600,
                          textDecoration: "underline",
                          textUnderlineOffset: "4px",
                        }}
                      >
                        Understand the 45-Hour
                        Requirement →
                      </Link>
                    </p>
                  </div>
                )}

              {renewalChoice === "first" &&
                isBroker(result) && (
                  <div className="fl-license-guidance">
                    <p>
                      <strong>
                        Based on this record and your
                        answer, you most likely need
                        Florida broker post-license
                        education for your first
                        renewal.
                      </strong>
                    </p>

                    <p>
                      <Link
                        href="/courses#broker"
                        style={{
                          fontWeight: 600,
                          textDecoration: "underline",
                          textUnderlineOffset: "4px",
                        }}
                      >
                        Explore the Broker Education
                        Path →
                      </Link>
                    </p>
                  </div>
                )}

              {renewalChoice === "later" &&
                isActive(result) && (
                  <div className="fl-license-guidance">
                    <p>
                      <strong>
                        Based on this record and your
                        answer, you most likely fall
                        under Florida&apos;s regular
                        continuing-education renewal
                        cycle.
                      </strong>
                    </p>

                    <p>
                      <Link
                        href="/florida-14-hour-real-estate-continuing-education"
                        style={{
                          fontWeight: 600,
                          textDecoration: "underline",
                          textUnderlineOffset: "4px",
                        }}
                      >
                        Understand the 14-Hour CE
                        Requirement →
                      </Link>
                    </p>
                  </div>
                )}

              {renewalChoice === "later" &&
                !isActive(result) && (
                  <div className="fl-license-guidance">
                    <p>
                      <strong>
                        Your record does not appear to
                        show an active status.
                      </strong>
                    </p>

                    <p>
                      Inactive-license requirements
                      can differ from the standard
                      active-license renewal path.
                      Verify your status with DBPR
                      before purchasing education.
                    </p>

                    <p>
                      <Link
                        href="/courses#reactivation"
                        style={{
                          fontWeight: 600,
                          textDecoration: "underline",
                          textUnderlineOffset: "4px",
                        }}
                      >
                        Explore Reactivation Education
                        →
                      </Link>
                    </p>
                  </div>
                )}

              {renewalChoice === "unsure" && (
                <div className="fl-license-guidance">
                  <p>
                    <strong>
                      Don&apos;t guess.
                    </strong>
                  </p>

                  <p>
                    Whether this is your first renewal
                    can change the education
                    requirement. Confirm your renewal
                    history with DBPR or contact
                    Greyson Institute before
                    enrolling.
                  </p>

                  <p>
                    <Link
                      href="/contact"
                      style={{
                        fontWeight: 600,
                        textDecoration: "underline",
                        textUnderlineOffset: "4px",
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
            href={dbprLicenseNumberSearch}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleDbprClick}
          >
            Verify Live on Florida DBPR ↗
          </a>

          <a
            className="fl-license-secondary"
            href={dbprGeneralSearch}
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
        <strong>Important:</strong> Greyson Institute
        is not the Florida Department of Business and
        Professional Regulation. This lookup is a
        convenience check using DBPR&apos;s weekly
        public-record download. DBPR&apos;s live
        license search remains the official source for
        current status and expiration information.
        Null-and-void records are not included in the
        weekly downloadable file.
      </p>
    </div>
  );
}
