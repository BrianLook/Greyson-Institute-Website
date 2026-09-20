import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
};

const faqs = [
  [
    "Which course do I need?",
    "That depends on where you are in the licensing process. Greyson Institute is organized around the most common paths: getting licensed, completing post-license education, renewing your license, becoming a broker, reactivating a license, or preparing for an exam.",
  ],
  [
    "Are the courses online?",
    "Yes. Greyson Institute is designed around online real estate education so students can learn at their own pace and work through the material on a schedule that fits their life.",
  ],
  [
    "Can you help me figure out what course I need?",
    "Yes. If you are unsure which education requirement applies to you, contact Greyson Institute and we will help point you toward the appropriate course path.",
  ],
  [
    "Do I have to complete the course all at once?",
    "Online coursework is designed for flexible, self-paced learning. Specific course timing, completion requirements, and access periods will be listed on each course page.",
  ],
  [
    "Will I receive proof of completion?",
    "Completion documentation and any applicable reporting details will be explained clearly on each course page before enrollment.",
  ],
  [
    "What happens after I finish my course?",
    "That depends on the course you are taking. Some students may be preparing for a licensing exam, while others may be completing post-license, renewal, broker, or reactivation education. Greyson Institute will explain the next step for each course path.",
  ],
  [
    "Who is Brian Smith?",
    "Brian Smith is a Licensed Florida Real Estate Broker & Instructor and the founder of Greyson Institute. He has been licensed in real estate since 1997 and brings experience in sales, listings, buyer representation, brokerage operations, agent training, and real estate company ownership.",
  ],
  [
    "Can I contact Greyson Institute if I have questions?",
    "Yes. Greyson Institute is built around clear guidance and practical support, so students have a place to turn when they are unsure what comes next.",
  ],
];

export default function FAQPage() {
  return (
    <section className="page-hero">
      <div className="container narrow">
        <p className="eyebrow">FREQUENTLY ASKED QUESTIONS</p>

        <h1>Clear answers before you enroll.</h1>

        <p className="page-lead">
          Real estate education comes with a lot of requirements, deadlines,
          and next steps. Start here with answers to some of the most common
          questions.
        </p>
      </div>

      <div className="container faq-list">
        {faqs.map(([question, answer]) => (
          <details key={question}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
