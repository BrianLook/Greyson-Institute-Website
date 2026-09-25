"use client";

type LicenseExpirationCountdownProps = {
  expirationDate: string;
};

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

function parseExpirationDate(
  value: string,
): {
  year: number;
  month: number;
  day: number;
} | null {
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
    return {
      month:
        Number(slashDate[1]) - 1,
      day:
        Number(slashDate[2]),
      year:
        Number(slashDate[3]),
    };
  }

  const compactDate =
    trimmed.match(
      /^(\d{4})(\d{2})(\d{2})$/,
    );

  if (compactDate) {
    return {
      year:
        Number(compactDate[1]),
      month:
        Number(compactDate[2]) - 1,
      day:
        Number(compactDate[3]),
    };
  }

  const dbprDate =
    trimmed.match(
      /^(\d{1,2})-([A-Za-z]{3})-(\d{2}|\d{4})$/,
    );

  if (dbprDate) {
    const month =
      MONTHS[
        dbprDate[2].toUpperCase()
      ];

    if (
      month === undefined
    ) {
      return null;
    }

    const rawYear =
      dbprDate[3];

    const numericYear =
      Number(rawYear);

    const year =
      rawYear.length === 2
        ? numericYear <= 69
          ? 2000 + numericYear
          : 1900 + numericYear
        : numericYear;

    return {
      year,
      month,
      day:
        Number(dbprDate[1]),
    };
  }

  return null;
}

function getDaysRemaining(
  expirationDate: string,
) {
  const expiration =
    parseExpirationDate(
      expirationDate,
    );

  if (!expiration) {
    return null;
  }

  const now =
    new Date();

  const todayUtc =
    Date.UTC(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );

  const expirationUtc =
    Date.UTC(
      expiration.year,
      expiration.month,
      expiration.day,
    );

  return Math.round(
    (expirationUtc - todayUtc) /
      DAY_MS,
  );
}

export function LicenseExpirationCountdown({
  expirationDate,
}: LicenseExpirationCountdownProps) {
  const daysRemaining =
    getDaysRemaining(
      expirationDate,
    );

  if (
    daysRemaining === null
  ) {
    return null;
  }

  let text = "";

  if (
    daysRemaining > 1
  ) {
    text =
      `${daysRemaining.toLocaleString()} days remaining`;
  } else if (
    daysRemaining === 1
  ) {
    text =
      "1 day remaining";
  } else if (
    daysRemaining === 0
  ) {
    text =
      "Expires today";
  } else if (
    daysRemaining === -1
  ) {
    text =
      "Expired 1 day ago";
  } else {
    text =
      `Expired ${Math.abs(
        daysRemaining,
      ).toLocaleString()} days ago`;
  }

  const expired =
    daysRemaining < 0;

  return (
    <p
      className={
        expired
          ? "license-expiration-countdown license-expiration-countdown--expired"
          : "license-expiration-countdown"
      }
    >
      <style>
        {`
          .license-expiration-countdown {
            display: inline-flex;
            align-items: center;
            margin: 10px 0 0;
            padding: 6px 10px;
            border: 1px solid rgba(125, 95, 58, 0.35);
            background: #eee6d9;
            color: #6f5333;
            font-size: 0.78rem;
            font-weight: 700;
            letter-spacing: 0.025em;
            line-height: 1.3;
          }

          .license-expiration-countdown--expired {
            border-color: rgba(138, 45, 37, 0.28);
            background: rgba(138, 45, 37, 0.06);
            color: #7a2c25;
          }
        `}
      </style>

      {text}
    </p>
  );
}
