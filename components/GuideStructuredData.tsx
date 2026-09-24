type GuideStructuredDataProps = {
  title: string;
  description: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
};

const baseUrl = "https://greysoninstitute.com";

export function GuideStructuredData({
  title,
  description,
  path,
  datePublished = "2026-09-24",
  dateModified = "2026-09-24",
}: GuideStructuredDataProps) {
  const guideUrl = `${baseUrl}${path}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${guideUrl}#article`,
    headline: title,
    description,
    url: guideUrl,
    inLanguage: "en-US",
    datePublished,
    dateModified,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": guideUrl,
    },
    isPartOf: {
      "@id": `${baseUrl}/guides#webpage`,
    },
    author: {
      "@id": `${baseUrl}/#organization`,
    },
    publisher: {
      "@id": `${baseUrl}/#organization`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(articleSchema),
      }}
    />
  );
}
