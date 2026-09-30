import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GuideStructuredData } from "@/components/GuideStructuredData";
import { LicenseExpirationPromo } from "@/components/LicenseExpirationPromo";
import { PartnerEnrollmentButton } from "@/components/PartnerEnrollmentButton";

const guideTitle =
  "Florida Real Estate License Reactivation: 14-Hour vs. 28-Hour Education";
const guideDescription =
  "Understand Florida real estate license reactivation, including when 14 hours or 28 hours of education may apply, the two-year involuntary-inactive window, and why first-renewal cases are different.";
const guidePath = "/florida-real-estate-license-reactivation";

export const metadata: Metadata = {
  title: "Florida Real Estate License Reactivation | 14 vs 28 Hours",
  description: guideDescription,
};

const paths = [
  {
    label: "12 months or less",
    title: "At least 14 hours of prescribed continuing education",
    body:
      "Florida Statute 475.183 provides that a license involuntarily inactive for 12 months or less may be reactivated after completing at least 14 hours of Commission-prescribed continuing education, along with the other applicable renewal requirements.",
  },
  {
    label: "More than 12, fewer than 24 months",
    title: "28-hour reactivation education",
    body:
      "For an involuntarily inactive license beyond 12 months but still under 24 months, Florida law provides for 28 hours of Commission-prescribed reactivation education, along with the other applicable renewal requirements.",
  },
  {
    label: "More than 2 years",
    title: "The standard reactivation window has ended",
    body:
      "Florida law provides that a license involuntarily inactive for more than two years automatically expires and becomes null and void. A separate hardship process may exist in qualifying circumstances, so contact DBPR before purchasing education.",
  },
];

const faqItems = [
  {
    question: "Is every involuntarily inactive Florida license a 28-hour course?",
    answer:
      "Not necessarily. Florida Statute 475.183 distinguishes between licenses involuntarily inactive for 12 months or less and those inactive for more than 12 months but fewer than 24 months. Your exact status, dates, renewal history, fees, and other requirements matter.",
  },
  {
    question: "What if this was my first renewal?",
    answer:
      "First-renewal post-license requirements are different from a normal continuing-education lapse. A Florida sales associate who misses the required 45-hour post-license education by the initial expiration can become null and void. Brokers also have a separate first-renewal post-license requirement. Verify with DBPR before buying a reactivation course.",
  },
  {
    question: "Does completing the education automatically reactivate my license?",
    answer:
      "No. Education is only one part of the process. You may also have renewal fees, application or account steps, and other DBPR requirements. Confirm your live record and complete every required step by the applicable deadline.",
  },
  {
    question: "Can Greyson tell me which path most likely applies?",
    answer:
      "Greyson's Find My Path tool uses available Florida license records and your renewal-history answer to identify the likely education path. It is guidance, not a DBPR determination, so always verify the live record before purchasing education.",
  },
];

export default function FloridaRealEstateLicenseReactivationPage() {
  return (
    <section
      className="page-hero"
      style={{
        paddingBottom: "100px",
      }}
    >
      <GuideStructuredData
        title={guideTitle}
        description={guideDescription}
        path={guidePath}
        datePublished="2026-09-30"
        dateModified="2026-09-30"
      />

      <div
        className="container"
        style={{
          maxWidth: "1040px",
          minWidth: 0,
        }}
      >
        <Breadcrumbs
          items={[
            {
              label: "Home",
              href: "/",
            },
            {
              label: "Guides",
              href: "/guides",
            },
            {
              label: guideTitle,
              href: guidePath,
              current: true,
            },
          ]}
        />

        <div
          style={{
            maxWidth: "900px",
            marginBottom: "64px",
          }}
        >
          <p className="eyebrow">FLORIDA LICENSE REACTIVATION</p>

          <h1 style={{ overflowWrap: "anywhere" }}>
            Florida Real Estate License Reactivation: 14 Hours vs. 28 Hours
          </h1>

          <p
            className="page-lead"
            style={{
              maxWidth: "820px",
            }}
          >
            An involuntarily inactive Florida real estate license can follow
            different education paths depending on how long it has been
            inactive and whether the missed deadline was your first renewal.
            Start with your actual license record before buying a course.
          </p>

          <p className="muted">Last reviewed: September 30, 2026</p>
        </div>

        <div
          style={{
            background: "#1f2d30",
            color: "#f5f0e7",
            padding: "clamp(34px, 6vw, 58px)",
            marginBottom: "72px",
          }}
        >
          <p className="eyebrow eyebrow--light">QUICK ANSWER</p>

          <h2
            className="light-heading"
            style={{
              maxWidth: "850px",
              marginBottom: "20px",
            }}
          >
            The clock matters: 12 months or less can be different from more
            than 12 months.
          </h2>

          <p
            style={{
              color: "rgba(245, 240, 231, 0.82)",
              maxWidth: "860px",
              marginBottom: 0,
              lineHeight: 1.75,
            }}
          >
            Florida Statute 475.183 provides at least 14 hours of prescribed
            continuing education for an involuntarily inactive license of 12
            months or less, and 28 hours of prescribed reactivation education
            when the license has been involuntarily inactive for more than 12
            months but fewer than 24 months. Other renewal requirements still
            apply.
          </p>
        </div>

        <div style={{ marginBottom: "72px" }}>
          <LicenseExpirationPromo
            eyebrow="CHECK BEFORE YOU BUY"
            title="Start with your Florida license record."
            text="Use Greyson's Florida License Check and Find My Path tools to review the latest available weekly DBPR record. Your status, expiration date, and whether this was your first renewal can change the education path."
          />
        </div>

        <div style={{ marginBottom: "82px" }}>
          <p className="eyebrow">THE STANDARD PATHS</p>

          <h2
            style={{
              maxWidth: "820px",
              marginBottom: "36px",
            }}
          >
            How Florida law separates the reactivation window
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
              gap: "18px",
            }}
          >
            {paths.map((item) => (
              <article
                key={item.label}
                style={{
                  border: "1px solid rgba(17, 23, 23, 0.16)",
                  background: "#faf7f1",
                  padding: "30px",
                }}
              >
                <p
                  className="eyebrow"
                  style={{
                    marginBottom: "14px",
                  }}
                >
                  {item.label}
                </p>

                <h3
                  style={{
                    fontSize: "1.55rem",
                    marginBottom: "14px",
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    color: "#4d4b46",
                    margin: 0,
                    lineHeight: 1.75,
                  }}
                >
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div
          style={{
            background: "#eee6d9",
            border: "1px solid rgba(17, 23, 23, 0.14)",
            padding: "clamp(30px, 5vw, 48px)",
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">FIRST RENEWAL IS DIFFERENT</p>

          <h2
            style={{
              maxWidth: "830px",
              marginBottom: "18px",
            }}
          >
            Do not use the normal reactivation path if the missed deadline was
            your first renewal without checking first.
          </h2>

          <p
            style={{
              color: "#4d4b46",
              maxWidth: "860px",
            }}
          >
            Florida sales associates generally need 45 hours of post-license
            education for the first renewal, while brokers and broker associates
            generally need 60 hours. Missing the required first-renewal
            post-license education can result in a null-and-void license rather
            than the normal continuing-education reactivation path.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "14px",
              marginTop: "24px",
            }}
          >
            <Link
              className="button"
              href="/florida-45-hour-post-license-requirements"
            >
              Sales Associate First Renewal
            </Link>

            <Link
              href="/florida-60-hour-broker-post-license-requirements"
              style={{
                minHeight: "48px",
                padding: "0 20px",
                border: "1px solid #111717",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 600,
              }}
            >
              Broker First Renewal
            </Link>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(17, 23, 23, 0.18)",
            borderBottom: "1px solid rgba(17, 23, 23, 0.18)",
            padding: "34px 0",
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">IMPORTANT</p>

          <h2 style={{ maxWidth: "820px" }}>
            Education alone does not complete the renewal.
          </h2>

          <p
            style={{
              color: "#4d4b46",
              maxWidth: "850px",
            }}
          >
            A licensee may still need to complete DBPR renewal steps, pay
            required fees, and satisfy any other requirements shown on the live
            license record. Verify the record directly with DBPR before relying
            on a course purchase as the complete solution.
          </p>

          <a
            href="https://www.myfloridalicense.com/portalsearches/VerifyLicensee"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontWeight: 700,
              textDecoration: "underline",
              textUnderlineOffset: "4px",
            }}
          >
            Verify your live Florida DBPR record ↗
          </a>
        </div>

        <div style={{ marginBottom: "82px" }}>
          <p className="eyebrow">FREQUENTLY ASKED QUESTIONS</p>

          <h2
            style={{
              maxWidth: "820px",
              marginBottom: "34px",
            }}
          >
            Florida reactivation questions
          </h2>

          <div
            style={{
              borderTop: "1px solid rgba(17, 23, 23, 0.18)",
            }}
          >
            {faqItems.map((item) => (
              <article
                key={item.question}
                style={{
                  padding: "26px 0",
                  borderBottom: "1px solid rgba(17, 23, 23, 0.18)",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.35rem",
                    marginBottom: "10px",
                  }}
                >
                  {item.question}
                </h3>

                <p
                  style={{
                    color: "#4d4b46",
                    margin: 0,
                    maxWidth: "850px",
                  }}
                >
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div
          style={{
            background: "#1f2d30",
            color: "#f5f0e7",
            padding: "clamp(34px, 6vw, 58px)",
            textAlign: "center",
            marginBottom: "72px",
          }}
        >
          <p className="eyebrow eyebrow--light">PARTNER ENROLLMENT</p>

          <h2
            className="light-heading"
            style={{
              maxWidth: "760px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Tracked reactivation enrollment links are coming after onboarding.
          </h2>

          <p
            style={{
              color: "rgba(245, 240, 231, 0.82)",
              maxWidth: "760px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Greyson is preparing co-branded online enrollment through The CE
            Shop. When the appropriate links are live, The CE Shop will remain
            the school of record and handle payment, course delivery,
            course-specific support, certificates, and applicable completion
            reporting.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "12px",
              marginTop: "22px",
            }}
          >
            <PartnerEnrollmentButton
              course="floridaReactivation14"
              label="Enroll in 14-Hour Path →"
              pendingLabel="14-Hour link coming soon"
              dark
            />

            <PartnerEnrollmentButton
              course="floridaReactivation28"
              label="Enroll in 28-Hour Path →"
              pendingLabel="28-Hour link coming soon"
              dark
            />

            <Link
              href="/find-my-path"
              style={{
                minHeight: "48px",
                padding: "0 20px",
                border: "1px solid #f5f0e7",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#f5f0e7",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              Find My Likely Path
            </Link>
          </div>
        </div>

        <div
          style={{
            paddingTop: "30px",
            borderTop: "1px solid rgba(17, 23, 23, 0.18)",
          }}
        >
          <p className="eyebrow">OFFICIAL SOURCES</p>

          <div
            style={{
              display: "grid",
              gap: "12px",
              maxWidth: "860px",
            }}
          >
            <a
              href="https://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0400-0499%2F0475%2FSections%2F0475.183.html"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontWeight: 600,
                textDecoration: "underline",
                textUnderlineOffset: "4px",
              }}
            >
              Florida Statute 475.183 — Inactive status ↗
            </a>

            <a
              href="https://www2.myfloridalicense.com/real-estate-commission/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontWeight: 600,
                textDecoration: "underline",
                textUnderlineOffset: "4px",
              }}
            >
              Florida Real Estate Commission / DBPR renewal information ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
