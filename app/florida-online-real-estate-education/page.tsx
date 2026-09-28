import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Florida Online Real Estate Education",
  description:
    "Explore Florida online real estate education and licensing resources for students statewide, including pre-licensing, post-license, continuing education, broker education, and exam preparation.",
};

const paths = [
  {
    title: "Start a Florida Real Estate License",
    body: "Understand the steps toward a Florida sales associate license, including pre-licensing education, application, fingerprinting, and the state exam.",
    href: "/how-to-get-a-florida-real-estate-license",
  },
  {
    title: "63-Hour Pre-Licensing",
    body: "Review the education requirement that applies before most Florida sales associate applicants can sit for the state examination.",
    href: "/florida-63-hour-real-estate-pre-licensing-course",
  },
  {
    title: "Florida Real Estate Exam",
    body: "Learn what to expect from the Florida real estate examination and how the testing process works.",
    href: "/florida-real-estate-exam",
  },
  {
    title: "45-Hour Post-License",
    body: "Review the education requirement for a Florida sales associate's first renewal period.",
    href: "/florida-45-hour-post-license-requirements",
  },
  {
    title: "14-Hour Continuing Education",
    body: "Understand the continuing-education requirement that generally applies after the first renewal period.",
    href: "/florida-14-hour-real-estate-continuing-education",
  },
  {
    title: "Find Your Exact Path",
    body: "Not sure which requirement applies to you? Start with Greyson's guided education-path tool.",
    href: "/find-my-path",
  },
];

export default function FloridaOnlineRealEstateEducationPage() {
  return (
    <section className="page-hero">
      <div
        className="container"
        style={{
          maxWidth: "1080px",
          minWidth: 0,
        }}
      >
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Courses", href: "/courses" },
            {
              label: "Florida Online Real Estate Education",
              href: "/florida-online-real-estate-education",
              current: true,
            },
          ]}
        />

        <div
          style={{
            maxWidth: "880px",
            marginBottom: "72px",
          }}
        >
          <p className="eyebrow">FLORIDA-WIDE ONLINE EDUCATION</p>

          <h1 style={{ overflowWrap: "anywhere" }}>
            Florida Online Real Estate Education
          </h1>

          <p className="page-lead">
            Greyson Institute helps students across Florida understand the
            real estate education path that applies to them — from pre-licensing
            through post-license, continuing education, broker education, and
            exam preparation.
          </p>

          <p
            style={{
              color: "#6e6b65",
              maxWidth: "780px",
              lineHeight: 1.8,
              marginTop: "22px",
            }}
          >
            Whether you are in Orlando, Tampa, Miami, Jacksonville, Fort
            Lauderdale, Naples, Tallahassee, or anywhere else in Florida,
            Greyson is designed to help you understand the statewide education
            and licensing requirements that apply to your next step.
          </p>

          <div
            className="button-row"
            style={{ marginTop: "30px" }}
          >
            <Link className="button" href="/courses">
              Explore Florida Courses
            </Link>

            <Link className="text-link" href="/find-my-path">
              Find My Exact Path <span>→</span>
            </Link>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: "18px",
            marginBottom: "88px",
          }}
        >
          {paths.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="path-card"
              style={{
                minHeight: "230px",
                padding: "28px",
                border: "1px solid rgba(17, 23, 23, 0.16)",
                display: "flex",
                flexDirection: "column",
                minWidth: 0,
              }}
            >
              <h2
                style={{
                  fontSize: "1.7rem",
                  marginBottom: "12px",
                  overflowWrap: "anywhere",
                }}
              >
                {item.title}
              </h2>

              <p
                style={{
                  color: "#6e6b65",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {item.body}
              </p>

              <span
                style={{
                  marginTop: "auto",
                  paddingTop: "22px",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                }}
              >
                Learn more →
              </span>
            </Link>
          ))}
        </div>

        <div
          style={{
            background: "#eee6d9",
            border: "1px solid rgba(17, 23, 23, 0.14)",
            padding: "clamp(28px, 5vw, 48px)",
            marginBottom: "88px",
          }}
        >
          <p className="eyebrow">FLORIDA LICENSING CONTEXT</p>

          <h2
            style={{
              maxWidth: "760px",
              overflowWrap: "anywhere",
            }}
          >
            Florida real estate licensing rules are statewide.
          </h2>

          <p
            style={{
              color: "#4d4b46",
              maxWidth: "820px",
              lineHeight: 1.8,
            }}
          >
            Florida real estate education and license requirements are set at
            the state level, so the same core rules apply whether you live in
            Orlando, Tampa, Miami, Jacksonville, or another Florida community.
            For sales associates, the standard licensing path includes required
            pre-licensing education, an application and background check, and
            the state examination. Florida's Division of Real Estate is located
            in Orlando, and approved examination candidates schedule testing
            through the state's exam vendor.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "14px",
              marginTop: "24px",
            }}
          >
            <a
              className="text-link"
              href="https://www2.myfloridalicense.com/real-estate-commission/licensure-information/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Florida DBPR Licensure Information <span>↗</span>
            </a>

            <a
              className="text-link"
              href="https://www2.myfloridalicense.com/examination-information/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Florida Examination Information <span>↗</span>
            </a>
          </div>
        </div>

        <div
          style={{
            maxWidth: "860px",
            marginBottom: "88px",
          }}
        >
          <p className="eyebrow">ONLINE STUDY ACROSS FLORIDA</p>

          <h2 style={{ overflowWrap: "anywhere" }}>
            Built for students who want a clear Florida path from wherever they
            live in the state.
          </h2>

          <p
            style={{
              color: "#4d4b46",
              lineHeight: 1.8,
            }}
          >
            Students throughout Florida can use Greyson Institute to understand
            which real estate education requirement applies to their current
            stage, compare the major license pathways, and move directly to the
            most relevant course or licensing guide.
          </p>

          <p
            style={{
              color: "#4d4b46",
              lineHeight: 1.8,
            }}
          >
            Course availability and enrollment options may depend on the
            specific program and its current approval status. Review the
            individual course page for the most current information before
            enrolling.
          </p>
        </div>

        <div
          className="centered-callout"
          style={{
            marginBottom: "32px",
          }}
        >
          <p className="eyebrow">GREYSON INSTITUTE</p>

          <h2 style={{ overflowWrap: "anywhere" }}>
            Find the Florida real estate education path that fits your next
            step.
          </h2>

          <p style={{ color: "#4d4b46" }}>
            Start with licensing, post-license, continuing education, broker
            education, reactivation, or exam preparation.
          </p>

          <Link className="button" href="/courses">
            Explore Courses
          </Link>
        </div>
      </div>
    </section>
  );
}
