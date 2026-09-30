import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LicenseExpirationPromo } from "@/components/LicenseExpirationPromo";

export const metadata: Metadata = {
  title: "Florida Real Estate Courses & Licensing Education",
  description:
    "Explore Greyson Institute Florida real estate education for pre-licensing, post-license, continuing education, broker education, reactivation, and exam preparation.",
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
    label: "I need instructor continuing education",
    detail:
      "Review the education required to renew a Florida real estate instructor permit.",
    href: "#instructor-ce",
  },
  {
    label: "I want to become a broker",
    detail:
      "Explore the requirements and education path for advancing to Florida broker licensure.",
    href: "/how-to-become-florida-real-estate-broker",
  },
  {
    label: "I need broker post-license education",
    detail:
      "Review the 60-hour education required for a broker's first renewal.",
    href: "#broker-post-license",
  },
  {
    label: "I need to reactivate my license",
    detail:
      "Find education associated with returning an inactive license to active status.",
    href: "#reactivation",
  },
  {
    label: "I want to become a real estate instructor",
    detail:
      "Explore the qualification routes and application steps for a Florida real estate instructor permit.",
    href: "/how-to-become-florida-real-estate-instructor",
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
    id: "instructor-ce",
    eyebrow: "INSTRUCTOR CE",
    title: "Real Estate Instructor Continuing Education",
    body:
      "For Florida real estate school instructors completing Core Law and Teaching Techniques requirements for permit renewal.",
  },
  {
    id: "broker",
    eyebrow: "BROKER",
    title: "Broker Pre-Licensing",
    body:
      "For experienced real estate professionals preparing to advance to broker licensure.",
  },
  {
    id: "broker-post-license",
    eyebrow: "BROKER POST-LICENSE",
    title: "Broker Post-License",
    body:
      "For newly licensed brokers and broker associates completing the 60-hour education required for their first renewal.",
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
      <style>
        {`
          .licensing-guide-link {
            min-height: 48px;
            padding: 0 20px;
            border: 1px solid #111717;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: transparent;
            color: #111717;
            font-size: 14px;
            font-weight: 600;
            letter-spacing: 0.04em;
            text-align: center;
            max-width: 100%;
            white-space: normal;
            transition:
              background-color 0.2s ease,
              color 0.2s ease,
              transform 0.2s ease,
              box-shadow 0.2s ease;
          }

          @media (hover: hover) and (pointer: fine) {
            .licensing-guide-link:hover {
              background: #111717;
              color: #f5f0e7;
              transform: translateY(-3px);
              box-shadow: 0 12px 28px rgba(17, 23, 23, 0.12);
            }
          }
        `}
      </style>

      <div
        className="container about-grid"
        style={{
          marginBottom: "72px",
          alignItems: "center",
          minWidth: 0,
        }}
      >
        <div style={{ minWidth: 0 }}>
          <p className="eyebrow">FLORIDA REAL ESTATE EDUCATION</p>

          <h1 style={{ overflowWrap: "anywhere" }}>
            Florida Real Estate Courses for Every Stage of Your License.
          </h1>

          <p className="page-lead">
            Explore Florida real estate education paths for pre-licensing,
            post-license, continuing education, broker education, reactivation,
            and exam preparation — and understand what comes next.
          </p>
        </div>

        <div
          style={{
            position: "relative",
            minHeight: "430px",
            overflow: "hidden",
            border: "1px solid rgba(17, 23, 23, 0.14)",
            background: "#eee6d9",
            minWidth: 0,
          }}
        >
          <Image
            src="/greyson-courses-study.png"
            alt="Greyson Institute real estate study workspace"
            fill
            priority
            unoptimized
            sizes="(max-width: 980px) 100vw, 55vw"
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </div>
      </div>

      <div
        className="container"
        style={{
          maxWidth: "1080px",
          marginBottom: "88px",
          minWidth: 0,
        }}
      >
        <div
          style={{
            background: "#1f2d30",
            color: "#f5f0e7",
            padding: "clamp(30px, 5vw, 48px)",
            marginBottom: "36px",
          }}
        >
          <p className="eyebrow eyebrow--light">HOW ENROLLMENT WILL WORK</p>

          <h2
            className="light-heading"
            style={{
              maxWidth: "820px",
              marginBottom: "28px",
            }}
          >
            Greyson guides the path. The CE Shop delivers the partner course.
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
              gap: "22px",
            }}
          >
            <div>
              <p style={{ color: "#d6bd9c", fontWeight: 700 }}>01</p>
              <h3 style={{ color: "#f5f0e7" }}>Find your likely requirement</h3>
              <p style={{ color: "rgba(245, 240, 231, 0.82)" }}>
                Use Greyson&apos;s guides and Find My Path tool to understand
                which Florida education requirement most likely applies.
              </p>
            </div>

            <div>
              <p style={{ color: "#d6bd9c", fontWeight: 700 }}>02</p>
              <h3 style={{ color: "#f5f0e7" }}>Open the tracked course page</h3>
              <p style={{ color: "rgba(245, 240, 231, 0.82)" }}>
                When onboarding is complete, Greyson will link directly to the
                appropriate co-branded The CE Shop course page.
              </p>
            </div>

            <div>
              <p style={{ color: "#d6bd9c", fontWeight: 700 }}>03</p>
              <h3 style={{ color: "#f5f0e7" }}>Enroll and complete the course</h3>
              <p style={{ color: "rgba(245, 240, 231, 0.82)" }}>
                The CE Shop will handle payment, enrollment, course delivery,
                course-specific support, certificates, and applicable
                regulatory completion reporting.
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            background: "#eee6d9",
            border: "1px solid rgba(17, 23, 23, 0.14)",
            padding: "clamp(28px, 5vw, 44px)",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "30px",
            alignItems: "center",
          }}
        >
          <div style={{ minWidth: 0 }}>
            <p className="eyebrow">FLORIDA LICENSING GUIDES</p>

            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                marginBottom: "14px",
                overflowWrap: "anywhere",
              }}
            >
              New to Florida real estate?
            </h2>

            <p
              style={{
                color: "#4d4b46",
                marginBottom: 0,
                maxWidth: "650px",
              }}
            >
              Start with our Florida licensing guides to understand the
              step-by-step process, the required 63-hour course, the state
              examination, what the licensing process may cost, and how long
              the major steps can take.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gap: "12px",
              justifyItems: "stretch",
              minWidth: 0,
            }}
          >
            <Link
              className="licensing-guide-link"
              href="/how-to-get-a-florida-real-estate-license"
            >
              How to Get a Florida License
            </Link>

            <Link
              className="licensing-guide-link"
              href="/florida-63-hour-real-estate-pre-licensing-course"
            >
              Florida 63-Hour Course Guide
            </Link>

            <Link
              className="licensing-guide-link"
              href="/florida-real-estate-exam"
            >
              Florida Real Estate Exam Guide
            </Link>

            <Link
              className="licensing-guide-link"
              href="/how-much-does-a-florida-real-estate-license-cost"
            >
              Florida License Cost Guide
            </Link>

            <Link
              className="licensing-guide-link"
              href="/how-long-does-it-take-to-get-a-florida-real-estate-license"
            >
              Florida License Timeline Guide
            </Link>
          </div>
        </div>
      </div>

      <div
        className="container"
        style={{
          maxWidth: "1080px",
          marginBottom: "88px",
          minWidth: 0,
        }}
      >
        <div
          style={{
            borderTop: "1px solid rgba(17, 23, 23, 0.16)",
            borderBottom: "1px solid rgba(17, 23, 23, 0.16)",
            padding: "28px 0",
            display: "flex",
            gap: "20px",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <div style={{ minWidth: 0 }}>
            <p className="eyebrow" style={{ marginBottom: "8px" }}>
              STUDENTS ACROSS FLORIDA
            </p>
            <p style={{ margin: 0, color: "#4d4b46", maxWidth: "720px" }}>
              Looking for Florida real estate education from the Orlando area?
              Explore our Central Florida licensing and education guide.
            </p>
          </div>

          <Link
            className="text-link"
            href="/florida-online-real-estate-education"
          >
            Florida Online Real Estate Education <span>→</span>
          </Link>
        </div>
      </div>

      <div
        className="container"
        style={{
          maxWidth: "1080px",
          marginBottom: "88px",
          minWidth: 0,
        }}
      >
        <LicenseExpirationPromo
          eyebrow="ALREADY LICENSED IN FLORIDA?"
          title="Check when your Florida real estate license expires."
          text="Before choosing post-license, continuing education, or reactivation education, verify your official DBPR license record. Your license type, status, expiration date, and whether this is your first renewal can affect which education requirement applies."
        />
      </div>

      <div
        id="find-your-path"
        className="container"
        style={{
          maxWidth: "1080px",
          marginBottom: "100px",
          scrollMarginTop: "150px",
          minWidth: 0,
        }}
      >
        <p className="eyebrow">FIND YOUR PATH</p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: "18px",
            marginBottom: "38px",
            minWidth: 0,
          }}
        >
          <h2
            style={{
              maxWidth: "620px",
              marginBottom: 0,
              minWidth: 0,
              overflowWrap: "anywhere",
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
              minWidth: 0,
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
              "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            borderTop: "1px solid rgba(17, 23, 23, 0.16)",
            borderLeft: "1px solid rgba(17, 23, 23, 0.16)",
            minWidth: 0,
          }}
        >
          {paths.map((path, index) => (
            <Link
              key={path.label}
              href={path.href}
              className="path-card"
              style={{
                minHeight: "220px",
                padding: "28px",
                borderRight: "1px solid rgba(17, 23, 23, 0.16)",
                borderBottom: "1px solid rgba(17, 23, 23, 0.16)",
                display: "flex",
                flexDirection: "column",
                minWidth: 0,
                overflowWrap: "anywhere",
              }}
            >
              <span
                style={{
                  color: "#7d5f3a",
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
                  minWidth: 0,
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
                  minWidth: 0,
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

      <div className="container course-list" style={{ minWidth: 0 }}>
        {courses.map((course) => (
          <article
            id={course.id}
            className="course-row"
            key={course.title}
            style={{
              scrollMarginTop: "150px",
              minWidth: 0,
            }}
          >
            <div style={{ minWidth: 0 }}>
              <p className="eyebrow">{course.eyebrow}</p>

              <h2 style={{ overflowWrap: "anywhere" }}>{course.title}</h2>

              <p>{course.body}</p>

              {course.id === "pre-licensing" && (
                <div
                  style={{
                    marginTop: "14px",
                    display: "grid",
                    gap: "8px",
                  }}
                >
                  <p style={{ margin: 0 }}>
                    <Link
                      href="/florida-63-hour-real-estate-pre-licensing-course"
                      style={{
                        textDecoration: "underline",
                        textUnderlineOffset: "3px",
                        fontWeight: 600,
                        color: "#111717",
                      }}
                    >
                      What does the Florida 63-hour pre-licensing course{" "}
                      <span style={{ whiteSpace: "nowrap" }}>cover? →</span>
                    </Link>
                  </p>

                  <p style={{ margin: 0 }}>
                    <Link
                      href="/how-to-get-a-florida-real-estate-license"
                      style={{
                        textDecoration: "underline",
                        textUnderlineOffset: "3px",
                        fontWeight: 600,
                        color: "#111717",
                      }}
                    >
                      How to get a Florida real estate license →
                    </Link>
                  </p>

                  <p style={{ margin: 0 }}>
                    <Link
                      href="/how-much-does-a-florida-real-estate-license-cost"
                      style={{
                        textDecoration: "underline",
                        textUnderlineOffset: "3px",
                        fontWeight: 600,
                        color: "#111717",
                      }}
                    >
                      How much does a Florida real estate license cost? →
                    </Link>
                  </p>

                  <p style={{ margin: 0 }}>
                    <Link
                      href="/how-long-does-it-take-to-get-a-florida-real-estate-license"
                      style={{
                        textDecoration: "underline",
                        textUnderlineOffset: "3px",
                        fontWeight: 600,
                        color: "#111717",
                      }}
                    >
                      How long does it take to get a Florida real estate license?
                      →
                    </Link>
                  </p>
                </div>
              )}

              {course.id === "post-license" && (
                <div
                  style={{
                    marginTop: "14px",
                    display: "grid",
                    gap: "8px",
                  }}
                >
                  <p style={{ margin: 0 }}>
                    <Link
                      href="/florida-45-hour-post-license-requirements"
                      style={{
                        textDecoration: "underline",
                        textUnderlineOffset: "3px",
                        fontWeight: 600,
                        color: "#111717",
                      }}
                    >
                      Florida 45-Hour Post-License Requirements →
                    </Link>
                  </p>

                  <p style={{ margin: 0 }}>
                    <Link
                      href="/what-happens-after-you-pass-the-florida-real-estate-exam"
                      style={{
                        textDecoration: "underline",
                        textUnderlineOffset: "3px",
                        fontWeight: 600,
                        color: "#111717",
                      }}
                    >
                      What happens after you pass the Florida real estate{" "}
                      <span style={{ whiteSpace: "nowrap" }}>exam? →</span>
                    </Link>
                  </p>
                </div>
              )}

              {course.id === "continuing-education" && (
                <div
                  style={{
                    marginTop: "14px",
                  }}
                >
                  <p style={{ margin: 0 }}>
                    <Link
                      href="/florida-14-hour-real-estate-continuing-education"
                      style={{
                        textDecoration: "underline",
                        textUnderlineOffset: "3px",
                        fontWeight: 600,
                        color: "#111717",
                      }}
                    >
                      Florida 14-Hour Real Estate Continuing Education
                      Requirements →
                    </Link>
                  </p>
                </div>
              )}

              {course.id === "broker" && (
                <div
                  style={{
                    marginTop: "14px",
                  }}
                >
                  <p style={{ margin: 0 }}>
                    <Link
                      href="/how-to-become-florida-real-estate-broker"
                      style={{
                        textDecoration: "underline",
                        textUnderlineOffset: "3px",
                        fontWeight: 600,
                        color: "#111717",
                      }}
                    >
                      How to Become a Florida Real Estate Broker{" "}
                      <span style={{ whiteSpace: "nowrap" }}>→</span>
                    </Link>
                  </p>
                </div>
              )}

              {course.id === "broker-post-license" && (
                <div
                  style={{
                    marginTop: "14px",
                  }}
                >
                  <p style={{ margin: 0 }}>
                    <Link
                      href="/florida-60-hour-broker-post-license-requirements"
                      style={{
                        textDecoration: "underline",
                        textUnderlineOffset: "3px",
                        fontWeight: 600,
                        color: "#111717",
                      }}
                    >
                      Florida 60-Hour Broker Post-License Requirements →
                    </Link>
                  </p>
                </div>
              )}

              {course.id === "instructor-ce" && (
                <div
                  style={{
                    marginTop: "14px",
                  }}
                >
                  <p style={{ margin: 0 }}>
                    <Link
                      href="/florida-real-estate-instructor-continuing-education"
                      style={{
                        textDecoration: "underline",
                        textUnderlineOffset: "3px",
                        fontWeight: 600,
                        color: "#111717",
                      }}
                    >
                      Florida Real Estate Instructor Continuing Education
                      Requirements →
                    </Link>
                  </p>
                </div>
              )}

              {course.id === "exam-prep" && (
                <div
                  style={{
                    marginTop: "14px",
                  }}
                >
                  <p style={{ margin: 0 }}>
                    <Link
                      href="/florida-real-estate-exam"
                      style={{
                        textDecoration: "underline",
                        textUnderlineOffset: "3px",
                        fontWeight: 600,
                        color: "#111717",
                      }}
                    >
                      Florida Real Estate Exam: What to Expect and How to
                      Prepare →
                    </Link>
                  </p>
                </div>
              )}
            </div>

            <span className="coming-soon">
              Enrollment link coming soon
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
          minWidth: 0,
        }}
      >
        <p
          style={{
            maxWidth: "760px",
            color: "#6e6b65",
            fontSize: "0.95rem",
            lineHeight: 1.7,
            overflowWrap: "anywhere",
          }}
        >
          Greyson Institute is preparing co-branded online enrollment through The
          CE Shop. When enrollment opens, The CE Shop will remain the school of
          record and will handle payment, course delivery, course-specific
          support, certificates, and regulatory completion reporting for
          partner-provided courses. Greyson will provide licensing guidance and
          direct students to the appropriate tracked enrollment page. Final
          links, pricing, and provider disclosure will be posted after
          onboarding is complete.
        </p>
      </div>
    </section>
  );
}
