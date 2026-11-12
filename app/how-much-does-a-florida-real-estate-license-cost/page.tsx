import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GuideStructuredData } from "@/components/GuideStructuredData";
import { PartnerEnrollmentButton } from "@/components/PartnerEnrollmentButton";

const guideTitle = "How Much Does a Florida Real Estate License Cost?";
const guideDescription =
  "Understand the cost of a Florida real estate license, with DBPR fees, fingerprints, state exam costs, and current The CE Shop 63-hour pre-licensing package examples.";
const guidePath = "/how-much-does-a-florida-real-estate-license-cost";

export const metadata: Metadata = {
  title: guideTitle,
  description: guideDescription,
};

const costItems = [
  {
    number: "01",
    title: "Florida sales associate application",
    amount: "$62.75",
    body:
      "The Florida Department of Business and Professional Regulation currently lists a $62.75 application fee for the initial Florida real estate sales associate license application.",
  },
  {
    number: "02",
    title: "Electronic fingerprints",
    amount: "Varies",
    body:
      "Electronic fingerprints are required. Approved private Livescan providers set their own prices. DBPR also offers fingerprinting at its Tallahassee headquarters for $36 for eligible DBPR license applicants.",
  },
  {
    number: "03",
    title: "63-hour pre-licensing course",
    amount: "View options",
    body:
      "Most applicants must complete a FREC-approved 63-hour course. The CE Shop publishes several online course and package options; the price depends on the package you select and any promotion available at checkout. See the reference prices and co-branded link below.",
  },
  {
    number: "04",
    title: "Florida state examination",
    amount: "Separate exam fee",
    body:
      "After DBPR approves your application, the Florida Real Estate Sales Associate Examination is scheduled through Pearson VUE. A separate examination fee is paid when the test is scheduled. Candidates should verify the current fee with Pearson VUE before booking.",
  },
];

const faqItems = [
  {
    question: "What is the Florida real estate license application fee?",
    answer:
      "The current Florida DBPR sales associate application lists a $62.75 application fee.",
  },
  {
    question: "Are fingerprints included in the application fee?",
    answer:
      "No. Fingerprinting is a separate cost. Private approved Livescan providers establish their own pricing.",
  },
  {
    question: "How much does the 63-hour Florida real estate course cost?",
    answer:
      "There is no single statewide tuition price. The CE Shop currently advertises packages from $139 to $459 and separately lists an individual 63-hour course at $125, before any applicable offers. These are reference prices, not a guaranteed checkout quote. Use the Greyson course link on this page to verify the live price.",
  },
  {
    question: "Is the Florida real estate exam included in the application fee?",
    answer:
      "No. The state examination is scheduled separately through Pearson VUE and has its own examination fee.",
  },
  {
    question: "Are there costs after getting the license?",
    answer:
      "Yes. New sales associates generally must complete 45 hours of approved post-licensing education before their first renewal. Renewal fees and later continuing-education costs should also be included when planning for the longer-term cost of maintaining a Florida real estate license.",
  },
];

export default function FloridaRealEstateLicenseCostPage() {
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
        dateModified="2026-11-12"
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
            maxWidth: "840px",
            marginBottom: "72px",
          }}
        >
          <p className="eyebrow">FLORIDA REAL ESTATE LICENSING GUIDE</p>

          <h1
            style={{
              overflowWrap: "anywhere",
            }}
          >
            How Much Does It Cost to Get a Florida Real Estate License?
          </h1>

          <p
            className="page-lead"
            style={{
              maxWidth: "760px",
            }}
          >
            The cost of becoming a Florida real estate sales associate includes
            more than one fee. Here is a clear breakdown of the application,
            fingerprinting, education, and examination costs to plan for.
          </p>

          <p className="muted">Pricing reference checked: November 12, 2026</p>
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
            There is no single all-in price.
          </h2>

          <p
            style={{
              color: "#4d4b46",
              maxWidth: "820px",
              marginBottom: 0,
            }}
          >
            Florida DBPR lists $62.75 for the initial sales associate
            application. You should also budget separately for electronic
            fingerprints, the required 63-hour pre-licensing course, and
            the state examination. The CE Shop publishes several course
            packages at different prices, so there is no single guaranteed
            total. Check current partner pricing and promotions before enrolling.
          </p>
        </div>

        <div
          style={{
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">63-HOUR COURSE PRICING</p>
          <h2 style={{ maxWidth: "780px", marginBottom: "20px" }}>
            Compare available online course packages.
          </h2>
          <p style={{ color: "#4d4b46", maxWidth: "820px", marginBottom: "26px" }}>
            For reference, The CE Shop currently publishes these Florida
            Sales Associate pre-licensing package prices. Each package includes
            the required 63-hour education, but additional study resources
            and benefits vary.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 195px), 1fr))",
              gap: "14px",
              marginBottom: "22px",
            }}
          >
            {[
              { name: "Course Only", price: "$139", detail: "63-hour package" },
              { name: "Standard", price: "$239", detail: "Includes exam prep" },
              { name: "Value", price: "$315", detail: "Additional career resources" },
              { name: "Premium", price: "$459", detail: "Expanded bundle, including post-license" },
            ].map((option) => (
              <div
                key={option.name}
                style={{
                  background: "#faf7f1",
                  border: "1px solid rgba(17, 23, 23, 0.16)",
                  padding: "22px 20px",
                }}
              >
                <p
                  className="eyebrow"
                  style={{ marginBottom: "10px" }}
                >
                  {option.name}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-serif), Georgia, serif",
                    fontSize: "clamp(2rem, 4vw, 2.5rem)",
                    lineHeight: 1,
                    color: "#111717",
                    margin: "0 0 12px",
                  }}
                >
                  {option.price}
                </p>
                <p style={{ margin: 0, color: "#6e6b65", fontSize: "0.88rem", lineHeight: 1.6 }}>
                  {option.detail}
                </p>
              </div>
            ))}
          </div>

          <p style={{ color: "#5f5c56", fontSize: "0.9rem", lineHeight: 1.7, maxWidth: "840px", marginBottom: "20px" }}>
            The CE Shop also separately lists an individual 63-hour
            Sales Associate course at $125. Prices above are published reference
            amounts checked November 12, 2026, not guaranteed promotional
            or checkout prices. Package contents, availability, and discounts
            may change.
          </p>

          <PartnerEnrollmentButton
            course="floridaPreLicense63"
            label="View Current Course Prices →"
          />

          <p
            style={{
              color: "#6e6b65",
              fontSize: "0.82rem",
              lineHeight: 1.65,
              marginTop: "16px",
              maxWidth: "820px",
            }}
          >
            Education provided by The CE Shop. The button opens Greyson's
            co-branded partner page in a new tab. Final pricing and
            eligibility are determined by The CE Shop at checkout.
            Course tuition is separate from DBPR application fees,
            fingerprints, and the state exam.
          </p>
        </div>

        <div
          style={{
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">COST BREAKDOWN</p>

          <h2
            style={{
              maxWidth: "760px",
              marginBottom: "42px",
            }}
          >
            What you should budget for
          </h2>

          <div
            style={{
              borderTop: "1px solid rgba(17, 23, 23, 0.18)",
            }}
          >
            {costItems.map((item) => (
              <article
                key={item.number}
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "minmax(48px, 70px) minmax(0, 1fr) minmax(120px, auto)",
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
                      maxWidth: "690px",
                    }}
                  >
                    {item.body}
                  </p>

                  {item.number === "03" && (
                    <div style={{ marginTop: "14px" }}>
                      <PartnerEnrollmentButton
                        course="floridaPreLicense63"
                        label="Compare Live Packages →"
                      />
                    </div>
                  )}

                  {item.number === "04" && (
                    <div
                      style={{
                        marginTop: "16px",
                      }}
                    >
                      <a
                        href="https://www.pearsonvue.com/us/en/fl/realestate.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-block",
                          color: "#111717",
                          textDecoration: "underline",
                          textUnderlineOffset: "4px",
                          fontWeight: 600,
                          marginBottom: "6px",
                        }}
                      >
                        View Florida real estate exam information on Pearson VUE
                        ↗
                      </a>

                      <p
                        style={{
                          margin: 0,
                          color: "#6e6b65",
                          fontSize: "0.82rem",
                          lineHeight: 1.5,
                        }}
                      >
                        You’re leaving the Greyson Institute website. Pearson
                        VUE will open in a new tab.
                      </p>
                    </div>
                  )}
                </div>

                <div
                  style={{
                    fontFamily: "var(--font-serif), Georgia, serif",
                    fontSize: "1.25rem",
                    textAlign: "right",
                    overflowWrap: "anywhere",
                  }}
                >
                  {item.amount}
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
          <p className="eyebrow eyebrow--light">WHAT CAN CHANGE YOUR TOTAL?</p>

          <h2
            className="light-heading"
            style={{
              maxWidth: "760px",
            }}
          >
            Your largest variable is usually the education you choose.
          </h2>

          <p
            style={{
              color: "rgba(245, 240, 231, 0.82)",
              maxWidth: "820px",
            }}
          >
            Florida establishes the licensing requirements, but approved
            schools set their own tuition. Your total can vary based on whether
            you choose an online or classroom course, whether exam-preparation
            materials are included, and whether the provider is offering a
            promotion.
          </p>

          <Link
            href="/courses#pre-licensing"
            style={{
              color: "#f5f0e7",
              textDecoration: "underline",
              textUnderlineOffset: "4px",
              fontWeight: 600,
            }}
          >
            Explore the pre-licensing education path →
          </Link>
        </div>

        <div
          style={{
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">DO NOT FORGET</p>

          <h2>The first license is not the last education expense.</h2>

          <p>
            Florida sales associates generally must complete 45 hours of
            approved post-licensing education before the expiration of their
            initial license period.
          </p>

          <p>
            After the first renewal, continuing-education requirements apply
            during later renewal periods. Renewal fees and future education
            costs should be considered part of the ongoing cost of maintaining
            a Florida real estate license.
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
            Continue planning your Florida licensing path.
          </h2>

          <p
            style={{
              color: "#4d4b46",
              maxWidth: "760px",
              marginBottom: "24px",
            }}
          >
            Review the full licensing process and learn how long the major steps
            may take.
          </p>

          <div
            style={{
              display: "grid",
              gap: "14px",
            }}
          >
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

        <div
          style={{
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">COMMON QUESTIONS</p>

          <h2
            style={{
              marginBottom: "36px",
            }}
          >
            Florida real estate license cost FAQ
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
            background: "#eee6d9",
            border: "1px solid rgba(17, 23, 23, 0.14)",
            padding: "clamp(34px, 6vw, 58px)",
            textAlign: "center",
          }}
        >
          <p className="eyebrow">PLAN YOUR NEXT STEP</p>

          <h2
            style={{
              maxWidth: "720px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Explore Greyson Institute’s real estate education paths.
          </h2>

          <p
            style={{
              color: "#4d4b46",
              maxWidth: "700px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Review education paths for pre-licensing, post-license, continuing
            education, broker education, reactivation, and exam preparation.
          </p>

          <div
            className="button-row"
            style={{
              justifyContent: "center",
            }}
          >
            <Link className="button" href="/courses">
              Explore Courses
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
