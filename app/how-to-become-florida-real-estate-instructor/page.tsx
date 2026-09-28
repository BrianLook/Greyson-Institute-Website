import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GuideStructuredData } from "@/components/GuideStructuredData";

export const metadata: Metadata = {
  title: "How to Become a Florida Real Estate Instructor",
  description:
    "Learn the Florida real estate instructor permit qualification routes, application steps, school registration, and continuing education requirements.",
};

const path = "/how-to-become-florida-real-estate-instructor";

const qualificationRoutes = [
  {
    number: "01",
    title: "Pass the Florida real estate instructor examination",
    body:
      "One route is to qualify by passing the real estate instructor examination approved by the Florida Real Estate Commission.",
  },
  {
    number: "02",
    title: "Business-related bachelor’s degree + Florida broker license",
    body:
      "Another route is to hold a bachelor’s degree in real estate, finance, accounting, business administration, or an equivalent business-related subject, together with a valid Florida broker license.",
  },
  {
    number: "03",
    title: "Bachelor’s degree + extensive experience + Florida broker license",
    body:
      "A third route is to hold a bachelor’s degree, a valid Florida broker license, and extensive real estate experience. DBPR defines the minimum extensive-experience threshold as three years of full-time experience as a broker.",
  },
];

export default function InstructorPathPage() {
  return (
    <section
      className="page-hero"
      style={{
        paddingBottom: "100px",
      }}
    >
      <GuideStructuredData
        title="How to Become a Florida Real Estate Instructor"
        description={metadata.description as string}
        path={path}
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
              label: "Instructor Path",
              href: path,
              current: true,
            },
          ]}
        />

        <div
          style={{
            maxWidth: "870px",
            marginBottom: "72px",
          }}
        >
          <p className="eyebrow">FLORIDA INSTRUCTOR PATH</p>

          <h1
            style={{
              overflowWrap: "anywhere",
            }}
          >
            How to Become a Florida Real Estate Instructor
          </h1>

          <p className="page-lead">
            Florida provides more than one way to qualify for a real estate
            instructor permit. Start by identifying which qualification route
            fits your education, broker experience, and career background.
          </p>
        </div>

        <div
          style={{
            background: "#eee6d9",
            border: "1px solid rgba(17, 23, 23, 0.14)",
            padding: "clamp(30px, 5vw, 48px)",
            marginBottom: "74px",
          }}
        >
          <p className="eyebrow">QUICK ANSWER</p>

          <h2
            style={{
              maxWidth: "820px",
              overflowWrap: "anywhere",
            }}
          >
            Florida has three main qualification routes for a real estate
            instructor permit.
          </h2>

          <p
            style={{
              color: "#4d4b46",
              maxWidth: "820px",
              marginBottom: 0,
              lineHeight: 1.75,
            }}
          >
            You may qualify by examination, through a qualifying
            business-related bachelor&apos;s degree plus a valid Florida broker
            license, or through a bachelor&apos;s degree plus extensive broker
            experience and a valid Florida broker license.
          </p>
        </div>

        <div
          style={{
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">HOW YOU CAN QUALIFY</p>

          {qualificationRoutes.map((route) => (
            <article
              key={route.number}
              style={{
                display: "grid",
                gridTemplateColumns: "72px minmax(0, 1fr)",
                gap: "24px",
                borderTop: "1px solid rgba(17, 23, 23, 0.16)",
                padding: "30px 0",
                minWidth: 0,
              }}
            >
              <span
                style={{
                  color: "#7d5f3a",
                  fontSize: "0.72rem",
                  letterSpacing: "0.16em",
                  paddingTop: "8px",
                }}
              >
                {route.number}
              </span>

              <div style={{ minWidth: 0 }}>
                <h2
                  style={{
                    fontSize: "clamp(1.9rem, 4vw, 2.8rem)",
                    marginBottom: "12px",
                    overflowWrap: "anywhere",
                  }}
                >
                  {route.title}
                </h2>

                <p
                  style={{
                    color: "#5f5c56",
                    lineHeight: 1.75,
                    margin: 0,
                    maxWidth: "800px",
                  }}
                >
                  {route.body}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: "20px",
            marginBottom: "82px",
          }}
        >
          <div
            style={{
              border: "1px solid rgba(17, 23, 23, 0.16)",
              padding: "clamp(28px, 5vw, 42px)",
            }}
          >
            <p className="eyebrow">APPLICATION</p>

            <h2>Apply for the instructor permit.</h2>

            <p
              style={{
                color: "#5f5c56",
                lineHeight: 1.75,
              }}
            >
              Complete the appropriate DBPR Real Estate Instructor Permit
              application, provide the documentation for the qualification
              route you are using, provide a U.S. Social Security number, and
              pay the required application fee.
            </p>

            <a
              className="text-link"
              href="https://www.myfloridalicense.com/intentions2.asp?boardid=25&chboard=true&professionid=2505"
              target="_blank"
              rel="noopener noreferrer"
            >
              View DBPR instructor applications <span>↗</span>
            </a>
          </div>

          <div
            style={{
              border: "1px solid rgba(17, 23, 23, 0.16)",
              padding: "clamp(28px, 5vw, 42px)",
            }}
          >
            <p className="eyebrow">BECOME ACTIVE</p>

            <h2>Register with the school where you will teach.</h2>

            <p
              style={{
                color: "#5f5c56",
                lineHeight: 1.75,
              }}
            >
              After obtaining the permit, DBPR provides the RE 6 process for a
              real estate instructor to become active and register with a real
              estate school.
            </p>
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
          <p className="eyebrow eyebrow--light">AFTER YOU BECOME AN INSTRUCTOR</p>

          <h2
            className="light-heading"
            style={{
              maxWidth: "760px",
            }}
          >
            Your instructor permit has its own renewal education requirement.
          </h2>

          <p
            style={{
              color: "rgba(245, 240, 231, 0.82)",
              maxWidth: "820px",
              lineHeight: 1.75,
            }}
          >
            Florida real estate instructors generally complete 7 hours for
            renewal: 3 hours of Core Law and 4 hours of Teaching Techniques.
            Greyson keeps the instructor-renewal path separate from the process
            of becoming an instructor so you can see the requirement that
            applies to you.
          </p>

          <Link
            className="button"
            href="/florida-real-estate-instructor-continuing-education"
          >
            Understand Instructor CE →
          </Link>
        </div>

        <div
          style={{
            border: "1px solid rgba(17, 23, 23, 0.16)",
            padding: "clamp(28px, 5vw, 42px)",
          }}
        >
          <p className="eyebrow">NOT SURE WHERE YOU FIT?</p>

          <h2>Start with your current Florida license.</h2>

          <p
            style={{
              color: "#5f5c56",
              maxWidth: "760px",
              lineHeight: 1.75,
            }}
          >
            Find My Exact Path can check your current DBPR record and help you
            understand the education requirement that most likely applies to
            your license today.
          </p>

          <Link
            className="button"
            href="/find-my-path"
          >
            Find My Exact Path →
          </Link>
        </div>
      </div>
    </section>
  );
}
