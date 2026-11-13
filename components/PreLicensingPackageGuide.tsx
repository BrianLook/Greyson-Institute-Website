import Link from "next/link";
import { PartnerEnrollmentButton } from "@/components/PartnerEnrollmentButton";
import type { CeShopCourseKey } from "@/lib/ce-shop-partner";
import { ceShopReferencePrices } from "@/lib/ce-shop-pricing";

type Track = "sales" | "broker";

type Choice = {
  name: string;
  who: string;
  includes: string;
  link: CeShopCourseKey;
  button: string;
  price?: string;
  eyebrow?: string;
  caveat?: string;
};

const salesPackages: Choice[] = [
  {
    name: "Course Only Package",
    who: "I want just the required 63-hour education.",
    includes: "The Florida 63-hour Sales Associate Pre-Licensing course, without the separate Exam Prep Edge study program.",
    link: "floridaPreLicense63CourseOnly",
    button: "View Course Only Package →",
    price: ceShopReferencePrices.sales63.courseOnly,
  },
  {
    name: "Standard Package",
    who: "I want help studying for the state licensing exam, too.",
    includes: "The required 63-hour course plus Florida Sales Associate Exam Prep Edge practice and study tools.",
    link: "floridaPreLicense63Standard",
    button: "View Standard Package →",
    price: ceShopReferencePrices.sales63.standard,
    eyebrow: "STRONG STARTING POINT",
  },
  {
    name: "Value Package",
    who: "I want exam preparation and career-starting skills.",
    includes: "Everything in Standard, plus the ProPath Career Kickstarter program with business planning, networking, and negotiation lessons.",
    link: "floridaPreLicense63Value",
    button: "View Value Package →",
    price: ceShopReferencePrices.sales63.value,
  },
  {
    name: "Premium Package",
    who: "I also want my first-renewal post-license course included.",
    includes: "The 63-hour course, Exam Prep Edge, ProPath Kickstarter, Career Companion eTextbook, and a 45-hour Florida Sales Post-Licensing package.",
    link: "floridaPreLicense63Premium",
    button: "View Premium Package →",
    price: ceShopReferencePrices.sales63.premium,
    eyebrow: "INCLUDES POST-LICENSING",
  },
];

const brokerPackages: Choice[] = [
  {
    name: "Standard Broker Package",
    who: "I need the required 72-hour broker pre-licensing course.",
    includes: "The 72-hour Florida Real Estate Brokerage pre-licensing course. It does not bundle the first broker post-license education.",
    link: "floridaBrokerPreLicense72",
    button: "View Standard Pricing & Details →",
    caveat: "The CE Shop's broker pricing page shows both Standard and Premium. Select Standard there.",
  },
  {
    name: "Premium Broker Package",
    who: "I also want the 60-hour first-renewal broker education included.",
    includes: "The 72-hour broker pre-licensing course plus the 60-hour Broker Post-Licensing education for your first broker renewal.",
    link: "floridaBrokerPreLicense72Premium",
    button: "View Premium Package →",
    eyebrow: "INCLUDES POST-LICENSING",
  },
];

export function PreLicensingPackageGuide({ track }: { track: Track }) {
  const sales = track === "sales";
  const packages = sales ? salesPackages : brokerPackages;
  const title = sales
    ? "Choose your 63-hour Sales Associate course package."
    : "Choose your 72-hour Broker pre-licensing package.";

  return (
    <section
      id="choose-pre-license-package"
      aria-labelledby="pre-license-package-title"
      style={{ marginBottom: "76px", scrollMarginTop: "155px" }}
    >
      <p className="eyebrow">BEFORE YOU ENROLL</p>
      <h2
        id="pre-license-package-title"
        style={{ maxWidth: "850px", marginBottom: "16px" }}
      >
        {title}
      </h2>
      <p
        style={{
          maxWidth: "860px",
          color: "#4d4b46",
          fontSize: "1.04rem",
          lineHeight: 1.75,
          marginBottom: "30px",
        }}
      >
        {sales
          ? "All four packages contain the required Florida 63-hour Sales Associate course. You are choosing which extra study tools and future education you want—not a different license."
          : "Both options include the required 72-hour Florida Broker pre-licensing course. The main difference is whether you also want the future 60-hour broker post-license course bundled."}
        {" "}Choose the option that matches your situation, then review its
        product details and final price at Greyson&apos;s co-branded The CE Shop storefront.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 245px), 1fr))",
          gap: "14px",
        }}
      >
        {packages.map((option) => (
          <article
            key={option.link}
            className="ce-package-choice-card"
            style={{
              minWidth: 0,
              padding: "clamp(22px, 3vw, 32px)",
              display: "flex",
              flexDirection: "column",
              gap: "13px",
              overflowWrap: "anywhere",
            }}
          >
            {option.eyebrow && (
              <p
                className="eyebrow"
                style={{ margin: 0, color: "#7d5f3a", fontSize: "0.69rem" }}
              >
                {option.eyebrow}
              </p>
            )}
            <h3
              style={{
                fontSize: "clamp(1.5rem, 2.7vw, 1.85rem)",
                lineHeight: 1.18,
                margin: 0,
              }}
            >
              {option.name}
            </h3>
            <p
              style={{
                color: "#343633",
                fontWeight: 650,
                lineHeight: 1.55,
                margin: 0,
              }}
            >
              {option.who}
            </p>
            <p
              style={{
                color: "#5e5d58",
                lineHeight: 1.68,
                margin: 0,
              }}
            >
              {option.includes}
            </p>
            {option.price && (
              <div className="ce-package-choice-card__price">
                <span className="ce-package-choice-card__price-label">
                  PUBLISHED REFERENCE PRICE
                </span>
                <div className="ce-package-choice-card__price-values">
                  <strong>{option.price}</strong>
                </div>
              </div>
            )}
            {option.caveat && (
              <p
                style={{
                  color: "#6e5a43",
                  lineHeight: 1.55,
                  fontSize: "0.81rem",
                  margin: 0,
                }}
              >
                {option.caveat}
              </p>
            )}
            <div
              className="ce-package-choice-card__action"
              style={{ paddingTop: "12px", marginTop: "auto" }}
            >
              <PartnerEnrollmentButton
                course={option.link}
                label={option.button}
              />
            </div>
          </article>
        ))}
      </div>

      {sales && (
        <p
          style={{
            marginTop: "20px",
            maxWidth: "900px",
            color: "#5e5d58",
            fontSize: "0.91rem",
            lineHeight: 1.7,
          }}
        >
          <strong>Another option:</strong> The CE Shop also lists a separate
          individual 63-hour licensing course, with a published reference
          price of {ceShopReferencePrices.sales63.individual}.
          It is not the same listing as the{" "}
          {ceShopReferencePrices.sales63.courseOnly} &quot;Course Only Package.&quot;
          You can find the individual course under the{" "}
          <Link
            href="/how-much-does-a-florida-real-estate-license-cost"
            style={{ textDecoration: "underline", fontWeight: 650 }}
          >
            Greyson course-cost guide
          </Link>{" "}
          and compare current details before purchasing.
        </p>
      )}

      <p
        style={{
          marginTop: "20px",
          maxWidth: "900px",
          color: "#6e6b65",
          fontSize: "0.88rem",
          lineHeight: 1.75,
        }}
      >
        {sales
          ? `Published package prices checked ${ceShopReferencePrices.lastChecked}; these are not live prices. Promotions, eligibility, and checkout totals may change.`
          : "To avoid displaying unverified prices, check The CE Shop for the latest Standard and Premium broker prices."}
        {" "}The CE Shop provides all courses, student support, and checkout.
        The state application, fingerprints, and licensing exam are
        separate from these course bundles. Professional-development lessons
        do not replace state-required licensing or renewal education.
        {" "}
        <Link
          href="/find-my-path"
          style={{ textDecoration: "underline", fontWeight: 650 }}
        >
          Not sure which education path you need?
        </Link>
      </p>
    </section>
  );
}
