import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Florida Real Estate Education FAQ",
  description:
    "Answers to common Florida real estate education questions about licensing, the 63-hour course, post-license, continuing education, exams, and Greyson Institute.",
};

const faqs = [
  {
    question: "Which course do I need?",
    answer:
      "That depends on where you are in your real estate journey. Greyson Institute is organized around the most common paths: getting licensed, completing post-license education, renewing your license, becoming a broker, reactivating a license, or preparing for an exam.",
  },
  {
    question: "Does Greyson Institute offer online Florida real estate education?",
    answer:
      "Greyson Institute provides Florida real estate licensing guidance and is preparing co-branded online course enrollment through The CE Shop. For partner-delivered courses, The CE Shop will remain the school of record and handle payment, course delivery, course-specific support, certificates, and regulatory completion reporting.",
  },
  {
    question: "Can you help me figure out what course I need?",
    answer:
      "Yes. If you are unsure which education requirement applies to you, Greyson Institute can help point you toward the appropriate course path and explain what to look for before enrolling.",
  },
  {
    question: "Does Greyson Institute serve students throughout Florida?",
    answer:
      "Yes. Greyson Institute is designed to help students throughout Florida understand the education path that applies to their license stage. Florida licensing rules are statewide, although individual course availability and enrollment details may vary by program.",
  },
  {
    question: "Do I have to complete the course all at once?",
    answer:
      "The CE Shop's partner courses are online and asynchronous. Specific course timing, completion requirements, and access periods will be shown on the partner course page when enrollment opens.",
  },
  {
    question: "Will I receive proof of completion?",
    answer:
      "For partner-delivered courses, The CE Shop will handle certificates and applicable regulatory completion reporting. Greyson will explain the next licensing step and link you to the correct provider information.",
  },
  {
    question: "What happens after I finish my course?",
    answer:
      "That depends on the course. Greyson will explain the likely next licensing step, while the course provider handles the classroom, course completion, certificate, and applicable regulatory reporting. Completing required education does not by itself complete every DBPR renewal or licensing step.",
  },
  {
    question: "What is the 63-hour Florida real estate pre-licensing course?",
    answer:
      "Florida sales associate applicants generally complete a 63-hour approved pre-licensing course before taking the state licensing examination, subject to any applicable exemption. Greyson Institute provides a dedicated guide explaining the requirement and where it fits in the licensing process.",
  },
  {
    question: "What is the 45-hour Florida post-license requirement?",
    answer:
      "Florida sales associates generally must complete 45 hours of approved post-license education before their first license renewal. The requirement applies to the initial renewal period and is separate from later continuing-education requirements.",
  },
  {
    question: "How much continuing education do Florida real estate licensees need?",
    answer:
      "After the initial post-license period, Florida real estate licensees generally complete 14 hours of continuing education for each applicable renewal cycle, subject to current Florida rules and any exemption that may apply.",
  },
  {
    question: "Can I get a Florida real estate license online?",
    answer:
      "Many parts of the Florida licensing process can be completed online, including approved distance-education coursework. Applicants still must satisfy the state's application, background-check, examination, and other licensing requirements.",
  },
  {
    question: "How do I prepare for the Florida real estate exam?",
    answer:
      "Start by completing the required education, then review the major tested subject areas, practice exam-style questions, and make sure you understand the state's examination and scheduling process. Greyson Institute provides a Florida real estate exam guide and exam-preparation resources.",
  },
  {
    question: "Who is Brian Smith?",
    answer:
      "Brian Smith is a Licensed Florida Real Estate Broker & Instructor and the Founder of Greyson Institute. He has been licensed in real estate since 1997 and brings experience in sales, listings, buyer representation, brokerage operations, agent training, and real estate company ownership.",
  },
  {
    question: "Can I contact Greyson Institute if I have questions?",
    answer:
      "Yes. Greyson can help with Florida licensing-path questions and enrollment guidance. Course-specific billing, technical issues, classroom access, certificates, and content support are handled by the applicable course provider.",
  },
];

export default function FAQPage() {
  return (
    <section
      className="page-hero"
      style={{
        paddingBottom: "100px",
      }}
    >
      <style>
        {`
          .faq-row {
            position: relative;
            background: transparent;
            transition:
              transform 0.2s ease,
              background-color 0.2s ease,
              box-shadow 0.2s ease;
          }

          @media (hover: hover) and (pointer: fine) {
            .faq-row:hover {
              background: #ffffff;
              transform: translateY(-3px);
              box-shadow: 0 16px 40px rgba(17, 23, 23, 0.07);
              z-index: 2;
            }
          }
        `}
      </style>

      <div
        className="container"
        style={{
          marginBottom: "78px",
          minWidth: 0,
        }}
      >
        <p className="eyebrow">FREQUENTLY ASKED QUESTIONS</p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: "55px",
            alignItems: "end",
            minWidth: 0,
          }}
        >
          <h1
            style={{
              maxWidth: "700px",
              marginBottom: 0,
              minWidth: 0,
              overflowWrap: "anywhere",
            }}
          >
            Clear answers before you enroll.
          </h1>

          <p
            className="page-lead"
            style={{
              margin: 0,
              maxWidth: "520px",
              minWidth: 0,
              overflowWrap: "anywhere",
            }}
          >
            Florida real estate education comes with specific requirements,
            deadlines, and next steps. Start here with answers to common
            questions about licensing, pre-licensing, post-license, continuing
            education, exams, and Greyson Institute.
          </p>
        </div>
      </div>

      <div
        className="container"
        style={{
          maxWidth: "1000px",
          minWidth: 0,
        }}
      >
        <div
          style={{
            borderTop: "1px solid rgba(17, 23, 23, 0.18)",
            minWidth: 0,
          }}
        >
          {faqs.map((faq, index) => (
            <details
              key={faq.question}
              className="faq-row"
              style={{
                borderBottom: "1px solid rgba(17, 23, 23, 0.18)",
                padding: 0,
                minWidth: 0,
              }}
            >
              <summary
                style={{
                  cursor: "pointer",
                  padding: "28px 20px",
                  fontFamily: "var(--font-serif), Georgia, serif",
                  fontSize: "clamp(1.35rem, 2vw, 1.75rem)",
                  lineHeight: 1.25,
                  minWidth: 0,
                }}
              >
                <span
                  style={{
                    display: "inline-grid",
                    gridTemplateColumns: "40px minmax(0, 1fr)",
                    columnGap: "16px",
                    width: "calc(100% - 22px)",
                    verticalAlign: "top",
                    minWidth: 0,
                  }}
                >
                  <span
                    style={{
                      color: "#7d5f3a",
                      fontFamily: "var(--font-sans), Arial, sans-serif",
                      fontSize: "0.68rem",
                      letterSpacing: "0.16em",
                      lineHeight: 1.6,
                      paddingTop: "3px",
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span
                    style={{
                      minWidth: 0,
                      overflowWrap: "anywhere",
                    }}
                  >
                    {faq.question}
                  </span>
                </span>
              </summary>

              <div
                style={{
                  padding: "0 20px 30px clamp(60px, 8vw, 76px)",
                  minWidth: 0,
                }}
              >
                <p
                  style={{
                    maxWidth: "760px",
                    margin: 0,
                    color: "#6e6b65",
                    fontSize: "0.97rem",
                    lineHeight: 1.8,
                    overflowWrap: "anywhere",
                  }}
                >
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>

      <div
        className="container"
        style={{
          marginTop: "90px",
          maxWidth: "1000px",
          minWidth: 0,
        }}
      >
        <div
          style={{
            background: "#eee6d9",
            border: "1px solid rgba(17, 23, 23, 0.14)",
            padding: "clamp(34px, 5vw, 60px)",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
            gap: "35px",
            alignItems: "center",
            minWidth: 0,
          }}
        >
          <div
            style={{
              minWidth: 0,
            }}
          >
            <p className="eyebrow">STILL NOT SURE?</p>

            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                marginBottom: "12px",
                overflowWrap: "anywhere",
              }}
            >
              We’ll help you find the right path.
            </h2>

            <p
              style={{
                color: "#4d4b46",
                marginBottom: 0,
                overflowWrap: "anywhere",
              }}
            >
              Tell us where you are in your real estate journey and we’ll help
              you understand what may come next.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              minWidth: 0,
            }}
          >
            <Link
              className="button"
              href="/contact"
              style={{
                maxWidth: "100%",
                whiteSpace: "normal",
                textAlign: "center",
              }}
            >
              Contact Greyson Institute
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
