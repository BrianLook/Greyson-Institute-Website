import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GuideStructuredData } from "@/components/GuideStructuredData";
import { LicenseExpirationPromo } from "@/components/LicenseExpirationPromo";

const guideTitle =
  "Florida 60-Hour Broker Post-License Requirements";

const guideDescription =
  "Learn Florida broker post-license requirements for the first renewal, including the 60-hour education requirement, degree exemption, attorney rule, missed-deadline consequences, and broker-to-sales-associate downgrade option.";

const guidePath =
  "/florida-60-hour-broker-post-license-requirements";

export const metadata: Metadata = {
  title: guideTitle,
  description: guideDescription,
};

const faqItems = [
  {
    question:
      "How many post-license hours does a Florida broker need for the first renewal?",
    answer:
      "Florida brokers and broker associates generally must complete 60 hours of approved broker post-license education before the first renewal deadline.",
  },
  {
    question:
      "Can the 60 hours be completed online?",
    answer:
      "Yes. DBPR permits approved broker post-license education through classroom or distance-learning formats.",
  },
  {
    question:
      "Is there an exemption from broker post-license education?",
    answer:
      "DBPR currently lists an exemption for a licensee who has a qualifying 4-year degree, or higher, in real estate from an accredited institution. The exemption requires documentation to DBPR.",
  },
  {
    question:
      "Are attorneys exempt from broker post-license education?",
    answer:
      "No. DBPR specifically states that attorneys are not exempt from post-license education.",
  },
  {
    question:
      "What happens if a broker misses the first-renewal post-license deadline?",
    answer:
      "DBPR states that failure to complete the required broker post-license education by the first renewal deadline causes the broker license to become null and void.",
  },
  {
    question:
      "Can a broker whose license became null and void become a sales associate instead?",
    answer:
      "Florida provides a broker-to-sales-associate downgrade path in certain first-renewal post-license failure cases. DBPR currently requires 14 hours of continuing education within 6 months after the broker license expiration, along with the applicable application and fee.",
  },
];

export default function FloridaBrokerPostLicensePage() {
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
        datePublished="2026-09-27"
        dateModified="2026-09-27"
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
            marginBottom: "72px",
          }}
        >
          <p className="eyebrow">
            FLORIDA BROKER FIRST RENEWAL
          </p>

          <h1>
            Florida 60-Hour Broker Post-License Requirements
          </h1>

          <p
            className="page-lead"
            style={{
              maxWidth: "820px",
            }}
          >
            Florida brokers and broker associates generally have a separate
            education requirement for their first renewal. Here is how the
            60-hour broker post-license requirement works, the major
            exemptions, and what can happen if the deadline is missed.
          </p>

          <p className="muted">
            Last reviewed: September 27, 2026
          </p>
        </div>

        <div
          style={{
            background: "#eee6d9",
            border: "1px solid rgba(17, 23, 23, 0.14)",
            padding: "clamp(30px, 5vw, 48px)",
            marginBottom: "72px",
          }}
        >
          <p className="eyebrow">
            QUICK ANSWER
          </p>

          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              marginBottom: "18px",
            }}
          >
            60 hours before the first broker renewal.
          </h2>

          <p
            style={{
              color: "#4d4b46",
              maxWidth: "840px",
              marginBottom: 0,
            }}
          >
            After receiving a Florida broker or broker associate license, the
            initial renewal generally requires 60 hours of approved broker
            post-license education in addition to the applicable renewal
            requirements.
          </p>
        </div>

        <div
          style={{
            marginBottom: "82px",
          }}
        >
          <LicenseExpirationPromo
            eyebrow="CHECK BEFORE YOU ENROLL"
            title="Verify your first broker expiration date before choosing education."
            text="Greyson can check the latest available weekly DBPR record for your Florida broker or broker associate license. Your first renewal has a different education requirement from later renewals."
          />
        </div>

        <div
          style={{
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">
            FIRST RENEWAL
          </p>

          <h2>
            Broker post-license education comes before the regular 14-hour CE cycle.
          </h2>

          <p>
            The 60-hour broker post-license requirement applies to the first
            renewal following initial broker licensure. After the initial
            broker renewal has been completed, the regular 14-hour continuing
            education cycle generally applies to later renewals.
          </p>
        </div>

        <div
          style={{
            background: "#1f2d30",
            color: "#f5f0e7",
            padding: "clamp(34px, 6vw, 60px)",
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow eyebrow--light">
            DO NOT MISS THE DEADLINE
          </p>

          <h2
            className="light-heading"
            style={{
              maxWidth: "830px",
            }}
          >
            Missing broker post-license education can make the broker license null and void.
          </h2>

          <p
            style={{
              color: "rgba(245, 240, 231, 0.82)",
              maxWidth: "850px",
              marginBottom: 0,
            }}
          >
            Florida&apos;s first-renewal post-license rule is different from a
            normal continuing-education lapse. If the required broker
            post-license education is not completed by the first renewal
            deadline, DBPR states that the broker license becomes null and
            void.
          </p>
        </div>

        <div
          style={{
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">
            DEGREE EXEMPTION
          </p>

          <h2>
            A qualifying real-estate degree may exempt you from post-license education.
          </h2>

          <p>
            DBPR currently lists an exemption for a licensee who has received a
            4-year degree, or higher, in real estate from an accredited
            institution of higher education.
          </p>

          <p
            style={{
              color: "#6e6b65",
              maxWidth: "840px",
              marginBottom: 0,
            }}
          >
            Do not assume the exemption is automatic. Submit the required
            documentation to DBPR and verify that it has been accepted before
            relying on the exemption.
          </p>
        </div>

        <div
          style={{
            background: "#eee6d9",
            border: "1px solid rgba(17, 23, 23, 0.14)",
            padding: "clamp(30px, 5vw, 48px)",
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">
            ATTORNEYS
          </p>

          <h2>
            Attorney status does not create a broker post-license exemption.
          </h2>

          <p
            style={{
              color: "#4d4b46",
              maxWidth: "840px",
              marginBottom: 0,
            }}
          >
            DBPR specifically states that attorneys are not exempt from
            post-license education requirements.
          </p>
        </div>

        <div
          style={{
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">
            IF THE DEADLINE WAS MISSED
          </p>

          <h2>
            Florida has a broker-to-sales-associate downgrade process in certain cases.
          </h2>

          <p>
            DBPR provides a transaction for a broker whose license became null
            and void after failing to complete first-renewal post-license
            education to seek a sales associate license.
          </p>

          <p>
            DBPR currently requires 14 hours of continuing education within
            the 6 months following expiration of the broker license, along with
            the required application and fee for the downgrade transaction.
          </p>

          <p
            style={{
              color: "#6e6b65",
              maxWidth: "850px",
              marginBottom: 0,
            }}
          >
            This is not the same as standard 14-hour or 28-hour reactivation.
            Verify the exact path directly with DBPR before purchasing
            education.
          </p>
        </div>

        <div
          style={{
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">
            FREQUENTLY ASKED QUESTIONS
          </p>

          <h2
            style={{
              maxWidth: "820px",
              marginBottom: "36px",
            }}
          >
            Florida broker post-license questions
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
                    maxWidth: "840px",
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
          }}
        >
          <p className="eyebrow eyebrow--light">
            BROKER POST-LICENSE EDUCATION
          </p>

          <h2
            className="light-heading"
            style={{
              maxWidth: "760px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Co-branded broker post-license enrollment is coming soon.
          </h2>

          <p
            style={{
              color: "rgba(245, 240, 231, 0.82)",
              maxWidth: "720px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Greyson is preparing tracked partner enrollment through The CE Shop.
            Until the link is live, use the Florida License Check to verify your
            broker record and contact Greyson if you need help understanding
            your first-renewal education path.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "14px",
              marginTop: "26px",
            }}
          >
            <Link
              href="/check-florida-real-estate-license-expiration"
              style={{
                minHeight: "50px",
                padding: "0 20px",
                border: "1px solid #f5f0e7",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#f5f0e7",
                textDecoration: "none",
                fontWeight: 650,
              }}
            >
              Check My Florida License
            </Link>

            <Link
              href="/contact"
              style={{
                minHeight: "50px",
                padding: "0 20px",
                border: "1px solid #f5f0e7",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#f5f0e7",
                textDecoration: "none",
                fontWeight: 650,
              }}
            >
              Ask Greyson Institute
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
