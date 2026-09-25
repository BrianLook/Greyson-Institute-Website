import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NAME_INDEX_DIR = path.join(
  process.cwd(),
  "data",
  "florida-real-estate-name-index",
);

const MAX_VISIBLE_MATCHES = 8;

type NameIndexRecord = {
  i: string;
  n: string;
  r: string;
  p: string;
  s: string;
  x: string;
  f: string;
  l: string;
  m: string;
};

type SearchRequest = {
  firstName?: string;
  lastName?: string;
  licenseType?: "sales-associate" | "broker";
  middleInitial?: string;
};

function normalizeSearchText(value: string) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/&/g, " AND ")
    .replace(/[^A-Z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeFirstName(value: string) {
  const normalized = normalizeSearchText(value);

  /*
    If someone enters a compound given name such as
    "Mary Ann", the private DBPR index stores the first
    given-name token as the primary first name.
  */
  return normalized.split(" ")[0] || "";
}

function normalizeLastName(value: string) {
  return normalizeSearchText(value);
}

function normalizeMiddleInitial(value: string) {
  return normalizeSearchText(value)
    .replace(/[^A-Z]/g, "")
    .charAt(0);
}

function getNameBucketKey(lastName: string) {
  const compact = lastName.replace(
    /[^A-Z0-9]/g,
    "",
  );

  if (!compact) {
    return "OTHER";
  }

  return compact.slice(0, 2).padEnd(2, "_");
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

  if (licenseType === "sales-associate") {
    return (
      licenseNumber.startsWith("SL") ||
      rank.includes("SALES ASSOCIATE")
    );
  }

  if (licenseType === "broker") {
    return (
      licenseNumber.startsWith("BK") ||
      rank.includes("BROKER")
    );
  }

  return true;
}

function publicResult(record: NameIndexRecord) {
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
) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control":
        "no-store, max-age=0",
      "X-Robots-Tag":
        "noindex, nofollow",
    },
  });
}

export async function POST(
  request: Request,
) {
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
    normalizeFirstName(body.firstName || "");

  const lastName =
    normalizeLastName(body.lastName || "");

  const middleInitial =
    normalizeMiddleInitial(
      body.middleInitial || "",
    );

  /*
    Requiring both names prevents this endpoint from
    becoming a broad surname directory.
  */
  if (
    firstName.length < 2 ||
    lastName.replace(/\s/g, "").length < 2
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
    body.licenseType !== "broker"
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
    getNameBucketKey(lastName);

  const bucketPath = path.join(
    NAME_INDEX_DIR,
    `${bucketKey}.json`,
  );

  let records: NameIndexRecord[];

  try {
    const file =
      await fs.readFile(
        bucketPath,
        "utf8",
      );

    records =
      JSON.parse(file) as NameIndexRecord[];
  } catch (error) {
    const nodeError =
      error as NodeJS.ErrnoException;

    if (nodeError.code === "ENOENT") {
      return json({
        ok: true,
        status: "no_matches",
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

  let matches = records.filter(
    (record) =>
      record.f === firstName &&
      record.l === lastName,
  );

  if (body.licenseType) {
    matches = matches.filter(
      (record) =>
        matchesLicenseType(
          record,
          body.licenseType,
        ),
    );
  }

  if (middleInitial) {
    matches = matches.filter(
      (record) =>
        record.m === middleInitial,
    );
  }

  if (matches.length === 0) {
    return json({
      ok: true,
      status: "no_matches",
      matches: [],
    });
  }

  /*
    If the first + last name produces too many people,
    do not send the large list to the browser.
    Ask the user for the easiest additional clue first.
  */
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
    If license type still leaves too many people,
    ask for a middle initial rather than dumping a
    long list of unrelated licensees.
  */
  if (
    matches.length >
      MAX_VISIBLE_MATCHES &&
    !middleInitial
  ) {
    return json({
      ok: true,
      status:
        "needs_middle_initial",
    });
  }

  /*
    Even after narrowing, never expose an unlimited
    list. A very common name can fall back to the
    official DBPR search rather than becoming a
    browsable public directory.
  */
  if (
    matches.length >
    MAX_VISIBLE_MATCHES
  ) {
    return json({
      ok: true,
      status: "too_many_matches",
    });
  }

  return json({
    ok: true,
    status: "matches",
    matches: matches.map(publicResult),
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
