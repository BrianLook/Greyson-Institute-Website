import type { Metadata } from "next";

export const metadata: Metadata = { title: "FAQ" };

const faqs = [
  ["Which course do I need?", "That depends on where you are in the licensing process. The course pages will guide students by goal: getting licensed, completing post-license education, renewing, becoming a broker, reactivating, or preparing for an exam."],
  ["Are the courses online?", "Greyson Institute is being built around an online-first experience. Exact delivery and enrollment details will be confirmed with the course provider before launch."],
  ["Who provides the courses?", "The final provider relationship and required disclosure language will be published on each applicable course page after the partnership terms are confirmed."],
  ["Will I create a Greyson Institute student account?", "The final sign-in and enrollment flow depends on the partner platform. We are intentionally keeping this flexible until that setup is finalized."],
  ["Can I contact Greyson Institute if I am unsure what I need?", "Yes. The site is being designed so students can ask a real person for help choosing the correct education path."],
];

export default function FAQPage() {
  return (
    <section className="page-hero">
      <div className="container narrow">
        <p className="eyebrow">FREQUENTLY ASKED QUESTIONS</p>
        <h1>Clear answers before you enroll.</h1>
      </div>
      <div className="container faq-list">
        {faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
      </div>
    </section>
  );
}
