import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ",
};

const faqs = [
  {
    question: "Which course do I need?",
    answer:
      "That depends on where you are in your real estate journey. Greyson Institute is organized around the most common paths: getting licensed, completing post-license education, renewing your license, becoming a broker, reactivating a license, or preparing for an exam.",
  },
  {
    question: "Are the courses online?",
    answer:
      "Yes. Greyson Institute is designed around online real estate education so students can learn at their own pace and work through the material on a schedule that fits their life.",
  },
  {
    question: "Can you help me figure out what course I need?",
    answer:
      "Yes. If you are unsure which education requirement applies to you, Greyson Institute can help point you toward the appropriate course path and explain what to look for before enrolling.",
  },
  {
    question: "Are courses available in every state?",
    answer:
      "Course availability and licensing requirements vary by state. Available states, course-specific requirements, provider information, and enrollment details will be clearly displayed before enrollment.",
  },
  {
    question: "Do I have to complete the course all at once?",
    answer:
      "Online coursework is designed for flexible, self-paced learning. Specific course timing, completion requirements, and access periods will be listed on each course page.",
  },
  {
    question: "Will I receive proof of completion?",
    answer:
      "Completion documentation and any applicable reporting details will be explained clearly on each course page before enrollment.",
  },
  {
    question: "What happens after I finish my course?",
    answer:
      "That depends on the course you are taking. Some students may be preparing for a licensing exam, while others may be completing post-license, continuing education, broker, or reactivation requirements. Greyson Institute will explain the next step for each course path.",
  },
  {
    question: "Who is Brian Smith?",
    answer:
      "Brian Smith is a Licensed Florida Real Estate Broker & Instructor and the Founder of Greyson Institute. He has been licensed in real estate since 1997 and brings experience in sales, listings, buyer representation, brokerage operations, agent training, and real estate company ownership.",
  },
  {
    question: "Can I contact Greyson Institute if I have questions?",
    answer:
      "Yes. Greyson Institute is built around clear guidance and practical support, so students have a place to turn when they are unsure what comes next.",
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
      <div
        className="container"
        style={{
          marginBottom: "78px",
        }}
      >
        <p className="eyebrow">FREQUENTLY ASKED QUESTIONS</p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "55px",
            alignItems: "end",
          }}
        >
          <h1
            style={{
              maxWidth: "700px",
              marginBottom: 0,
            }}
          >
            Clear answers before you enroll.
          </h1>

          <p
            className="page-lead"
            style={{
              margin: 0,
              maxWidth: "520px",
            }}
          >
            Real estate education comes with requirements, deadlines, and
            important next steps. Start here with answers to some of the most
            common questions.
          </p>
        </div>
      </div>

      <div
        className="container"
        style={{
          maxWidth: "1000px",
        }}
      >
        <div
          style={{
            borderTop: "1px solid rgba(17, 23, 23, 0.18)",
          }}
        >
          {faqs.map((faq, index) => (
            <details
              key={faq.question}
              style={{
                borderBottom: "1px solid rgba(17, 23, 23, 0.18)",
                padding: "0",
              }}
            >
              <summary
                style={{
                  cursor: "pointer",
                  listStylePosition: "outside",
                  padding: "28px 0",
                  fontFamily: "var(--font-serif), Georgia, serif",
                  fontSize: "clamp(1.35rem, 2vw, 1.75rem)",
                  lineHeight: 1.25,
                }}
              >
                <span
                  style={{
                    color: "#9b7a52",
                    fontFamily: "var(--font-sans), Arial, sans-serif",
                    fontSize: "0.68rem",
                    letterSpacing: "0.16em",
                    marginRight: "18px",
                    verticalAlign: "middle",
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {faq.question}
              </summary>

              <div
                style={{
                  padding: "0 0 30px 43px",
                }}
              >
                <p
                  style={{
                    maxWidth: "760px",
                    margin: 0,
                    color: "#6e6b65",
                    fontSize: "0.97rem",
                    lineHeight: 1.8,
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
        }}
      >
        <div
          style={{
            background: "#eee6d9",
            border: "1px solid rgba(17, 23, 23, 0.14)",
            padding: "clamp(34px, 5vw, 60px)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "35px",
            alignItems: "center",
          }}
        >
          <div>
            <p className="eyebrow">STILL NOT SURE?</p>

            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                marginBottom: "12px",
              }}
            >
              We’ll help you find the right path.
            </h2>

            <p
              style={{
                color: "#6e6b65",
                marginBottom: 0,
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
            }}
          >
            <Link className="button" href="/contact">
              Contact Greyson Institute
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
