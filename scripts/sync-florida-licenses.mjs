const fs = await import("node:fs/promises");
const path = await import("node:path");

const PUBLIC_RECORDS_URL =
  "https://www2.myfloridalicense.com/real-estate-commission/public-records/";

const SOURCE_URL =
  "https://www2.myfloridalicense.com/sto/file_download/extracts/REALESTATE2501LICENSE_1.csv";

const INSTRUCTOR_SOURCE_URL =
  "https://www2.myfloridalicense.com/sto/file_download/extracts/RealEstateSchoolLicense.csv";

const PUBLIC_OUTPUT_DIR = path.join(
  process.cwd(),
  "public",
  "data",
  "florida-real-estate-licenses",
);

const PRIVATE_NAME_INDEX_DIR = path.join(
  process.cwd(),
  "data",
  "florida-real-estate-name-index",
);

const META_FILE = path.join(
  PUBLIC_OUTPUT_DIR,
  "meta.json",
);

const licenseBuckets = new Map();
const nameBuckets = new Map();
const seenLicenseNumbers = new Set();

const suffixes = new Set([
  "JR",
  "SR",
  "II",
  "III",
  "IV",
  "V",
]);

const browserHeaders = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
  "Accept-Language": "en-US,en;q=0.9",
  "Cache-Control": "no-cache",
  Pragma: "no-cache",
};

function parseCsvLine(line) {
  const fields = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const character = line[i];

    if (character === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }

      continue;
    }

    if (character === "," && !inQuotes) {
      fields.push(current.trim());
      current = "";
      continue;
    }

    current += character;
  }

  fields.push(current.trim());

  return fields;
}

function clean(value) {
  return String(value ?? "").trim();
}

function normalizeSearchText(value) {
  return clean(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/&/g, " AND ")
    .replace(/[^A-Z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function removeSuffixTokens(tokens) {
  return tokens.filter(
    (token) => !suffixes.has(token),
  );
}

function parseLicensedName(value) {
  const originalName = clean(value);

  if (!originalName) {
    return null;
  }

  const commaParts = originalName
    .split(",")
    .map((part) =>
      normalizeSearchText(part),
    )
    .filter(Boolean);

  if (commaParts.length >= 2) {
    const lastName = commaParts[0];

    const givenTokens =
      removeSuffixTokens(
        commaParts
          .slice(1)
          .join(" ")
          .split(" ")
          .filter(Boolean),
      );

    if (
      !lastName ||
      givenTokens.length === 0
    ) {
      return null;
    }

    const firstName =
      givenTokens[0];

    const middleName =
      givenTokens
        .slice(1)
        .join(" ");

    const middleInitial =
      middleName
        ? middleName.charAt(0)
        : "";

    return {
      firstName,
      lastName,
      middleName,
      middleInitial,
    };
  }

  const tokens =
    removeSuffixTokens(
      normalizeSearchText(
        originalName,
      )
        .split(" ")
        .filter(Boolean),
    );

  if (tokens.length < 2) {
    return null;
  }

  const firstName =
    tokens[0];

  const lastName =
    tokens[
      tokens.length - 1
    ];

  const middleName =
    tokens
      .slice(1, -1)
      .join(" ");

  const middleInitial =
    middleName
      ? middleName.charAt(0)
      : "";

  return {
    firstName,
    lastName,
    middleName,
    middleInitial,
  };
}

function normalizeLicenseCode(value) {
  return clean(value)
    .toUpperCase()
    .replace(/[^A-Z]/g, "");
}

function inferLicenseCode(rank) {
  const normalizedRank =
    clean(rank).toLowerCase();

  if (
    normalizedRank.includes(
      "sales associate",
    )
  ) {
    return "SL";
  }

  if (
    normalizedRank.includes(
      "broker",
    )
  ) {
    return "BK";
  }

  if (
    normalizedRank.includes(
      "instructor",
    )
  ) {
    return "ZH";
  }

  return "";
}

function isSupportedRank(rank) {
  const normalizedRank =
    clean(rank).toLowerCase();

  return (
    normalizedRank.includes(
      "sales associate",
    ) ||
    normalizedRank.includes(
      "broker",
    ) ||
    normalizedRank.includes(
      "instructor",
    )
  );
}

function getLicenseBucketKey(
  licenseNumber,
) {
  const digits =
    licenseNumber.replace(
      /\D/g,
      "",
    );

  return digits
    .slice(-3)
    .padStart(3, "0");
}

function getNameBucketKey(
  lastName,
) {
  const compact =
    normalizeSearchText(
      lastName,
    ).replace(
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

function addLicenseRecord(
  record,
) {
  const bucketKey =
    getLicenseBucketKey(
      record.i,
    );

  if (
    !licenseBuckets.has(
      bucketKey,
    )
  ) {
    licenseBuckets.set(
      bucketKey,
      [],
    );
  }

  licenseBuckets
    .get(bucketKey)
    .push(record);
}

function addNameRecord(
  record,
  countyName,
) {
  const parsedName =
    parseLicensedName(
      record.n,
    );

  if (!parsedName) {
    return false;
  }

  const bucketKey =
    getNameBucketKey(
      parsedName.lastName,
    );

  if (
    !nameBuckets.has(
      bucketKey,
    )
  ) {
    nameBuckets.set(
      bucketKey,
      [],
    );
  }

  nameBuckets
    .get(bucketKey)
    .push({
      i: record.i,
      n: record.n,
      r: record.r,
      p: record.p,
      s: record.s,
      x: record.x,
      f: parsedName.firstName,
      l: parsedName.lastName,
      mn:
        parsedName.middleName,
      m:
        parsedName.middleInitial,
      c:
        normalizeSearchText(
          countyName,
        ),
    });

  return true;
}

async function writeMeta(
  data,
) {
  await fs.writeFile(
    META_FILE,
    JSON.stringify(
      data,
      null,
      2,
    ),
    "utf8",
  );
}

function extractCookies(
  response,
) {
  let cookies = [];

  if (
    typeof response.headers
      .getSetCookie ===
    "function"
  ) {
    cookies =
      response.headers
        .getSetCookie();
  } else {
    const singleCookie =
      response.headers.get(
        "set-cookie",
      );

    if (singleCookie) {
      cookies = [
        singleCookie,
      ];
    }
  }

  return cookies
    .map(
      (cookie) =>
        cookie.split(";")[0],
    )
    .filter(Boolean)
    .join("; ");
}

async function establishDbprSession() {
  console.log(
    "Opening Florida DBPR public records page...",
  );

  try {
    const response =
      await fetch(
        PUBLIC_RECORDS_URL,
        {
          headers: {
            ...browserHeaders,
            Accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          },
          redirect:
            "follow",
        },
      );

    console.log(
      `DBPR public records page returned HTTP ${response.status}.`,
    );

    const cookies =
      extractCookies(
        response,
      );

    await response.text();

    return cookies;
  } catch (error) {
    console.warn(
      "Could not establish DBPR browser session. Trying download anyway.",
      error,
    );

    return "";
  }
}

async function downloadLicenseFile(
  sourceUrl,
  label,
  cookieHeader,
) {
  console.log(
    `Downloading Florida DBPR ${label} data...`,
  );

  const headers = {
    ...browserHeaders,
    Accept:
      "text/csv,text/plain;q=0.9,*/*;q=0.8",
    Referer:
      PUBLIC_RECORDS_URL,
  };

  if (cookieHeader) {
    headers.Cookie =
      cookieHeader;
  }

  const response =
    await fetch(
      sourceUrl,
      {
        headers,
        redirect:
          "follow",
      },
    );

  if (!response.ok) {
    throw new Error(
      `DBPR ${label} download returned HTTP ${response.status}`,
    );
  }

  return response;
}

async function prepareOutputDirectories() {
  await fs.rm(
    PUBLIC_OUTPUT_DIR,
    {
      recursive: true,
      force: true,
    },
  );

  await fs.rm(
    PRIVATE_NAME_INDEX_DIR,
    {
      recursive: true,
      force: true,
    },
  );

  await fs.mkdir(
    PUBLIC_OUTPUT_DIR,
    {
      recursive: true,
    },
  );

  await fs.mkdir(
    PRIVATE_NAME_INDEX_DIR,
    {
      recursive: true,
    },
  );
}

async function writeLicenseBuckets() {
  for (
    const [
      bucketKey,
      records,
    ] of licenseBuckets
  ) {
    records.sort(
      (a, b) =>
        a.i.localeCompare(
          b.i,
        ),
    );

    const bucketPath =
      path.join(
        PUBLIC_OUTPUT_DIR,
        `${bucketKey}.json`,
      );

    await fs.writeFile(
      bucketPath,
      JSON.stringify(
        records,
      ),
      "utf8",
    );
  }
}

async function writeNameBuckets() {
  for (
    const [
      bucketKey,
      records,
    ] of nameBuckets
  ) {
    records.sort(
      (a, b) => {
        const lastCompare =
          a.l.localeCompare(
            b.l,
          );

        if (
          lastCompare !== 0
        ) {
          return lastCompare;
        }

        const firstCompare =
          a.f.localeCompare(
            b.f,
          );

        if (
          firstCompare !== 0
        ) {
          return firstCompare;
        }

        return a.n.localeCompare(
          b.n,
        );
      },
    );

    const bucketPath =
      path.join(
        PRIVATE_NAME_INDEX_DIR,
        `${bucketKey}.json`,
      );

    await fs.writeFile(
      bucketPath,
      JSON.stringify(
        records,
      ),
      "utf8",
    );
  }
}

function createSyncState() {
  return {
    recordCount: 0,
    skippedRows: 0,
    nameIndexRecordCount: 0,
  };
}

function processLine(
  rawLine,
  state,
) {
  const line =
    rawLine
      .replace(
        /\r$/,
        "",
      )
      .trim();

  if (!line) {
    return;
  }

  const fields =
    parseCsvLine(
      line,
    );

  if (
    fields.length < 17
  ) {
    state.skippedRows += 1;
    return;
  }

  const licenseNumberField =
    clean(
      fields[11],
    );

  const loweredLicenseField =
    licenseNumberField
      .toLowerCase();

  if (
    loweredLicenseField.includes(
      "license number",
    ) ||
    loweredLicenseField.includes(
      "lic #",
    )
  ) {
    return;
  }

  const numericLicenseNumber =
    licenseNumberField.replace(
      /\D/g,
      "",
    );

  if (
    !numericLicenseNumber
  ) {
    state.skippedRows += 1;
    return;
  }

  const rank =
    clean(
      fields[3],
    );

  if (
    !isSupportedRank(
      rank,
    )
  ) {
    return;
  }

  const countyName =
    clean(
      fields[10],
    );

  let licenseCode =
    normalizeLicenseCode(
      fields[0],
    );

  if (
    !licenseCode ||
    licenseCode.length > 3
  ) {
    licenseCode =
      inferLicenseCode(
        rank,
      );
  }

  if (!licenseCode) {
    state.skippedRows += 1;
    return;
  }

  const fullLicenseNumber =
    `${licenseCode}${numericLicenseNumber}`
      .toUpperCase();

  if (
    seenLicenseNumbers.has(
      fullLicenseNumber,
    )
  ) {
    return;
  }

  seenLicenseNumbers.add(
    fullLicenseNumber,
  );

  const record = {
    i:
      fullLicenseNumber,
    n:
      clean(
        fields[1],
      ),
    r:
      rank,
    p:
      clean(
        fields[12],
      ),
    s:
      clean(
        fields[13],
      ),
    o:
      clean(
        fields[14],
      ),
    e:
      clean(
        fields[15],
      ),
    x:
      clean(
        fields[16],
      ),
  };

  addLicenseRecord(
    record,
  );

  if (
    addNameRecord(
      record,
      countyName,
    )
  ) {
    state.nameIndexRecordCount +=
      1;
  }

  state.recordCount += 1;
}

async function processResponseBody(
  response,
  state,
) {
  if (!response.body) {
    throw new Error(
      "DBPR response did not contain a readable body.",
    );
  }

  const decoder =
    new TextDecoder(
      "utf-8",
    );

  const reader =
    response.body.getReader();

  let buffer = "";

  while (true) {
    const {
      value,
      done,
    } =
      await reader.read();

    if (value) {
      buffer +=
        decoder.decode(
          value,
          {
            stream:
              !done,
          },
        );
    }

    let newlineIndex =
      buffer.indexOf(
        "\n",
      );

    while (
      newlineIndex !==
      -1
    ) {
      const line =
        buffer.slice(
          0,
          newlineIndex,
        );

      buffer =
        buffer.slice(
          newlineIndex + 1,
        );

      processLine(
        line,
        state,
      );

      newlineIndex =
        buffer.indexOf(
          "\n",
        );
    }

    if (done) {
      break;
    }
  }

  buffer +=
    decoder.decode();

  if (
    buffer.trim()
  ) {
    processLine(
      buffer,
      state,
    );
  }
}

async function syncFloridaLicenses() {
  const fetchedAt =
    new Date().toISOString();

  try {
    const cookieHeader =
      await establishDbprSession();

    const response =
      await downloadLicenseFile(
        SOURCE_URL,
        "real estate license",
        cookieHeader,
      );

    let instructorResponse =
      null;

    let instructorSourceError =
      null;

    try {
      instructorResponse =
        await downloadLicenseFile(
          INSTRUCTOR_SOURCE_URL,
          "real estate instructor",
          cookieHeader,
        );
    } catch (error) {
      instructorSourceError =
        error instanceof Error
          ? error.message
          : "Unknown instructor download error";

      console.warn(
        "Florida DBPR instructor download failed. Continuing with the main license file.",
        error,
      );
    }

    await prepareOutputDirectories();

    const state =
      createSyncState();

    await processResponseBody(
      response,
      state,
    );

    if (
      instructorResponse
    ) {
      await processResponseBody(
        instructorResponse,
        state,
      );
    }

    console.log(
      `Processed ${state.recordCount.toLocaleString()} supported Florida real estate records.`,
    );

    console.log(
      `Indexed ${state.nameIndexRecordCount.toLocaleString()} records for private name search.`,
    );

    await writeLicenseBuckets();

    await writeNameBuckets();

    const lastModified =
      response.headers.get(
        "last-modified",
      ) || null;

    const contentLength =
      response.headers.get(
        "content-length",
      ) || null;

    const instructorLastModified =
      instructorResponse
        ?.headers
        .get(
          "last-modified",
        ) || null;

    const instructorContentLength =
      instructorResponse
        ?.headers
        .get(
          "content-length",
        ) || null;

    await writeMeta({
      available:
        true,
      source:
        "Florida DBPR public records",
      sourceUrl:
        SOURCE_URL,
      instructorSourceUrl:
        INSTRUCTOR_SOURCE_URL,
      instructorSourceAvailable:
        Boolean(
          instructorResponse,
        ),
      instructorSourceError,
      fetchedAt,
      sourceLastModified:
        lastModified,
      sourceContentLength:
        contentLength,
      instructorSourceLastModified:
        instructorLastModified,
      instructorSourceContentLength:
        instructorContentLength,
      recordCount:
        state.recordCount,
      bucketCount:
        licenseBuckets.size,
      skippedRows:
        state.skippedRows,
      nullAndVoidIncluded:
        false,
      nameSearchIndex: {
        available:
          true,
        recordCount:
          state.nameIndexRecordCount,
        bucketCount:
          nameBuckets.size,
        public:
          false,
        middleNameAvailable:
          true,
        countyAvailable:
          true,
        instructorRecordsIncluded:
          Boolean(
            instructorResponse,
          ),
      },
      fields: {
        i:
          "license number",
        n:
          "licensee name",
        r:
          "rank",
        p:
          "primary status",
        s:
          "secondary status",
        o:
          "original license date",
        e:
          "status effective date",
        x:
          "license expiration date",
      },
    });

    console.log(
      `Created ${licenseBuckets.size} public license lookup files.`,
    );

    console.log(
      `Created ${nameBuckets.size} private name-search files with middle-name and county support.`,
    );
  } catch (error) {
    console.error(
      "Florida DBPR license sync failed:",
      error,
    );

    await fs.mkdir(
      PUBLIC_OUTPUT_DIR,
      {
        recursive:
          true,
      },
    );

    await writeMeta({
      available:
        false,
      source:
        "Florida DBPR public records",
      sourceUrl:
        SOURCE_URL,
      instructorSourceUrl:
        INSTRUCTOR_SOURCE_URL,
      fetchedAt,
      error:
        error instanceof Error
          ? error.message
          : "Unknown DBPR download error",
      nullAndVoidIncluded:
        false,
      nameSearchIndex: {
        available:
          false,
        public:
          false,
      },
    });
  }
}

await syncFloridaLicenses();
