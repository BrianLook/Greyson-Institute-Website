import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GuideStructuredData } from "@/components/GuideStructuredData";

const guideTitle =
  "What Happens After You Pass the Florida Real Estate Exam?";
const guideDescription =
  "Learn what happens after you pass the Florida real estate exam, including license issuance, inactive status, choosing a broker, activating your license, and completing 45-hour post-license education.";
const guidePath =
  "/what-happens-after-you-pass-the-florida-real-estate-exam";

export const metadata: Metadata = {
  title: guideTitle,
  description: guideDescription,
};

const nextSteps = [
  {
    number: "01",
    title: "Receive your examination result",
    body:
      "After completing the Florida Real Estate Sales Associate Examination, candidates receive an official examination result report. Passing the exam is a major licensing milestone, but it is not the final step before working as an active sales associate.",
  },
  {
    number: "02",
    title: "Your sales associate license can be issued",
    body:
      "Once the applicable licensing requirements have been satisfied, Florida can issue your sales associate license. If it has not yet been activated with a qualifying broker, the license is issued in inactive status.",
  },
  {
    number: "03",
    title: "Choose a Florida real estate broker",
    body:
      "A Florida sales associate works under the direction, control, or management of a licensed broker. Before working in active status, you need to become associated with a qualifying Florida real estate broker or an eligible owner-developer.",
  },
  {
    number: "04",
    title: "Activate your license",
    body:
      "Your license must be activated before you work as an active sales associate. Activation can be completed using DBPR Form RE 11, or your qualifying broker can add and activate you through the broker's DBPR online account.",
  },
  {
    number: "05",
    title: "Begin working under your broker",
    body:
      "After your license has been activated under the qualifying broker, you can begin performing licensed real estate activities within that brokerage relationship and in accordance with Florida law.",
  },
  {
    number: "06",
    title: "Complete your 45-hour post-license education",
    body:
      "Florida sales associates must complete the required 45 hours of approved post-license education before the expiration of the initial sales associate license, whether the license is active or inactive.",
  },
];

const brokerConsiderations = [
  {
    title: "Training and support",
    body:
      "Ask what structured training, mentoring, transaction support, technology training, and new-agent education are available.",
  },
  {
    title: "Compensation structure",
    body:
      "Understand the brokerage's commission structure, fees, transaction charges, desk fees, technology costs, and other expenses before committing.",
  },
  {
    title: "Lead generation",
    body:
      "Find out whether the brokerage provides leads, expects agents to generate their own business, or uses a combination of both.",
  },
  {
    title: "Broker accessibility",
    body:
      "New sales associates often have questions about contracts, disclosures, transactions, and compliance. Consider how accessible the broker and support staff will be when you need guidance.",
  },
  {
    title: "Culture and business model",
    body:
      "Brokerages differ significantly in size, structure, specialization, branding, office environment, technology, and expectations. Look for a model that fits how you intend to build your business.",
  },
  {
    title: "Long-term development",
    body:
      "Consider whether the brokerage provides opportunities to develop skills beyond your first transactions, including sales, negotiation, marketing, prospecting, and future leadership.",
  },
];

const faqItems = [
  {
    question:
      "Can I start selling real estate immediately after passing the Florida exam?",
    answer:
      "Not simply because you passed the examination. A Florida sales associate must have the license issued and activated under a qualifying broker before working in active status.",
  },
  {
    question: "Is my Florida real estate license active automatically?",
    answer:
      "No. Florida's published sales associate requirements state that the license is issued in inactive status unless it is activated.",
  },
  {
    question: "How do I activate my Florida real estate license?",
    answer:
      "A sales associate can use DBPR Form RE 11 to become active with a real estate company, or the qualifying broker can add and activate the associate through the broker's DBPR online account.",
  },
  {
    question: "Do I need a broker after I pass the Florida real estate exam?",
    answer:
      "Yes, if you want to work as an active Florida real estate sales associate. Sales associates perform licensed activity under the direction, control, or management of a qualifying broker.",
  },
  {
    question:
      "Do I still need post-license education if my license is inactive?",
    answer:
      "Yes. Florida's published requirements state that sales associates must complete the required 45-hour post-license education before the initial license expires whether the license is active or inactive.",
  },
  {
    question:
      "How many hours of post-license education do Florida sales associates need?",
    answer:
      "Florida sales associates generally must complete 45 hours of approved post-license education during their initial renewal period.",
  },
  {
    question:
      "What happens if I do not complete my Florida post-license education in time?",
    answer:
      "Florida DBPR states that failure to complete the required post-license education by the initial license expiration date can cause the license to become null and void.",
  },
];

export default function AfterPassingFloridaRealEstateExamPage() {
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
        datePublished="2026-09-24"
        dateModified="2026-09-24"
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
            maxWidth: "860px",
            marginBottom: "72px",
          }}
        >
          <p className="eyebrow">FLORIDA REAL ESTATE LICENSING GUIDE</p>

          <h1
            style={{
              overflowWrap: "anywhere",
            }}
          >
            What Happens After You Pass the Florida Real Estate Exam?
          </h1>

          <p
            className="page-lead"
            style={{
              maxWidth: "790px",
            }}
          >
            Passing the state examination is a major milestone, but it does
            not complete the entire licensing process. Here is what happens
            next, from license issuance and broker selection to activation and
            your first post-license education requirement.
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
            Pass the exam. Get licensed. Choose a broker. Activate your
            license.
          </h2>

          <p
            style={{
              color: "#4d4b46",
              maxWidth: "830px",
              marginBottom: 0,
            }}
          >
            After you pass the Florida Real Estate Sales Associate Examination
            and satisfy the applicable licensing requirements, your sales
            associate license can be issued. Unless it is activated with a
            qualifying broker, the license is issued in inactive status. You
            must become active under a broker before working as an active sales
            associate.
          </p>
        </div>

        <div style={{ marginBottom: "82px" }}>
          <p className="eyebrow">WHAT HAPPENS NEXT?</p>

          <h2
            style={{
              maxWidth: "780px",
              marginBottom: "42px",
            }}
          >
            Six steps after passing the Florida real estate exam
          </h2>

          <div
            style={{
              borderTop: "1px solid rgba(17, 23, 23, 0.18)",
            }}
          >
            {nextSteps.map((step) => (
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

                  {step.number === "06" && (
                    <Link
                      href="/florida-45-hour-post-license-requirements"
                      style={{
                        display: "inline-block",
                        marginTop: "14px",
                        textDecoration: "underline",
                        textUnderlineOffset: "4px",
                        fontWeight: 600,
                      }}
                    >
                      Learn about Florida&apos;s 45-hour post-license
                      requirements →
                    </Link>
                  )}
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
          <p className="eyebrow eyebrow--light">ACTIVE VS. INACTIVE</p>

          <h2
            className="light-heading"
            style={{
              maxWidth: "800px",
            }}
          >
            Passing the exam does not automatically make your license active.
          </h2>

          <p
            style={{
              color: "rgba(245, 240, 231, 0.82)",
              maxWidth: "830px",
            }}
          >
            Florida&apos;s published licensing requirements state that the
            sales associate license is issued in inactive status unless it is
            activated. To work as an active sales associate, you must become
            associated with a qualifying broker and have your license status
            activated.
          </p>

          <p
            style={{
              color: "rgba(245, 240, 231, 0.82)",
              maxWidth: "830px",
              marginBottom: 0,
            }}
          >
            An inactive license means you hold the license, but you are not
            currently authorized to perform licensed services as an active
            sales associate.
          </p>
        </div>

        <div style={{ marginBottom: "82px" }}>
          <p className="eyebrow">CHOOSING A BROKER</p>

          <h2 style={{ maxWidth: "800px" }}>
            Your first brokerage can shape your early real estate experience.
          </h2>

          <p
            style={{
              maxWidth: "820px",
              marginBottom: "38px",
            }}
          >
            Florida requires active sales associates to work under a broker,
            but brokerages can differ considerably in how they train, support,
            compensate, and develop new agents. Before making a decision,
            compare more than the name on the office door.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
              gap: "18px",
            }}
          >
            {brokerConsiderations.map((item) => (
              <div
                key={item.title}
                style={{
                  border: "1px solid rgba(17, 23, 23, 0.16)",
                  padding: "28px",
                  minWidth: 0,
                }}
              >
                <h3
                  style={{
                    fontSize: "1.4rem",
                    marginBottom: "12px",
                    overflowWrap: "anywhere",
                  }}
                >
                  {item.title}
                </h3>

                <p style={{ color: "#4d4b46", margin: 0 }}>{item.body}</p>
              </div>
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
          <p className="eyebrow">ACTIVATING YOUR LICENSE</p>

          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              maxWidth: "800px",
              marginBottom: "18px",
            }}
          >
            Your broker can activate you with DBPR.
          </h2>

          <p
            style={{
              color: "#4d4b46",
              maxWidth: "820px",
            }}
          >
            Florida provides Form DBPR RE 11 for changes to a sales
            associate&apos;s employment and license status. To become active,
            the employing broker can complete the required activation process.
            A qualifying broker may also add the sales associate through the
            broker&apos;s DBPR online account.
          </p>

          <div style={{ marginTop: "22px" }}>
            <a
              href="https://www.myfloridalicense.com/CheckListDetail.asp?SID=&XACT_DEFN_ID=1101&clientCode=2501&xactCode=3020"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
                fontWeight: 600,
                marginBottom: "6px",
              }}
            >
              Florida DBPR — Become Active (RE 11) ↗
            </a>

            <p
              style={{
                margin: 0,
                color: "#6e6b65",
                fontSize: "0.82rem",
                lineHeight: 1.5,
              }}
            >
              You&apos;re leaving the Greyson Institute website. Florida DBPR
              will open in a new tab.
            </p>
          </div>
        </div>

        <div style={{ marginBottom: "82px" }}>
          <p className="eyebrow">YOUR NEXT EDUCATION REQUIREMENT</p>

          <h2 style={{ maxWidth: "820px" }}>
            Do not forget the 45-hour Florida post-license requirement.
          </h2>

          <p>
            Your education requirements do not end when you pass the state
            examination. Florida sales associates must generally complete 45
            hours of approved post-license education before the expiration of
            the initial sales associate license.
          </p>

          <p>
            That requirement applies whether your sales associate license is
            active or inactive.
          </p>

          <p>
            Florida DBPR warns that failure to complete the required
            post-license education by the initial expiration date can cause the
            license to become null and void.
          </p>

          <div
            style={{
              display: "grid",
              gap: "12px",
              marginTop: "20px",
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
              href="/courses#post-license"
              style={{
                textDecoration: "underline",
                textUnderlineOffset: "4px",
                fontWeight: 600,
              }}
            >
              Explore the Florida post-license education path →
            </Link>
          </div>
        </div>

        <div style={{ marginBottom: "82px" }}>
          <p className="eyebrow">AFTER YOUR FIRST RENEWAL</p>

          <h2>
            Post-license education eventually becomes continuing education.
          </h2>

          <p>
            The 45-hour post-license requirement applies to the initial renewal
            period for Florida sales associates. After satisfying that
            first-renewal requirement, Florida&apos;s regular continuing
            education requirements apply during later renewal periods.
          </p>

          <p>
            That means it is useful to think of your education as an ongoing
            professional requirement rather than something that ends when you
            pass the licensing exam.
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
            Continue from licensure into your first renewal.
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
              href="/florida-63-hour-real-estate-pre-licensing-course"
              style={{
                textDecoration: "underline",
                textUnderlineOffset: "4px",
                fontWeight: 600,
              }}
            >
              Florida 63-Hour Real Estate Pre-Licensing Course →
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

            <Link
              href="/how-much-does-a-florida-real-estate-license-cost"
              style={{
                textDecoration: "underline",
                textUnderlineOffset: "4px",
                fontWeight: 600,
              }}
            >
              How Much Does a Florida Real Estate License Cost? →
            </Link>

            <Link
              href="/how-long-does-it-take-to-get-a-florida-real-estate-license"
              style={{
                textDecoration: "underline",
                textUnderlineOffset: "4px",
                fontWeight: 600,
              }}
            >
              How Long Does It Take to Get a Florida Real Estate License? →
            </Link>
          </div>
        </div>

        <div style={{ marginBottom: "82px" }}>
          <p className="eyebrow">COMMON QUESTIONS</p>

          <h2 style={{ marginBottom: "36px" }}>
            After the Florida real estate exam FAQ
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

        <div style={{ marginBottom: "76px" }}>
          <p className="eyebrow">OFFICIAL FLORIDA RESOURCES</p>

          <h2>Verify your license status and requirements with DBPR.</h2>

          <p style={{ maxWidth: "800px" }}>
            License issuance, activation procedures, forms, education
            requirements, and renewal rules can change. Confirm your current
            status and obligations with the Florida Department of Business and
            Professional Regulation.
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
                href="https://www2.myfloridalicense.com/re/documents/RESLRequirements.pdf"
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
                Florida Sales Associate Licensing Requirements ↗
              </a>

              <p
                style={{
                  margin: 0,
                  color: "#6e6b65",
                  fontSize: "0.82rem",
                }}
              >
                You&apos;re leaving the Greyson Institute website. The official
                Florida DBPR document will open in a new tab.
              </p>
            </div>

            <div>
              <a
                href="https://www.myfloridalicense.com/CheckListDetail.asp?SID=&XACT_DEFN_ID=1101&clientCode=2501&xactCode=3020"
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
                DBPR — Become Active, Sales Associate (RE 11) ↗
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
          <p className="eyebrow">YOUR NEXT EDUCATION STEP</p>

          <h2
            style={{
              maxWidth: "740px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Prepare for your first Florida license renewal.
          </h2>

          <p
            style={{
              color: "#4d4b46",
              maxWidth: "700px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Understand Florida&apos;s 45-hour post-license requirement and
            explore the education path that follows licensure.
          </p>

          <div
            className="button-row"
            style={{
              justifyContent: "center",
            }}
          >
            <Link
              className="button"
              href="/florida-45-hour-post-license-requirements"
            >
              Understand the 45-Hour Requirement
            </Link>

            <Link
              href="/courses#post-license"
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
              Explore Post-License Education
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
