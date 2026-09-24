import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Florida 45-Hour Post-License Requirements",
  description:
    "Learn Florida's 45-hour sales associate post-license requirements, including who must complete the education, the deadline, active and inactive licenses, exemptions, and what happens if you miss the requirement.",
};

const requirementSteps = [
  {
    number: "01",
    title: "Earn your Florida sales associate license",
    body:
      "The post-license requirement applies after you have obtained your initial Florida real estate sales associate license. It is separate from the 63-hour pre-licensing education completed before licensure.",
  },
  {
    number: "02",
    title: "Check the expiration date on your license",
    body:
      "Your 45-hour post-license education must be completed before the expiration date of your initial sales associate license. Use the expiration date shown on your license and DBPR account when planning your education.",
  },
  {
    number: "03",
    title: "Complete 45 hours of approved post-license education",
    body:
      "Florida sales associates must complete the required 45 hours of approved post-license education before their first renewal.",
  },
  {
    number: "04",
    title: "Complete the requirement even if your license is inactive",
    body:
      "The post-license requirement applies to sales associates holding either an active or inactive license. Keeping the license inactive does not eliminate the initial post-license education requirement.",
  },
  {
    number: "05",
    title: "Complete your renewal requirements on time",
    body:
      "Post-license education and the applicable renewal requirements must be satisfied by the license expiration deadline. Waiting until the final days can create unnecessary risk if your education or renewal information is not processed as expected.",
  },
  {
    number: "06",
    title: "Move to continuing education after the first renewal",
    body:
      "After you successfully complete the initial post-license requirement and first renewal, Florida's regular continuing-education requirements apply to later renewal periods.",
  },
];

const keyFacts = [
  {
    label: "Required education",
    value: "45 hours",
    detail: "Sales associate post-license education",
  },
  {
    label: "Deadline",
    value: "First renewal",
    detail: "Before the initial license expires",
  },
  {
    label: "License status",
    value: "Active or inactive",
    detail: "The requirement applies to both",
  },
  {
    label: "Afterward",
    value: "14 hours",
    detail: "Continuing education for later renewals",
  },
];

const faqItems = [
  {
    question:
      "How many post-license hours do Florida real estate sales associates need?",
    answer:
      "Florida sales associates generally must complete 45 hours of approved post-license education before their first license renewal.",
  },
  {
    question:
      "When do I have to complete the Florida 45-hour post-license course?",
    answer:
      "The requirement must be completed before the expiration date of your initial Florida sales associate license.",
  },
  {
    question:
      "Do I need 45-hour post-license education if my Florida license is inactive?",
    answer:
      "Yes. Florida's published licensing requirements state that the post-license requirement applies whether the initial sales associate license is active or inactive.",
  },
  {
    question:
      "Can Florida post-license education be completed online?",
    answer:
      "Yes. Florida currently allows approved post-license education to be completed through distance education or classroom instruction.",
  },
  {
    question:
      "Are Florida attorneys exempt from the 45-hour post-license requirement?",
    answer:
      "No. Florida DBPR currently states that attorneys are not exempt from the sales associate post-license education requirement.",
  },
  {
    question:
      "Is anyone exempt from Florida sales associate post-license education?",
    answer:
      "Florida currently provides an exemption for a licensee with a qualifying four-year degree or higher in real estate from an accredited institution. DBPR requires qualifying degree documentation to be submitted for the exemption.",
  },
  {
    question:
      "What happens if I miss the Florida post-license deadline?",
    answer:
      "Florida DBPR states that failure to complete the required post-license education by the initial license expiration date will result in the license becoming null and void.",
  },
  {
    question:
      "Is 45-hour post-license education the same as continuing education?",
    answer:
      "No. The 45-hour post-license requirement applies to the initial sales associate renewal. After the first renewal, Florida's regular continuing-education requirement applies.",
  },
];

export default function Florida45HourPostLicenseRequirementsPage() {
  return (
    <section
      className="page-hero"
      style={{
        paddingBottom: "100px",
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: "1040px",
          minWidth: 0,
        }}
      >
        <div
          style={{
            maxWidth: "860px",
            marginBottom: "72px",
          }}
        >
          <p className="eyebrow">FLORIDA POST-LICENSE EDUCATION</p>

          <h1
            style={{
              overflowWrap: "anywhere",
            }}
          >
            Florida 45-Hour Post-License Requirements
          </h1>

          <p
            className="page-lead"
            style={{
              maxWidth: "790px",
            }}
          >
            Earning your Florida real estate license is not the end of your
            education requirements. New sales associates generally must
            complete 45 hours of approved post-license education before their
            first license renewal.
          </p>

          <p className="muted">
            Last reviewed: September 24, 2026
          </p>
        </div>

        <div
          style={{
            background: "#eee6d9",
            border: "1px solid rgba(17, 23, 23, 0.14)",
            padding: "clamp(28px, 5vw, 46px)",
            marginBottom: "72px",
          }}
        >
          <p className="eyebrow">QUICK ANSWER</p>

          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              marginBottom: "20px",
            }}
          >
            45 hours must be completed before your first renewal.
          </h2>

          <p
            style={{
              color: "#4d4b46",
              maxWidth: "830px",
              marginBottom: 0,
            }}
          >
            Florida sales associates generally must complete 45 hours of
            approved post-license education before the expiration of their
            initial license. The requirement applies whether the sales
            associate license is active or inactive.
          </p>
        </div>

        <div
          style={{
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">AT A GLANCE</p>

          <h2
            style={{
              marginBottom: "36px",
            }}
          >
            Florida sales associate post-license requirements
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
              borderTop: "1px solid rgba(17, 23, 23, 0.18)",
              borderLeft: "1px solid rgba(17, 23, 23, 0.18)",
            }}
          >
            {keyFacts.map((fact) => (
              <div
                key={fact.label}
                style={{
                  padding: "28px",
                  minHeight: "190px",
                  borderRight: "1px solid rgba(17, 23, 23, 0.18)",
                  borderBottom: "1px solid rgba(17, 23, 23, 0.18)",
                }}
              >
                <p className="eyebrow">{fact.label}</p>

                <div
                  style={{
                    fontFamily: "var(--font-serif), Georgia, serif",
                    fontSize: "clamp(1.8rem, 4vw, 2.7rem)",
                    lineHeight: 1.1,
                    marginBottom: "12px",
                    overflowWrap: "anywhere",
                  }}
                >
                  {fact.value}
                </div>

                <p
                  style={{
                    color: "#6e6b65",
                    margin: 0,
                  }}
                >
                  {fact.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">WHO NEEDS IT?</p>

          <h2
            style={{
              maxWidth: "800px",
            }}
          >
            The requirement applies to newly licensed Florida sales associates.
          </h2>

          <p>
            Florida requires sales associates who have passed the licensing
            examination and received their initial license to complete
            Commission-approved post-license education before the first renewal.
          </p>

          <p>
            This requirement is different from the 63-hour pre-licensing course
            completed before licensure and different from the continuing
            education required after the first renewal.
          </p>

          <p>
            Most importantly, the requirement applies whether your initial
            sales associate license is active or inactive.
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
          <p className="eyebrow eyebrow--light">DO NOT MISS THE DEADLINE</p>

          <h2
            className="light-heading"
            style={{
              maxWidth: "820px",
            }}
          >
            Missing your initial post-license requirement has serious
            consequences.
          </h2>

          <p
            style={{
              color: "rgba(245, 240, 231, 0.82)",
              maxWidth: "830px",
            }}
          >
            Florida DBPR states that failure to complete the required
            post-license education by the expiration date of the initial sales
            associate license will result in the license becoming null and
            void.
          </p>

          <p
            style={{
              color: "rgba(245, 240, 231, 0.82)",
              maxWidth: "830px",
              marginBottom: 0,
            }}
          >
            Because of that consequence, your initial expiration date is one
            deadline you should identify early and track carefully.
          </p>
        </div>

        <div
          style={{
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">STEP BY STEP</p>

          <h2
            style={{
              maxWidth: "790px",
              marginBottom: "42px",
            }}
          >
            How the first renewal education process works
          </h2>

          <div
            style={{
              borderTop: "1px solid rgba(17, 23, 23, 0.18)",
            }}
          >
            {requirementSteps.map((step) => (
              <article
                key={step.number}
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "minmax(48px, 80px) minmax(0, 1fr)",
                  gap: "24px",
                  padding: "30px 0",
                  borderBottom: "1px solid rgba(17, 23, 23, 0.18)",
                }}
              >
                <div
                  style={{
                    color: "#7d5f3a",
                    fontSize: "0.72rem",
                    letterSpacing: "0.18em",
                    paddingTop: "7px",
                  }}
                >
                  {step.number}
                </div>

                <div style={{ minWidth: 0 }}>
                  <h3
                    style={{
                      fontSize: "clamp(1.45rem, 3vw, 1.9rem)",
                      marginBottom: "10px",
                      overflowWrap: "anywhere",
                    }}
                  >
                    {step.title}
                  </h3>

                  <p
                    style={{
                      color: "#4d4b46",
                      margin: 0,
                      maxWidth: "760px",
                    }}
                  >
                    {step.body}
                  </p>

                  {step.number === "06" && (
                    <Link
                      href="/florida-14-hour-real-estate-continuing-education"
                      style={{
                        display: "inline-block",
                        marginTop: "14px",
                        textDecoration: "underline",
                        textUnderlineOffset: "4px",
                        fontWeight: 600,
                      }}
                    >
                      Learn about Florida&apos;s 14-hour continuing education
                      requirements →
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div
          style={{
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">ACTIVE OR INACTIVE?</p>

          <h2>Your license status does not eliminate the requirement.</h2>

          <p>
            A common misunderstanding is that post-license education only
            applies to sales associates who have activated their license with a
            broker.
          </p>

          <p>
            Florida&apos;s published licensing requirements state that a sales
            associate must complete the post-license requirement before the
            initial license expires whether the license is active or inactive.
          </p>

          <Link
            href="/what-happens-after-you-pass-the-florida-real-estate-exam"
            style={{
              display: "inline-block",
              marginTop: "8px",
              textDecoration: "underline",
              textUnderlineOffset: "4px",
              fontWeight: 600,
            }}
          >
            Learn about activating your Florida sales associate license →
          </Link>
        </div>

        <div
          style={{
            background: "#eee6d9",
            border: "1px solid rgba(17, 23, 23, 0.14)",
            padding: "clamp(30px, 5vw, 48px)",
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">ONLINE OR CLASSROOM?</p>

          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              maxWidth: "800px",
              marginBottom: "18px",
            }}
          >
            Florida allows approved distance education.
          </h2>

          <p
            style={{
              color: "#4d4b46",
              maxWidth: "820px",
              marginBottom: 0,
            }}
          >
            Florida DBPR currently states that sales associate post-license
            education can be completed through approved distance education or
            classroom instruction. The important requirement is that the
            education satisfies Florida&apos;s approved post-license
            requirements.
          </p>
        </div>

        <div
          style={{
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">POST-LICENSE EXEMPTION</p>

          <h2
            style={{
              maxWidth: "820px",
            }}
          >
            A qualifying real estate degree can provide an exemption.
          </h2>

          <p>
            Florida currently provides a post-license education exemption for a
            licensee who holds a four-year degree or higher in real estate from
            an accredited institution of higher education.
          </p>

          <p>
            DBPR requires qualifying degree documentation to be submitted to
            the Division of Real Estate for the exemption.
          </p>

          <p>
            Florida also specifically states that attorneys are not exempt from
            the post-license education requirement simply because they are
            members of the Florida Bar.
          </p>
        </div>

        <div
          style={{
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">POST-LICENSE VS. CONTINUING EDUCATION</p>

          <h2
            style={{
              maxWidth: "820px",
            }}
          >
            They apply at different points in your real estate career.
          </h2>

          <p>
            The 45-hour post-license requirement applies to your initial Florida
            sales associate renewal.
          </p>

          <p>
            After that first renewal has been completed, Florida&apos;s regular
            continuing-education requirement applies to later renewal periods.
            Current active sales associates generally complete 14 hours of
            continuing education for renewal.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
              gap: "18px",
              marginTop: "30px",
            }}
          >
            <div
              style={{
                border: "1px solid rgba(17, 23, 23, 0.16)",
                padding: "28px",
              }}
            >
              <p className="eyebrow">FIRST RENEWAL</p>

              <h3
                style={{
                  fontSize: "1.6rem",
                  marginBottom: "12px",
                }}
              >
                45-hour post-license
              </h3>

              <p
                style={{
                  color: "#4d4b46",
                  margin: 0,
                }}
              >
                Required for the initial sales associate renewal unless a
                qualifying exemption applies.
              </p>
            </div>

            <div
              style={{
                border: "1px solid rgba(17, 23, 23, 0.16)",
                padding: "28px",
              }}
            >
              <p className="eyebrow">LATER RENEWALS</p>

              <h3
                style={{
                  fontSize: "1.6rem",
                  marginBottom: "12px",
                }}
              >
                14-hour continuing education
              </h3>

              <p
                style={{
                  color: "#4d4b46",
                  margin: 0,
                }}
              >
                Florida&apos;s regular continuing-education requirement applies
                after the initial post-license renewal.
              </p>
            </div>
          </div>

          <Link
            href="/florida-14-hour-real-estate-continuing-education"
            style={{
              display: "inline-block",
              marginTop: "24px",
              textDecoration: "underline",
              textUnderlineOffset: "4px",
              fontWeight: 600,
            }}
          >
            Florida 14-Hour Real Estate Continuing Education Requirements →
          </Link>
        </div>

        <div
          style={{
            background: "#eee6d9",
            border: "1px solid rgba(17, 23, 23, 0.14)",
            padding: "clamp(30px, 5vw, 48px)",
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">RELATED GUIDES</p>

          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              marginBottom: "18px",
            }}
          >
            Follow your Florida education path beyond the first renewal.
          </h2>

          <div
            style={{
              display: "grid",
              gap: "14px",
              marginTop: "24px",
            }}
          >
            <Link
              href="/florida-14-hour-real-estate-continuing-education"
              style={{
                textDecoration: "underline",
                textUnderlineOffset: "4px",
                fontWeight: 600,
              }}
            >
              Florida 14-Hour Real Estate Continuing Education Requirements →
            </Link>

            <Link
              href="/what-happens-after-you-pass-the-florida-real-estate-exam"
              style={{
                textDecoration: "underline",
                textUnderlineOffset: "4px",
                fontWeight: 600,
              }}
            >
              What Happens After You Pass the Florida Real Estate Exam? →
            </Link>

            <Link
              href="/florida-real-estate-exam"
              style={{
                textDecoration: "underline",
                textUnderlineOffset: "4px",
                fontWeight: 600,
              }}
            >
              Florida Real Estate Exam: What to Expect and How to Prepare →
            </Link>

            <Link
              href="/florida-63-hour-real-estate-pre-licensing-course"
              style={{
                textDecoration: "underline",
                textUnderlineOffset: "4px",
                fontWeight: 600,
              }}
            >
              Florida 63-Hour Real Estate Pre-Licensing Course →
            </Link>

            <Link
              href="/how-to-get-a-florida-real-estate-license"
              style={{
                textDecoration: "underline",
                textUnderlineOffset: "4px",
                fontWeight: 600,
              }}
            >
              How to Get a Florida Real Estate License →
            </Link>
          </div>
        </div>

        <div
          style={{
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">COMMON QUESTIONS</p>

          <h2
            style={{
              marginBottom: "36px",
            }}
          >
            Florida 45-hour post-license FAQ
          </h2>

          <div
            style={{
              borderTop: "1px solid rgba(17, 23, 23, 0.18)",
            }}
          >
            {faqItems.map((item) => (
              <details
                key={item.question}
                style={{
                  borderBottom: "1px solid rgba(17, 23, 23, 0.18)",
                  padding: "22px 0",
                }}
              >
                <summary
                  style={{
                    cursor: "pointer",
                    fontFamily: "var(--font-serif), Georgia, serif",
                    fontSize: "clamp(1.25rem, 2.5vw, 1.65rem)",
                    lineHeight: 1.3,
                  }}
                >
                  {item.question}
                </summary>

                <p
                  style={{
                    color: "#4d4b46",
                    maxWidth: "760px",
                    paddingTop: "14px",
                    marginBottom: 0,
                  }}
                >
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>

        <div
          style={{
            marginBottom: "76px",
          }}
        >
          <p className="eyebrow">OFFICIAL FLORIDA RESOURCES</p>

          <h2>Verify your current requirement and deadline with DBPR.</h2>

          <p
            style={{
              maxWidth: "800px",
            }}
          >
            Education requirements, renewal procedures, exemptions, and
            deadlines can change. Check your individual license expiration date
            and current requirements through Florida DBPR.
          </p>

          <div
            style={{
              display: "grid",
              gap: "22px",
              marginTop: "26px",
            }}
          >
            <div>
              <a
                href="https://www2.myfloridalicense.com/real-estate-commission/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                  fontWeight: 600,
                  marginBottom: "5px",
                }}
              >
                Florida Real Estate Commission — Renewal Education ↗
              </a>

              <p
                style={{
                  margin: 0,
                  color: "#6e6b65",
                  fontSize: "0.82rem",
                }}
              >
                You&apos;re leaving the Greyson Institute website. Florida DBPR
                will open in a new tab.
              </p>
            </div>

            <div>
              <a
                href="https://www2.myfloridalicense.com/real-estate-commission/education/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                  fontWeight: 600,
                  marginBottom: "5px",
                }}
              >
                Florida Real Estate Commission — Education ↗
              </a>

              <p
                style={{
                  margin: 0,
                  color: "#6e6b65",
                  fontSize: "0.82rem",
                }}
              >
                You&apos;re leaving the Greyson Institute website. Florida DBPR
                will open in a new tab.
              </p>
            </div>

            <div>
              <a
                href="https://www2.myfloridalicense.com/re/documents/RESLRequirements.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                  fontWeight: 600,
                  marginBottom: "5px",
                }}
              >
                Florida Sales Associate Licensing Requirements ↗
              </a>

              <p
                style={{
                  margin: 0,
                  color: "#6e6b65",
                  fontSize: "0.82rem",
                }}
              >
                You&apos;re leaving the Greyson Institute website. The official
                Florida DBPR document will open in a new tab.
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            background: "#eee6d9",
            border: "1px solid rgba(17, 23, 23, 0.14)",
            padding: "clamp(34px, 6vw, 58px)",
            textAlign: "center",
          }}
        >
          <p className="eyebrow">FIRST RENEWAL EDUCATION</p>

          <h2
            style={{
              maxWidth: "740px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Explore Greyson Institute&apos;s post-license education path.
          </h2>

          <p
            style={{
              color: "#4d4b46",
              maxWidth: "700px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Understand where Florida&apos;s 45-hour post-license requirement
            fits into your first renewal and what continuing education comes
            next.
          </p>

          <div
            className="button-row"
            style={{
              justifyContent: "center",
            }}
          >
            <Link className="button" href="/courses#post-license">
              Explore Post-License Education
            </Link>

            <Link
              href="/florida-14-hour-real-estate-continuing-education"
              style={{
                minHeight: "48px",
                padding: "0 20px",
                border: "1px solid #111717",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "0.04em",
                textAlign: "center",
              }}
            >
              See 14-Hour Continuing Education
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
