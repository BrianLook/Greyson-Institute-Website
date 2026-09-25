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
    Lets someone continue when they do not know
    whether they are a sales associate or broker.
  */
  skipLicenseType?: boolean;

  /*
    Kept temporarily for backward compatibility
    with the currently deployed visible page.
  */
  middleInitial?: string;

  /*
    New search accepts either a complete middle
    name or a single initial.
  */
  middleName?: string;

  /*
    Lets someone continue if they do not know
    their middle name as DBPR has it recorded,
    or DBPR has no middle name on the record.
  */
  skipMiddle?: boolean;

  county?: string;

  /*
    The upgraded visible form will set this so
    the API knows it can ask for county.
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
      licenseNumber.startsWith("SL") ||
      rank.includes(
        "SALES ASSOCIATE",
      )
    );
  }

  if (
    licenseType === "broker"
  ) {
    return (
      licenseNumber.startsWith("BK") ||
      rank.includes("BROKER")
    );
  }

  return true;
}

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
    Critical behavior:

    If DBPR supplied no middle name or initial,
    do not eliminate the record.

    Jessica's DBPR record is an example of why
    this matters.
  */
  if (!recordMiddle) {
    return true;
  }

  /*
    User supplied one initial.
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
    DBPR has only an initial but the user typed
    their complete middle name.
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
    recordMiddle === middleClue
  ) {
    return true;
  }

  /*
    Supports DBPR records with multiple middle
    tokens without requiring every token.
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

  /*
    Just like middle name, a blank DBPR county
    should not silently eliminate a candidate.
  */
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
      counties.add(county);
    }
  }

  return Array.from(counties)
    .sort()
    .slice(0, 20);
}

function publicResult(
  record: NameIndexRecord,
) {
  return {
    id: record.i,
    name: record.n,
    licenseType: record.r,
    primaryStatus: record.p,
    secondaryStatus: record.s,
    expirationDate: record.x,
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
    rateLimitStore.size < 500
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
      entry.resetAt <= now
    ) {
      rateLimitStore.delete(key);
    }
  }
}

function checkRateLimit(
  request: Request,
): RateLimitResult {
  const now = Date.now();

  cleanupRateLimitStore(now);

  const key =
    getClientIdentifier(
      request,
    );

  const existing =
    rateLimitStore.get(key);

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

  if (!rateLimit.allowed) {
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
      body.firstName || "",
    );

  const lastName =
    normalizeLastName(
      body.lastName || "",
    );

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
    firstName.length < 2 ||
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
    STEP 1:
    First + last name.
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
    STEP 2:
    License type.

    If the user explicitly says they do not know
    the type, skipLicenseType lets the search
    continue instead of asking the same question
    again.
  */
  if (body.licenseType) {
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
    !body.licenseType &&
    !body.skipLicenseType
  ) {
    return json({
      ok: true,
      status:
        "needs_license_type",
    });
  }

  /*
    STEP 3:
    Full middle name OR initial.

    This is a soft filter: records with blank
    DBPR middle information stay in the candidate
    group.
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
    STEP 4:
    County.

    The upgraded UI will only ask for this when
    the earlier, easier clues still leave too
    many candidates.
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
    Backward compatibility for the currently
    deployed UI until we upgrade it next.
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
