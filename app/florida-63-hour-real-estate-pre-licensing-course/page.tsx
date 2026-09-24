import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Florida 63-Hour Real Estate Pre-Licensing Course",
  description:
    "Learn what the Florida 63-hour real estate pre-licensing course covers, how the course works, who must take it, the end-of-course exam, and what happens after completion.",
};

const courseTopics = [
  {
    number: "01",
    title: "Florida real estate licensing law",
    body:
      "The course covers Florida license law, the role of the Florida Real Estate Commission, license qualifications, license status, education requirements, and activities that require a real estate license.",
  },
  {
    number: "02",
    title: "Brokerage relationships and duties",
    body:
      "Students learn about authorized brokerage relationships, duties to customers and principals, disclosure requirements, transaction brokerage, single agency, and other responsibilities involved in Florida real estate practice.",
  },
  {
    number: "03",
    title: "Property rights, ownership, and title",
    body:
      "The curriculum includes estates and tenancies, forms of ownership, condominiums and cooperatives, title, deeds, ownership restrictions, and legal descriptions.",
  },
  {
    number: "04",
    title: "Real estate contracts",
    body:
      "Students study the fundamentals of real estate contracts, including how agreements are created, the elements of enforceable contracts, and common issues that arise in real estate transactions.",
  },
  {
    number: "05",
    title: "Mortgages and financing",
    body:
      "The course introduces residential mortgages, different types of mortgage financing, lending concepts, and common sources of funds used in real estate transactions.",
  },
  {
    number: "06",
    title: "Calculations and closings",
    body:
      "Students work with real estate-related computations and concepts associated with transaction closings, giving them experience with the mathematical side of the licensing material.",
  },
  {
    number: "07",
    title: "Markets, appraisal, investment, and taxes",
    body:
      "The FREC syllabus also includes real estate markets and analysis, appraisal principles, real estate investment, business opportunity brokerage, and taxes affecting real estate.",
  },
  {
    number: "08",
    title: "Planning and zoning",
    body:
      "The course concludes with concepts involving land-use planning, zoning, and government regulation affecting the use and development of real property.",
  },
];

const faqItems = [
  {
    question: "Is the Florida pre-licensing course really 63 hours?",
    answer:
      "Yes. Florida requires a 63-hour sales associate pre-licensing course for most applicants. The current FREC Course I syllabus allocates 60 hours to instruction and 3 hours to the end-of-course examination.",
  },
  {
    question: "Can I take the Florida 63-hour real estate course online?",
    answer:
      "Yes. Florida law allows Commission-approved distance-learning courses as an alternative to classroom instruction. The course must meet Florida Real Estate Commission requirements.",
  },
  {
    question: "Does the 63-hour course include an exam?",
    answer:
      "Yes. Satisfactory completion includes an end-of-course examination administered as part of the approved pre-licensing course.",
  },
  {
    question: "Is the course exam the same as the Florida state real estate exam?",
    answer:
      "No. The end-of-course examination is part of your pre-licensing education. The Florida Real Estate Sales Associate Examination is a separate state licensing examination taken later in the licensing process.",
  },
  {
    question: "How long is the 63-hour course valid?",
    answer:
      "Florida's published sales associate licensing requirements state that the completed pre-licensing course is valid for licensure purposes for two years after the course completion date.",
  },
  {
    question: "Does everyone have to take the 63-hour course?",
    answer:
      "Most applicants do, but exemptions can apply. Florida currently identifies certain attorneys and applicants with qualifying four-year real estate degrees as possible pre-licensing education exemptions.",
  },
];

export default function Florida63HourPreLicensingCoursePage() {
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
          <p className="eyebrow">FLORIDA PRE-LICENSING EDUCATION</p>

          <h1
            style={{
              overflowWrap: "anywhere",
            }}
          >
            Florida 63-Hour Real Estate Pre-Licensing Course
          </h1>

          <p
            className="page-lead"
            style={{
              maxWidth: "780px",
            }}
          >
            Before most applicants can become Florida real estate sales
            associates, they must successfully complete the state-required
            pre-licensing education. Here is what the 63-hour course is, what
            it covers, and what happens after you finish it.
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
            The course is 60 hours of instruction plus a 3-hour course exam.
          </h2>

          <p
            style={{
              color: "#4d4b46",
              maxWidth: "830px",
              marginBottom: 0,
            }}
          >
            Florida requires most sales associate applicants to complete a
            Florida Real Estate Commission-approved 63-hour pre-licensing
            course. The current FREC Course I syllabus provides for 60 hours of
            instruction and a 3-hour end-of-course examination.
          </p>
        </div>

        <div
          style={{
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">WHAT IS THE 63-HOUR COURSE?</p>

          <h2
            style={{
              maxWidth: "780px",
            }}
          >
            Florida&apos;s required foundation for new sales associates
          </h2>

          <p>
            The 63-hour course is the standard pre-licensing education
            requirement for applicants pursuing a Florida real estate sales
            associate license.
          </p>

          <p>
            The curriculum is based on the Florida Real Estate Commission&apos;s
            Sales Associate Course Syllabus, commonly referred to as FREC
            Course I. Approved schools design their courses around that
            state-prescribed curriculum.
          </p>

          <p>
            Completing the course does not itself make you a licensed real
            estate sales associate. It satisfies the education portion of the
            licensing process. Applicants must also meet the other Florida
            licensing requirements and pass the separate state examination.
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
          <p className="eyebrow eyebrow--light">63 HOURS EXPLAINED</p>

          <h2
            className="light-heading"
            style={{
              maxWidth: "780px",
            }}
          >
            The end-of-course exam is part of the 63 hours.
          </h2>

          <p
            style={{
              color: "rgba(245, 240, 231, 0.82)",
              maxWidth: "820px",
            }}
          >
            The current FREC Sales Associate Course Syllabus provides for
            60 hours of course instruction followed by a 3-hour end-of-course
            examination. That examination is part of completing the
            pre-licensing course and is separate from the Florida state
            licensing examination.
          </p>
        </div>

        <div
          style={{
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">WHAT YOU WILL STUDY</p>

          <h2
            style={{
              maxWidth: "760px",
              marginBottom: "42px",
            }}
          >
            The major subjects covered in FREC Course I
          </h2>

          <div
            style={{
              borderTop: "1px solid rgba(17, 23, 23, 0.18)",
            }}
          >
            {courseTopics.map((topic) => (
              <article
                key={topic.number}
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
                  {topic.number}
                </div>

                <div style={{ minWidth: 0 }}>
                  <h3
                    style={{
                      fontSize: "clamp(1.45rem, 3vw, 1.9rem)",
                      marginBottom: "10px",
                      overflowWrap: "anywhere",
                    }}
                  >
                    {topic.title}
                  </h3>

                  <p
                    style={{
                      color: "#4d4b46",
                      margin: 0,
                      maxWidth: "760px",
                    }}
                  >
                    {topic.body}
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
          <p className="eyebrow">ONLINE OR CLASSROOM?</p>

          <h2>You can complete approved pre-licensing education remotely.</h2>

          <p>
            Florida permits approved distance-learning pre-licensing courses
            in addition to classroom education. That means students are not
            necessarily required to attend a traditional physical classroom to
            satisfy the education requirement.
          </p>

          <p>
            The important distinction is not simply whether a course is
            online. The course must satisfy Florida Real Estate Commission
            requirements for pre-licensing education.
          </p>
        </div>

        <div
          style={{
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">AFTER YOU FINISH</p>

          <h2>The course is one step in the licensing process.</h2>

          <p>
            After successfully completing the required pre-licensing
            education, you still need to complete the remaining Florida
            licensing requirements, including the application and
            fingerprinting process and the state licensing examination.
          </p>

          <p>
            Florida&apos;s published sales associate requirements state that
            the pre-licensing course is valid for licensure purposes for two
            years after the course completion date.
          </p>

          <Link
            href="/how-to-get-a-florida-real-estate-license"
            style={{
              textDecoration: "underline",
              textUnderlineOffset: "4px",
              fontWeight: 600,
            }}
          >
            See the complete Florida licensing process →
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
            Plan the rest of your licensing path.
          </h2>

          <p
            style={{
              color: "#4d4b46",
              maxWidth: "760px",
              marginBottom: "24px",
            }}
          >
            Learn the complete licensing process, what the major expenses may
            be, and how long the steps can take.
          </p>

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

            <Link
              href="/how-long-does-it-take-to-get-a-florida-real-estate-license"
              style={{
                textDecoration: "underline",
                textUnderlineOffset: "4px",
                fontWeight: 600,
              }}
            >
              How Long Does It Take to Get a Florida Real Estate License? →
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
            Florida 63-hour pre-licensing course FAQ
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

          <h2>Review Florida&apos;s current education requirements.</h2>

          <p
            style={{
              maxWidth: "800px",
            }}
          >
            Education rules and course requirements can change. Students
            should verify current requirements with the Florida Department of
            Business and Professional Regulation and the Florida Real Estate
            Commission.
          </p>

          <div
            style={{
              display: "grid",
              gap: "20px",
              marginTop: "26px",
            }}
          >
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
                You&apos;re leaving the Greyson Institute website. The Florida
                DBPR website will open in a new tab.
              </p>
            </div>

            <div>
              <a
                href="https://www2.myfloridalicense.com/re/documents/FREC1SyllabusCleanFinal01012023.pdf"
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
                Official FREC Sales Associate Course I Syllabus ↗
              </a>

              <p
                style={{
                  margin: 0,
                  color: "#6e6b65",
                  fontSize: "0.82rem",
                }}
              >
                You&apos;re leaving the Greyson Institute website. The official
                Florida syllabus will open in a new tab.
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
          <p className="eyebrow">PRE-LICENSING EDUCATION</p>

          <h2
            style={{
              maxWidth: "720px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Explore the Florida sales associate education path.
          </h2>

          <p
            style={{
              color: "#4d4b46",
              maxWidth: "700px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Review Greyson Institute&apos;s pre-licensing path and learn where
            the 63-hour course fits into your journey toward a Florida real
            estate license.
          </p>

          <div
            className="button-row"
            style={{
              justifyContent: "center",
            }}
          >
            <Link className="button" href="/courses#pre-licensing">
              Explore Pre-Licensing
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
