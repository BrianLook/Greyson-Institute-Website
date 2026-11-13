import Link from "next/link";
import { PartnerEnrollmentButton } from "@/components/PartnerEnrollmentButton";
import type { CeShopCourseKey } from "@/lib/ce-shop-partner";

type PostLicenseTrack = "sales" | "broker";

type PackageOption = {
  name: string;
  audience: string;
  content: string;
  link: CeShopCourseKey;
  action: string;
  tag?: string;
};

const tracks: Record<
  PostLicenseTrack,
  {
    hours: number;
    license: string;
    intro: string;
    catalogLink: CeShopCourseKey;
    choices: PackageOption[];
  }
> = {
  sales: {
    hours: 45,
    license: "Sales Associate",
    intro:
      "For most Florida sales associates completing their first license renewal, a complete approved 45-hour post-license package is the simplest option. These packages satisfy the same 45-hour education requirement but cover different subjects.",
    catalogLink: "floridaPostLicense45",
    choices: [
      {
        name: "45-Hour Package #1",
        audience: "I'd like a broad mix of practical real estate business courses.",
        content:
          "15 hours Business Planning, 15 hours Finance & Economics, and 15 hours Market Specialties.",
        link: "floridaPostLicense45Package1",
        action: "View Package #1 & Price →",
        tag: "GENERAL BUSINESS TOPICS",
      },
      {
        name: "45-Hour Package #2",
        audience: "I'm interested in learning more about real estate appraisal.",
        content:
          "30 hours Real Estate Appraisal and 15 hours Business Planning.",
        link: "floridaPostLicense45Package2",
        action: "View Package #2 & Price →",
        tag: "APPRAISAL FOCUS",
      },
      {
        name: "45-Hour Plus Professional Development",
        audience: "I want the 45-hour requirement plus additional business-building lessons.",
        content:
          "The same 45-hour subject mix as Package #1, plus additional professional-development content. Those extras do not replace or count toward the required 45 post-license hours.",
        link: "floridaPostLicense45ProPath",
        action: "View Plus Professional Development →",
        tag: "WITH PROFESSIONAL DEVELOPMENT",
      },
    ],
  },
  broker: {
    hours: 60,
    license: "Broker",
    intro:
      "For most Florida brokers and broker associates completing their first broker renewal, the standard complete 60-hour post-license package is a straightforward choice. The upgraded package includes the same required coursework plus optional professional development.",
    catalogLink: "floridaBrokerPostLicense60",
    choices: [
      {
        name: "60-Hour Broker Package",
        audience: "I just need my required broker post-license education.",
        content:
          "30 hours Real Estate Finance plus 30 hours Real Estate Brokerage. Covers the standard first-renewal requirement.",
        link: "floridaBrokerPostLicense60Standard",
        action: "View Standard Package & Price →",
        tag: "COMPLETE 60 HOURS",
      },
      {
        name: "60-Hour Broker Plus Professional Development",
        audience: "I'd like the required broker courses plus business-building skills.",
        content:
          "The same 60 hours of Finance and Brokerage, plus additional professional-development content that does not count toward the required 60 hours.",
        link: "floridaBrokerPostLicense60ProPath",
        action: "View Plus Professional Development →",
        tag: "WITH PROFESSIONAL DEVELOPMENT",
      },
    ],
  },
};

export function PostLicensePackageGuide({
  track,
}: {
  track: PostLicenseTrack;
}) {
  const data = tracks[track];

  return (
    <section
      id="choose-post-license-package"
      aria-labelledby="choose-post-license-heading"
      style={{ marginBottom: "78px", scrollMarginTop: "155px" }}
    >
      <p className="eyebrow">LET&apos;S MAKE THIS SIMPLE</p>
      <h2
        id="choose-post-license-heading"
        style={{ maxWidth: "830px", marginBottom: "16px" }}
      >
        Choose your {data.hours}-hour {data.license.toLowerCase()} post-license package.
      </h2>
      <p
        style={{
          maxWidth: "840px",
          color: "#4d4b46",
          fontSize: "1.05rem",
          lineHeight: 1.8,
          marginBottom: "30px",
        }}
      >
        {data.intro} Each button opens the individual package page on
        Greyson&apos;s co-branded The CE Shop storefront, where you can
        review current pricing and the full course details before purchasing.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          gap: "14px",
        }}
      >
        {data.choices.map((choice) => (
          <article
            key={choice.link}
            className="ce-package-choice-card"
            style={{
              minWidth: 0,
              padding: "clamp(22px, 3.5vw, 32px)",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              overflowWrap: "anywhere",
            }}
          >
            {choice.tag && (
              <p
                className="eyebrow"
                style={{ color: "#7d5f3a", margin: 0, fontSize: "0.7rem" }}
              >
                {choice.tag}
              </p>
            )}

            <h3
              style={{
                margin: 0,
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                lineHeight: 1.17,
              }}
            >
              {choice.name}
            </h3>

            <p
              style={{
                color: "#343633",
                fontWeight: 650,
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {choice.audience}
            </p>

            <p
              style={{
                color: "#5e5d58",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              {choice.content}
            </p>

            <p
              style={{
                fontSize: "0.83rem",
                color: "#6e6b65",
                margin: "0 0 6px",
              }}
            >
              Current price shown on The CE Shop
            </p>

            <div
              className="ce-package-choice-card__action"
              style={{ marginTop: "auto" }}
            >
              <PartnerEnrollmentButton
                course={choice.link}
                label={choice.action}
              />
            </div>
          </article>
        ))}
      </div>

      <div
        className="ce-package-choice-individual"
        style={{
          marginTop: "16px",
          padding: "clamp(22px, 3.5vw, 30px)",
          background: "#f6f1e9",
          border: "1px solid rgba(17, 23, 23, 0.16)",
          display: "grid",
          gap: "14px",
        }}
      >
        <h3
          style={{
            fontSize: "clamp(1.35rem, 3vw, 1.7rem)",
            margin: 0,
          }}
        >
          Already completed part of your {data.hours} hours?
        </h3>
        <p style={{ color: "#4d4b46", lineHeight: 1.7, margin: 0 }}>
          The CE Shop also offers individual post-license courses. Review
          your existing course completion records and verify which
          approved hours you still need before purchasing anything else.
        </p>
        <div>
          <PartnerEnrollmentButton
            course={data.catalogLink}
            label="Browse Individual Courses →"
          />
        </div>
      </div>

      <p
        style={{
          marginTop: "18px",
          maxWidth: "900px",
          color: "#6e6b65",
          fontSize: "0.9rem",
          lineHeight: 1.75,
        }}
      >
        These options are for qualifying first-renewal post-license
        education, not regular 14-hour continuing education or
        first-time pre-licensing. Verify your license type, current DBPR
        status, and first-renewal deadline before enrolling.{" "}
        <Link
          href="/find-my-path"
          style={{ fontWeight: 700, textDecoration: "underline" }}
        >
          Check my likely education path →
        </Link>{" "}
        Prices, promotions, and course availability are controlled
        by The CE Shop and may change.
      </p>
    </section>
  );
}
