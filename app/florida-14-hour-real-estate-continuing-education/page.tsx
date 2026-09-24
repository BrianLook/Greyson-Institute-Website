import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Florida 14-Hour Real Estate Continuing Education Requirements",
  description:
    "Learn Florida's 14-hour real estate continuing education requirements, including Core Law, Ethics and Business Practices, specialty education, renewal timing, online courses, and exemptions.",
};

const ceBreakdown = [
  {
    number: "01",
    hours: "3 hours",
    title: "Core Law",
    body:
      "Florida requires a three-hour Core Law course during the renewal period. The course reviews and updates licensees on Florida real estate license law, Commission rules, agency law, and other legal subjects affecting real estate practice.",
  },
  {
    number: "02",
    hours: "3 hours",
    title: "Ethics and Business Practices",
    body:
      "Three hours must be devoted to Ethics and Business Practices. This requirement focuses on ethical and professional business practices relevant to real estate licensees.",
  },
  {
    number: "03",
    hours: "8 hours",
    title: "Specialty Education",
    body:
      "The remaining eight hours consist of approved specialty continuing education. Specialty courses address real estate topics relevant to modern professional practice.",
  },
];

const renewalSteps = [
  {
    number: "01",
    title: "Complete your initial post-license requirement first",
    body:
      "For Florida sales associates, the first renewal generally requires 45 hours of approved post-license education rather than the regular 14-hour continuing-education requirement.",
  },
  {
    number: "02",
    title: "Move into the regular continuing-education cycle",
    body:
      "After the initial renewal has been completed, Florida's ongoing continuing-education requirement applies during subsequent renewal periods.",
  },
  {
    number: "03",
    title: "Complete all 14 required hours",
    body:
      "The standard continuing-education requirement consists of three hours of Core Law, three hours of Ethics and Business Practices, and eight hours of approved specialty education.",
  },
  {
    number: "04",
    title: "Use approved education",
    body:
      "Continuing education must satisfy Florida Real Estate Commission requirements. Approved education can be delivered through classroom or distance-learning formats.",
  },
  {
    number: "05",
    title: "Finish before your license expiration date",
    body:
      "Complete your education and renewal requirements before the expiration date shown for your individual Florida real estate license.",
  },
  {
    number: "06",
    title: "Repeat the requirement in later renewal periods",
    body:
      "The continuing-education obligation continues during subsequent renewal cycles unless a valid exemption or different licensing status applies.",
  },
];

const faqItems = [
  {
    question:
      "How many continuing-education hours do Florida real estate licensees need?",
    answer:
      "Current active Florida real estate licensees generally need 14 hours of approved continuing education during each applicable renewal period after the initial post-license renewal.",
  },
  {
    question: "What makes up the Florida 14-hour CE requirement?",
    answer:
      "The current requirement consists of 3 hours of Core Law, 3 hours of Ethics and Business Practices, and 8 hours of specialty continuing education.",
  },
  {
    question:
      "Do Florida sales associates need 14 hours of CE for their first renewal?",
    answer:
      "Generally, no. Florida sales associates completing their first renewal are subject to the 45-hour post-license education requirement. The regular 14-hour continuing-education requirement applies after the initial renewal.",
  },
  {
    question: "Can Florida real estate continuing education be completed online?",
    answer:
      "Yes. Florida permits approved distance-learning continuing-education courses as well as classroom education.",
  },
  {
    question:
      "Are Florida Bar members exempt from real estate continuing education?",
    answer:
      "Florida DBPR currently states that a Florida Bar member who is active and in good standing is exempt from the 14-hour real estate continuing-education requirement.",
  },
  {
    question:
      "Is Florida continuing education the same as the 45-hour post-license course?",
    answer:
      "No. The 45-hour post-license requirement applies to a sales associate's initial renewal. The 14-hour continuing-education requirement applies to later renewal periods.",
  },
  {
    question: "What if my Florida real estate license becomes inactive?",
    answer:
      "Inactive and reactivation requirements can differ from the standard active-license continuing-education requirement. Licensees should check their exact status and requirements with Florida DBPR before selecting education.",
  },
];

export default function Florida14HourContinuingEducationPage() {
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
          maxWidth: "1040px",
          minWidth: 0,
        }}
      >
        <div
          style={{
            maxWidth: "880px",
            marginBottom: "72px",
          }}
        >
          <p className="eyebrow">FLORIDA CONTINUING EDUCATION</p>

          <h1
            style={{
              overflowWrap: "anywhere",
            }}
          >
            Florida 14-Hour Real Estate Continuing Education Requirements
          </h1>

          <p
            className="page-lead"
            style={{
              maxWidth: "800px",
            }}
          >
            After the initial post-license renewal, Florida real estate
            professionals generally move into the state&apos;s regular
            continuing-education cycle. Here is how the 14-hour requirement
            works and what you need to complete.
          </p>

          <p className="muted">Last reviewed: September 24, 2026</p>
        </div>

        <div
          style={{
            background: "#eee6d9",
            border: "1px solid rgba(17, 23, 23, 0.14)",
            padding: "clamp(28px, 5vw, 46px)",
            marginBottom: "72px",
          }}
        >
          <p className="eyebrow">QUICK ANSWER</p>

          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              marginBottom: "20px",
            }}
          >
            3 hours Core Law + 3 hours Ethics + 8 hours specialty.
          </h2>

          <p
            style={{
              color: "#4d4b46",
              maxWidth: "840px",
              marginBottom: 0,
            }}
          >
            Florida&apos;s current real estate continuing-education requirement
            totals 14 hours: three hours of Core Law, three hours of Ethics and
            Business Practices, and eight hours of approved specialty
            education.
          </p>
        </div>

        <div
          style={{
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">THE 14 HOURS</p>

          <h2
            style={{
              maxWidth: "800px",
              marginBottom: "42px",
            }}
          >
            How Florida continuing education is divided
          </h2>

          <div
            style={{
              borderTop: "1px solid rgba(17, 23, 23, 0.18)",
            }}
          >
            {ceBreakdown.map((item) => (
              <article
                key={item.number}
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "minmax(48px, 70px) minmax(0, 1fr) minmax(100px, auto)",
                  gap: "24px",
                  padding: "30px 0",
                  borderBottom: "1px solid rgba(17, 23, 23, 0.18)",
                  alignItems: "start",
                }}
              >
                <div
                  style={{
                    color: "#7d5f3a",
                    fontSize: "0.72rem",
                    letterSpacing: "0.18em",
                    paddingTop: "7px",
                  }}
                >
                  {item.number}
                </div>

                <div style={{ minWidth: 0 }}>
                  <h3
                    style={{
                      fontSize: "clamp(1.45rem, 3vw, 1.9rem)",
                      marginBottom: "10px",
                      overflowWrap: "anywhere",
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    style={{
                      color: "#4d4b46",
                      margin: 0,
                      maxWidth: "700px",
                    }}
                  >
                    {item.body}
                  </p>
                </div>

                <div
                  style={{
                    fontFamily: "var(--font-serif), Georgia, serif",
                    fontSize: "1.25rem",
                    textAlign: "right",
                    overflowWrap: "anywhere",
                  }}
                >
                  {item.hours}
                </div>
              </article>
            ))}
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
          <p className="eyebrow eyebrow--light">IMPORTANT DISTINCTION</p>

          <h2
            className="light-heading"
            style={{
              maxWidth: "820px",
            }}
          >
            Your first renewal is different.
          </h2>

          <p
            style={{
              color: "rgba(245, 240, 231, 0.82)",
              maxWidth: "840px",
            }}
          >
            A newly licensed Florida sales associate generally does not
            complete the regular 14-hour continuing-education requirement for
            the first renewal. Instead, the initial renewal requires 45 hours
            of approved sales associate post-license education.
          </p>

          <Link
            href="/florida-45-hour-post-license-requirements"
            style={{
              color: "#f5f0e7",
              textDecoration: "underline",
              textUnderlineOffset: "4px",
              fontWeight: 600,
            }}
          >
            Learn about Florida&apos;s 45-hour post-license requirement →
          </Link>
        </div>

        <div
          style={{
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">WHO NEEDS 14-HOUR CE?</p>

          <h2
            style={{
              maxWidth: "820px",
            }}
          >
            The regular requirement begins after the initial renewal.
          </h2>

          <p>
            For sales associates, the first renewal is generally governed by
            the post-license requirement. After that initial renewal,
            Florida&apos;s regular continuing-education requirements apply.
          </p>

          <p>
            Brokers and broker associates also move into the regular
            continuing-education cycle after satisfying their applicable
            initial post-license requirements.
          </p>

          <p>
            Because license status can affect renewal requirements, always
            verify your individual license status and expiration date before
            selecting education.
          </p>
        </div>

        <div
          style={{
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">STEP BY STEP</p>

          <h2
            style={{
              maxWidth: "790px",
              marginBottom: "42px",
            }}
          >
            How the continuing-education cycle works
          </h2>

          <div
            style={{
              borderTop: "1px solid rgba(17, 23, 23, 0.18)",
            }}
          >
            {renewalSteps.map((step) => (
              <article
                key={step.number}
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "minmax(48px, 80px) minmax(0, 1fr)",
                  gap: "24px",
                  padding: "30px 0",
                  borderBottom: "1px solid rgba(17, 23, 23, 0.18)",
                }}
              >
                <div
                  style={{
                    color: "#7d5f3a",
                    fontSize: "0.72rem",
                    letterSpacing: "0.18em",
                    paddingTop: "7px",
                  }}
                >
                  {step.number}
                </div>

                <div style={{ minWidth: 0 }}>
                  <h3
                    style={{
                      fontSize: "clamp(1.45rem, 3vw, 1.9rem)",
                      marginBottom: "10px",
                      overflowWrap: "anywhere",
                    }}
                  >
                    {step.title}
                  </h3>

                  <p
                    style={{
                      color: "#4d4b46",
                      margin: 0,
                      maxWidth: "760px",
                    }}
                  >
                    {step.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div
          style={{
            background: "#eee6d9",
            border: "1px solid rgba(17, 23, 23, 0.14)",
            padding: "clamp(30px, 5vw, 48px)",
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">ONLINE OR CLASSROOM?</p>

          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              maxWidth: "810px",
              marginBottom: "18px",
            }}
          >
            Approved continuing education can be completed by distance
            learning.
          </h2>

          <p
            style={{
              color: "#4d4b46",
              maxWidth: "830px",
              marginBottom: 0,
            }}
          >
            Florida law permits approved distance-learning continuing
            education as an alternative to classroom education. The important
            requirement is that the course and provider satisfy Florida Real
            Estate Commission requirements and provide the appropriate type of
            continuing-education credit.
          </p>
        </div>

        <div
          style={{
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">CORE LAW</p>

          <h2>Why three hours are specifically devoted to Florida law</h2>

          <p>
            Real estate laws, Commission rules, agency requirements, and other
            laws affecting real estate practice can change over time.
          </p>

          <p>
            Florida&apos;s required Core Law education is designed to keep
            licensees current on legal and regulatory subjects that affect
            professional real estate practice.
          </p>
        </div>

        <div
          style={{
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">ETHICS AND BUSINESS PRACTICES</p>

          <h2>Three hours focus specifically on professional conduct.</h2>

          <p>
            Florida&apos;s continuing-education structure includes three hours
            devoted to Ethics and Business Practices.
          </p>

          <p>
            These hours are separate from the Core Law requirement and form
            part of the overall 14-hour renewal requirement.
          </p>
        </div>

        <div
          style={{
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">SPECIALTY EDUCATION</p>

          <h2>Eight hours can focus on approved real estate specialty topics.</h2>

          <p>
            The remaining eight hours are completed through approved specialty
            continuing-education courses.
          </p>

          <p>
            Florida law directs that specialty education focus on real estate
            issues relevant to modern real estate practice, which can include
            subjects involving changes in professional practice and technology
            used in the industry.
          </p>
        </div>

        <div
          style={{
            background: "#eee6d9",
            border: "1px solid rgba(17, 23, 23, 0.14)",
            padding: "clamp(30px, 5vw, 48px)",
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">FLORIDA BAR EXEMPTION</p>

          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              maxWidth: "800px",
              marginBottom: "18px",
            }}
          >
            Active Florida Bar members have a CE exemption.
          </h2>

          <p
            style={{
              color: "#4d4b46",
              maxWidth: "820px",
            }}
          >
            Florida DBPR currently states that a Florida Bar member who is
            active and in good standing is exempt from the 14-hour real estate
            continuing-education requirement.
          </p>

          <p
            style={{
              color: "#4d4b46",
              maxWidth: "820px",
              marginBottom: 0,
            }}
          >
            DBPR advises Bar members who have not previously informed the
            department of their status to contact DBPR so the exemption can be
            reflected appropriately.
          </p>
        </div>

        <div
          style={{
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">INACTIVE LICENSES</p>

          <h2>Do not assume the normal 14-hour rule applies to every status.</h2>

          <p>
            Florida has separate requirements for certain inactive and
            reactivation situations. A license that becomes involuntarily
            inactive, for example, can be subject to different education
            requirements depending on how long it has remained inactive.
          </p>

          <p>
            Before purchasing continuing or reactivation education, verify the
            exact status of your license through DBPR.
          </p>
        </div>

        <div
          style={{
            background: "#eee6d9",
            border: "1px solid rgba(17, 23, 23, 0.14)",
            padding: "clamp(30px, 5vw, 48px)",
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">RELATED GUIDES</p>

          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              marginBottom: "18px",
            }}
          >
            Follow your Florida education requirements from license to renewal.
          </h2>

          <div
            style={{
              display: "grid",
              gap: "14px",
              marginTop: "24px",
            }}
          >
            <Link
              href="/florida-45-hour-post-license-requirements"
              style={{
                textDecoration: "underline",
                textUnderlineOffset: "4px",
                fontWeight: 600,
              }}
            >
              Florida 45-Hour Post-License Requirements →
            </Link>

            <Link
              href="/what-happens-after-you-pass-the-florida-real-estate-exam"
              style={{
                textDecoration: "underline",
                textUnderlineOffset: "4px",
                fontWeight: 600,
              }}
            >
              What Happens After You Pass the Florida Real Estate Exam? →
            </Link>

            <Link
              href="/florida-real-estate-exam"
              style={{
                textDecoration: "underline",
                textUnderlineOffset: "4px",
                fontWeight: 600,
              }}
            >
              Florida Real Estate Exam: What to Expect and How to Prepare →
            </Link>

            <Link
              href="/how-to-get-a-florida-real-estate-license"
              style={{
                textDecoration: "underline",
                textUnderlineOffset: "4px",
                fontWeight: 600,
              }}
            >
              How to Get a Florida Real Estate License →
            </Link>
          </div>
        </div>

        <div
          style={{
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">COMMON QUESTIONS</p>

          <h2 style={{ marginBottom: "36px" }}>
            Florida 14-hour continuing education FAQ
          </h2>

          <div
            style={{
              borderTop: "1px solid rgba(17, 23, 23, 0.18)",
            }}
          >
            {faqItems.map((item) => (
              <details
                key={item.question}
                style={{
                  borderBottom: "1px solid rgba(17, 23, 23, 0.18)",
                  padding: "22px 0",
                }}
              >
                <summary
                  style={{
                    cursor: "pointer",
                    fontFamily: "var(--font-serif), Georgia, serif",
                    fontSize: "clamp(1.25rem, 2.5vw, 1.65rem)",
                    lineHeight: 1.3,
                  }}
                >
                  {item.question}
                </summary>

                <p
                  style={{
                    color: "#4d4b46",
                    maxWidth: "760px",
                    paddingTop: "14px",
                    marginBottom: 0,
                  }}
                >
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>

        <div
          style={{
            marginBottom: "76px",
          }}
        >
          <p className="eyebrow">OFFICIAL FLORIDA RESOURCES</p>

          <h2>Verify your renewal requirements before enrolling.</h2>

          <p
            style={{
              maxWidth: "810px",
            }}
          >
            License status, renewal requirements, education rules, exemptions,
            and deadlines can change. Confirm your individual requirements with
            Florida DBPR before your renewal deadline.
          </p>

          <div
            style={{
              display: "grid",
              gap: "22px",
              marginTop: "26px",
            }}
          >
            <div>
              <a
                href="https://www2.myfloridalicense.com/real-estate-commission/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                  fontWeight: 600,
                  marginBottom: "5px",
                }}
              >
                Florida Real Estate Commission ↗
              </a>

              <p
                style={{
                  margin: 0,
                  color: "#6e6b65",
                  fontSize: "0.82rem",
                }}
              >
                You&apos;re leaving the Greyson Institute website. Florida DBPR
                will open in a new tab.
              </p>
            </div>

            <div>
              <a
                href="https://www2.myfloridalicense.com/real-estate-commission/education/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                  fontWeight: 600,
                  marginBottom: "5px",
                }}
              >
                Florida Real Estate Commission — Education ↗
              </a>

              <p
                style={{
                  margin: 0,
                  color: "#6e6b65",
                  fontSize: "0.82rem",
                }}
              >
                You&apos;re leaving the Greyson Institute website. Florida DBPR
                will open in a new tab.
              </p>
            </div>

            <div>
              <a
                href="https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&URL=0400-0499/0475/Sections/0475.182.html"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                  fontWeight: 600,
                  marginBottom: "5px",
                }}
              >
                Florida Statute 475.182 — Continuing Education ↗
              </a>

              <p
                style={{
                  margin: 0,
                  color: "#6e6b65",
                  fontSize: "0.82rem",
                }}
              >
                You&apos;re leaving the Greyson Institute website. The Florida
                Legislature website will open in a new tab.
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            background: "#eee6d9",
            border: "1px solid rgba(17, 23, 23, 0.14)",
            padding: "clamp(34px, 6vw, 58px)",
            textAlign: "center",
          }}
        >
          <p className="eyebrow">ONGOING REAL ESTATE EDUCATION</p>

          <h2
            style={{
              maxWidth: "740px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Explore Greyson Institute&apos;s continuing-education path.
          </h2>

          <p
            style={{
              color: "#4d4b46",
              maxWidth: "700px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Understand where Florida&apos;s 14-hour continuing-education
            requirement fits into maintaining your real estate license after
            the initial renewal.
          </p>

          <div
            className="button-row"
            style={{
              justifyContent: "center",
            }}
          >
            <Link className="button" href="/courses#continuing-education">
              Explore Continuing Education
            </Link>

            <Link
              href="/contact"
              style={{
                minHeight: "48px",
                padding: "0 20px",
                border: "1px solid #111717",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "0.04em",
              }}
            >
              Ask a Question
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
