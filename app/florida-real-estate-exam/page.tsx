import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Florida Real Estate Exam: What to Expect and How to Prepare",
  description:
    "Learn what to expect on the Florida Real Estate Sales Associate Exam, including the 100-question format, 3.5-hour time limit, passing score, exam topics, test-day requirements, and preparation tips.",
};

const examFacts = [
  {
    label: "Questions",
    value: "100",
    detail: "Multiple-choice questions",
  },
  {
    label: "Time limit",
    value: "3½ hours",
    detail: "Total examination time",
  },
  {
    label: "Passing score",
    value: "75",
    detail: "75 points or higher",
  },
  {
    label: "Format",
    value: "Closed book",
    detail: "Reference materials are not permitted",
  },
];

const weightedTopics = [
  {
    title: "Real Estate Brokerage Activities and Procedures",
    weight: "12%",
  },
  {
    title: "Real Estate Contracts",
    weight: "12%",
  },
  {
    title: "Residential Mortgages",
    weight: "9%",
  },
  {
    title:
      "Property Rights, Estates, Tenancies, Condominiums and Related Ownership",
    weight: "8%",
  },
  {
    title: "Real Estate Appraisal",
    weight: "8%",
  },
  {
    title: "Authorized Relationships, Duties and Disclosures",
    weight: "7%",
  },
  {
    title: "Titles, Deeds and Ownership Restrictions",
    weight: "7%",
  },
  {
    title: "License Law and Qualifications for Licensure",
    weight: "6%",
  },
  {
    title: "Real Estate Related Computations and Closing of Transactions",
    weight: "6%",
  },
  {
    title: "Legal Descriptions",
    weight: "5%",
  },
];

const preparationSteps = [
  {
    number: "01",
    title: "Use the official exam content outline",
    body:
      "Start with the Florida DBPR Sales Associate Candidate Information Booklet. It identifies the nineteen content areas on the examination and shows the percentage of questions assigned to each area.",
  },
  {
    number: "02",
    title: "Prioritize the heavily weighted subjects",
    body:
      "Brokerage activities and real estate contracts each account for 12% of the current exam outline. Residential mortgages, property rights, appraisal, brokerage relationships, and title-related subjects are also significant portions of the examination.",
  },
  {
    number: "03",
    title: "Do not neglect Florida license law",
    body:
      "The examination tests Florida-specific licensing law, Commission rules, brokerage relationships, duties, disclosures, violations, penalties, and other regulatory subjects in addition to general real estate principles.",
  },
  {
    number: "04",
    title: "Practice real estate calculations",
    body:
      "Mathematical concepts appear throughout the official outline, including commissions, legal descriptions, financing, closing computations, and real estate taxes. Practice solving problems without relying only on memorized definitions.",
  },
  {
    number: "05",
    title: "Practice under a time limit",
    body:
      "The actual examination gives you three and a half hours for 100 questions. Timed practice can help you become more comfortable making decisions, moving forward, and returning to questions you want to review.",
  },
  {
    number: "06",
    title: "Review weak areas instead of only rereading",
    body:
      "Use practice questions to identify subjects you consistently miss, then return to your approved course materials and review those concepts before testing again.",
  },
];

const testDayItems = [
  {
    title: "Arrive early",
    body:
      "Florida's candidate booklet instructs candidates to report to the test center 30 minutes before the scheduled examination.",
  },
  {
    title: "Bring the required identification",
    body:
      "Candidates must bring two forms of valid signature identification, including one government-issued form such as a driver's license, state identification card, passport, or military identification card.",
  },
  {
    title: "Bring your education documentation",
    body:
      "Candidates who completed pre-licensing education must present their valid Certificate of Pre-Licensing Education Completion each time they take the examination unless another qualifying document applies.",
  },
  {
    title: "Know the calculator rules",
    body:
      "Permitted calculators must meet Florida's testing requirements. They must be silent, hand-held, battery-operated, nonprinting, and may not function as prohibited information-storage or word-processing devices.",
  },
  {
    title: "Expect a computer-based examination",
    body:
      "The examination is administered electronically. Before the exam begins, candidates receive an opportunity to complete a computer tutorial, and the tutorial time does not reduce the examination time.",
  },
  {
    title: "Your result is provided after testing",
    body:
      "Candidates receive an official photo-bearing examination result report immediately after completing the examination.",
  },
];

const faqItems = [
  {
    question: "How many questions are on the Florida real estate exam?",
    answer:
      "The Florida Real Estate Sales Associate Examination currently contains 100 multiple-choice questions.",
  },
  {
    question: "How long do you have to take the Florida real estate exam?",
    answer:
      "Candidates are currently given three and a half hours to complete the Sales Associate examination.",
  },
  {
    question: "What score do you need to pass the Florida real estate exam?",
    answer:
      "A score of 75 points or higher is required to pass the Florida Real Estate Sales Associate Examination.",
  },
  {
    question: "Is the Florida real estate exam open book?",
    answer:
      "No. Florida's candidate information booklet identifies the Sales Associate examination as a closed-book examination. Reference materials are not permitted in the testing room.",
  },
  {
    question: "Can you take the Florida real estate exam from home?",
    answer:
      "Pearson VUE currently states that Florida DBPR real estate candidates must take the examination at a physical test center.",
  },
  {
    question: "Do you get your Florida real estate exam score immediately?",
    answer:
      "The current candidate booklet states that candidates receive an official exam result report immediately after completing the examination.",
  },
  {
    question: "Can you use a calculator on the Florida real estate exam?",
    answer:
      "Yes, certain calculators are permitted at the test center, but they must meet Florida's testing restrictions. Candidates should review the current Candidate Information Booklet before exam day.",
  },
  {
    question: "Is the course exam the same as the Florida state exam?",
    answer:
      "No. The end-of-course examination is part of the 63-hour pre-licensing course. The Florida Real Estate Sales Associate Examination is the separate state licensing exam taken after you satisfy the applicable education and application requirements.",
  },
];

export default function FloridaRealEstateExamPage() {
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
          <p className="eyebrow">FLORIDA REAL ESTATE EXAM GUIDE</p>

          <h1
            style={{
              overflowWrap: "anywhere",
            }}
          >
            Florida Real Estate Exam: What to Expect and How to Prepare
          </h1>

          <p
            className="page-lead"
            style={{
              maxWidth: "790px",
            }}
          >
            Understand the Florida Real Estate Sales Associate Examination
            before test day, including the exam format, passing score, major
            subject areas, testing rules, and practical ways to prepare.
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
            100 questions. 3½ hours. A passing score of 75.
          </h2>

          <p
            style={{
              color: "#4d4b46",
              maxWidth: "830px",
              marginBottom: 0,
            }}
          >
            The Florida Real Estate Sales Associate Examination is a
            closed-book, computer-based examination consisting of 100
            multiple-choice questions. Candidates receive three and a half
            hours to complete the exam, and a score of at least 75 points is
            required to pass.
          </p>
        </div>

        <div
          style={{
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">EXAM AT A GLANCE</p>

          <h2
            style={{
              marginBottom: "36px",
            }}
          >
            What the Florida sales associate exam looks like
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
            {examFacts.map((fact) => (
              <div
                key={fact.label}
                style={{
                  padding: "28px",
                  minHeight: "180px",
                  borderRight: "1px solid rgba(17, 23, 23, 0.18)",
                  borderBottom: "1px solid rgba(17, 23, 23, 0.18)",
                }}
              >
                <p className="eyebrow">{fact.label}</p>

                <div
                  style={{
                    fontFamily: "var(--font-serif), Georgia, serif",
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    marginBottom: "10px",
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
          <p className="eyebrow">WHAT IS ON THE EXAM?</p>

          <h2
            style={{
              maxWidth: "800px",
            }}
          >
            Florida tests law, real estate principles, practice, and
            mathematics.
          </h2>

          <p>
            The official Florida Sales Associate examination outline contains
            nineteen content areas. Questions test your knowledge,
            understanding, and application of real estate principles and
            practices, Florida real estate law, and real estate mathematics.
          </p>

          <p>
            Not every subject receives the same emphasis. The official content
            outline assigns a percentage of the examination to each topic.
          </p>
        </div>

        <div
          style={{
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">HIGHER-WEIGHTED CONTENT</p>

          <h2
            style={{
              maxWidth: "780px",
              marginBottom: "40px",
            }}
          >
            Some subjects make up a larger share of the examination.
          </h2>

          <div
            style={{
              borderTop: "1px solid rgba(17, 23, 23, 0.18)",
            }}
          >
            {weightedTopics.map((topic, index) => (
              <div
                key={topic.title}
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "minmax(45px, 65px) minmax(0, 1fr) minmax(60px, auto)",
                  gap: "20px",
                  alignItems: "center",
                  padding: "22px 0",
                  borderBottom: "1px solid rgba(17, 23, 23, 0.18)",
                }}
              >
                <span
                  style={{
                    color: "#7d5f3a",
                    fontSize: "0.7rem",
                    letterSpacing: "0.15em",
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <strong
                  style={{
                    fontSize: "1rem",
                    lineHeight: 1.5,
                    overflowWrap: "anywhere",
                  }}
                >
                  {topic.title}
                </strong>

                <span
                  style={{
                    fontFamily: "var(--font-serif), Georgia, serif",
                    fontSize: "1.3rem",
                  }}
                >
                  {topic.weight}
                </span>
              </div>
            ))}
          </div>

          <p
            style={{
              color: "#6e6b65",
              fontSize: "0.9rem",
              marginTop: "18px",
              maxWidth: "780px",
            }}
          >
            These are selected higher-weighted sections from the official
            nineteen-area examination outline, not a complete list of every
            subject that may appear on the exam.
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
          <p className="eyebrow eyebrow--light">IMPORTANT DISTINCTION</p>

          <h2
            className="light-heading"
            style={{
              maxWidth: "780px",
            }}
          >
            The state exam is not the same as your 63-hour course exam.
          </h2>

          <p
            style={{
              color: "rgba(245, 240, 231, 0.82)",
              maxWidth: "830px",
            }}
          >
            The end-of-course examination is part of completing your approved
            63-hour Florida pre-licensing education. The Florida Real Estate
            Sales Associate Examination is the separate state licensing
            examination administered later in the licensing process.
          </p>

          <Link
            href="/florida-63-hour-real-estate-pre-licensing-course"
            style={{
              color: "#f5f0e7",
              textDecoration: "underline",
              textUnderlineOffset: "4px",
              fontWeight: 600,
            }}
          >
            Learn about the Florida 63-hour pre-licensing course →
          </Link>
        </div>

        <div
          style={{
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">HOW TO PREPARE</p>

          <h2
            style={{
              maxWidth: "780px",
              marginBottom: "42px",
            }}
          >
            A practical study approach
          </h2>

          <div
            style={{
              borderTop: "1px solid rgba(17, 23, 23, 0.18)",
            }}
          >
            {preparationSteps.map((step) => (
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
          <p className="eyebrow">TEST DAY</p>

          <h2
            style={{
              marginBottom: "40px",
            }}
          >
            What to expect at the Pearson VUE test center
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
              gap: "18px",
            }}
          >
            {testDayItems.map((item) => (
              <div
                key={item.title}
                style={{
                  border: "1px solid rgba(17, 23, 23, 0.16)",
                  padding: "28px",
                  minWidth: 0,
                }}
              >
                <h3
                  style={{
                    fontSize: "1.45rem",
                    marginBottom: "12px",
                    overflowWrap: "anywhere",
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    color: "#4d4b46",
                    margin: 0,
                  }}
                >
                  {item.body}
                </p>
              </div>
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
          <p className="eyebrow">SCHEDULING THE EXAM</p>

          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              marginBottom: "18px",
            }}
          >
            Florida real estate exams are scheduled through Pearson VUE.
          </h2>

          <p
            style={{
              color: "#4d4b46",
              maxWidth: "800px",
            }}
          >
            After you are eligible to test, the Florida Real Estate Sales
            Associate Examination is scheduled through Pearson VUE. Pearson VUE
            currently states that appointments may be made as late as one
            calendar day before the desired test date, subject to availability.
          </p>

          <div
            style={{
              marginTop: "22px",
            }}
          >
            <a
              href="https://www.pearsonvue.com/us/en/fl/realestate.html"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
                fontWeight: 600,
                marginBottom: "6px",
              }}
            >
              View Florida real estate exam scheduling on Pearson VUE ↗
            </a>

            <p
              style={{
                margin: 0,
                color: "#6e6b65",
                fontSize: "0.82rem",
                lineHeight: 1.5,
              }}
            >
              You&apos;re leaving the Greyson Institute website. Pearson VUE
              will open in a new tab.
            </p>
          </div>
        </div>

        <div
          style={{
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">AFTER THE EXAM</p>

          <h2>What happens when you finish?</h2>

          <p>
            Florida&apos;s current Candidate Information Booklet states that
            candidates receive an official, photo-bearing examination result
            report immediately after completing the examination.
          </p>

          <p>
            If you pass, your exam result is part of the remaining licensing
            process. Passing the examination does not mean you can immediately
            begin performing real estate services in active status without
            completing the applicable license issuance and activation steps.
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
            Build your Florida licensing plan.
          </h2>

          <div
            style={{
              display: "grid",
              gap: "14px",
              marginTop: "24px",
            }}
          >
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
            Florida real estate exam FAQ
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
          <p className="eyebrow">OFFICIAL EXAM RESOURCES</p>

          <h2>Verify the current rules before test day.</h2>

          <p
            style={{
              maxWidth: "800px",
            }}
          >
            Examination procedures, identification rules, fees, testing
            policies, and scheduling information can change. Review the current
            official information before your examination.
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
                href="https://www2.myfloridalicense.com/servop/testing/documents/RE_sales_cibs.pdf"
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
                Florida Sales Associate Candidate Information Booklet ↗
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

            <div>
              <a
                href="https://www2.myfloridalicense.com/examination-information/"
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
                Florida DBPR Examination Information ↗
              </a>

              <p
                style={{
                  margin: 0,
                  color: "#6e6b65",
                  fontSize: "0.82rem",
                }}
              >
                You&apos;re leaving the Greyson Institute website. Florida
                DBPR will open in a new tab.
              </p>
            </div>

            <div>
              <a
                href="https://www.pearsonvue.com/us/en/fl/realestate.html"
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
                Pearson VUE — Florida Real Estate ↗
              </a>

              <p
                style={{
                  margin: 0,
                  color: "#6e6b65",
                  fontSize: "0.82rem",
                }}
              >
                You&apos;re leaving the Greyson Institute website. Pearson VUE
                will open in a new tab.
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
          <p className="eyebrow">PREPARE FOR YOUR NEXT STEP</p>

          <h2
            style={{
              maxWidth: "720px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Explore Greyson Institute&apos;s exam preparation and licensing
            education paths.
          </h2>

          <p
            style={{
              color: "#4d4b46",
              maxWidth: "700px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Review the education path that matches where you are today, from
            pre-licensing through exam preparation and post-license education.
          </p>

          <div
            className="button-row"
            style={{
              justifyContent: "center",
            }}
          >
            <Link className="button" href="/courses#exam-prep">
              Explore Exam Preparation
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
