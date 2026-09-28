import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GuideStructuredData } from "@/components/GuideStructuredData";

export const metadata: Metadata = {
  title: "How to Become a Florida Real Estate Broker",
  description:
    "Learn the Florida real estate broker requirements, including age, education, experience, broker pre-license education, fingerprints, application, exam, and first-renewal requirements.",
};

const path = "/how-to-become-florida-real-estate-broker";

const eligibility = [
  {
    title: "Be at least 18 years old",
    body:
      "Florida broker applicants must be at least 18 years of age.",
  },
  {
    title: "Have a high school diploma or equivalent",
    body:
      "DBPR requires a high school diploma or its equivalent for broker licensure.",
  },
  {
    title: "Have a U.S. Social Security number",
    body:
      "A United States Social Security number is required to apply.",
  },
  {
    title: "Meet the broker experience requirement",
    body:
      "The standard path requires at least 24 active months of qualifying real estate experience during the five years immediately before becoming licensed as a broker.",
  },
  {
    title: "Complete sales associate post-license education when required",
    body:
      "A Florida sales associate must satisfy the sales associate post-license requirement before becoming eligible to obtain a Florida broker license.",
  },
];

const journey = [
  {
    number: "01",
    title: "Confirm your experience",
    body:
      "The common Florida upgrade path is 24 active months as a sales associate during the preceding five years under one or more brokers. DBPR also recognizes certain qualifying governmental and out-of-state experience.",
  },
  {
    number: "02",
    title: "Complete the 72-hour broker pre-license course",
    body:
      "Before sitting for the broker exam, complete a FREC-approved 72-hour Florida broker pre-license course. DBPR states that the course completion is valid for two years.",
  },
  {
    number: "03",
    title: "Submit the broker application and fingerprints",
    body:
      "Complete the DBPR RE 2 broker application, pay the required application fee, submit electronic fingerprints, and provide any supporting documentation that applies to your history or qualification route.",
  },
  {
    number: "04",
    title: "Receive authorization and pass the broker exam",
    body:
      "After DBPR approves the application, follow the examination-vendor instructions and pass the Florida broker examination.",
  },
  {
    number: "05",
    title: "Activate the broker license",
    body:
      "After passing the exam, complete the appropriate DBPR activation or registration steps for the way you intend to practice.",
  },
];

export default function BrokerPathPage() {
  return (
    <section
      className="page-hero"
      style={{
        paddingBottom: "100px",
      }}
    >
      <GuideStructuredData
        title="How to Become a Florida Real Estate Broker"
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
              label: "Broker Path",
              href: path,
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
          <p className="eyebrow">FLORIDA BROKER PATH</p>

          <h1
            style={{
              overflowWrap: "anywhere",
            }}
          >
            How to Become a Florida Real Estate Broker
          </h1>

          <p className="page-lead">
            Moving from sales associate to broker requires more than taking a
            class. Florida looks at your age, education, experience,
            post-license history, broker pre-license education, application,
            fingerprints, and examination.
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
              maxWidth: "840px",
              overflowWrap: "anywhere",
            }}
          >
            For the standard Florida upgrade path, the key experience number is
            24 active months during the preceding 5 years.
          </h2>

          <p
            style={{
              color: "#4d4b46",
              maxWidth: "820px",
              marginBottom: 0,
              lineHeight: 1.75,
            }}
          >
            Once you meet the eligibility requirements, you complete the
            required broker education, application and screening steps, pass
            the broker examination, and activate the new license.
          </p>
        </div>

        <div
          style={{
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">BEFORE YOU APPLY</p>

          <h2
            style={{
              maxWidth: "760px",
              marginBottom: "34px",
            }}
          >
            Florida broker eligibility checklist
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
              borderTop: "1px solid rgba(17, 23, 23, 0.16)",
              borderLeft: "1px solid rgba(17, 23, 23, 0.16)",
            }}
          >
            {eligibility.map((item) => (
              <article
                key={item.title}
                style={{
                  padding: "28px",
                  borderRight: "1px solid rgba(17, 23, 23, 0.16)",
                  borderBottom: "1px solid rgba(17, 23, 23, 0.16)",
                  minHeight: "220px",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.55rem",
                    marginBottom: "12px",
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    color: "#5f5c56",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div
          style={{
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">THE BROKER JOURNEY</p>

          {journey.map((step) => (
            <article
              key={step.number}
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
                {step.number}
              </span>

              <div style={{ minWidth: 0 }}>
                <h2
                  style={{
                    fontSize: "clamp(1.9rem, 4vw, 2.8rem)",
                    marginBottom: "12px",
                    overflowWrap: "anywhere",
                  }}
                >
                  {step.title}
                </h2>

                <p
                  style={{
                    color: "#5f5c56",
                    lineHeight: 1.75,
                    margin: 0,
                    maxWidth: "820px",
                  }}
                >
                  {step.body}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div
          style={{
            border: "1px solid rgba(17, 23, 23, 0.16)",
            padding: "clamp(28px, 5vw, 42px)",
            marginBottom: "28px",
          }}
        >
          <p className="eyebrow">EDUCATION EXEMPTION</p>

          <h2>A qualifying real estate degree can change the course requirement.</h2>

          <p
            style={{
              color: "#5f5c56",
              maxWidth: "820px",
              lineHeight: 1.75,
            }}
          >
            DBPR states that an applicant with a four-year degree or higher in
            real estate may be exempt from the 72-hour broker pre-license
            course. Official transcripts are used to document the exemption.
          </p>
        </div>

        <div
          style={{
            border: "1px solid rgba(17, 23, 23, 0.16)",
            padding: "clamp(28px, 5vw, 42px)",
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow">OUT-OF-STATE EXPERIENCE</p>

          <h2>Qualifying experience does not always have to be from Florida.</h2>

          <p
            style={{
              color: "#5f5c56",
              maxWidth: "820px",
              lineHeight: 1.75,
            }}
          >
            DBPR allows certain qualifying sales associate or broker experience
            from another state, U.S. jurisdiction, or foreign national
            jurisdiction to count toward the broker experience requirement.
            Applicants claiming experience outside Florida generally need a
            current certification of license history from the licensing
            authority.
          </p>
        </div>

        <div
          style={{
            background: "#1f2d30",
            color: "#f5f0e7",
            padding: "clamp(34px, 6vw, 60px)",
            marginBottom: "82px",
          }}
        >
          <p className="eyebrow eyebrow--light">FIRST BROKER RENEWAL</p>

          <h2
            className="light-heading"
            style={{
              maxWidth: "760px",
            }}
          >
            Your first broker renewal is different.
          </h2>

          <p
            style={{
              color: "rgba(245, 240, 231, 0.82)",
              maxWidth: "820px",
              lineHeight: 1.75,
            }}
          >
            Florida brokers and broker associates generally complete 60 hours
            of broker post-license education before the first broker renewal.
            After the first renewal cycle, the regular continuing-education
            requirements apply.
          </p>

          <Link
            className="button"
            href="/florida-60-hour-broker-post-license-requirements"
          >
            Understand the 60-Hour Requirement →
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: "20px",
          }}
        >
          <div
            style={{
              border: "1px solid rgba(17, 23, 23, 0.16)",
              padding: "clamp(28px, 5vw, 42px)",
            }}
          >
            <p className="eyebrow">OFFICIAL APPLICATION</p>

            <h2>Verify the current DBPR requirements before applying.</h2>

            <p
              style={{
                color: "#5f5c56",
                lineHeight: 1.75,
              }}
            >
              Application requirements and fees can change. Use Florida DBPR
              for the current RE 2 application instructions and official
              submission requirements.
            </p>

            <a
              className="text-link"
              href="https://www.myfloridalicense.com/intentions2.asp?SID=&boardid=25&chBoard=true&professionid=25B"
              target="_blank"
              rel="noopener noreferrer"
            >
              View DBPR broker applications <span>↗</span>
            </a>
          </div>

          <div
            style={{
              border: "1px solid rgba(17, 23, 23, 0.16)",
              padding: "clamp(28px, 5vw, 42px)",
            }}
          >
            <p className="eyebrow">CURRENT LICENSE</p>

            <h2>Start with the license you have today.</h2>

            <p
              style={{
                color: "#5f5c56",
                lineHeight: 1.75,
              }}
            >
              Find My Exact Path can check your current Florida DBPR record and
              help you understand the education requirement that most likely
              applies right now.
            </p>

            <Link
              className="button"
              href="/find-my-path"
            >
              Find My Exact Path →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
