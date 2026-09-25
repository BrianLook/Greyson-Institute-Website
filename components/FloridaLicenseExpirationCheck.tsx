import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FloridaLicenseExpirationCheck } from "@/components/FloridaLicenseExpirationCheck";

const pageTitle =
  "Check Your Florida Real Estate License Expiration";

const pageDescription =
  "Check when your Florida real estate license expires, verify your live license record with Florida DBPR, and understand which education requirement may apply before your renewal deadline.";

const pagePath =
  "/check-florida-real-estate-license-expiration";

const baseUrl =
  "https://greysoninstitute.com";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${baseUrl}${pagePath}#webpage`,
  url: `${baseUrl}${pagePath}`,
  name: pageTitle,
  description: pageDescription,
  isPartOf: {
    "@id": `${baseUrl}/#website`,
  },
  about: {
    "@id": `${baseUrl}/#organization`,
  },
};

const renewalPaths = [
  {
    eyebrow: "FIRST RENEWAL",
    title: "Florida Sales Associate",
    requirement:
      "45-hour post-license education",
    description:
      "If this is the first renewal after receiving your Florida sales associate license, the standard requirement is 45 hours of approved post-license education before the initial license expires.",
    href: "/florida-45-hour-post-license-requirements",
    linkText:
      "Understand the 45-hour requirement",
  },
  {
    eyebrow: "FIRST RENEWAL",
    title:
      "Florida Broker or Broker Associate",
    requirement:
      "60-hour broker post-license education",
    description:
      "Florida brokers and broker associates completing their first renewal generally must complete 60 hours of approved broker post-license education before the initial license expires.",
    href: "/courses#broker",
    linkText:
      "Explore the broker education path",
  },
  {
    eyebrow: "LATER RENEWALS",
    title:
      "Current Florida License",
    requirement:
      "14-hour continuing education",
    description:
      "After the initial post-license renewal, active Florida real estate licensees generally move into the regular 14-hour continuing-education cycle.",
    href: "/florida-14-hour-real-estate-continuing-education",
    linkText:
      "Understand the 14-hour CE requirement",
  },
];

export default function FloridaLicenseExpirationPage() {
  return (
    <section
      className="page-hero"
      style={{
        paddingBottom: "100px",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              pageSchema,
            ),
        }}
      />

      <style>
        {`
          .license-path-card {
            border: 1px solid rgba(17, 23, 23, 0.16);
            padding: 30px;
            min-width: 0;
            background: transparent;
            transition:
              transform 0.2s ease,
              background-color 0.2s ease,
              box-shadow 0.2s ease;
          }

          .license-path-link {
            display: inline-block;
            margin-top: 18px;
            font-weight: 600;
            text-decoration: underline;
            text-underline-offset: 4px;
          }

          .license-warning-box {
            border: 1px solid rgba(17, 23, 23, 0.16);
            padding: clamp(28px, 5vw, 42px);
          }

          .education-path-buttons {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 14px;
            margin-top: 30px;
          }

          .education-path-button {
            min-height: 50px;
            padding: 0 22px;
            border: 1px solid #111717;
            background: #faf7f1;
            color: #111717;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-weight: 650;
            letter-spacing: 0.03em;
            text-align: center;
            text-decoration: none;
            transition:
              background-color 0.2s ease,
              color 0.2s ease,
              transform 0.2s ease,
              box-shadow 0.2s ease;
          }

          @media (hover: hover) and (pointer: fine) {
            .license-path-card:hover {
              transform: translateY(-4px);
              background: #ffffff;
              box-shadow:
                0 18px 42px
                rgba(17, 23, 23, 0.08);
            }

            .education-path-button:hover {
              background: #111717;
              color: #f5f0e7;
              transform: translateY(-2px);
              box-shadow:
                0 10px 24px
                rgba(17, 23, 23, 0.12);
            }
          }

          @media (max-width: 600px) {
            .education-path-buttons {
              display: grid;
              grid-template-columns: 1fr;
            }

            .education-path-button {
              width: 100%;
            }
          }
        `}
      </style>

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
              label:
                "License Expiration Check",
              href: pagePath,
              current: true,
            },
          ]}
        />

        <div
          style={{
            maxWidth: "880px",
            marginBottom:
              "64px",
          }}
        >
          <p className="eyebrow">
            FLORIDA LICENSE RENEWAL TOOL
          </p>

          <h1
            style={{
              overflowWrap:
                "anywhere",
            }}
          >
            Check Your Florida Real Estate
            License Expiration
          </h1>

          <p
            className="page-lead"
            style={{
              maxWidth:
                "800px",
            }}
          >
            Find the expiration date on your
            official Florida real estate
            license record, then understand
            what education may be required
            before that deadline.
          </p>

          <p
            style={{
              color:
                "#6e6b65",
              maxWidth:
                "780px",
              marginBottom:
                0,
            }}
          >
            Florida real estate licenses
            generally renew on March 31 or
            September 30. Your exact expiration
            date and current license status
            should always be confirmed on the
            official Florida DBPR record.
          </p>
        </div>

        <div
          style={{
            marginBottom:
              "84px",
          }}
        >
          <FloridaLicenseExpirationCheck />
        </div>

        <div
          style={{
            marginBottom:
              "84px",
          }}
        >
          <p className="eyebrow">
            AFTER YOU CHECK YOUR LICENSE
          </p>

          <h2
            style={{
              maxWidth:
                "820px",
              marginBottom:
                "18px",
            }}
          >
            Write down three things from the
            DBPR record.
          </h2>

          <p
            style={{
              color:
                "#4d4b46",
              maxWidth:
                "810px",
              marginBottom:
                "34px",
            }}
          >
            Your expiration date is important,
            but it does not by itself tell you
            which course you need. Your license
            type, current status, and whether
            this is your first renewal also
            matter.
          </p>

          <div
            style={{
              display:
                "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
              borderTop:
                "1px solid rgba(17, 23, 23, 0.18)",
              borderLeft:
                "1px solid rgba(17, 23, 23, 0.18)",
            }}
          >
            {[
              {
                number: "01",
                title:
                  "License type",
                text:
                  "Sales Associate, Broker, or Broker Associate.",
              },
              {
                number: "02",
                title:
                  "Current status",
                text:
                  "For example, current/active, inactive, or involuntarily inactive.",
              },
              {
                number: "03",
                title:
                  "Expiration date",
                text:
                  "The date shown on your current official DBPR license record.",
              },
              {
                number: "04",
                title:
                  "Renewal history",
                text:
                  "Determine whether this is your first renewal or you have renewed before.",
              },
            ].map(
              (item) => (
                <div
                  key={
                    item.number
                  }
                  style={{
                    padding:
                      "28px",
                    minHeight:
                      "190px",
                    borderRight:
                      "1px solid rgba(17, 23, 23, 0.18)",
                    borderBottom:
                      "1px solid rgba(17, 23, 23, 0.18)",
                  }}
                >
                  <p className="eyebrow">
                    {item.number}
                  </p>

                  <h3
                    style={{
                      fontSize:
                        "1.45rem",
                      marginBottom:
                        "10px",
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    style={{
                      color:
                        "#5f5c56",
                      margin: 0,
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>

        <div
          style={{
            background:
              "#1f2d30",
            color:
              "#f5f0e7",
            padding:
              "clamp(36px, 6vw, 62px)",
            marginBottom:
              "84px",
          }}
        >
          <p className="eyebrow eyebrow--light">
            WHAT DOES MY DATE MEAN?
          </p>

          <h2
            className="light-heading"
            style={{
              maxWidth:
                "820px",
            }}
          >
            Your education requirement depends
            on where you are in the renewal
            cycle.
          </h2>

          <p
            style={{
              color:
                "rgba(245, 240, 231, 0.82)",
              maxWidth:
                "830px",
              marginBottom:
                0,
            }}
          >
            Do not automatically assume you
            need 14-hour continuing education.
            A newly licensed sales associate
            may need 45-hour post-license
            education, a newly licensed broker
            may need 60-hour post-license
            education, and an inactive license
            can have different reactivation
            requirements.
          </p>
        </div>

        <div
          style={{
            marginBottom:
              "84px",
          }}
        >
          <p className="eyebrow">
            COMMON RENEWAL PATHS
          </p>

          <h2
            style={{
              maxWidth:
                "820px",
              marginBottom:
                "38px",
            }}
          >
            Which situation sounds like yours?
          </h2>

          <div
            style={{
              display:
                "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 290px), 1fr))",
              gap: "18px",
            }}
          >
            {renewalPaths.map(
              (path) => (
                <div
                  className="license-path-card"
                  key={
                    path.title
                  }
                >
                  <p className="eyebrow">
                    {
                      path.eyebrow
                    }
                  </p>

                  <h3
                    style={{
                      fontSize:
                        "clamp(1.55rem, 3vw, 2rem)",
                      marginBottom:
                        "8px",
                    }}
                  >
                    {
                      path.title
                    }
                  </h3>

                  <p
                    style={{
                      fontWeight:
                        700,
                      color:
                        "#7d5f3a",
                      marginBottom:
                        "14px",
                    }}
                  >
                    {
                      path.requirement
                    }
                  </p>

                  <p
                    style={{
                      color:
                        "#4d4b46",
                      margin: 0,
                    }}
                  >
                    {
                      path.description
                    }
                  </p>

                  <Link
                    className="license-path-link"
                    href={
                      path.href
                    }
                  >
                    {
                      path.linkText
                    }{" "}
                    →
                  </Link>
                </div>
              ),
            )}
          </div>
        </div>

        <div
          style={{
            background:
              "#eee6d9",
            border:
              "1px solid rgba(17, 23, 23, 0.14)",
            padding:
              "clamp(32px, 5vw, 50px)",
            marginBottom:
              "84px",
          }}
        >
          <p className="eyebrow">
            FIRST RENEWAL?
          </p>

          <h2
            style={{
              fontSize:
                "clamp(2rem, 4vw, 3rem)",
              maxWidth:
                "820px",
            }}
          >
            This is the question that prevents
            the biggest mistake.
          </h2>

          <p
            style={{
              color:
                "#4d4b46",
              maxWidth:
                "830px",
            }}
          >
            If you have never renewed this
            Florida license before, do not
            automatically enroll in a 14-hour
            CE course.
          </p>

          <p
            style={{
              color:
                "#4d4b46",
              maxWidth:
                "830px",
            }}
          >
            A sales associate completing the
            first renewal generally needs
            45-hour post-license education. A
            broker or broker associate
            completing the first renewal
            generally needs 60 hours of broker
            post-license education.
          </p>

          <p
            style={{
              color:
                "#4d4b46",
              maxWidth:
                "830px",
              marginBottom:
                0,
            }}
          >
            Missing the applicable first-renewal
            post-license requirement by the
            license expiration date can result
            in the license becoming null and
            void.
          </p>
        </div>

        <div
          style={{
            marginBottom:
              "84px",
          }}
        >
          <p className="eyebrow">
            INVOLUNTARILY INACTIVE?
          </p>

          <h2
            style={{
              maxWidth:
                "820px",
            }}
          >
            Reactivation rules depend on how
            long the license has been inactive.
          </h2>

          <p
            style={{
              maxWidth:
                "830px",
            }}
          >
            Florida law provides different
            reactivation requirements depending
            on the length of involuntary
            inactivity.
          </p>

          <div
            style={{
              display:
                "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
              gap: "18px",
              marginTop:
                "30px",
            }}
          >
            <div className="license-warning-box">
              <p className="eyebrow">
                12 MONTHS OR LESS
              </p>

              <h3
                style={{
                  fontSize:
                    "1.6rem",
                  marginBottom:
                    "12px",
                }}
              >
                At least 14 hours
              </h3>

              <p
                style={{
                  color:
                    "#4d4b46",
                  margin: 0,
                }}
              >
                Florida law provides for
                reactivation of a license
                involuntarily inactive for 12
                months or less after completing
                at least 14 hours of
                Commission-prescribed continuing
                education, along with applicable
                renewal requirements.
              </p>
            </div>

            <div className="license-warning-box">
              <p className="eyebrow">
                MORE THAN 12, FEWER THAN 24
                MONTHS
              </p>

              <h3
                style={{
                  fontSize:
                    "1.6rem",
                  marginBottom:
                    "12px",
                }}
              >
                28-hour reactivation education
              </h3>

              <p
                style={{
                  color:
                    "#4d4b46",
                  margin: 0,
                }}
              >
                A license involuntarily inactive
                for more than 12 months but fewer
                than 24 months generally requires
                28 hours of prescribed
                reactivation education plus
                applicable renewal requirements.
              </p>
            </div>
          </div>

          <div
            style={{
              marginTop:
                "18px",
              border:
                "1px solid rgba(17, 23, 23, 0.16)",
              padding:
                "28px",
              background:
                "#faf7f1",
            }}
          >
            <strong>
              More than two years involuntarily
              inactive?
            </strong>

            <p
              style={{
                color:
                  "#4d4b46",
                marginBottom:
                  0,
                marginTop:
                  "8px",
              }}
            >
              Florida law states that a license
              involuntarily inactive for more
              than two years automatically
              expires and becomes null and void.
              Do not purchase a normal 14-hour
              CE course based only on the old
              expiration date. Verify your
              record and next licensing path
              directly with DBPR.
            </p>
          </div>
        </div>

        <div
          style={{
            background:
              "#1f2d30",
            color:
              "#f5f0e7",
            padding:
              "clamp(34px, 6vw, 58px)",
            marginBottom:
              "84px",
          }}
        >
          <p className="eyebrow eyebrow--light">
            NO RECORD FOUND?
          </p>

          <h2
            className="light-heading"
            style={{
              maxWidth:
                "800px",
            }}
          >
            A missing result does not necessarily
            mean you were never licensed.
          </h2>

          <p
            style={{
              color:
                "rgba(245, 240, 231, 0.82)",
              maxWidth:
                "830px",
            }}
          >
            If you cannot locate your record,
            search again using your name and
            verify directly with Florida DBPR. A
            license that has become null and void
            requires a different path from a
            normal renewal.
          </p>

          <a
            href="https://www.myfloridalicense.com/portalsearches/VerifyLicensee"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color:
                "#f5f0e7",
              textDecoration:
                "underline",
              textUnderlineOffset:
                "4px",
              fontWeight:
                600,
            }}
          >
            Search the official Florida DBPR
            license database ↗
          </a>
        </div>

        <div
          style={{
            marginBottom:
              "84px",
          }}
        >
          <p className="eyebrow">
            IMPORTANT EXEMPTIONS
          </p>

          <h2
            style={{
              maxWidth:
                "820px",
            }}
          >
            Some licensees have different
            education requirements.
          </h2>

          <p>
            Florida DBPR currently states that
            an active Florida Bar member in good
            standing is exempt from the regular
            14-hour real estate
            continuing-education requirement.
          </p>

          <p>
            A qualifying four-year degree or
            higher in real estate from an
            accredited institution can provide
            an exemption from applicable
            post-license education when the
            required documentation is submitted
            to DBPR.
          </p>

          <p
            style={{
              color:
                "#6e6b65",
              fontSize:
                "0.92rem",
            }}
          >
            Exemptions should be confirmed with
            DBPR before relying on them for
            renewal.
          </p>
        </div>

        <div
          style={{
            border:
              "1px solid rgba(17, 23, 23, 0.18)",
            padding:
              "clamp(30px, 5vw, 48px)",
            marginBottom:
              "84px",
          }}
        >
          <p className="eyebrow">
            WHY VERIFY LIVE?
          </p>

          <h2
            style={{
              maxWidth:
                "800px",
            }}
          >
            DBPR is the official source for your
            current license record.
          </h2>

          <p
            style={{
              maxWidth:
                "820px",
              color:
                "#4d4b46",
            }}
          >
            Status changes, renewals, education
            reporting, and other updates can
            affect what appears on your license
            record. Greyson Institute can help
            you understand the education paths,
            but your official DBPR record
            controls your current license status
            and expiration date.
          </p>

          <a
            href="https://www.myfloridalicense.com/portalsearches/VerifyLicensee"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display:
                "inline-block",
              marginTop:
                "8px",
              textDecoration:
                "underline",
              textUnderlineOffset:
                "4px",
              fontWeight:
                600,
            }}
          >
            Verify your license with Florida
            DBPR ↗
          </a>
        </div>

        <div
          style={{
            background:
              "#eee6d9",
            border:
              "1px solid rgba(17, 23, 23, 0.14)",
            padding:
              "clamp(34px, 6vw, 58px)",
            textAlign:
              "center",
          }}
        >
          <p className="eyebrow">
            NOT SURE WHICH EDUCATION YOU NEED?
          </p>

          <h2
            style={{
              maxWidth:
                "760px",
              marginLeft:
                "auto",
              marginRight:
                "auto",
            }}
          >
            Use your DBPR record to choose the
            right education path.
          </h2>

          <p
            style={{
              color:
                "#4d4b46",
              maxWidth:
                "720px",
              marginLeft:
                "auto",
              marginRight:
                "auto",
            }}
          >
            Once you know your license type,
            status, expiration date, and whether
            this is your first renewal, Greyson
            Institute can help you understand
            what education path may apply.
          </p>

          <div className="education-path-buttons">
            <Link
              className="education-path-button"
              href="/courses"
            >
              Find Your Education Path
            </Link>

            <Link
              className="education-path-button"
              href="/contact"
            >
              Ask Greyson Institute
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
