import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Florida Real Estate Guides",
  description:
    "Explore Greyson Institute's Florida real estate licensing and education guides, from getting licensed and preparing for the state exam through post-license and continuing education.",
};

const guides = [
  {
    number: "01",
    stage: "GETTING LICENSED",
    title: "How to Get a Florida Real Estate License",
    description:
      "Start here for the full Florida sales associate licensing process, including eligibility, pre-licensing education, fingerprints, the state exam, and license activation.",
    href: "/how-to-get-a-florida-real-estate-license",
  },
  {
    number: "02",
    stage: "PLANNING",
    title: "How Much Does a Florida Real Estate License Cost?",
    description:
      "Understand the application, fingerprinting, education, examination, and other costs you should plan for during the licensing process.",
    href: "/how-much-does-a-florida-real-estate-license-cost",
  },
  {
    number: "03",
    stage: "PLANNING",
    title: "How Long Does It Take to Get a Florida Real Estate License?",
    description:
      "See the major stages that affect your timeline, from the required course and DBPR process through exam scheduling and license activation.",
    href: "/how-long-does-it-take-to-get-a-florida-real-estate-license",
  },
  {
    number: "04",
    stage: "PRE-LICENSING",
    title: "Florida 63-Hour Real Estate Pre-Licensing Course",
    description:
      "Learn what Florida's required sales associate pre-licensing course covers, how the 63 hours are structured, and what comes after completion.",
    href: "/florida-63-hour-real-estate-pre-licensing-course",
  },
  {
    number: "05",
    stage: "STATE EXAM",
    title: "Florida Real Estate Exam: What to Expect and How to Prepare",
    description:
      "Review the current exam format, passing score, major content areas, test-day requirements, and practical ways to prepare.",
    href: "/florida-real-estate-exam",
  },
  {
    number: "06",
    stage: "AFTER THE EXAM",
    title: "What Happens After You Pass the Florida Real Estate Exam?",
    description:
      "Understand license issuance, inactive status, choosing a broker, activating your license, and the education requirement that follows.",
    href: "/what-happens-after-you-pass-the-florida-real-estate-exam",
  },
  {
    number: "07",
    stage: "FIRST RENEWAL",
    title: "Florida 45-Hour Post-License Requirements",
    description:
      "Learn who must complete Florida sales associate post-license education, when it is due, and what happens if the requirement is missed.",
    href: "/florida-45-hour-post-license-requirements",
  },
  {
    number: "08",
    stage: "ONGOING RENEWALS",
    title: "Florida 14-Hour Real Estate Continuing Education Requirements",
    description:
      "Understand Florida's ongoing continuing-education requirement, including Core Law, Ethics and Business Practices, and specialty education.",
    href: "/florida-14-hour-real-estate-continuing-education",
  },
];

const pathSteps = [
  {
    label: "Get licensed",
    href: "/how-to-get-a-florida-real-estate-license",
  },
  {
    label: "Complete pre-licensing",
    href: "/florida-63-hour-real-estate-pre-licensing-course",
  },
  {
    label: "Prepare for the state exam",
    href: "/florida-real-estate-exam",
  },
  {
    label: "Activate your license",
    href: "/what-happens-after-you-pass-the-florida-real-estate-exam",
  },
  {
    label: "Complete post-license education",
    href: "/florida-45-hour-post-license-requirements",
  },
  {
    label: "Maintain your license",
    href: "/florida-14-hour-real-estate-continuing-education",
  },
];

export default function GuidesPage() {
  return (
    <section
      className="page-hero"
      style={{
        paddingBottom: "100px",
      }}
    >
      <style>
        {`
          .guides-path-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 12px;
          }

          @media (max-width: 900px) {
            .guides-path-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }

          @media (max-width: 600px) {
            .guides-path-grid {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>

      <div
        className="container"
        style={{
          maxWidth: "1120px",
          minWidth: 0,
        }}
      >
        <div
          style={{
            maxWidth: "860px",
            marginBottom: "72px",
          }}
        >
          <p className="eyebrow">GREYSON INSTITUTE LEARNING CENTER</p>

          <h1
            style={{
              overflowWrap: "anywhere",
            }}
          >
            Florida Real Estate Guides
          </h1>

          <p
            className="page-lead"
            style={{
              maxWidth: "800px",
            }}
          >
            Clear, practical guides for every stage of the Florida real estate
            education journey — from getting your first license through exam
            preparation, post-license education, and continuing education.
          </p>
        </div>

        <div
          style={{
            background: "#1f2d30",
            color: "#f5f0e7",
            padding: "clamp(34px, 6vw, 60px)",
            marginBottom: "86px",
          }}
        >
          <p className="eyebrow eyebrow--light">START HERE</p>

          <h2
            className="light-heading"
            style={{
              maxWidth: "780px",
              marginBottom: "18px",
            }}
          >
            Follow the Florida licensing path from your first course to ongoing
            renewal.
          </h2>

          <p
            style={{
              color: "rgba(245, 240, 231, 0.82)",
              maxWidth: "820px",
              marginBottom: "34px",
            }}
          >
            If you are not sure which guide you need, use this sequence to move
            through the major education and licensing stages in order.
          </p>

          <div className="guides-path-grid">
            {pathSteps.map((step, index) => (
              <Link
                key={step.label}
                href={step.href}
                style={{
                  border: "1px solid rgba(245, 240, 231, 0.24)",
                  padding: "22px",
                  color: "#f5f0e7",
                  minHeight: "130px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  textDecoration: "none",
                  minWidth: 0,
                }}
              >
                <span
                  style={{
                    color: "rgba(245, 240, 231, 0.58)",
                    fontSize: "0.68rem",
                    letterSpacing: "0.16em",
                  }}
                >
                  STEP {String(index + 1).padStart(2, "0")}
                </span>

                <strong
                  style={{
                    marginTop: "20px",
                    lineHeight: 1.4,
                  }}
                >
                  {step.label} →
                </strong>
              </Link>
            ))}
          </div>
        </div>

        <div
          style={{
            marginBottom: "88px",
          }}
        >
          <p className="eyebrow">ALL GUIDES</p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 430px), 1fr))",
              borderTop: "1px solid rgba(17, 23, 23, 0.16)",
              borderLeft: "1px solid rgba(17, 23, 23, 0.16)",
            }}
          >
            {guides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                style={{
                  minHeight: "330px",
                  padding: "34px",
                  borderRight: "1px solid rgba(17, 23, 23, 0.16)",
                  borderBottom: "1px solid rgba(17, 23, 23, 0.16)",
                  display: "flex",
                  flexDirection: "column",
                  textDecoration: "none",
                  color: "#111717",
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "20px",
                    marginBottom: "32px",
                  }}
                >
                  <span
                    style={{
                      color: "#7d5f3a",
                      fontSize: "0.7rem",
                      letterSpacing: "0.16em",
                    }}
                  >
                    {guide.number}
                  </span>

                  <span
                    style={{
                      color: "#6e6b65",
                      fontSize: "0.68rem",
                      letterSpacing: "0.14em",
                      textAlign: "right",
                    }}
                  >
                    {guide.stage}
                  </span>
                </div>

                <h2
                  style={{
                    fontSize: "clamp(1.7rem, 3vw, 2.25rem)",
                    marginBottom: "16px",
                    overflowWrap: "anywhere",
                  }}
                >
                  {guide.title}
                </h2>

                <p
                  style={{
                    color: "#5f5c56",
                    lineHeight: 1.7,
                    marginBottom: 0,
                    maxWidth: "520px",
                  }}
                >
                  {guide.description}
                </p>

                <span
                  style={{
                    marginTop: "auto",
                    paddingTop: "30px",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                  }}
                >
                  Read guide →
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
            gap: "22px",
            marginBottom: "82px",
          }}
        >
          <div
            style={{
              border: "1px solid rgba(17, 23, 23, 0.16)",
              padding: "clamp(28px, 5vw, 42px)",
            }}
          >
            <p className="eyebrow">NEW TO REAL ESTATE?</p>

            <h2
              style={{
                fontSize: "clamp(1.9rem, 3vw, 2.5rem)",
              }}
            >
              Begin with the licensing overview.
            </h2>

            <p
              style={{
                color: "#5f5c56",
              }}
            >
              If you are starting from the beginning, learn the complete
              Florida sales associate licensing process before choosing your
              next step.
            </p>

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

          <div
            style={{
              border: "1px solid rgba(17, 23, 23, 0.16)",
              padding: "clamp(28px, 5vw, 42px)",
            }}
          >
            <p className="eyebrow">ALREADY LICENSED?</p>

            <h2
              style={{
                fontSize: "clamp(1.9rem, 3vw, 2.5rem)",
              }}
            >
              Find your renewal education.
            </h2>

            <p
              style={{
                color: "#5f5c56",
              }}
            >
              Newly licensed sales associates should understand the first
              renewal requirement, while established licensees can review
              ongoing continuing education.
            </p>

            <div
              style={{
                display: "grid",
                gap: "10px",
              }}
            >
              <Link
                href="/florida-45-hour-post-license-requirements"
                style={{
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                  fontWeight: 600,
                }}
              >
                45-Hour Post-License Requirements →
              </Link>

              <Link
                href="/florida-14-hour-real-estate-continuing-education"
                style={{
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                  fontWeight: 600,
                }}
              >
                14-Hour Continuing Education Requirements →
              </Link>
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
          <p className="eyebrow">GREYSON INSTITUTE</p>

          <h2
            style={{
              maxWidth: "740px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Education for every stage of your real estate journey.
          </h2>

          <p
            style={{
              color: "#4d4b46",
              maxWidth: "720px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Explore Greyson Institute&apos;s education paths for
            pre-licensing, exam preparation, post-license education,
            continuing education, broker education, and reactivation.
          </p>

          <div
            className="button-row"
            style={{
              justifyContent: "center",
            }}
          >
            <Link className="button" href="/courses">
              Explore Courses
            </Link>

            <Link
              href="/contact"
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
              }}
            >
              Ask a Question
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
