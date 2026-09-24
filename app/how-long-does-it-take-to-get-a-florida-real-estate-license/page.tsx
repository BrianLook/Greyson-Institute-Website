import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GuideStructuredData } from "@/components/GuideStructuredData";

const guideTitle =
  "How Long Does It Take to Get a Florida Real Estate License?";
const guideDescription =
  "Learn how long the Florida real estate licensing process can take, including the 63-hour pre-licensing course, DBPR application, fingerprints, state exam, and license activation.";
const guidePath =
  "/how-long-does-it-take-to-get-a-florida-real-estate-license";

export const metadata: Metadata = {
  title: guideTitle,
  description: guideDescription,
};

const timelineSteps = [
  {
    number: "01",
    title: "Complete the 63-hour pre-licensing course",
    timing: "63 instructional hours",
    body:
      "Most Florida sales associate applicants must successfully complete a Florida Real Estate Commission-approved 63-hour pre-licensing course. How quickly you finish depends on the course format and the pace at which you complete the required instruction.",
  },
  {
    number: "02",
    title: "Submit your DBPR application",
    timing: "Processing time varies",
    body:
      "The Florida Department of Business and Professional Regulation must process your sales associate application before you can move through the full licensing process. Processing time can vary based on application volume, completeness, and whether additional information is needed.",
  },
  {
    number: "03",
    title: "Complete electronic fingerprints",
    timing: "Complete early",
    body:
      "Electronic fingerprints are required as part of the application process. Completing fingerprinting promptly can help avoid adding unnecessary delay while DBPR reviews your application.",
  },
  {
    number: "04",
    title: "Receive authorization to test",
    timing: "After eligibility is approved",
    body:
      "You must be authorized before scheduling the Florida Real Estate Sales Associate Examination. The timing depends on DBPR completing the required application and eligibility review.",
  },
  {
    number: "05",
    title: "Schedule and take the state exam",
    timing: "Depends on seat availability",
    body:
      "Once you are authorized to test, the examination is scheduled through Pearson VUE. Pearson VUE states that appointments may be made up to one calendar day before the desired test date, subject to availability.",
  },
  {
    number: "06",
    title: "Activate the license",
    timing: "After the license is issued",
    body:
      "After satisfying the licensing requirements and receiving a license number, a sales associate must activate the license under a qualifying Florida real estate broker before working in active status.",
  },
];

const faqItems = [
  {
    question: "Can you get a Florida real estate license in one week?",
    answer:
      "There is no guaranteed one-week licensing timeline. The required pre-licensing education alone consists of 63 instructional hours, and applicants must also complete the application, fingerprinting, examination, and license-activation steps.",
  },
  {
    question: "How long is the Florida real estate course?",
    answer:
      "The standard Florida sales associate pre-licensing course consists of 63 classroom hours.",
  },
  {
    question: "How long does DBPR take to approve a real estate application?",
    answer:
      "There is not one fixed processing time that applies to every applicant. Timing can vary based on application volume, whether the application is complete, fingerprint processing, and whether DBPR needs additional information.",
  },
  {
    question: "How soon can I schedule the Florida real estate exam?",
    answer:
      "After you are authorized to test, Pearson VUE says appointments may be scheduled as late as one calendar day before the desired test date, subject to test-center availability.",
  },
  {
    question: "Do I become active immediately after passing the exam?",
    answer:
      "Passing the examination is an important step, but a Florida sales associate must also have the license activated under a qualifying broker before working in active status.",
  },
  {
    question: "Does the 63-hour course expire?",
    answer:
      "Florida's published sales associate requirements state that the pre-licensing course is valid for licensure purposes for two years after the course completion date.",
  },
];

export default function FloridaRealEstateLicenseTimelinePage() {
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
        datePublished="2026-09-24"
        dateModified="2026-09-24"
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
            maxWidth: "850px",
            marginBottom: "72px",
          }}
        >
          <p className="eyebrow">FLORIDA REAL ESTATE LICENSING GUIDE</p>

          <h1
            style={{
              overflowWrap: "anywhere",
            }}
          >
            How Long Does It Take to Get a Florida Real Estate License?
          </h1>

          <p
            className="page-lead"
            style={{
              maxWidth: "780px",
            }}
          >
            There is no single number of days that applies to every applicant.
            The total timeline depends on how quickly you complete the required
            education, application and fingerprints, state exam, and license
            activation.
          </p>

          <p className="muted">Last reviewed: September 24, 2026</p>
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
            The required course is 63 hours, but the full process takes longer.
          </h2>

          <p
            style={{
              color: "#4d4b46",
              maxWidth: "830px",
              marginBottom: 0,
            }}
          >
            Florida requires most sales associate applicants to complete a
            63-hour pre-licensing course. Your total elapsed time also includes
            the DBPR application and fingerprint process, authorization to
            test, exam scheduling and completion, and license activation.
            Because several of those steps vary by applicant, Florida does not
            provide one guaranteed start-to-finish timeline.
          </p>
        </div>

        <div
          style={{
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">TIMELINE</p>

          <h2
            style={{
              maxWidth: "760px",
              marginBottom: "42px",
            }}
          >
            The six parts of the licensing process
          </h2>

          <div
            style={{
              borderTop: "1px solid rgba(17, 23, 23, 0.18)",
            }}
          >
            {timelineSteps.map((step) => (
              <article
                key={step.number}
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "minmax(48px, 70px) minmax(0, 1fr) minmax(150px, auto)",
                  gap: "24px",
                  padding: "30px 0",
                  borderBottom: "1px solid rgba(17, 23, 23, 0.18)",
                  alignItems: "start",
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
                      maxWidth: "690px",
                    }}
                  >
                    {step.body}
                  </p>
                </div>

                <div
                  style={{
                    fontFamily: "var(--font-serif), Georgia, serif",
                    fontSize: "1.15rem",
                    textAlign: "right",
                    overflowWrap: "anywhere",
                  }}
                >
                  {step.timing}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div
          style={{
            background: "#1f2d30",
            color: "#f5f0e7",
            padding: "clamp(34px, 6vw, 60px)",
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow eyebrow--light">THE PART YOU CONTROL MOST</p>

          <h2
            className="light-heading"
            style={{
              maxWidth: "760px",
            }}
          >
            Your education pace can make a significant difference.
          </h2>

          <p
            style={{
              color: "rgba(245, 240, 231, 0.82)",
              maxWidth: "820px",
            }}
          >
            The pre-licensing education requirement is fixed at 63 hours, but
            the amount of calendar time it takes you to complete those hours
            depends on the course format and your study schedule. Applicants
            who can devote more time to the coursework may reach the
            application and examination stages sooner than applicants studying
            only occasionally.
          </p>

          <Link
            href="/courses#pre-licensing"
            style={{
              color: "#f5f0e7",
              textDecoration: "underline",
              textUnderlineOffset: "4px",
              fontWeight: 600,
            }}
          >
            Explore the pre-licensing education path →
          </Link>
        </div>

        <div
          style={{
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">EXAM SCHEDULING</p>

          <h2>How quickly can you take the Florida real estate exam?</h2>

          <p>
            Once you are authorized to test, Florida real estate examinations
            are scheduled through Pearson VUE at physical test centers.
          </p>

          <p>
            Pearson VUE currently states that appointments may be made up to one
            calendar day before the date you want to test, subject to seat
            availability.
          </p>

          <p>
            That does not mean every applicant can take the exam the next day.
            You must first receive authorization to test, and the test center
            and appointment time you want must be available.
          </p>
        </div>

        <div
          style={{
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">COURSE VALIDITY</p>

          <h2>You do not have to rush directly from class to the exam.</h2>

          <p>
            Florida’s published sales associate requirements state that the
            63-hour pre-licensing course is valid for licensure purposes for
            two years after the course completion date.
          </p>

          <p>
            That gives applicants time to complete the remaining licensing
            steps, but waiting too long can create unnecessary delays and may
            require you to revisit material before taking the examination.
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
          <p className="eyebrow">RELATED GUIDES</p>

          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              marginBottom: "22px",
            }}
          >
            Planning your Florida licensing path?
          </h2>

          <div
            style={{
              display: "grid",
              gap: "14px",
            }}
          >
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

            <Link
              href="/how-much-does-a-florida-real-estate-license-cost"
              style={{
                textDecoration: "underline",
                textUnderlineOffset: "4px",
                fontWeight: 600,
              }}
            >
              How Much Does a Florida Real Estate License Cost? →
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
            Florida real estate licensing timeline FAQ
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

          <h2>Check current requirements before you apply.</h2>

          <p>
            Licensing procedures and examination policies can change.
            Applicants should verify current information with the Florida
            Department of Business and Professional Regulation, the Florida
            Real Estate Commission, and Pearson VUE.
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
              href="https://www2.myfloridalicense.com/re/documents/RESLRequirements.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "underline",
                textUnderlineOffset: "3px",
                fontWeight: 600,
              }}
            >
              Florida Real Estate Sales Associate Requirements
            </a>

            <a
              href="https://www.pearsonvue.com/us/en/fl/realestate.html"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "underline",
                textUnderlineOffset: "3px",
                fontWeight: 600,
              }}
            >
              Pearson VUE — Florida Real Estate Examination
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
          <p className="eyebrow">START WITH THE RIGHT PATH</p>

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
            Review education paths for pre-licensing, post-license, continuing
            education, broker education, reactivation, and exam preparation.
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
