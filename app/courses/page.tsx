import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses",
};

const courses = [
  {
    eyebrow: "PRE-LICENSING",
    title: "Sales Associate Pre-Licensing",
    body: "For students beginning the path toward a Florida real estate sales associate license.",
  },
  {
    eyebrow: "POST-LICENSE",
    title: "Sales Associate Post-License",
    body: "For newly licensed sales associates completing the education required for their first renewal period.",
  },
  {
    eyebrow: "CONTINUING EDUCATION",
    title: "Continuing Education",
    body: "For active real estate professionals completing education for license renewal.",
  },
  {
    eyebrow: "BROKER",
    title: "Broker Pre-Licensing",
    body: "For experienced real estate professionals preparing to advance to Florida broker licensure.",
  },
  {
    eyebrow: "REACTIVATION",
    title: "Reactivation Education",
    body: "For licensees completing education associated with returning an inactive license to active status.",
  },
  {
    eyebrow: "EXAM PREP",
    title: "Exam Preparation",
    body: "Focused preparation designed to reinforce key concepts before a licensing examination.",
  },
];

export default function CoursesPage() {
  return (
    <section className="page-hero">
      <div className="container narrow">
        <p className="eyebrow">REAL ESTATE EDUCATION</p>

        <h1>Find the course that matches your next step.</h1>

        <p className="page-lead">
          From your first license through continuing education and broker
          preparation, Greyson Institute is designed to make it easier to
          understand where you are and what comes next.
        </p>
      </div>

      <div className="container course-list">
        {courses.map((course) => (
          <article className="course-row" key={course.title}>
            <div>
              <p className="eyebrow">{course.eyebrow}</p>

              <h2>{course.title}</h2>

              <p>{course.body}</p>
            </div>

            <span className="coming-soon">
              Course details available soon
            </span>
          </article>
        ))}
      </div>

      <div
        className="container"
        style={{
          marginTop: "64px",
          paddingTop: "36px",
          borderTop: "1px solid rgba(17, 23, 23, 0.18)",
        }}
      >
        <p
          style={{
            maxWidth: "760px",
            color: "#6e6b65",
            fontSize: "0.95rem",
            lineHeight: 1.7,
          }}
        >
          Course availability, pricing, enrollment links, and provider details
          will be displayed on each course page before enrollment opens.
        </p>
      </div>
    </section>
  );
}
