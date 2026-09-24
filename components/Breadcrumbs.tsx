import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href: string;
  current?: boolean;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

const baseUrl = "https://greysoninstitute.com";

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${baseUrl}${item.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <style>
        {`
          .breadcrumb-nav {
            margin-bottom: 34px;
          }

          .breadcrumb-list {
            list-style: none;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 9px;
            margin: 0;
            padding: 0;
            font-size: 0.78rem;
            line-height: 1.5;
          }

          .breadcrumb-item {
            display: inline-flex;
            align-items: center;
            gap: 9px;
            min-width: 0;
          }

          .breadcrumb-link {
            color: #6e6b65;
            text-decoration: underline;
            text-decoration-thickness: 1px;
            text-underline-offset: 3px;
            transition: color 0.2s ease;
          }

          .breadcrumb-current {
            color: #111717;
            font-weight: 600;
          }

          .breadcrumb-separator {
            color: #9b9388;
            user-select: none;
          }

          @media (hover: hover) and (pointer: fine) {
            .breadcrumb-link:hover {
              color: #7d5f3a;
            }
          }

          @media (max-width: 600px) {
            .breadcrumb-nav {
              margin-bottom: 26px;
            }

            .breadcrumb-list {
              font-size: 0.74rem;
            }
          }
        `}
      </style>

      <nav className="breadcrumb-nav" aria-label="Breadcrumb">
        <ol className="breadcrumb-list">
          {items.map((item, index) => (
            <li className="breadcrumb-item" key={item.href}>
              {index > 0 && (
                <span className="breadcrumb-separator" aria-hidden="true">
                  ›
                </span>
              )}

              {item.current ? (
                <span className="breadcrumb-current" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link className="breadcrumb-link" href={item.href}>
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
