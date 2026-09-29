const host = "greysoninstitute.com";
const key = "7f3a9c2e5d814b6fa0c1e9d27b45a8f3";
const keyLocation = `https://${host}/${key}.txt`;
const sitemapUrl = `https://${host}/sitemap.xml`;

async function main() {
  const sitemapResponse = await fetch(sitemapUrl, {
    headers: { "user-agent": "Greyson-Institute-IndexNow/1.0" },
  });

  if (!sitemapResponse.ok) {
    throw new Error(
      `Could not fetch sitemap: ${sitemapResponse.status} ${sitemapResponse.statusText}`,
    );
  }

  const xml = await sitemapResponse.text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)]
    .map((match) => match[1]?.trim())
    .filter(Boolean)
    .filter((url) => url.startsWith(`https://${host}/`) || url === `https://${host}`);

  if (urls.length === 0) {
    throw new Error("No URLs found in sitemap.");
  }

  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      host,
      key,
      keyLocation,
      urlList: urls,
    }),
  });

  if (!response.ok && response.status !== 202) {
    const body = await response.text();
    throw new Error(
      `IndexNow request failed: ${response.status} ${response.statusText} ${body}`,
    );
  }

  console.log(
    `Submitted ${urls.length} Greyson Institute URLs to IndexNow. Status: ${response.status}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
