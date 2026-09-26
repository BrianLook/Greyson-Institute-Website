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

type RescuePath =
  | "14-hour"
  | "28-hour"
  | "past-window"
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
  date: Date | null,
) {
  if (!date) {
    return "Unable to calculate";
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

function formatDbprDate(
  value: string,
) {
  return formatDate(
    parseDbprDate(
      value,
    ),
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

function daysBetween(
  from: Date,
  to: Date,
) {
  const fromUtc =
    Date.UTC(
      from.getFullYear(),
      from.getMonth(),
      from.getDate(),
    );

  const toUtc =
    Date.UTC(
      to.getFullYear(),
      to.getMonth(),
      to.getDate(),
    );

  return Math.round(
    (
      toUtc -
      fromUtc
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

function isInvoluntaryStatus(
  primaryStatus: string,
  secondaryStatus: string,
) {
  const status =
    `${primaryStatus} ${secondaryStatus}`
      .trim()
      .toLowerCase();

  return (
    status.includes(
      "inactive",
    ) &&
    status.includes(
      "invol",
    )
  );
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
    showChecklist,
    setShowChecklist,
  ] = useState(false);

  const isInvoluntary =
    isInvoluntaryStatus(
      primaryStatus,
      secondaryStatus,
    );

  if (!isInvoluntary) {
    return null;
  }

  const today =
    startOfToday();

  const originalExpiration =
    parseDbprDate(
      expirationDate,
    );

  const oneYearMark =
    originalExpiration
      ? addYears(
          originalExpiration,
          1,
        )
      : null;

  const finalRescueDeadline =
    originalExpiration
      ? addYears(
          originalExpiration,
          2,
        )
      : null;

  let rescuePath:
    RescuePath =
      "unknown";

  if (
    originalExpiration &&
    oneYearMark &&
    finalRescueDeadline
  ) {
    if (
      today <= oneYearMark
    ) {
      rescuePath =
        "14-hour";
    } else if (
      today <=
      finalRescueDeadline
    ) {
      rescuePath =
        "28-hour";
    } else {
      rescuePath =
        "past-window";
    }
  }

  const daysRemaining =
    finalRescueDeadline
      ? daysBetween(
          today,
          finalRescueDeadline,
        )
      : null;

  const deadlinePassed =
    rescuePath ===
    "past-window";

  const deadlineToday =
    daysRemaining === 0 &&
    !deadlinePassed;

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

  return (
    <section className="license-rescue">
      <style>
        {`
          .license-rescue {
            margin: 4px 28px 26px;
            padding: clamp(24px, 4vw, 34px);
            border: 1px solid rgba(155, 58, 50, 0.5);
            border-left: 6px solid #9b3a32;
            background: #f7ece8;
            color: #111717;
          }

          .license-rescue-warning-label {
            margin: 0 0 10px;
            color: #7a2c25;
            font-size: 0.72rem;
            font-weight: 850;
            letter-spacing: 0.16em;
            text-transform: uppercase;
          }

          .license-rescue-title {
            max-width: 780px;
            margin: 0;
            color: #111717;
            font-family:
              var(--font-serif),
              Georgia,
              serif;
            font-size:
              clamp(
                1.8rem,
                3.5vw,
                2.6rem
              );
            line-height: 1.12;
          }

          .license-rescue-status {
            margin: 14px 0 0;
            color: #4d4b46;
            line-height: 1.65;
          }

          .license-rescue-countdown {
            display: inline-flex;
            flex-direction: column;
            align-items: flex-start;
            margin-top: 22px;
            padding: 16px 20px;
            background: #7a2c25;
            color: #fffaf5;
          }

          .license-rescue-countdown-number {
            font-family:
              var(--font-serif),
              Georgia,
              serif;
            font-size:
              clamp(
                2.3rem,
                6vw,
                3.8rem
              );
            line-height: 0.95;
          }

          .license-rescue-countdown-label {
            margin-top: 8px;
            font-size: 0.72rem;
            font-weight: 850;
            letter-spacing: 0.13em;
            text-transform: uppercase;
          }

          .license-rescue-deadline {
            margin: 16px 0 0;
            color: #7a2c25;
            font-size: 0.94rem;
            font-weight: 700;
            line-height: 1.6;
          }

          .license-rescue-grid {
            display: grid;
            grid-template-columns:
              repeat(
                2,
                minmax(0, 1fr)
              );
            gap: 14px;
            margin-top: 26px;
          }

          .license-rescue-card {
            padding: 20px;
            border:
              1px solid
              rgba(
                122,
                44,
                37,
                0.18
              );
            background:
              rgba(
                255,
                255,
                255,
                0.62
              );
          }

          .license-rescue-card-label {
            margin: 0 0 7px;
            color: #7a2c25;
            font-size: 0.67rem;
            font-weight: 800;
            letter-spacing: 0.13em;
            text-transform: uppercase;
          }

          .license-rescue-card-value {
            margin: 0;
            color: #111717;
            font-family:
              var(--font-serif),
              Georgia,
              serif;
            font-size: 1.25rem;
            font-weight: 700;
            line-height: 1.45;
          }

          .license-rescue-card-copy {
            margin: 8px 0 0;
            color: #5f5c56;
            font-size: 0.84rem;
            line-height: 1.6;
          }

          .license-rescue-education {
            margin-top: 24px;
            padding: 22px;
            border-left:
              4px solid
              #9b3a32;
            background:
              rgba(
                255,
                255,
                255,
                0.65
              );
          }

          .license-rescue-education h4 {
            margin: 0;
            color: #111717;
            font-size: 1.02rem;
            line-height: 1.55;
          }

          .license-rescue-education p {
            margin: 9px 0 0;
            color: #4d4b46;
            line-height: 1.65;
          }

          .license-rescue-first-renewal-note {
            margin-top: 18px;
            padding: 16px 18px;
            border:
              1px solid
              rgba(
                122,
                44,
                37,
                0.2
              );
            background:
              rgba(
                255,
                255,
                255,
                0.48
              );
            color: #4d4b46;
            font-size: 0.84rem;
            line-height: 1.65;
          }

          .license-rescue-first-renewal-note strong {
            color: #7a2c25;
          }

          .license-rescue-costs {
            margin-top: 24px;
            display: grid;
            gap: 1px;
            border:
              1px solid
              rgba(
                17,
                23,
                23,
                0.12
              );
            background:
              rgba(
                17,
                23,
                23,
                0.12
              );
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

          .license-rescue-checklist {
            margin-top: 20px;
            padding: 22px;
            border:
              1px solid
              rgba(
                122,
                44,
                37,
                0.2
              );
            background: #faf7f1;
          }

          .license-rescue-checklist h4 {
            margin: 0 0 14px;
            font-family:
              var(--font-serif),
              Georgia,
              serif;
            font-size: 1.45rem;
          }

          .license-rescue-checklist ol {
            margin: 0;
            padding-left: 22px;
            color: #3f3d38;
          }

          .license-rescue-checklist li {
            margin: 0 0 11px;
            padding-left: 4px;
            line-height: 1.65;
          }

          .license-rescue-checklist li:last-child {
            margin-bottom: 0;
          }

          .license-rescue-disclaimer {
            margin: 24px 0 0;
            padding-top: 18px;
            border-top:
              1px solid
              rgba(
                122,
                44,
                37,
                0.18
              );
            color: #6e6b65;
            font-size: 0.78rem;
            line-height: 1.65;
          }

          @media (hover: hover) and (pointer: fine) {
            .license-rescue-action:hover {
              background: #111717;
              color: #f5f0e7;
              transform:
                translateY(-2px);
              box-shadow:
                0 10px 24px
                rgba(
                  17,
                  23,
                  23,
                  0.12
                );
            }
          }

          @media (max-width: 700px) {
            .license-rescue {
              margin-left: 18px;
              margin-right: 18px;
            }

            .license-rescue-grid {
              grid-template-columns:
                1fr;
            }

            .license-rescue-actions {
              display: grid;
              grid-template-columns:
                1fr;
            }

            .license-rescue-action {
              width: 100%;
            }

            .license-rescue-cost-row {
              grid-template-columns:
                1fr;
              gap: 5px;
            }
          }
        `}
      </style>

      <p className="license-rescue-warning-label">
        ⚠ LICENSE ACTION REQUIRED
      </p>

      <h3 className="license-rescue-title">
        {deadlinePassed
          ? "This weekly record may be beyond Florida’s reactivation window."
          : finalRescueDeadline
            ? `Your license needs action before ${formatDate(
                finalRescueDeadline,
              )}.`
            : "Your license needs immediate attention."}
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

      {daysRemaining !==
        null && (
        <>
          <div className="license-rescue-countdown">
            <span className="license-rescue-countdown-number">
              {deadlinePassed
                ? "0"
                : daysRemaining.toLocaleString()}
            </span>

            <span className="license-rescue-countdown-label">
              {deadlinePassed
                ? "RESCUE WINDOW MAY HAVE ENDED"
                : deadlineToday
                  ? "DEADLINE IS TODAY"
                  : daysRemaining ===
                      1
                    ? "DAY REMAINING"
                    : "DAYS REMAINING"}
            </span>
          </div>

          <p className="license-rescue-deadline">
            Final rescue deadline calculated
            from this weekly record:{" "}
            <strong>
              {formatDate(
                finalRescueDeadline,
              )}
            </strong>
            .
          </p>
        </>
      )}

      <div className="license-rescue-grid">
        <div className="license-rescue-card">
          <p className="license-rescue-card-label">
            ORIGINAL MISSED RENEWAL DATE
          </p>

          <p className="license-rescue-card-value">
            {formatDbprDate(
              expirationDate,
            )}
          </p>

          <p className="license-rescue-card-copy">
            This is the expiration date
            currently shown in the weekly DBPR
            record. It is not the new rescue
            deadline.
          </p>
        </div>

        <div className="license-rescue-card">
          <p className="license-rescue-card-label">
            FINAL RESCUE DEADLINE
          </p>

          <p className="license-rescue-card-value">
            {formatDate(
              finalRescueDeadline,
            )}
          </p>

          <p className="license-rescue-card-copy">
            Greyson calculates this from the
            two-year involuntary-inactive window.
            Verify the deadline on the live DBPR
            record before relying on it.
          </p>
        </div>
      </div>

      {rescuePath ===
        "14-hour" && (
        <div className="license-rescue-education">
          <h4>
            Likely education path: at least
            14 hours of prescribed continuing
            education.
          </h4>

          <p>
            This record appears to be within
            the first 12 months of involuntary
            inactivity. Education is only one
            part of renewal. Confirm the live
            DBPR record and the exact payment
            requirements before enrolling.
          </p>
        </div>
      )}

      {rescuePath ===
        "28-hour" && (
        <div className="license-rescue-education">
          <h4>
            Likely education path: 28-hour
            reactivation education.
          </h4>

          <p>
            This record appears to have been
            involuntarily inactive for more
            than 12 months while still inside
            the two-year reactivation window.
            Education is only one part of
            renewal. Complete all required DBPR
            renewal steps and payment by the
            official deadline.
          </p>
        </div>
      )}

      {rescuePath ===
        "past-window" && (
        <div className="license-rescue-education">
          <h4>
            Do not purchase a 14-hour or
            28-hour course based only on this
            weekly record.
          </h4>

          <p>
            The calculated two-year
            reactivation window has passed.
            Verify the live DBPR record
            immediately to determine the
            current status and available path.
          </p>
        </div>
      )}

      {rescuePath ===
        "unknown" && (
        <div className="license-rescue-education">
          <h4>
            Greyson cannot safely determine
            the reactivation course from this
            weekly record.
          </h4>

          <p>
            Verify the license directly with
            DBPR before purchasing education
            or attempting renewal.
          </p>
        </div>
      )}

      <div className="license-rescue-first-renewal-note">
        <strong>
          Important — was this your first renewal?
        </strong>{" "}
        Missing required first-renewal
        post-license education can follow a
        different path. Do not purchase a
        14-hour or 28-hour course based only
        on this panel if the missed deadline
        was your first renewal.
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
            Check your DBPR account for the
            exact amount currently due.
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
              Verify your status and deadline
              using DBPR&apos;s live license
              search.
            </li>

            <li>
              Complete the correct
              DBPR-approved education for your
              actual status and time inactive.
            </li>

            <li>
              Keep your completion certificate
              and confirm the education
              provider reports the completed
              hours to DBPR.
            </li>

            <li>
              Log in to your DBPR account and
              pay the exact renewal, late, or
              prior-period amounts shown there.
            </li>

            <li>
              If DBPR does not allow online
              payment, follow the payment
              instructions in your renewal
              notice and contact DBPR
              immediately if the deadline is
              close.
            </li>

            <li>
              Recheck the live DBPR record
              after completing the education
              and renewal steps.
            </li>

            {needsBrokerRegistration && (
              <li>
                If you are a Sales Associate
                or Broker Associate, confirm
                the appropriate broker
                relationship is registered
                before returning to licensed
                activity.
              </li>
            )}

            <li>
              Do not perform licensed real
              estate activity until your
              official DBPR record shows the
              status required for you to
              practice.
            </li>
          </ol>
        </div>
      )}

      <p className="license-rescue-disclaimer">
        Greyson Institute is not the Florida
        Department of Business and Professional
        Regulation. This guidance uses
        DBPR&apos;s weekly public-record data
        and is designed to help identify a
        possible reactivation path. Confirm
        your current status, education
        requirement, payment amount, and
        deadline on the official live DBPR
        record before relying on this
        information. Weekly status-effective
        date:{" "}
        {formatDbprDate(
          statusEffectiveDate,
        )}
        . License: {licenseNumber}.
      </p>
    </section>
  );
}
