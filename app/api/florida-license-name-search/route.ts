import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NAME_INDEX_DIR = path.join(
  process.cwd(),
  "data",
  "florida-real-estate-name-index",
);

const MAX_VISIBLE_MATCHES = 8;

const RATE_LIMIT_WINDOW_MS =
  10 * 60 * 1000;

const RATE_LIMIT_MAX_REQUESTS = 30;

type NameIndexRecord = {
  i: string;
  n: string;
  r: string;
  p: string;
  s: string;
  x: string;
  f: string;
  l: string;
  mn?: string;
  m?: string;
  c?: string;
};

type SearchRequest = {
  firstName?: string;
  lastName?: string;
  licenseType?:
    | "sales-associate"
    | "broker";

  /*
    middleInitial remains supported so the
    currently deployed Greyson page keeps working
    while we upgrade the visible form next.
  */
  middleInitial?: string;

  /*
    New version can accept either a full middle
    name or a single initial.
  */
  middleName?: string;

  /*
    When the user does not know or does not have
    a middle name, the future UI can explicitly
    skip this narrowing step.
  */
  skipMiddle?: boolean;

  /*
    County is a later fallback only when the
    previous clues still leave too many records.
  */
  county?: string;

  /*
    Keeps the current live UI backward-compatible.
    The upgraded UI will set this to true.
  */
  supportsCounty?: boolean;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type RateLimitResult = {
  allowed: boolean;
  retryAfterSeconds: number;
};

const globalRateLimit =
  globalThis as typeof globalThis & {
    __greysonFloridaNameSearchRateLimit?: Map<
      string,
      RateLimitEntry
    >;
  };

const rateLimitStore =
  globalRateLimit.__greysonFloridaNameSearchRateLimit ??
  new Map<string, RateLimitEntry>();

globalRateLimit.__greysonFloridaNameSearchRateLimit =
  rateLimitStore;

function normalizeSearchText(
  value: string,
) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/&/g, " AND ")
    .replace(/[^A-Z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeFirstName(
  value: string,
) {
  const normalized =
    normalizeSearchText(value);

  return normalized.split(" ")[0] || "";
}

function normalizeLastName(
  value: string,
) {
  return normalizeSearchText(value);
}

function normalizeMiddleClue(
  value: string,
) {
  return normalizeSearchText(value);
}

function normalizeCounty(
  value: string,
) {
  return normalizeSearchText(value)
    .replace(/\s+COUNTY$/, "")
    .trim();
}

function getNameBucketKey(
  lastName: string,
) {
  const compact =
    lastName.replace(
      /[^A-Z0-9]/g,
      "",
    );

  if (!compact) {
    return "OTHER";
  }

  return compact
    .slice(0, 2)
    .padEnd(2, "_");
}

function matchesLicenseType(
  record: NameIndexRecord,
  licenseType?: SearchRequest["licenseType"],
) {
  if (!licenseType) {
    return true;
  }

  const licenseNumber =
    record.i.toUpperCase();

  const rank =
    record.r.toUpperCase();

  if (
    licenseType ===
    "sales-associate"
  ) {
    return (
      licenseNumber.startsWith(
        "SL",
      ) ||
      rank.includes(
        "SALES ASSOCIATE",
      )
    );
  }

  if (
    licenseType === "broker"
  ) {
    return (
      licenseNumber.startsWith(
        "BK",
      ) ||
      rank.includes(
        "BROKER",
      )
    );
  }

  return true;
}

/*
  IMPORTANT:

  Middle-name information in DBPR can be complete,
  an initial only, or blank.

  A blank DBPR middle field must NOT eliminate the
  person's record. Jessica's test exposed exactly
  why that matters.
*/
function matchesMiddleClue(
  record: NameIndexRecord,
  middleClue: string,
) {
  if (!middleClue) {
    return true;
  }

  const recordMiddle =
    normalizeSearchText(
      record.mn ||
        record.m ||
        "",
    );

  /*
    DBPR supplied no middle information.
    Keep this record as a possible match rather
    than incorrectly excluding the person.
  */
  if (!recordMiddle) {
    return true;
  }

  /*
    User entered only an initial.
  */
  if (
    middleClue.length === 1
  ) {
    return (
      recordMiddle.charAt(0) ===
      middleClue
    );
  }

  /*
    DBPR itself contains only an initial, while
    the user entered their full middle name.
  */
  if (
    recordMiddle.length === 1
  ) {
    return (
      recordMiddle ===
      middleClue.charAt(0)
    );
  }

  if (
    recordMiddle ===
    middleClue
  ) {
    return true;
  }

  /*
    Handles a DBPR record containing more than one
    middle token without requiring the user to know
    every token exactly.
  */
  if (
    recordMiddle.startsWith(
      `${middleClue} `,
    ) ||
    middleClue.startsWith(
      `${recordMiddle} `,
    )
  ) {
    return true;
  }

  return false;
}

/*
  County follows the same safety rule.

  If DBPR has county information, use it.
  If DBPR left county blank, do not silently
  eliminate that person's record.
*/
function matchesCounty(
  record: NameIndexRecord,
  county: string,
) {
  if (!county) {
    return true;
  }

  const recordCounty =
    normalizeCounty(
      record.c || "",
    );

  if (!recordCounty) {
    return true;
  }

  return (
    recordCounty === county
  );
}

function availableCounties(
  records: NameIndexRecord[],
) {
  const counties =
    new Set<string>();

  for (
    const record of records
  ) {
    const county =
      normalizeCounty(
        record.c || "",
      );

    if (county) {
      counties.add(
        county,
      );
    }
  }

  return Array.from(
    counties,
  )
    .sort()
    .slice(0, 20);
}

function publicResult(
  record: NameIndexRecord,
) {
  return {
    id: record.i,
    name: record.n,
    licenseType:
      record.r,
    primaryStatus:
      record.p,
    secondaryStatus:
      record.s,
    expirationDate:
      record.x,
  };
}

function json(
  body: unknown,
  status = 200,
  extraHeaders:
    | Record<string, string>
    | undefined = undefined,
) {
  return NextResponse.json(
    body,
    {
      status,
      headers: {
        "Cache-Control":
          "no-store, max-age=0",
        "X-Robots-Tag":
          "noindex, nofollow",
        ...extraHeaders,
      },
    },
  );
}

function getClientIdentifier(
  request: Request,
) {
  const forwardedFor =
    request.headers.get(
      "x-forwarded-for",
    );

  const ip =
    forwardedFor
      ?.split(",")[0]
      ?.trim() ||
    request.headers
      .get("x-real-ip")
      ?.trim() ||
    "unknown";

  return createHash(
    "sha256",
  )
    .update(ip)
    .digest("hex");
}

function cleanupRateLimitStore(
  now: number,
) {
  if (
    rateLimitStore.size <
    500
  ) {
    return;
  }

  for (
    const [
      key,
      entry,
    ] of rateLimitStore.entries()
  ) {
    if (
      entry.resetAt <=
      now
    ) {
      rateLimitStore.delete(
        key,
      );
    }
  }
}

function checkRateLimit(
  request: Request,
): RateLimitResult {
  const now =
    Date.now();

  cleanupRateLimitStore(
    now,
  );

  const key =
    getClientIdentifier(
      request,
    );

  const existing =
    rateLimitStore.get(
      key,
    );

  if (
    !existing ||
    existing.resetAt <= now
  ) {
    rateLimitStore.set(
      key,
      {
        count: 1,
        resetAt:
          now +
          RATE_LIMIT_WINDOW_MS,
      },
    );

    return {
      allowed: true,
      retryAfterSeconds: 0,
    };
  }

  if (
    existing.count >=
    RATE_LIMIT_MAX_REQUESTS
  ) {
    return {
      allowed: false,
      retryAfterSeconds:
        Math.max(
          1,
          Math.ceil(
            (
              existing.resetAt -
              now
            ) / 1000,
          ),
        ),
    };
  }

  existing.count += 1;

  rateLimitStore.set(
    key,
    existing,
  );

  return {
    allowed: true,
    retryAfterSeconds: 0,
  };
}

export async function POST(
  request: Request,
) {
  const rateLimit =
    checkRateLimit(
      request,
    );

  if (
    !rateLimit.allowed
  ) {
    return json(
      {
        ok: false,
        error:
          "Too many searches were submitted from this connection. Please wait a few minutes and try again.",
      },
      429,
      {
        "Retry-After":
          String(
            rateLimit.retryAfterSeconds,
          ),
      },
    );
  }

  let body: SearchRequest;

  try {
    body =
      (await request.json()) as SearchRequest;
  } catch {
    return json(
      {
        ok: false,
        error:
          "Invalid search request.",
      },
      400,
    );
  }

  const firstName =
    normalizeFirstName(
      body.firstName ||
        "",
    );

  const lastName =
    normalizeLastName(
      body.lastName ||
        "",
    );

  /*
    Prefer the new full middle-name field, but
    continue accepting the old middleInitial field
    until the visible checker is upgraded.
  */
  const middleClue =
    normalizeMiddleClue(
      body.middleName ||
        body.middleInitial ||
        "",
    );

  const county =
    normalizeCounty(
      body.county || "",
    );

  if (
    firstName.length <
      2 ||
    lastName.replace(
      /\s/g,
      "",
    ).length < 2
  ) {
    return json(
      {
        ok: false,
        error:
          "Enter both your first and last name.",
      },
      400,
    );
  }

  if (
    body.licenseType &&
    body.licenseType !==
      "sales-associate" &&
    body.licenseType !==
      "broker"
  ) {
    return json(
      {
        ok: false,
        error:
          "Invalid license type.",
      },
      400,
    );
  }

  const bucketKey =
    getNameBucketKey(
      lastName,
    );

  const bucketPath =
    path.join(
      NAME_INDEX_DIR,
      `${bucketKey}.json`,
    );

  let records:
    NameIndexRecord[];

  try {
    const file =
      await fs.readFile(
        bucketPath,
        "utf8",
      );

    records =
      JSON.parse(
        file,
      ) as NameIndexRecord[];
  } catch (error) {
    const nodeError =
      error as NodeJS.ErrnoException;

    if (
      nodeError.code ===
      "ENOENT"
    ) {
      return json({
        ok: true,
        status:
          "no_matches",
        matches: [],
      });
    }

    console.error(
      "Florida license name search failed:",
      error,
    );

    return json(
      {
        ok: false,
        error:
          "The Florida license name search is temporarily unavailable.",
      },
      503,
    );
  }

  /*
    Step 1:
    exact normalized first + last name.
  */
  let matches =
    records.filter(
      (record) =>
        record.f ===
          firstName &&
        record.l ===
          lastName,
    );

  if (
    matches.length === 0
  ) {
    return json({
      ok: true,
      status:
        "no_matches",
      matches: [],
    });
  }

  /*
    Step 2:
    license type, only when supplied.
  */
  if (
    body.licenseType
  ) {
    matches =
      matches.filter(
        (record) =>
          matchesLicenseType(
            record,
            body.licenseType,
          ),
      );
  }

  if (
    matches.length === 0
  ) {
    return json({
      ok: true,
      status:
        "no_matches",
      matches: [],
    });
  }

  if (
    matches.length >
      MAX_VISIBLE_MATCHES &&
    !body.licenseType
  ) {
    return json({
      ok: true,
      status:
        "needs_license_type",
    });
  }

  /*
    Step 3:
    middle name OR middle initial.

    This is intentionally a soft narrowing step:
    records where DBPR supplied no middle name remain
    possible candidates.
  */
  if (middleClue) {
    matches =
      matches.filter(
        (record) =>
          matchesMiddleClue(
            record,
            middleClue,
          ),
      );
  }

  if (
    matches.length === 0
  ) {
    return json({
      ok: true,
      status:
        "no_matches",
      matches: [],
    });
  }

  /*
    Backward compatibility:
    the currently deployed page expects
    "needs_middle_initial".

    The upgraded page will change the wording to
    "Middle name or initial".
  */
  if (
    matches.length >
      MAX_VISIBLE_MATCHES &&
    !middleClue &&
    !body.skipMiddle
  ) {
    return json({
      ok: true,
      status:
        "needs_middle_initial",
    });
  }

  /*
    Step 4:
    county, but only after the easier clues have
    failed to narrow the list enough.
  */
  if (county) {
    matches =
      matches.filter(
        (record) =>
          matchesCounty(
            record,
            county,
          ),
      );
  }

  if (
    matches.length === 0
  ) {
    return json({
      ok: true,
      status:
        "no_matches",
      matches: [],
    });
  }

  if (
    matches.length >
      MAX_VISIBLE_MATCHES &&
    !county &&
    body.supportsCounty
  ) {
    return json({
      ok: true,
      status:
        "needs_county",
      counties:
        availableCounties(
          matches,
        ),
    });
  }

  /*
    While the old live page remains deployed,
    preserve its existing behavior rather than
    sending it a status it does not understand.
  */
  if (
    matches.length >
      MAX_VISIBLE_MATCHES &&
    !body.supportsCounty
  ) {
    return json({
      ok: true,
      status:
        "too_many_matches",
    });
  }

  if (
    matches.length >
    MAX_VISIBLE_MATCHES
  ) {
    return json({
      ok: true,
      status:
        "too_many_matches",
    });
  }

  return json({
    ok: true,
    status:
      "matches",
    matches:
      matches.map(
        publicResult,
      ),
  });
}

export function GET() {
  return json(
    {
      ok: false,
      error:
        "Use the Greyson Institute Florida License Check to search.",
    },
    405,
  );
}
