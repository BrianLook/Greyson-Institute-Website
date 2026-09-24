import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Get a Florida Real Estate License",
  description:
    "Learn how to get a Florida real estate sales associate license, including eligibility, the 63-hour pre-licensing course, fingerprints, the state exam, and license activation.",
};

const steps = [
  {
    number: "01",
    title: "Confirm you meet the basic requirements",
    body:
      "Florida sales associate applicants must be at least 18 years old, have a high school diploma or equivalent, and have a Social Security number.",
  },
  {
    number: "02",
    title: "Complete the required pre-licensing education",
    body:
      "Most applicants must complete a Florida Real Estate Commission-approved 63-hour sales associate pre-licensing course before qualifying for the state examination. Certain exemptions may apply.",
  },
  {
    number: "03",
    title: "Submit your application",
    body:
      "Apply for the Florida real estate sales associate license through the Department of Business and Professional Regulation and provide the required information and applicable fee.",
  },
  {
    number: "04",
    title: "Complete electronic fingerprinting",
    body:
      "Florida requires electronic fingerprints for real estate sales associate applicants as part of the background-screening process.",
  },
  {
    number: "05",
    title: "Pass the Florida state examination",
    body:
      "After you are authorized to test, you must pass the Florida Real Estate Sales Associate Examination. The required passing score is 75.",
  },
  {
    number: "06",
    title: "Activate your license",
    body:
      "A newly issued sales associate license may initially be inactive. To work as an active sales associate, the license must be activated under a qualifying Florida real estate broker.",
  },
];

const faqItems = [
  {
    question: "How many hours is the Florida real estate pre-licensing course?",
    answer:
      "The standard Florida sales associate pre-licensing course consists of 63 hours.",
  },
  {
    question: "How old do you have to be to get a Florida real estate license?",
    answer:
      "Applicants must be at least 18 years old.",
  },
  {
    question: "Do you need a college degree?",
    answer:
      "No. Florida requires a high school diploma or its equivalent, not a college degree.",
  },
  {
    question: "Do Florida real estate applicants need fingerprints?",
    answer:
      "Yes. Electronic fingerprinting is required for real estate sales associate applicants.",
  },
  {
    question: "What score do you need to pass the Florida real estate exam?",
    answer:
      "The Florida Real Estate Sales Associate Examination requires a score of at least 75 to pass.",
  },
  {
    question: "What happens after you get your first Florida real estate license?",
    answer:
      "Before the initial sales associate license expires, Florida sales associates generally must complete the required 45-hour post-licensing education. Ongoing continuing-education requirements apply after that.",
  },
];

export default function FloridaRealEstateLicenseGuidePage() {
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
            maxWidth: "820px",
            marginBottom: "72px",
          }}
        >
          <p className="eyebrow">FLORIDA REAL ESTATE LICENSING GUIDE</p>

          <h1
            style={{
              overflowWrap: "anywhere",
            }}
          >
            How to Get a Florida Real Estate License
          </h1>

          <p
            className="page-lead"
            style={{
              maxWidth: "760px",
            }}
          >
            A clear step-by-step overview of the Florida real estate sales
            associate licensing process, from the required education through
            the state exam and license activation.
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
            The Florida licensing path in six steps
          </h2>

          <p
            style={{
              color: "#4d4b46",
              maxWidth: "820px",
              marginBottom: 0,
            }}
          >
            Most Florida sales associate applicants must meet the state’s basic
            eligibility requirements, complete the required 63-hour
            pre-licensing education, apply through DBPR, submit electronic
            fingerprints, pass the state examination, and activate the license
            under a Florida broker before working in an active status.
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
              maxWidth: "760px",
              marginBottom: "42px",
            }}
          >
            What you need to do
          </h2>

          <div
            style={{
              borderTop: "1px solid rgba(17, 23, 23, 0.18)",
            }}
          >
            {steps.map((step) => (
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
                      fontSize: "clamp(1.5rem, 3vw, 2rem)",
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
          <p className="eyebrow">FLORIDA PRE-LICENSING EDUCATION</p>

          <h2>The 63-hour course</h2>

          <p>
            Florida law generally requires prospective real estate sales
            associates to complete a Florida Real Estate Commission-approved
            pre-licensing course before taking the state examination.
          </p>

          <p>
            The standard sales associate pre-licensing course consists of 63
            hours and covers foundational real estate principles, practices,
            and Florida real estate license law.
          </p>

          <p>
            Certain applicants may qualify for an exemption from the
            pre-licensing course, including qualifying Florida attorneys and
            certain applicants with an eligible four-year degree in real
            estate.
          </p>
        </div>

        <div
          style={{
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">THE STATE EXAM</p>

          <h2>What happens after the course?</h2>

          <p>
            After satisfying the education requirement and receiving
            authorization to test, applicants take the Florida Real Estate
            Sales Associate Examination.
          </p>

          <p>
            A score of at least 75 is required to pass the sales associate
            examination.
          </p>

          <p>
            Completing the pre-licensing course does not itself issue a real
            estate license. The course is one part of the state licensing
            process.
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
          <p className="eyebrow eyebrow--light">AFTER LICENSURE</p>

          <h2
            className="light-heading"
            style={{
              maxWidth: "760px",
            }}
          >
            Your education does not end with the state exam.
          </h2>

          <p
            style={{
              color: "rgba(245, 240, 231, 0.82)",
              maxWidth: "820px",
            }}
          >
            Florida sales associates are generally required to complete
            45 hours of approved post-licensing education before the expiration
            of their initial license period. After that, ongoing continuing
            education requirements apply.
          </p>

          <Link
            href="/courses#post-license"
            style={{
              color: "#f5f0e7",
              textDecoration: "underline",
              textUnderlineOffset: "4px",
              fontWeight: 600,
            }}
          >
            Explore the post-license education path →
          </Link>
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
            Florida real estate license FAQ
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

          <h2>Verify current requirements before applying</h2>

          <p>
            Licensing requirements, forms, fees, testing procedures, and
            education rules can change. Applicants should confirm current
            requirements with the Florida Department of Business and
            Professional Regulation and the Florida Real Estate Commission.
          </p>

          <div
            style={{
              display: "grid",
              gap: "14px",
              marginTop: "24px",
            }}
          >
            <a
              href="https://www2.myfloridalicense.com/real-estate-commission/licensure-information/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "underline",
                textUnderlineOffset: "3px",
                fontWeight: 600,
              }}
            >
              Florida Real Estate Commission — Licensure Information
            </a>

            <a
              href="https://www.myfloridalicense.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "underline",
                textUnderlineOffset: "3px",
                fontWeight: 600,
              }}
            >
              Florida DBPR / MyFloridaLicense
            </a>
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
          <p className="eyebrow">READY TO UNDERSTAND YOUR NEXT STEP?</p>

          <h2
            style={{
              maxWidth: "720px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Explore Greyson Institute’s real estate education paths.
          </h2>

          <p
            style={{
              color: "#4d4b46",
              maxWidth: "700px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Review the education paths for pre-licensing, post-license,
            continuing education, broker education, reactivation, and exam
            preparation.
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
