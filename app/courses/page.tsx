import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Courses",
};

const paths = [
  {
    label: "I need my first license",
    detail:
      "Start the education path toward becoming a real estate sales associate.",
    href: "#pre-licensing",
  },
  {
    label: "I’m preparing for the licensing exam",
    detail:
      "Review key concepts and prepare more confidently for exam day.",
    href: "#exam-prep",
  },
  {
    label: "I need post-license education",
    detail:
      "Continue with the education required after becoming licensed.",
    href: "#post-license",
  },
  {
    label: "I need continuing education",
    detail:
      "Find education for maintaining and renewing an active license.",
    href: "#continuing-education",
  },
  {
    label: "I want to become a broker",
    detail:
      "Explore the education path for advancing to broker licensure.",
    href: "#broker",
  },
  {
    label: "I need to reactivate my license",
    detail:
      "Find education associated with returning an inactive license to active status.",
    href: "#reactivation",
  },
];

const courses = [
  {
    id: "pre-licensing",
    eyebrow: "PRE-LICENSING",
    title: "Sales Associate Pre-Licensing",
    body:
      "For students beginning the path toward a real estate sales associate license.",
  },
  {
    id: "post-license",
    eyebrow: "POST-LICENSE",
    title: "Sales Associate Post-License",
    body:
      "For newly licensed sales associates completing the education required for their first renewal period.",
  },
  {
    id: "continuing-education",
    eyebrow: "CONTINUING EDUCATION",
    title: "Continuing Education",
    body:
      "For active real estate professionals completing education for license renewal.",
  },
  {
    id: "broker",
    eyebrow: "BROKER",
    title: "Broker Pre-Licensing",
    body:
      "For experienced real estate professionals preparing to advance to broker licensure.",
  },
  {
    id: "reactivation",
    eyebrow: "REACTIVATION",
    title: "Reactivation Education",
    body:
      "For licensees completing education associated with returning an inactive license to active status.",
  },
  {
    id: "exam-prep",
    eyebrow: "EXAM PREP",
    title: "Exam Preparation",
    body:
      "Focused preparation designed to reinforce key concepts before a licensing examination.",
  },
];

export default function CoursesPage() {
  return (
    <section className="page-hero">
      <div
        className="container about-grid"
        style={{
          marginBottom: "88px",
          alignItems: "center",
        }}
      >
        <div>
          <p className="eyebrow">REAL ESTATE EDUCATION</p>

          <h1>Find the course that matches your next step.</h1>

          <p className="page-lead">
            From your first license through continuing education and broker
            preparation, Greyson Institute makes it easier to understand where
            you are and what comes next.
          </p>
        </div>

        <div
          style={{
            minHeight: "430px",
            overflow: "hidden",
            border: "1px solid rgba(17, 23, 23, 0.14)",
            background: "#eee6d9",
          }}
        >
          <img
            src="/greyson-courses-study.png"
            alt="Greyson Institute real estate study workspace"
            style={{
              width: "100%",
              height: "100%",
              minHeight: "430px",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
            }}
          />
        </div>
      </div>

      <div
        id="find-your-path"
        className="container"
        style={{
          marginBottom: "100px",
          scrollMarginTop: "150px",
        }}
      >
        <p className="eyebrow">FIND YOUR PATH</p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
            gap: "18px",
            marginBottom: "38px",
          }}
        >
          <h2
            style={{
              maxWidth: "620px",
              marginBottom: 0,
            }}
          >
            What do you need?
          </h2>

          <p
            style={{
              color: "#6e6b65",
              maxWidth: "520px",
              margin: 0,
              alignSelf: "end",
            }}
          >
            Choose the description that best matches where you are today.
            We’ll take you directly to the most relevant education path.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
            borderTop: "1px solid rgba(17, 23, 23, 0.16)",
            borderLeft: "1px solid rgba(17, 23, 23, 0.16)",
          }}
        >
          {paths.map((path, index) => (
            <Link
              key={path.label}
              href={path.href}
              style={{
                minHeight: "205px",
                padding: "28px",
                borderRight: "1px solid rgba(17, 23, 23, 0.16)",
                borderBottom: "1px solid rgba(17, 23, 23, 0.16)",
                background: "#f5f0e7",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{
                  color: "#9b7a52",
                  fontSize: "0.68rem",
                  letterSpacing: "0.16em",
                  marginBottom: "26px",
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3
                style={{
                  fontSize: "1.55rem",
                  marginBottom: "10px",
                }}
              >
                {path.label}
              </h3>

              <p
                style={{
                  color: "#6e6b65",
                  fontSize: "0.9rem",
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {path.detail}
              </p>

              <span
                style={{
                  marginTop: "auto",
                  paddingTop: "20px",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                }}
              >
                View path →
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="container course-list">
        {courses.map((course) => (
          <article
            id={course.id}
            className="course-row"
            key={course.title}
            style={{
              scrollMarginTop: "150px",
            }}
          >
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
          Course availability, pricing, enrollment links, state-specific
          requirements, and provider details will be displayed on each course
          page before enrollment opens.
        </p>
      </div>
    </section>
  );
}
