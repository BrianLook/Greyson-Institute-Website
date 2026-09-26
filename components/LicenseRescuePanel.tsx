"use client";

import { useState } from "react";

type LicenseRescuePanelProps = {
  licenseNumber: string;
  licenseType: string;
  primaryStatus: string;
  secondaryStatus: string;
  statusEffectiveDate: string;
  expirationDate: string;
};

type DurationBucket =
  | "under-12"
  | "12-24"
  | "24-plus"
  | "unknown";

const DAY_MS =
  24 * 60 * 60 * 1000;

const MONTHS: Record<string, number> = {
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

function isValidDate(
  year: number,
  month: number,
  day: number,
) {
  const date =
    new Date(
      year,
      month,
      day,
    );

  return (
    date.getFullYear() === year &&
    date.getMonth() === month &&
    date.getDate() === day
  );
}

function parseDbprDate(
  value: string,
): Date | null {
  const trimmed =
    value.trim();

  if (!trimmed) {
    return null;
  }

  const slashDate =
    trimmed.match(
      /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/,
    );

  if (slashDate) {
    const month =
      Number(
        slashDate[1],
      ) - 1;

    const day =
      Number(
        slashDate[2],
      );

    const year =
      Number(
        slashDate[3],
      );

    if (
      isValidDate(
        year,
        month,
        day,
      )
    ) {
      return new Date(
        year,
        month,
        day,
      );
    }
  }

  const compactDate =
    trimmed.match(
      /^(\d{4})(\d{2})(\d{2})$/,
    );

  if (compactDate) {
    const year =
      Number(
        compactDate[1],
      );

    const month =
      Number(
        compactDate[2],
      ) - 1;

    const day =
      Number(
        compactDate[3],
      );

    if (
      isValidDate(
        year,
        month,
        day,
      )
    ) {
      return new Date(
        year,
        month,
        day,
      );
    }
  }

  const shortDate =
    trimmed.match(
      /^(\d{1,2})-([A-Za-z]{3})-(\d{2}|\d{4})$/,
    );

  if (shortDate) {
    const day =
      Number(
        shortDate[1],
      );

    const month =
      MONTHS[
        shortDate[2]
          .toUpperCase()
      ];

    const rawYear =
      shortDate[3];

    const numericYear =
      Number(
        rawYear,
      );

    const year =
      rawYear.length === 2
        ? numericYear <= 69
          ? 2000 +
            numericYear
          : 1900 +
            numericYear
        : numericYear;

    if (
      month !== undefined &&
      isValidDate(
        year,
        month,
        day,
      )
    ) {
      return new Date(
        year,
        month,
        day,
      );
    }
  }

  return null;
}

function formatDate(
  value: string,
) {
  const parsed =
    parseDbprDate(
      value,
    );

  if (!parsed) {
    return value ||
      "Not listed";
  }

  return new Intl.DateTimeFormat(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    },
  ).format(
    parsed,
  );
}

function startOfToday() {
  const now =
    new Date();

  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );
}

function addYears(
  date: Date,
  years: number,
) {
  return new Date(
    date.getFullYear() +
      years,
    date.getMonth(),
    date.getDate(),
  );
}

function getDurationBucket(
  statusEffectiveDate: string,
): DurationBucket {
  const effective =
    parseDbprDate(
      statusEffectiveDate,
    );

  if (!effective) {
    return "unknown";
  }

  const today =
    startOfToday();

  const oneYear =
    addYears(
      effective,
      1,
    );

  const twoYears =
    addYears(
      effective,
      2,
    );

  if (
    today <= oneYear
  ) {
    return "under-12";
  }

  if (
    today < twoYears
  ) {
    return "12-24";
  }

  return "24-plus";
}

function getDaysUntil(
  expirationDate: string,
) {
  const expiration =
    parseDbprDate(
      expirationDate,
    );

  if (!expiration) {
    return null;
  }

  const today =
    startOfToday();

  const todayUtc =
    Date.UTC(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );

  const expirationUtc =
    Date.UTC(
      expiration.getFullYear(),
      expiration.getMonth(),
      expiration.getDate(),
    );

  return Math.round(
    (
      expirationUtc -
      todayUtc
    ) / DAY_MS,
  );
}

function statusText(
  primaryStatus: string,
  secondaryStatus: string,
) {
  return [
    primaryStatus,
    secondaryStatus,
  ]
    .filter(Boolean)
    .join(" / ");
}

export function LicenseRescuePanel({
  licenseNumber,
  licenseType,
  primaryStatus,
  secondaryStatus,
  statusEffectiveDate,
  expirationDate,
}: LicenseRescuePanelProps) {
  const [
    manualDuration,
    setManualDuration,
  ] =
    useState<DurationBucket | null>(
      null,
    );

  const [
    showChecklist,
    setShowChecklist,
  ] = useState(false);

  const combinedStatus =
    `${primaryStatus} ${secondaryStatus}`
      .trim()
      .toLowerCase();

  const isInvoluntary =
    combinedStatus.includes(
      "involuntary",
    ) ||
    combinedStatus.includes(
      "involuntarily",
    );

  if (!isInvoluntary) {
    return null;
  }

  const automaticDuration =
    getDurationBucket(
      statusEffectiveDate,
    );

  const duration =
    manualDuration ||
    automaticDuration;

  const daysUntilDeadline =
    getDaysUntil(
      expirationDate,
    );

  const deadlinePassed =
    daysUntilDeadline !==
      null &&
    daysUntilDeadline < 0;

  const deadlineToday =
    daysUntilDeadline === 0;

  const urgent =
    daysUntilDeadline !==
      null &&
    daysUntilDeadline >= 0 &&
    daysUntilDeadline <= 30;

  const needsBrokerRegistration =
    licenseType
      .toLowerCase()
      .includes(
        "sales associate",
      ) ||
    licenseType
      .toLowerCase()
      .includes(
        "broker associate",
      );

  let educationTitle =
    "";

  let educationCopy =
    "";

  if (
    deadlinePassed ||
    duration ===
      "24-plus"
  ) {
    educationTitle =
      "Do not choose a reactivation course from this weekly record alone.";

    educationCopy =
      "The deadline shown on this record has passed, or the status may be at or beyond the two-year involuntary-inactivity limit. Verify the live DBPR record before purchasing education.";
  } else if (
    duration ===
      "under-12"
  ) {
    educationTitle =
      "Possible education path: at least 14 hours of prescribed continuing education.";

    educationCopy =
      "Florida law provides a 14-hour reactivation path for a license that has been involuntarily inactive for 12 months or less. Confirm the exact current requirement on your live DBPR record before enrolling.";
  } else if (
    duration ===
      "12-24"
  ) {
    educationTitle =
      "Likely education path: 28-hour reactivation education.";

    educationCopy =
      "Florida law provides a 28-hour reactivation requirement when a license has been involuntarily inactive for more than 12 months but fewer than 24 months. Complete all DBPR renewal requirements by the deadline shown on the official record.";
  }

  return (
    <section
      className={
        urgent
          ? "license-rescue license-rescue--urgent"
          : "license-rescue"
      }
    >
      <style>
        {`
          .license-rescue {
            margin: 4px 28px 26px;
            padding: clamp(24px, 4vw, 32px);
            border: 1px solid rgba(125, 95, 58, 0.34);
            border-left: 4px solid #7d5f3a;
            background: #f3ecdf;
            color: #111717;
          }

          .license-rescue--urgent {
            border-color: rgba(138, 45, 37, 0.34);
            border-left-color: #8a2d25;
            background: #f7ece8;
          }

          .license-rescue-title {
            max-width: 760px;
            margin: 0;
            color: #111717;
            font-family: var(--font-serif), Georgia, serif;
            font-size: clamp(1.7rem, 3vw, 2.35rem);
            line-height: 1.12;
          }

          .license-rescue-status {
            margin: 12px 0 0;
            color: #4d4b46;
            line-height: 1.6;
          }

          .license-rescue-deadline {
            display: inline-flex;
            margin: 16px 0 0;
            padding: 7px 11px;
            border: 1px solid rgba(125, 95, 58, 0.34);
            background: rgba(255, 255, 255, 0.48);
            color: #6f5333;
            font-size: 0.8rem;
            font-weight: 750;
          }

          .license-rescue--urgent
            .license-rescue-deadline {
            border-color: rgba(138, 45, 37, 0.3);
            color: #7a2c25;
          }

          .license-rescue-grid {
            display: grid;
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
            gap: 14px;
            margin-top: 24px;
          }

          .license-rescue-card {
            padding: 20px;
            border: 1px solid rgba(17, 23, 23, 0.13);
            background: rgba(255, 255, 255, 0.5);
          }

          .license-rescue-card-label {
            margin: 0 0 7px;
            color: #7d5f3a;
            font-size: 0.67rem;
            font-weight: 750;
            letter-spacing: 0.13em;
            text-transform: uppercase;
          }

          .license-rescue-card-value {
            margin: 0;
            color: #111717;
            font-weight: 700;
            line-height: 1.5;
          }

          .license-rescue-card-copy {
            margin: 8px 0 0;
            color: #5f5c56;
            font-size: 0.85rem;
            line-height: 1.6;
          }

          .license-rescue-question {
            margin-top: 24px;
            padding: 20px;
            border: 1px solid rgba(17, 23, 23, 0.14);
            background: rgba(255, 255, 255, 0.5);
          }

          .license-rescue-question h4 {
            margin: 0 0 8px;
            font-family: var(--font-serif), Georgia, serif;
            font-size: 1.35rem;
          }

          .license-rescue-question p {
            margin: 0;
            color: #5f5c56;
            line-height: 1.6;
          }

          .license-rescue-choice-row {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 16px;
          }

          .license-rescue-button,
          .license-rescue-action {
            min-height: 46px;
            padding: 0 17px;
            border: 1px solid #111717;
            background: #faf7f1;
            color: #111717;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font: inherit;
            font-size: 13px;
            font-weight: 700;
            text-decoration: none;
            cursor: pointer;
            transition:
              background-color 0.2s ease,
              color 0.2s ease,
              transform 0.2s ease,
              box-shadow 0.2s ease;
          }

          .license-rescue-button[aria-pressed="true"] {
            border-color: #7d5f3a;
            background: #eee6d9;
          }

          .license-rescue-education {
            margin-top: 24px;
            padding: 22px;
            border-left: 3px solid #7d5f3a;
            background: rgba(255, 255, 255, 0.58);
          }

          .license-rescue-education h4 {
            margin: 0;
            font-size: 1rem;
            line-height: 1.55;
          }

          .license-rescue-education p {
            margin: 9px 0 0;
            color: #4d4b46;
            line-height: 1.65;
          }

          .license-rescue-first-renewal-note {
            margin-top: 16px;
            padding: 14px 16px;
            border: 1px solid rgba(17, 23, 23, 0.13);
            background: rgba(255, 255, 255, 0.45);
            color: #4d4b46;
            font-size: 0.84rem;
            line-height: 1.6;
          }

          .license-rescue-costs {
            margin-top: 24px;
            display: grid;
            gap: 1px;
            background: rgba(17, 23, 23, 0.12);
            border: 1px solid rgba(17, 23, 23, 0.12);
          }

          .license-rescue-cost-row {
            display: grid;
            grid-template-columns:
              minmax(0, 1fr)
              minmax(0, 1.4fr);
            gap: 18px;
            padding: 14px 16px;
            background: #faf7f1;
          }

          .license-rescue-cost-row strong {
            color: #111717;
          }

          .license-rescue-cost-row span {
            color: #5f5c56;
          }

          .license-rescue-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 24px;
          }

          .license-rescue-checklist {
            margin-top: 20px;
            padding: 20px;
            border: 1px solid rgba(17, 23, 23, 0.14);
            background: #faf7f1;
          }

          .license-rescue-checklist h4 {
            margin: 0 0 14px;
            font-family: var(--font-serif), Georgia, serif;
            font-size: 1.4rem;
          }

          .license-rescue-checklist ol {
            margin: 0;
            padding-left: 22px;
            color: #3f3d38;
          }

          .license-rescue-checklist li {
            margin: 0 0 11px;
            padding-left: 4px;
            line-height: 1.6;
          }

          .license-rescue-checklist li:last-child {
            margin-bottom: 0;
          }

          .license-rescue-disclaimer {
            margin: 22px 0 0;
            padding-top: 18px;
            border-top: 1px solid rgba(17, 23, 23, 0.14);
            color: #6e6b65;
            font-size: 0.78rem;
            line-height: 1.6;
          }

          @media (hover: hover) and (pointer: fine) {
            .license-rescue-button:hover,
            .license-rescue-action:hover {
              background: #111717;
              color: #f5f0e7;
              transform: translateY(-2px);
              box-shadow:
                0 10px 24px
                rgba(17, 23, 23, 0.12);
            }
          }

          @media (max-width: 700px) {
            .license-rescue {
              margin-left: 18px;
              margin-right: 18px;
            }

            .license-rescue-grid {
              grid-template-columns: 1fr;
            }

            .license-rescue-choice-row,
            .license-rescue-actions {
              display: grid;
              grid-template-columns: 1fr;
            }

            .license-rescue-button,
            .license-rescue-action {
              width: 100%;
            }

            .license-rescue-cost-row {
              grid-template-columns: 1fr;
              gap: 5px;
            }
          }
        `}
      </style>

      <p className="eyebrow">
        LICENSE RESCUE
      </p>

      <h3 className="license-rescue-title">
        {deadlinePassed
          ? "The deadline shown on this record has passed."
          : `Your license needs action before ${formatDate(
              expirationDate,
            )}.`}
      </h3>

      <p className="license-rescue-status">
        DBPR weekly-record status:{" "}
        <strong>
          {statusText(
            primaryStatus,
            secondaryStatus,
          ) ||
            "Involuntarily Inactive"}
        </strong>
        .
      </p>

      {daysUntilDeadline !==
        null && (
        <div className="license-rescue-deadline">
          {deadlinePassed
            ? `${Math.abs(
                daysUntilDeadline,
              ).toLocaleString()} ${
                Math.abs(
                  daysUntilDeadline,
                ) === 1
                  ? "day"
                  : "days"
              } past the deadline shown on this record`
            : deadlineToday
              ? "Deadline is today"
              : `${daysUntilDeadline.toLocaleString()} ${
                  daysUntilDeadline ===
                  1
                    ? "day"
                    : "days"
                } left before the DBPR deadline on this record`}
        </div>
      )}

      <div className="license-rescue-grid">
        <div className="license-rescue-card">
          <p className="license-rescue-card-label">
            STATUS EFFECTIVE
          </p>

          <p className="license-rescue-card-value">
            {formatDate(
              statusEffectiveDate,
            )}
          </p>

          <p className="license-rescue-card-copy">
            Greyson uses this date only to help
            estimate which involuntary-inactive
            education window may apply.
          </p>
        </div>

        <div className="license-rescue-card">
          <p className="license-rescue-card-label">
            EXPIRATION / ACTION DEADLINE
          </p>

          <p className="license-rescue-card-value">
            {formatDate(
              expirationDate,
            )}
          </p>

          <p className="license-rescue-card-copy">
            Confirm this date on the live DBPR
            record before relying on it.
          </p>
        </div>
      </div>

      {automaticDuration ===
        "unknown" && (
        <div className="license-rescue-question">
          <h4>
            How long has this license been
            involuntarily inactive?
          </h4>

          <p>
            Greyson cannot determine the duration
            reliably from this weekly record, so
            choose the closest answer instead of
            guessing at the course requirement.
          </p>

          <div className="license-rescue-choice-row">
            <button
              type="button"
              className="license-rescue-button"
              aria-pressed={
                manualDuration ===
                "under-12"
              }
              onClick={() =>
                setManualDuration(
                  "under-12",
                )
              }
            >
              12 months or less
            </button>

            <button
              type="button"
              className="license-rescue-button"
              aria-pressed={
                manualDuration ===
                "12-24"
              }
              onClick={() =>
                setManualDuration(
                  "12-24",
                )
              }
            >
              More than 12, fewer than 24 months
            </button>

            <button
              type="button"
              className="license-rescue-button"
              aria-pressed={
                manualDuration ===
                "24-plus"
              }
              onClick={() =>
                setManualDuration(
                  "24-plus",
                )
              }
            >
              I&apos;m not sure / 24+ months
            </button>
          </div>
        </div>
      )}

      {duration !==
        "unknown" && (
        <div className="license-rescue-education">
          <h4>
            {educationTitle}
          </h4>

          <p>
            {educationCopy}
          </p>
        </div>
      )}

      <div className="license-rescue-first-renewal-note">
        <strong>
          Was this your first renewal?
        </strong>{" "}
        Missing required first-renewal post-license
        education can follow a different path. Do
        not purchase a 14-hour or 28-hour course
        based only on this panel if the missed
        deadline was your first renewal.
      </div>

      <div className="license-rescue-costs">
        <div className="license-rescue-cost-row">
          <strong>
            Education cost
          </strong>

          <span>
            Varies by approved provider.
          </span>
        </div>

        <div className="license-rescue-cost-row">
          <strong>
            DBPR renewal/payment
          </strong>

          <span>
            Check your DBPR account for the exact
            amount currently due.
          </span>
        </div>

        <div className="license-rescue-cost-row">
          <strong>
            Late or prior-period fees
          </strong>

          <span>
            May apply. Use the amount shown by
            DBPR rather than an estimated total.
          </span>
        </div>
      </div>

      <div className="license-rescue-actions">
        <button
          type="button"
          className="license-rescue-action"
          onClick={() =>
            setShowChecklist(
              !showChecklist,
            )
          }
        >
          {showChecklist
            ? "Hide My Step-by-Step Checklist"
            : "View My Step-by-Step Checklist"}
        </button>

        <a
          className="license-rescue-action"
          href="https://www.myfloridalicense.com/portalsearches/VerifyLicensee"
          target="_blank"
          rel="noopener noreferrer"
        >
          Verify Live on DBPR ↗
        </a>

        <a
          className="license-rescue-action"
          href="https://www.myfloridalicense.com/datamart/previewRegistration.do"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open My DBPR Account ↗
        </a>

        <a
          className="license-rescue-action"
          href="tel:+18504871395"
        >
          Call DBPR: 850-487-1395
        </a>
      </div>

      {showChecklist && (
        <div className="license-rescue-checklist">
          <h4>
            Your License Rescue checklist
          </h4>

          <ol>
            <li>
              Verify the license on DBPR&apos;s
              live search before making an
              education or renewal decision.
            </li>

            <li>
              Complete the correct DBPR-approved
              education for your actual status
              and duration of inactivity.
            </li>

            <li>
              Keep your completion certificate
              and confirm the provider reports
              your completed education to DBPR.
            </li>

            <li>
              Log in to your DBPR account and pay
              the exact renewal, late, or other
              amounts shown there.
            </li>

            <li>
              If the account will not allow the
              required payment, follow DBPR&apos;s
              payment instructions and contact
              DBPR immediately if the deadline is
              close.
            </li>

            <li>
              Recheck the live DBPR record after
              completing the education and
              renewal steps.
            </li>

            {needsBrokerRegistration && (
              <li>
                If you are a Sales Associate or
                Broker Associate, confirm the
                appropriate broker relationship
                is registered before returning
                to licensed activity.
              </li>
            )}

            <li>
              Do not perform licensed real estate
              activity until your official DBPR
              record shows the status required
              for you to practice.
            </li>
          </ol>
        </div>
      )}

      <p className="license-rescue-disclaimer">
        Greyson Institute is not the Florida
        Department of Business and Professional
        Regulation. This guidance uses DBPR&apos;s
        weekly public-record data and is designed
        to help you understand possible next
        steps. Confirm your current status,
        education requirement, payment amount,
        and deadline on the official live DBPR
        record before relying on this information.
        License: {licenseNumber}.
      </p>
    </section>
  );
}
