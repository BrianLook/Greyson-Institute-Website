export type FloridaLicenseRecord = {
  i: string;
  n: string;
  r: string;
  p: string;
  s: string;
  o: string;
  e: string;
  x: string;
};

export type RenewalAnswer =
  | "first"
  | "later"
  | "unsure";

export type PathResult = {
  kind:
    | "sales-first"
    | "broker-first"
    | "later-ce"
    | "instructor"
    | "reactivation-14"
    | "reactivation-28"
    | "reactivation-past-window"
    | "first-renewal-problem"
    | "uncertain";
  eyebrow: string;
  title: string;
  statusText: string;
  reason: string;
  href: string;
  buttonText: string;
  deadlineLabel: string;
  deadlineDate: Date | null;
  urgent: boolean;
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

export function normalizeLicenseNumber(
  value: string,
) {
  return value
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");
}

export function numericLicensePart(
  value: string,
) {
  return value.replace(/\D/g, "");
}

export function isInstructorRecord(
  record: FloridaLicenseRecord,
) {
  return record.r
    .toLowerCase()
    .includes("instructor");
}

export function isSalesAssociateRecord(
  record: FloridaLicenseRecord,
) {
  return record.r
    .toLowerCase()
    .includes("sales associate");
}

export function isBrokerRecord(
  record: FloridaLicenseRecord,
) {
  return record.r
    .toLowerCase()
    .includes("broker");
}

export function isActiveRecord(
  record: FloridaLicenseRecord,
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

export function isInvoluntarilyInactiveRecord(
  record: FloridaLicenseRecord,
) {
  const status =
    `${record.p} ${record.s}`
      .trim()
      .toLowerCase();

  return (
    status.includes("inactive") &&
    status.includes("invol")
  );
}

export function parseDbprDate(
  value: string,
): Date | null {
  const trimmed =
    value.trim();

  if (!trimmed) {
    return null;
  }

  const slash =
    trimmed.match(
      /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/,
    );

  if (slash) {
    return validDate(
      Number(slash[3]),
      Number(slash[1]) - 1,
      Number(slash[2]),
    );
  }

  const compact =
    trimmed.match(
      /^(\d{4})(\d{2})(\d{2})$/,
    );

  if (compact) {
    return validDate(
      Number(compact[1]),
      Number(compact[2]) - 1,
      Number(compact[3]),
    );
  }

  const short =
    trimmed.match(
      /^(\d{1,2})-([A-Za-z]{3})-(\d{2}|\d{4})$/,
    );

  if (short) {
    const month =
      MONTHS[
        short[2].toUpperCase()
      ];

    if (
      month === undefined
    ) {
      return null;
    }

    const rawYear =
      short[3];

    const numericYear =
      Number(rawYear);

    const year =
      rawYear.length === 2
        ? numericYear <= 69
          ? 2000 + numericYear
          : 1900 + numericYear
        : numericYear;

    return validDate(
      year,
      month,
      Number(short[1]),
    );
  }

  return null;
}

function validDate(
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

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
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
    date.getFullYear() + years,
    date.getMonth(),
    date.getDate(),
  );
}

export function daysUntil(
  date: Date | null,
) {
  if (!date) {
    return null;
  }

  const today =
    startOfToday();

  const from =
    Date.UTC(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );

  const to =
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );

  return Math.round(
    (to - from) / DAY_MS,
  );
}

export function formatPlainDate(
  date: Date | null,
) {
  if (!date) {
    return "Date not listed";
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

export function plainEnglishStatus(
  record: FloridaLicenseRecord,
) {
  const combined =
    `${record.p} ${record.s}`
      .trim()
      .toLowerCase();

  if (
    isInvoluntarilyInactiveRecord(
      record,
    )
  ) {
    if (
      isInstructorRecord(
        record,
      )
    ) {
      return "Your instructor permit is involuntarily inactive.";
    }

    return "Your license is involuntarily inactive. You cannot perform licensed real estate activity while it remains inactive.";
  }

  if (
    combined.includes("inactive")
  ) {
    if (
      isInstructorRecord(
        record,
      )
    ) {
      return "Your instructor permit is current but inactive.";
    }

    return "Your license is current but inactive. You cannot perform licensed real estate activity until it is active.";
  }

  if (
    isActiveRecord(
      record,
    )
  ) {
    if (
      isInstructorRecord(
        record,
      )
    ) {
      return "Your instructor permit is current and active.";
    }

    if (
      isSalesAssociateRecord(
        record,
      ) ||
      isBrokerRecord(
        record,
      )
    ) {
      return "Your license is current and active. You can currently perform licensed real estate activity.";
    }
  }

  const parts = [
    record.p,
    record.s,
  ].filter(Boolean);

  return parts.length > 0
    ? `Your DBPR record shows: ${parts.join(" / ")}.`
    : "Your current status is not clearly listed in the weekly DBPR record.";
}

export function determineFloridaLicensePath(
  record: FloridaLicenseRecord,
  renewalAnswer?: RenewalAnswer,
): PathResult {
  const expiration =
    parseDbprDate(
      record.x,
    );

  const statusText =
    plainEnglishStatus(
      record,
    );

  if (
    isInstructorRecord(
      record,
    )
  ) {
    return {
      kind: "instructor",
      eyebrow:
        "YOUR LIKELY NEXT EDUCATION STEP",
      title:
        "7-Hour Real Estate Instructor Continuing Education",
      statusText,
      reason:
        "Your DBPR record identifies this as a Florida Real Estate Instructor permit.",
      href:
        "/florida-real-estate-instructor-continuing-education",
      buttonText:
        "Understand My Requirement →",
      deadlineLabel:
        "Permit expiration",
      deadlineDate:
        expiration,
      urgent: false,
    };
  }

  if (
    isInvoluntarilyInactiveRecord(
      record,
    )
  ) {
    if (
      renewalAnswer ===
      "first"
    ) {
      return {
        kind:
          "first-renewal-problem",
        eyebrow:
          "DO NOT BUY A NORMAL REACTIVATION COURSE YET",
        title:
          "Your first-renewal requirement may follow a different path.",
        statusText,
        reason:
          "You told us this was your first renewal. Missing required first-renewal post-license education can make a license null and void, so normal 14-hour or 28-hour reactivation education may not be the correct fix.",
        href:
          "https://www.myfloridalicense.com/portalsearches/VerifyLicensee",
        buttonText:
          "Verify My Path on DBPR ↗",
        deadlineLabel:
          "Missed expiration",
        deadlineDate:
          expiration,
        urgent: true,
      };
    }

    if (
      renewalAnswer !==
      "later"
    ) {
      return uncertainPath(
        record,
        statusText,
        expiration,
      );
    }

    if (!expiration) {
      return uncertainPath(
        record,
        statusText,
        expiration,
      );
    }

    const oneYear =
      addYears(
        expiration,
        1,
      );

    const twoYears =
      addYears(
        expiration,
        2,
      );

    const today =
      startOfToday();

    if (
      today <= oneYear
    ) {
      return {
        kind:
          "reactivation-14",
        eyebrow:
          "YOUR LIKELY REACTIVATION PATH",
        title:
          "14 Hours of Prescribed Continuing Education",
        statusText,
        reason:
          "You told us this was not your first renewal, and this record appears to be within the first 12 months of involuntary inactivity.",
        href:
          "/courses#reactivation",
        buttonText:
          "See My Reactivation Steps →",
        deadlineLabel:
          "Standard reactivation deadline",
        deadlineDate:
          twoYears,
        urgent:
          daysUntil(
            twoYears,
          ) !== null &&
          (daysUntil(
            twoYears,
          ) ?? 9999) <= 30,
      };
    }

    if (
      today <= twoYears
    ) {
      return {
        kind:
          "reactivation-28",
        eyebrow:
          "YOUR LIKELY REACTIVATION PATH",
        title:
          "28-Hour Reactivation Education",
        statusText,
        reason:
          "You told us this was not your first renewal, and this record appears to have been involuntarily inactive for more than 12 months but less than two years.",
        href:
          "/courses#reactivation",
        buttonText:
          "See My Reactivation Steps →",
        deadlineLabel:
          "Standard reactivation deadline",
        deadlineDate:
          twoYears,
        urgent:
          daysUntil(
            twoYears,
          ) !== null &&
          (daysUntil(
            twoYears,
          ) ?? 9999) <= 30,
      };
    }

    return {
      kind:
        "reactivation-past-window",
      eyebrow:
        "VERIFY BEFORE BUYING A COURSE",
      title:
        "The standard two-year reactivation window appears to have passed.",
      statusText,
      reason:
        "You told us this was not your first renewal, and the weekly record appears beyond the standard reactivation window. A separate hardship process may exist in qualifying cases.",
      href:
        "https://www.myfloridalicense.com/portalsearches/VerifyLicensee",
      buttonText:
        "Verify My Available Path ↗",
      deadlineLabel:
        "Missed expiration",
      deadlineDate:
        expiration,
      urgent: true,
    };
  }

  if (
    renewalAnswer ===
    "first"
  ) {
    if (
      isSalesAssociateRecord(
        record,
      )
    ) {
      return {
        kind:
          "sales-first",
        eyebrow:
          "YOUR LIKELY NEXT EDUCATION STEP",
        title:
          "45-Hour Sales Associate Post-License Education",
        statusText,
        reason:
          "You told us this is your first renewal, so the 45-hour post-license requirement likely applies instead of regular 14-hour continuing education.",
        href:
          "/florida-45-hour-post-license-requirements",
        buttonText:
          "Understand My Requirement →",
        deadlineLabel:
          "License expiration",
        deadlineDate:
          expiration,
        urgent: false,
      };
    }

    if (
      isBrokerRecord(
        record,
      )
    ) {
      return {
        kind:
          "broker-first",
        eyebrow:
          "YOUR LIKELY NEXT EDUCATION STEP",
        title:
          "60-Hour Broker Post-License Education",
        statusText,
        reason:
          "You told us this is your first broker renewal, so the 60-hour broker post-license requirement likely applies instead of regular 14-hour continuing education.",
        href:
          "/florida-60-hour-broker-post-license-requirements",
        buttonText:
          "Understand My Requirement →",
        deadlineLabel:
          "Broker license expiration",
        deadlineDate:
          expiration,
        urgent: false,
      };
    }
  }

  if (
    renewalAnswer ===
    "later"
  ) {
    return {
      kind:
        "later-ce",
      eyebrow:
        "YOUR LIKELY NEXT EDUCATION STEP",
      title:
        "14-Hour Florida Real Estate Continuing Education",
      statusText,
      reason:
        "You told us you have renewed this license before, so the regular 14-hour continuing education cycle likely applies.",
      href:
        "/florida-14-hour-real-estate-continuing-education",
      buttonText:
        "Understand My Requirement →",
      deadlineLabel:
        "License expiration",
      deadlineDate:
        expiration,
      urgent: false,
    };
  }

  return uncertainPath(
    record,
    statusText,
    expiration,
  );
}

function uncertainPath(
  record: FloridaLicenseRecord,
  statusText: string,
  expiration: Date | null,
): PathResult {
  return {
    kind:
      "uncertain",
    eyebrow:
      "ONE ANSWER STILL MATTERS",
    title:
      "Greyson needs your renewal history before choosing a class.",
    statusText,
    reason:
      "Whether this is your first renewal changes the education requirement. Greyson will not guess.",
    href:
      "https://www.myfloridalicense.com/portalsearches/VerifyLicensee",
    buttonText:
      "Verify My Renewal History ↗",
    deadlineLabel:
      isBrokerRecord(
        record,
      )
        ? "Broker license expiration"
        : "License expiration",
    deadlineDate:
      expiration,
    urgent: false,
  };
}
