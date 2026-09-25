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
  skipLicenseType?: boolean;
  middleInitial?: string;
  middleName?: string;
  skipMiddle?: boolean;
  county?: string;
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

  return (
    normalized.split(" ")[0] ||
    ""
  );
}

function normalizeLastName(
  value: string,
) {
  return normalizeSearchText(
    value,
  );
}

function normalizeMiddleClue(
  value: string,
) {
  return normalizeSearchText(
    value,
  );
}

function normalizeCounty(
  value: string,
) {
  return normalizeSearchText(
    value,
  )
    .replace(
      /\s+COUNTY$/,
      "",
    )
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
    licenseType ===
    "broker"
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
    DBPR may leave middle-name information blank.
    A blank value must not eliminate the record.
  */
  if (!recordMiddle) {
    return true;
  }

  if (
    middleClue.length === 1
  ) {
    return (
      recordMiddle.charAt(0) ===
      middleClue
    );
  }

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
    A blank DBPR county is kept as a possible
    record instead of silently excluding someone.
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
    licenseType: record.r,
    primaryStatus: record.p,
    secondaryStatus: record.s,
    expirationDate: record.x,

    /*
      County is safe to use as a limited
      disambiguator. Street address remains
      excluded from Greyson's name search.
    */
    county:
      normalizeCounty(
        record.c || "",
      ),
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
      entry.resetAt <= now
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
    If more than one candidate remains, ask for
    license type unless the user already answered
    or explicitly said they do not know.
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
    matches.length > 1 &&
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
    If more than one remains, use a full middle
    name or just an initial.

    Records where DBPR left the middle field blank
    remain possible candidates.
  */
  if (
    middleClue
  ) {
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
    matches.length > 1 &&
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
    County becomes the last easy disambiguator.

    We ask for it whenever multiple people remain
    AND the records contain more than one useful
    county choice.
  */
  if (
    county
  ) {
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
    matches.length > 1 &&
    !county &&
    body.supportsCounty
  ) {
    const counties =
      availableCounties(
        matches,
      );

    if (
      counties.length > 1
    ) {
      return json({
        ok: true,
        status:
          "needs_county",
        counties,
      });
    }
  }

  /*
    Never return an unrestricted list.
  */
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
