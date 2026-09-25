type LicenseCalendarDetails = {
  licenseNumber: string;
  licenseeName: string;
  expirationDate: string;
};

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
  const date = new Date(
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

function parseDbprExpirationDate(
  value: string,
): Date | null {
  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  const slashDate =
    trimmed.match(
      /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/,
    );

  if (slashDate) {
    const month =
      Number(slashDate[1]) - 1;

    const day =
      Number(slashDate[2]);

    const year =
      Number(slashDate[3]);

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
      Number(compactDate[1]);

    const month =
      Number(compactDate[2]) - 1;

    const day =
      Number(compactDate[3]);

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

  const shortDbprDate =
    trimmed.match(
      /^(\d{1,2})-([A-Za-z]{3})-(\d{2}|\d{4})$/,
    );

  if (shortDbprDate) {
    const day =
      Number(shortDbprDate[1]);

    const month =
      MONTHS[
        shortDbprDate[2].toUpperCase()
      ];

    const rawYear =
      shortDbprDate[3];

    const shortYear =
      Number(rawYear);

    const year =
      rawYear.length === 2
        ? shortYear <= 69
          ? 2000 + shortYear
          : 1900 + shortYear
        : shortYear;

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

function addDays(
  date: Date,
  days: number,
) {
  const copy = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );

  copy.setDate(
    copy.getDate() + days,
  );

  return copy;
}

function formatIcsDate(
  date: Date,
) {
  const year =
    String(
      date.getFullYear(),
    );

  const month =
    String(
      date.getMonth() + 1,
    ).padStart(2, "0");

  const day =
    String(
      date.getDate(),
    ).padStart(2, "0");

  return `${year}${month}${day}`;
}

function formatTimestamp() {
  const date =
    new Date();

  const year =
    String(
      date.getUTCFullYear(),
    );

  const month =
    String(
      date.getUTCMonth() + 1,
    ).padStart(2, "0");

  const day =
    String(
      date.getUTCDate(),
    ).padStart(2, "0");

  const hour =
    String(
      date.getUTCHours(),
    ).padStart(2, "0");

  const minute =
    String(
      date.getUTCMinutes(),
    ).padStart(2, "0");

  const second =
    String(
      date.getUTCSeconds(),
    ).padStart(2, "0");

  return `${year}${month}${day}T${hour}${minute}${second}Z`;
}

function escapeIcsText(
  value: string,
) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function normalizeLicenseNumber(
  value: string,
) {
  return value
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");
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

export function canCreateLicenseCalendar(
  expirationDate: string,
) {
  return Boolean(
    parseDbprExpirationDate(
      expirationDate,
    ),
  );
}

export function downloadLicenseRenewalCalendar({
  licenseNumber,
  licenseeName,
  expirationDate,
}: LicenseCalendarDetails) {
  if (
    typeof window ===
      "undefined" ||
    typeof document ===
      "undefined"
  ) {
    return false;
  }

  const expiration =
    parseDbprExpirationDate(
      expirationDate,
    );

  if (!expiration) {
    return false;
  }

  const normalizedLicense =
    normalizeLicenseNumber(
      licenseNumber,
    );

  const displayName =
    licenseeName.trim() ||
    "Florida Real Estate Licensee";

  const eventEnd =
    addDays(
      expiration,
      1,
    );

  const today =
    startOfToday();

  const reminderDays = [
    120,
    90,
    60,
    30,
    7,
  ];

  const alarms =
    reminderDays
      .filter((days) => {
        const reminderDate =
          addDays(
            expiration,
            -days,
          );

        return (
          reminderDate >=
          today
        );
      })
      .flatMap(
        (days) => [
          "BEGIN:VALARM",
          `TRIGGER:-P${days}D`,
          "ACTION:DISPLAY",
          `DESCRIPTION:${escapeIcsText(
            `Florida real estate license renewal deadline in ${days} days`,
          )}`,
          "END:VALARM",
        ],
      );

  const description =
    [
      `Florida real estate license: ${normalizedLicense}`,
      `Licensee: ${displayName}`,
      "",
      "This reminder reflects the expiration date shown in the DBPR record when the calendar file was created.",
      "Verify your current license status and expiration date with Florida DBPR before renewing or practicing.",
      "",
      "Greyson Institute",
      "https://greysoninstitute.com/check-florida-real-estate-license-expiration",
    ].join("\n");

  const uid =
    `${normalizedLicense || "florida-license"}-${formatIcsDate(
      expiration,
    )}@greysoninstitute.com`;

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Greyson Institute//Florida License Renewal Reminder//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${formatTimestamp()}`,
    `DTSTART;VALUE=DATE:${formatIcsDate(
      expiration,
    )}`,
    `DTEND;VALUE=DATE:${formatIcsDate(
      eventEnd,
    )}`,
    `SUMMARY:${escapeIcsText(
      "Florida Real Estate License Renewal Deadline",
    )}`,
    `DESCRIPTION:${escapeIcsText(
      description,
    )}`,
    ...alarms,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  const calendarContent =
    lines.join("\r\n");

  const blob =
    new Blob(
      [calendarContent],
      {
        type:
          "text/calendar;charset=utf-8",
      },
    );

  const url =
    URL.createObjectURL(
      blob,
    );

  const link =
    document.createElement(
      "a",
    );

  link.href = url;

  link.download =
    `florida-license-renewal-${
      normalizedLicense ||
      "reminder"
    }.ics`;

  document.body.appendChild(
    link,
  );

  link.click();

  document.body.removeChild(
    link,
  );

  URL.revokeObjectURL(
    url,
  );

  return true;
}
