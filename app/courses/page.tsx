import type { Metadata } from "next";

export const metadata: Metadata = { title: "Courses" };

const courses = [
  ["Sales Associate Pre-Licensing", "For students beginning the path toward a real estate sales associate license."],
  ["Sales Associate Post-License", "For newly licensed sales associates completing their next required education step."],
  ["Continuing Education", "For active licensees completing renewal education requirements."],
  ["Broker Pre-Licensing", "For experienced licensees preparing to advance to broker licensure."],
  ["Reactivation Education", "For licensees who need education associated with returning an inactive license to active status."],
  ["Exam Preparation", "Focused preparation for students getting ready for a licensing examination."],
];

export default function CoursesPage() {
  return (
    <section className="page-hero">
      <div className="container narrow">
        <p className="eyebrow">COURSE PATHS</p>
        <h1>Find the education that matches your next step.</h1>
        <p className="page-lead">We are finalizing our course-provider integration. Course-specific enrollment buttons, pricing, provider disclosures, and availability will be added after the partner setup is confirmed.</p>
      </div>
      <div className="container course-list">
        {courses.map(([title, body]) => (
          <article className="course-row" key={title}>
            <div><h2>{title}</h2><p>{body}</p></div>
            <span className="coming-soon">Enrollment details coming soon</span>
          </article>
        ))}
      </div>
    </section>
  );
}
