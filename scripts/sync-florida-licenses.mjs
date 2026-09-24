const fs = await import("node:fs/promises");
const path = await import("node:path");

const SOURCE_URL =
  "https://www2.myfloridalicense.com/sto/file_download/extracts//REALESTATE2501LICENSE_1.csv";

const OUTPUT_DIR = path.join(
  process.cwd(),
  "public",
  "data",
  "florida-real-estate-licenses",
);

const META_FILE = path.join(OUTPUT_DIR, "meta.json");

const buckets = new Map();

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
  await fs.writeFile(META_FILE, JSON.stringify(data, null, 2), "utf8");
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
    console.log("Downloading Florida DBPR real estate license data...");

    const response = await fetch(SOURCE_URL, {
      headers: {
        "User-Agent":
          "Greyson Institute public-record license expiration lookup",
      },
    });

    if (!response.ok) {
      throw new Error(
        `DBPR download returned HTTP ${response.status}`,
      );
    }

    if (!response.body) {
      throw new Error("DBPR response did not contain a readable body.");
    }

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
        licenseNumberField.toLowerCase().includes("license number") ||
        licenseNumberField.toLowerCase().includes("lic #")
      ) {
        return;
      }

      const numericLicenseNumber = licenseNumberField.replace(/\D/g, "");

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
      Do not fail the entire Greyson Institute deployment if DBPR's
      download server is temporarily unavailable. The website can still
      fall back to the official live DBPR license search.
    */
  }
}

await syncFloridaLicenses();
