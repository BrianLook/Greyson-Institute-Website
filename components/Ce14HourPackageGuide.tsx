import Link from "next/link";
import { PartnerEnrollmentButton } from "@/components/PartnerEnrollmentButton";
import type { CeShopCourseKey } from "@/lib/ce-shop-partner";

type PackageOption = {
  title: string;
  description: string;
  includes: string;
  course: CeShopCourseKey;
  label: string;
  highlighted?: boolean;
};

const completePackages: PackageOption[] = [
  {
    title: "Basic 14-Hour CE Package",
    description: "I need all 14 hours for my regular Florida renewal.",
    includes: "3 hours Core Law + 3 hours Ethics and Business Practices + 8 specialty hours.",
    course: "floridaCE14Basic",
    label: "Check Basic Price & Offers →",
    highlighted: true,
  },
  {
    title: "14-Hour CE for REALTORS",
    description: "I want a complete CE package that also covers REALTOR-focused ethics and fair housing topics.",
    includes: "14 Florida CE hours, with NAR Ethics and NAR Fair Housing coursework. Confirm acceptance with your REALTOR association.",
    course: "floridaCE14Realtors",
    label: "Check REALTOR Price & Offers →",
  },
  {
    title: "14-Hour CE Plus ProPath",
    description: "I want my regular 14 CE hours plus additional professional development.",
    includes: "14 Florida CE hours plus ProPath skill-building content. Extra professional development does not count toward the required 14 CE hours.",
    course: "floridaCE14ProPath",
    label: "Check ProPath Price & Offers →",
  },
];

export function Ce14HourPackageGuide() {
  return (
    <section
      id="choose-ce-option"
      aria-labelledby="ce-package-choice-heading"
      style={{
        marginBottom: "72px",
        scrollMarginTop: "145px",
      }}
    >
      <p className="eyebrow">YOU ARE IN THE RIGHT PLACE</p>
      <h2
        id="ce-package-choice-heading"
        style={{ maxWidth: "790px", marginBottom: "16px" }}
      >
        Let&apos;s make choosing your 14-hour course simple.
      </h2>
      <p
        style={{
          maxWidth: "790px",
          color: "#4d4b46",
          fontSize: "1.04rem",
          lineHeight: 1.8,
          marginBottom: "30px",
        }}
      >
        The CE Shop offers different complete packages alongside individual
        classes. If you need all 14 hours for a regular Florida renewal, you
        can choose one complete package rather than picking courses separately.
        Select the option that fits you, and we&apos;ll take you straight to
        that package on Greyson&apos;s co-branded CE Shop website.
      </p>

      <p
        style={{
          color: "#5d5548",
          fontSize: "0.88rem",
          lineHeight: 1.65,
          margin: "-14px 0 26px",
        }}
      >
        Greyson may earn a commission if you enroll through these
        The CE Shop partner links. The CE Shop provides the courses and checkout.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          gap: "14px",
        }}
      >
        {completePackages.map((option) => (
          <article
            key={option.course}
            className="ce-package-choice-card"
            data-recommended={option.highlighted ? "true" : undefined}
            style={{
              minWidth: 0,
              padding: "clamp(22px, 3.5vw, 34px)",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              overflowWrap: "anywhere",
            }}
          >
            {option.highlighted && (
              <p
                className="eyebrow"
                style={{ margin: 0, color: "#7d5f3a" }}
              >
                BEST STARTING POINT FOR MOST RENEWALS
              </p>
            )}
            <h3
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                margin: 0,
                lineHeight: 1.15,
              }}
            >
              {option.title}
            </h3>
            <p
              style={{
                margin: 0,
                color: "#343633",
                fontWeight: 650,
                lineHeight: 1.55,
              }}
            >
              {option.description}
            </p>
            <p style={{ color: "#5e5d58", lineHeight: 1.65, margin: 0 }}>
              {option.includes}
            </p>

            <div className="ce-package-choice-card__price">
              <span className="ce-package-choice-card__price-label">
                TODAY&apos;S PRICE &amp; PROMOTIONS
              </span>
              <strong
                style={{
                  fontFamily: "var(--font-serif), Georgia, serif",
                  fontSize: "clamp(1.35rem, 2.2vw, 1.7rem)",
                  fontWeight: 600,
                  color: "#172b2d",
                  lineHeight: 1.25,
                }}
              >
                See live CE Shop price
              </strong>
              <span className="ce-package-choice-card__price-note">
                A current promotion may lower your price.
              </span>
            </div>
            <div className="ce-package-choice-card__action" style={{ marginTop: "auto", paddingTop: "12px" }}>
              <PartnerEnrollmentButton
                course={option.course}
                label={option.label}
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
          gridTemplateColumns: "minmax(0, 1fr)",
          gap: "12px",
        }}
      >
        <h3 style={{ fontSize: "clamp(1.35rem, 3vw, 1.7rem)", margin: 0 }}>
          Already completed some of your CE hours?
        </h3>
        <p style={{ margin: 0, color: "#4d4b46", lineHeight: 1.65 }}>
          You may only need individual approved classes. Use the full CE Shop
          catalog and scroll to &quot;Individual Courses.&quot; Check your
          completed credits and required subjects before buying additional
          hours.
        </p>
        <div style={{ marginTop: "8px" }}>
          <PartnerEnrollmentButton
            course="floridaContinuingEducation14"
            label="Browse Individual Courses →"
          />
        </div>
      </div>

      <p
        style={{
          marginTop: "20px",
          maxWidth: "850px",
          color: "#6e6b65",
          fontSize: "0.9rem",
          lineHeight: 1.75,
        }}
      >
        These options are for licensees whose verified requirements call for
        standard 14-hour Florida continuing education. First-time renewal,
        inactive, or reactivation cases may require a different program.{" "}
        <Link
          href="/find-my-path?intent=14-hour-ce"
          style={{ fontWeight: 700, textDecoration: "underline" }}
        >
          Not sure? Find your likely path first →
        </Link>
        {" "}The CE Shop manages prices and promotional offers, which can
        change without notice. Choose a package to check today&apos;s available
        price and discount eligibility directly on our co-branded CE Shop
        website. The CE Shop determines the final checkout total and
        provides the education.
      </p>
    </section>
  );
}
