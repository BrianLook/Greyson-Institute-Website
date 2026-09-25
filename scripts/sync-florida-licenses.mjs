const fs = await import("node:fs/promises");
const path = await import("node:path");

const PUBLIC_RECORDS_URL =
  "https://www2.myfloridalicense.com/real-estate-commission/public-records/";

const SOURCE_URL =
  "https://www2.myfloridalicense.com/sto/file_download/extracts/REALESTATE2501LICENSE_1.csv";

const OUTPUT_DIR = path.join(
  process.cwd(),
  "public",
  "data",
  "florida-real-estate-licenses",
);

const META_FILE = path.join(OUTPUT_DIR, "meta.json");

const buckets = new Map();

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

function normalizeLicenseCode(value) {
  return clean(value)
    .toUpperCase()
    .replace(/[^A-Z]/g, "");
}

function inferLicenseCode(rank) {
  const normalizedRank = clean(rank).toLowerCase();

  if (normalizedRank.includes("sales associate")) {
    return "SL";
  }

  if (normalizedRank.includes("broker")) {
    return "BK";
  }

  return "";
}

function getBucketKey(licenseNumber) {
  const digits = licenseNumber.replace(/\D/g, "");

  return digits.slice(-3).padStart(3, "0");
}

function addRecord(record) {
  const bucketKey = getBucketKey(record.i);

  if (!buckets.has(bucketKey)) {
    buckets.set(bucketKey, []);
  }

  buckets.get(bucketKey).push(record);
}

async function writeMeta(data) {
  await fs.writeFile(
    META_FILE,
    JSON.stringify(data, null, 2),
    "utf8",
  );
}

function extractCookies(response) {
  let cookies = [];

  if (typeof response.headers.getSetCookie === "function") {
    cookies = response.headers.getSetCookie();
  } else {
    const singleCookie = response.headers.get("set-cookie");

    if (singleCookie) {
      cookies = [singleCookie];
    }
  }

  return cookies
    .map((cookie) => cookie.split(";")[0])
    .filter(Boolean)
    .join("; ");
}

async function establishDbprSession() {
  console.log("Opening Florida DBPR public records page...");

  try {
    const response = await fetch(PUBLIC_RECORDS_URL, {
      headers: {
        ...browserHeaders,
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      redirect: "follow",
    });

    console.log(
      `DBPR public records page returned HTTP ${response.status}.`,
    );

    const cookies = extractCookies(response);

    /*
      Consume the response so the request completes fully even though we
      do not need to parse the page content.
    */
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

async function downloadLicenseFile(cookieHeader) {
  console.log("Downloading Florida DBPR real estate license data...");

  const headers = {
    ...browserHeaders,
    Accept: "text/csv,text/plain;q=0.9,*/*;q=0.8",
    Referer: PUBLIC_RECORDS_URL,
  };

  if (cookieHeader) {
    headers.Cookie = cookieHeader;
  }

  const response = await fetch(SOURCE_URL, {
    headers,
    redirect: "follow",
  });

  if (!response.ok) {
    throw new Error(
      `DBPR download returned HTTP ${response.status}`,
    );
  }

  return response;
}

async function syncFloridaLicenses() {
  await fs.rm(OUTPUT_DIR, {
    recursive: true,
    force: true,
  });

  await fs.mkdir(OUTPUT_DIR, {
    recursive: true,
  });

  const fetchedAt = new Date().toISOString();

  try {
    const cookieHeader = await establishDbprSession();

    const response = await downloadLicenseFile(cookieHeader);

    if (!response.body) {
      throw new Error(
        "DBPR response did not contain a readable body.",
      );
    }

    console.log(
      `DBPR download succeeded with HTTP ${response.status}.`,
    );

    const decoder = new TextDecoder("utf-8");
    const reader = response.body.getReader();

    let buffer = "";
    let recordCount = 0;
    let skippedRows = 0;

    function processLine(rawLine) {
      const line = rawLine.replace(/\r$/, "").trim();

      if (!line) {
        return;
      }

      const fields = parseCsvLine(line);

      if (fields.length < 17) {
        skippedRows += 1;
        return;
      }

      const licenseNumberField = clean(fields[11]);

      if (
        licenseNumberField
          .toLowerCase()
          .includes("license number") ||
        licenseNumberField.toLowerCase().includes("lic #")
      ) {
        return;
      }

      const numericLicenseNumber =
        licenseNumberField.replace(/\D/g, "");

      if (!numericLicenseNumber) {
        skippedRows += 1;
        return;
      }

      const rank = clean(fields[3]);

      let licenseCode = normalizeLicenseCode(fields[0]);

      if (!licenseCode || licenseCode.length > 3) {
        licenseCode = inferLicenseCode(rank);
      }

      const fullLicenseNumber =
        `${licenseCode}${numericLicenseNumber}`.toUpperCase();

      /*
        Only retain the fields Greyson needs for the lookup.
        Mailing addresses and other unnecessary public-record fields
        are intentionally discarded.
      */
      const record = {
        i: fullLicenseNumber,
        n: clean(fields[1]),
        r: rank,
        p: clean(fields[12]),
        s: clean(fields[13]),
        o: clean(fields[14]),
        e: clean(fields[15]),
        x: clean(fields[16]),
      };

      addRecord(record);
      recordCount += 1;
    }

    while (true) {
      const { value, done } = await reader.read();

      if (value) {
        buffer += decoder.decode(value, {
          stream: !done,
        });
      }

      let newlineIndex = buffer.indexOf("\n");

      while (newlineIndex !== -1) {
        const line = buffer.slice(0, newlineIndex);
        buffer = buffer.slice(newlineIndex + 1);

        processLine(line);

        newlineIndex = buffer.indexOf("\n");
      }

      if (done) {
        break;
      }
    }

    buffer += decoder.decode();

    if (buffer.trim()) {
      processLine(buffer);
    }

    console.log(
      `Processed ${recordCount.toLocaleString()} Florida real estate license records.`,
    );

    for (const [bucketKey, records] of buckets.entries()) {
      records.sort((a, b) => a.i.localeCompare(b.i));

      const bucketPath = path.join(
        OUTPUT_DIR,
        `${bucketKey}.json`,
      );

      await fs.writeFile(
        bucketPath,
        JSON.stringify(records),
        "utf8",
      );
    }

    const lastModified =
      response.headers.get("last-modified") || null;

    const contentLength =
      response.headers.get("content-length") || null;

    await writeMeta({
      available: true,
      source: "Florida DBPR public records",
      sourceUrl: SOURCE_URL,
      fetchedAt,
      sourceLastModified: lastModified,
      sourceContentLength: contentLength,
      recordCount,
      bucketCount: buckets.size,
      skippedRows,
      nullAndVoidIncluded: false,
      fields: {
        i: "license number",
        n: "licensee name",
        r: "rank",
        p: "primary status",
        s: "secondary status",
        o: "original license date",
        e: "status effective date",
        x: "license expiration date",
      },
    });

    console.log(
      `Created ${buckets.size} lookup files in ${OUTPUT_DIR}.`,
    );
  } catch (error) {
    console.error(
      "Florida DBPR license sync failed:",
      error,
    );

    await writeMeta({
      available: false,
      source: "Florida DBPR public records",
      sourceUrl: SOURCE_URL,
      fetchedAt,
      error:
        error instanceof Error
          ? error.message
          : "Unknown DBPR download error",
      nullAndVoidIncluded: false,
    });

    /*
      Do not fail the Greyson Institute deployment if DBPR temporarily
      blocks or interrupts its download server. The live DBPR search
      remains available as the fallback.
    */
  }
}

await syncFloridaLicenses();
