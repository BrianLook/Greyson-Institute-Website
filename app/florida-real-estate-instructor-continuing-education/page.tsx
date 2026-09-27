import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GuideStructuredData } from "@/components/GuideStructuredData";
import { LicenseExpirationPromo } from "@/components/LicenseExpirationPromo";

const guideTitle =
  "Florida Real Estate Instructor Continuing Education Requirements";

const guideDescription =
  "Learn Florida real estate instructor continuing education requirements, including 3 hours of Core Law, 4 hours of Teaching Techniques, first-renewal exemptions, and inactive instructor requirements.";

const guidePath =
  "/florida-real-estate-instructor-continuing-education";

export const metadata: Metadata = {
  title: guideTitle,
  description: guideDescription,
};

const instructorHours = [
  {
    number: "01",
    hours: "3 hours",
    title: "Core Law",
    body:
      "Florida real estate school instructors generally complete three hours of Core Law during each applicable instructor permit period. Core Law completed during the appropriate renewal cycle may also overlap with the Core Law requirement for a regular Florida real estate license.",
  },
  {
    number: "02",
    hours: "4 hours",
    title: "Teaching Techniques",
    body:
      "The remaining four hours are Teaching Techniques. An instructor cannot satisfy this requirement by teaching the course personally; the course must be completed through another instructor.",
  },
];

const faqItems = [
  {
    question:
      "How many continuing-education hours does a Florida real estate instructor need?",
    answer:
      "Florida real estate school instructors generally need 7 hours during each applicable permit period: 3 hours of Core Law and 4 hours of Teaching Techniques.",
  },
  {
    question:
      "Can Core Law count toward both my instructor permit and regular real estate license?",
    answer:
      "It may. DBPR states that Core Law completed during the appropriate renewal cycle can satisfy overlapping Core Law requirements. Verify your individual renewal cycles before relying on the same course for both.",
  },
  {
    question:
      "Can I receive credit for teaching a Teaching Techniques course?",
    answer:
      "No. The Teaching Techniques requirement must be completed through another instructor.",
  },
  {
    question:
      "Do I need 7 hours for my first instructor renewal?",
    answer:
      "Not always. Instructors who held the permit for fewer than 6 months before the first expiration date are currently exempt from the instructor continuing-education requirement for that first renewal.",
  },
  {
    question:
      "What if my instructor permit is involuntarily inactive?",
    answer:
      "DBPR currently requires two Core Law courses and two Teaching Techniques courses: one set for the missed renewal cycle and another set for the current renewal cycle.",
  },
  {
    question:
      "Can instructor continuing education be completed online?",
    answer:
      "Florida permits approved classroom or distance-learning education for the instructor continuing-education requirement.",
  },
];

export default function FloridaInstructorContinuingEducationPage() {
  return (
    <section
      className="page-hero"
      style={{
        paddingBottom: "100px",
      }}
    >
      <GuideStructuredData
        title={guideTitle}
        description={guideDescription}
        path={guidePath}
        datePublished="2026-09-27"
        dateModified="2026-09-27"
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
              label: guideTitle,
              href: guidePath,
              current: true,
            },
          ]}
        />

        <div
          style={{
            maxWidth: "900px",
            marginBottom: "72px",
          }}
        >
          <p className="eyebrow">
            FLORIDA REAL ESTATE INSTRUCTOR
          </p>

          <h1
            style={{
              overflowWrap: "anywhere",
            }}
          >
            Florida Real Estate Instructor
            Continuing Education Requirements
          </h1>

          <p
            className="page-lead"
            style={{
              maxWidth: "820px",
            }}
          >
            Florida real estate school
            instructors have their own renewal
            education requirement. Here is what
            your instructor permit generally
            requires and how those hours fit
            with your regular Florida real
            estate license.
          </p>

          <p className="muted">
            Last reviewed: September 27, 2026
          </p>
        </div>

        <div
          style={{
            background: "#eee6d9",
            border:
              "1px solid rgba(17, 23, 23, 0.14)",
            padding:
              "clamp(30px, 5vw, 48px)",
            marginBottom: "72px",
          }}
        >
          <p className="eyebrow">
            QUICK ANSWER
          </p>

          <h2
            style={{
              fontSize:
                "clamp(2rem, 4vw, 3rem)",
              marginBottom: "18px",
            }}
          >
            3 hours Core Law + 4 hours Teaching
            Techniques.
          </h2>

          <p
            style={{
              color: "#4d4b46",
              maxWidth: "840px",
              marginBottom: 0,
            }}
          >
            Florida real estate school
            instructors generally complete
            7 hours of instructor continuing
            education during each applicable
            permit period.
          </p>
        </div>

        <div
          style={{
            marginBottom: "82px",
          }}
        >
          <LicenseExpirationPromo
            eyebrow="CHECK YOUR INSTRUCTOR PERMIT"
            title="Verify your Florida instructor permit before choosing education."
            text="Greyson can check the latest available weekly DBPR record for your instructor permit, including status and expiration date. Always verify the live DBPR record before relying on renewal guidance."
          />
        </div>

        <div
          style={{
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">
            THE 7 HOURS
          </p>

          <h2
            style={{
              maxWidth: "820px",
              marginBottom: "42px",
            }}
          >
            How Florida instructor continuing
            education is divided
          </h2>

          <div
            style={{
              borderTop:
                "1px solid rgba(17, 23, 23, 0.18)",
            }}
          >
            {instructorHours.map(
              (item) => (
                <article
                  key={item.number}
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "minmax(48px, 70px) minmax(0, 1fr) minmax(100px, auto)",
                    gap: "24px",
                    padding: "30px 0",
                    borderBottom:
                      "1px solid rgba(17, 23, 23, 0.18)",
                    alignItems: "start",
                  }}
                >
                  <div
                    style={{
                      color: "#7d5f3a",
                      fontSize: "0.72rem",
                      letterSpacing:
                        "0.18em",
                      paddingTop: "7px",
                    }}
                  >
                    {item.number}
                  </div>

                  <div
                    style={{
                      minWidth: 0,
                    }}
                  >
                    <h3
                      style={{
                        fontSize:
                          "clamp(1.45rem, 3vw, 1.9rem)",
                        marginBottom:
                          "10px",
                      }}
                    >
                      {item.title}
                    </h3>

                    <p
                      style={{
                        color: "#4d4b46",
                        margin: 0,
                        maxWidth: "720px",
                      }}
                    >
                      {item.body}
                    </p>
                  </div>

                  <div
                    style={{
                      fontFamily:
                        "var(--font-serif), Georgia, serif",
                      fontSize: "1.25rem",
                      textAlign: "right",
                    }}
                  >
                    {item.hours}
                  </div>
                </article>
              ),
            )}
          </div>
        </div>

        <div
          style={{
            background: "#1f2d30",
            color: "#f5f0e7",
            padding:
              "clamp(34px, 6vw, 60px)",
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow eyebrow--light">
            FIRST RENEWAL
          </p>

          <h2
            className="light-heading"
            style={{
              maxWidth: "830px",
            }}
          >
            A newly issued instructor permit
            may be exempt from the 7 hours.
          </h2>

          <p
            style={{
              color:
                "rgba(245, 240, 231, 0.82)",
              maxWidth: "850px",
              marginBottom: 0,
            }}
          >
            DBPR currently states that an
            instructor who held the permit for
            fewer than 6 months before the
            first expiration date does not have
            to complete the instructor
            continuing-education requirement
            for that initial renewal.
          </p>
        </div>

        <div
          style={{
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">
            CORE LAW OVERLAP
          </p>

          <h2
            style={{
              maxWidth: "830px",
            }}
          >
            Core Law may overlap with your
            regular real estate license renewal.
          </h2>

          <p
            style={{
              maxWidth: "840px",
            }}
          >
            DBPR allows Core Law completed
            during the appropriate renewal
            cycle to satisfy overlapping Core
            Law requirements for the instructor
            permit and regular real estate
            license.
          </p>

          <p
            style={{
              color: "#6e6b65",
              maxWidth: "840px",
              marginBottom: 0,
            }}
          >
            Because the timing of the two
            renewal cycles matters, verify your
            individual record before assuming
            one Core Law course will satisfy
            both requirements.
          </p>
        </div>

        <div
          style={{
            background: "#eee6d9",
            border:
              "1px solid rgba(17, 23, 23, 0.14)",
            padding:
              "clamp(30px, 5vw, 48px)",
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">
            TEACHING TECHNIQUES
          </p>

          <h2
            style={{
              fontSize:
                "clamp(2rem, 4vw, 3rem)",
              maxWidth: "820px",
              marginBottom: "18px",
            }}
          >
            You cannot satisfy your own
            requirement by teaching the course.
          </h2>

          <p
            style={{
              color: "#4d4b46",
              maxWidth: "840px",
              marginBottom: 0,
            }}
          >
            An instructor who teaches a
            Teaching Techniques course does not
            receive instructor-renewal credit
            for teaching it. The four-hour
            requirement must be completed
            through another instructor.
          </p>
        </div>

        <div
          style={{
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">
            INVOLUNTARILY INACTIVE?
          </p>

          <h2
            style={{
              maxWidth: "830px",
            }}
          >
            Instructor reactivation follows a
            different education path.
          </h2>

          <p
            style={{
              maxWidth: "850px",
            }}
          >
            DBPR currently instructs
            involuntarily inactive real estate
            instructors to complete two Core
            Law courses and two Teaching
            Techniques courses.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
              gap: "18px",
              marginTop: "30px",
            }}
          >
            <div
              style={{
                border:
                  "1px solid rgba(17, 23, 23, 0.16)",
                padding: "28px",
                background: "#faf7f1",
              }}
            >
              <p className="eyebrow">
                MISSED RENEWAL CYCLE
              </p>

              <h3
                style={{
                  fontSize: "1.6rem",
                  marginBottom: "12px",
                }}
              >
                Core Law + Teaching Techniques
              </h3>

              <p
                style={{
                  color: "#4d4b46",
                  margin: 0,
                }}
              >
                One set applies to the missed
                instructor renewal cycle.
              </p>
            </div>

            <div
              style={{
                border:
                  "1px solid rgba(17, 23, 23, 0.16)",
                padding: "28px",
                background: "#faf7f1",
              }}
            >
              <p className="eyebrow">
                CURRENT RENEWAL CYCLE
              </p>

              <h3
                style={{
                  fontSize: "1.6rem",
                  marginBottom: "12px",
                }}
              >
                Core Law + Teaching Techniques
              </h3>

              <p
                style={{
                  color: "#4d4b46",
                  margin: 0,
                }}
              >
                A second set applies to the
                current instructor renewal
                cycle.
              </p>
            </div>
          </div>

          <p
            style={{
              color: "#6e6b65",
              maxWidth: "850px",
              marginTop: "20px",
              marginBottom: 0,
            }}
          >
            Verify your live DBPR record before
            purchasing reactivation education.
          </p>
        </div>

        <div
          style={{
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">
            ONLINE OR CLASSROOM?
          </p>

          <h2>
            Approved classroom or
            distance-learning education may be
            used.
          </h2>

          <p
            style={{
              maxWidth: "840px",
              marginBottom: 0,
            }}
          >
            Florida&apos;s instructor rule
            allows the required instructor
            education to be completed through
            approved classroom or
            distance-learning hours.
          </p>
        </div>

        <div
          style={{
            background: "#eee6d9",
            border:
              "1px solid rgba(17, 23, 23, 0.14)",
            padding:
              "clamp(30px, 5vw, 48px)",
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">
            IMPORTANT DISTINCTION
          </p>

          <h2
            style={{
              maxWidth: "820px",
            }}
          >
            This page covers Florida real estate
            school instructors — not appraisal
            instructors.
          </h2>

          <p
            style={{
              color: "#4d4b46",
              maxWidth: "840px",
              marginBottom: 0,
            }}
          >
            Florida appraisal instructors have
            separate education requirements.
            Check the license type on your
            official DBPR record before choosing
            education.
          </p>
        </div>

        <div
          style={{
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">
            FREQUENTLY ASKED QUESTIONS
          </p>

          <h2
            style={{
              maxWidth: "820px",
              marginBottom: "36px",
            }}
          >
            Florida instructor CE questions
          </h2>

          <div
            style={{
              borderTop:
                "1px solid rgba(17, 23, 23, 0.18)",
            }}
          >
            {faqItems.map(
              (item) => (
                <article
                  key={item.question}
                  style={{
                    padding: "26px 0",
                    borderBottom:
                      "1px solid rgba(17, 23, 23, 0.18)",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1.35rem",
                      marginBottom:
                        "10px",
                    }}
                  >
                    {item.question}
                  </h3>

                  <p
                    style={{
                      color: "#4d4b46",
                      margin: 0,
                      maxWidth: "840px",
                    }}
                  >
                    {item.answer}
                  </p>
                </article>
              ),
            )}
          </div>
        </div>

        <div
          style={{
            background: "#1f2d30",
            color: "#f5f0e7",
            padding:
              "clamp(34px, 6vw, 58px)",
            textAlign: "center",
          }}
        >
          <p className="eyebrow eyebrow--light">
            INSTRUCTOR EDUCATION
          </p>

          <h2
            className="light-heading"
            style={{
              maxWidth: "760px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Greyson&apos;s instructor continuing
            education offering is coming soon.
          </h2>

          <p
            style={{
              color:
                "rgba(245, 240, 231, 0.82)",
              maxWidth: "720px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Until enrollment opens, use the
            Florida License Check to verify your
            instructor permit and contact
            Greyson if you need help
            understanding your education path.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "14px",
              marginTop: "26px",
            }}
          >
            <Link
              href="/check-florida-real-estate-license-expiration"
              style={{
                minHeight: "50px",
                padding: "0 20px",
                border:
                  "1px solid #f5f0e7",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#f5f0e7",
                textDecoration: "none",
                fontWeight: 650,
              }}
            >
              Check My Florida License
            </Link>

            <Link
              href="/contact"
              style={{
                minHeight: "50px",
                padding: "0 20px",
                border:
                  "1px solid #f5f0e7",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#f5f0e7",
                textDecoration: "none",
                fontWeight: 650,
              }}
            >
              Ask Greyson Institute
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
