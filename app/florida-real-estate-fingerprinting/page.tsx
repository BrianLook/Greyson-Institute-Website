import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GuideStructuredData } from "@/components/GuideStructuredData";

const guideTitle = "Florida Real Estate License Fingerprinting: Where & How";
const guideDescription =
  "Learn where to get Florida real estate license fingerprints, the correct FL920010Z ORI, how to choose an FDLE-registered LiveScan provider, what to bring, and how to track submission.";
const guidePath = "/florida-real-estate-fingerprinting";

export const metadata: Metadata = {
  title: "Florida Real Estate Fingerprinting | ORI FL920010Z",
  description: guideDescription,
};

const steps = [
  {
    number: "01",
    title: "Submit your DBPR license application",
    description:
      "Florida DBPR currently instructs new applicants to submit their license application first, then arrange electronic fingerprint submission promptly afterward. Do not delay fingerprinting once you apply.",
  },
  {
    number: "02",
    title: "Find a registered LiveScan provider",
    description:
      "Choose a provider on the Florida Department of Law Enforcement (FDLE) LiveScan list. Before booking, ask whether they can electronically submit for DBPR Real Estate Sales and Brokers using ORI FL920010Z. Not every fingerprinting location offers this service.",
  },
  {
    number: "03",
    title: "Bring your ID and correct ORI number",
    description:
      "DBPR requires two forms of identification, including one with your photo and signature. Give the provider the correct ORI number, confirm the complete price, and ask how they will transmit the results.",
  },
  {
    number: "04",
    title: "Keep your fingerprint receipt and TCN",
    description:
      "Keep the receipt and Transaction Control Number (TCN) from the provider. FDLE sends the results to DBPR, typically within several business days. The TCN can be used to check the transaction status.",
  },
];

const questions = [
  {
    question: "What is the Florida real estate fingerprint ORI?",
    answer:
      "FL920010Z is DBPR's ORI for Real Estate Sales and Brokers. It is not the ORI for real estate appraisers or for other professional licenses.",
  },
  {
    question: "Can I go to any police station, UPS Store, or fingerprinting company?",
    answer:
      "Not automatically. Some locations only take fingerprint cards or submit background checks for a different agency. Ask whether they provide electronic FDLE LiveScan submission for Florida DBPR real estate licensing using ORI FL920010Z before paying.",
  },
  {
    question: "How much does Florida real estate fingerprinting cost?",
    answer:
      "The fee varies by provider and may include background-check processing and service charges. Ask for the full price for ORI FL920010Z before booking. Greyson does not collect fingerprint fees.",
  },
  {
    question: "When should I get fingerprinted?",
    answer:
      "DBPR's current fingerprinting guidance says to submit your license application first and arrange LiveScan fingerprints immediately afterward. Your results may take several business days to reach DBPR.",
  },
  {
    question: "Can I complete Florida fingerprinting while out of state?",
    answer:
      "DBPR directs out-of-state applicants to an FDLE-registered LiveScan provider that can accept fingerprint cards for electronic submission. Contact the provider before obtaining or mailing cards; ask about approved procedures and fees.",
  },
  {
    question: "Can Greyson take or process my fingerprints?",
    answer:
      "No. Greyson Institute provides guidance and links to third-party providers. The fingerprinting provider collects and submits your biometric information directly; Greyson does not receive or store fingerprints or background-check results.",
  },
];

const officialLinks = [
  {
    title: "Florida DBPR fingerprinting instructions",
    description: "Official rules, ORI numbers, accepted methods, ID requirements, and timing",
    url: "https://www2.myfloridalicense.com/fingerprinting/",
  },
  {
    title: "Find a registered LiveScan provider",
    description: "Statewide FDLE provider list and current fingerprinting information",
    url: "https://www.fdle.state.fl.us/criminal-history-records/registered-livescan-submitters",
  },
  {
    title: "Check your fingerprint submission",
    description: "Look up a transaction by its TCN after the provider submits it",
    url: "https://web.fdle.state.fl.us/search/app/tcnlookup",
  },
];

export default function FloridaRealEstateFingerprintingPage() {
  return (
    <section className="page-hero" style={{ paddingBottom: "100px" }}>
      <GuideStructuredData
        title={guideTitle}
        description={guideDescription}
        path={guidePath}
        datePublished="2026-11-13"
        dateModified="2026-11-13"
      />
      <div className="container" style={{ maxWidth: "1040px", minWidth: 0 }}>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Guides", href: "/guides" },
            { label: "Florida Real Estate Fingerprinting", href: guidePath, current: true },
          ]}
        />

        <div style={{ maxWidth: "900px", marginBottom: "52px" }}>
          <p className="eyebrow">FLORIDA REAL ESTATE LICENSING</p>
          <h1>Where Do I Get Fingerprinted for My Florida Real Estate License?</h1>
          <p className="page-lead" style={{ maxWidth: "820px" }}>
            Getting your fingerprints taken should not be confusing. Here is
            how to find the right provider, make sure your results go to
            Florida DBPR, and avoid paying for the wrong fingerprinting service.
          </p>
          <p className="muted">Last reviewed: November 13, 2026</p>
        </div>

        <div
          style={{
            background: "#eee6d9",
            border: "1px solid rgba(17, 23, 23, 0.16)",
            padding: "clamp(30px, 5vw, 48px)",
            marginBottom: "42px",
          }}
        >
          <p className="eyebrow" style={{ marginBottom: "14px" }}>
            THE NUMBER TO BRING TO YOUR APPOINTMENT
          </p>
          <h2 style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)", letterSpacing: "0.025em", marginBottom: "12px" }}>
            FL920010Z
          </h2>
          <p style={{ maxWidth: "790px", margin: 0, lineHeight: 1.75, color: "#4d4b46" }}>
            This is the official <strong>Originating Agency Identification
            (ORI)</strong> for Florida <strong>Real Estate Sales and Brokers</strong>.
            It tells FDLE where the results should be sent. The wrong ORI can
            prevent DBPR from receiving your fingerprints.
          </p>
        </div>

        <div style={{ marginBottom: "68px" }}>
          <p className="eyebrow">YOUR FIRST STEP</p>
          <h2 style={{ maxWidth: "850px", marginBottom: "18px" }}>
            Find an FDLE-registered electronic fingerprinting provider.
          </h2>
          <p style={{ color: "#4d4b46", maxWidth: "840px", lineHeight: 1.75 }}>
            Use the Florida Department of Law Enforcement&apos;s current
            LiveScan provider list. You can choose a location near home or
            work, but confirm the provider submits directly for DBPR real
            estate licensing—not just a fingerprint card or a background check
            for a different license.
          </p>
          <a
            href="https://www.fdle.state.fl.us/criminal-history-records/registered-livescan-submitters"
            target="_blank"
            rel="noopener noreferrer"
            className="button"
            style={{ marginTop: "12px" }}
          >
            Find a Registered LiveScan Provider ↗
          </a>
          <p style={{ fontSize: "0.87rem", color: "#6e6b65", marginTop: "15px", lineHeight: 1.65 }}>
            This link opens the official FDLE website. Provider fees and availability vary.
          </p>
        </div>

        <div style={{ marginBottom: "76px" }}>
          <p className="eyebrow">HOW IT WORKS</p>
          <h2 style={{ maxWidth: "840px", marginBottom: "28px" }}>
            Four simple steps to get your real estate fingerprints done.
          </h2>
          <div style={{ borderTop: "1px solid rgba(17, 23, 23, 0.18)" }}>
            {steps.map((step) => (
              <article
                key={step.number}
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(52px, 75px) minmax(0, 1fr)",
                  gap: "22px",
                  padding: "26px 0",
                  borderBottom: "1px solid rgba(17, 23, 23, 0.18)",
                }}
              >
                <span style={{ color: "#7d5f3a", letterSpacing: "0.14em", fontWeight: 700 }}>
                  {step.number}
                </span>
                <div>
                  <h3 style={{ fontSize: "clamp(1.4rem, 3vw, 1.9rem)", marginBottom: "10px" }}>
                    {step.title}
                  </h3>
                  <p style={{ color: "#4d4b46", lineHeight: 1.7, margin: 0 }}>
                    {step.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div
          style={{
            background: "#1f2d30",
            color: "#f5f0e7",
            padding: "clamp(30px, 5vw, 50px)",
            marginBottom: "74px",
          }}
        >
          <p className="eyebrow eyebrow--light">BEFORE YOU BOOK</p>
          <h2 className="light-heading">Ask the fingerprinting provider these four questions.</h2>
          <ul style={{ margin: "20px 0 0", paddingLeft: "22px", lineHeight: 1.9, color: "#f5f0e7" }}>
            <li>Can you submit electronically to FDLE for Florida DBPR Real Estate Sales and Brokers?</li>
            <li>Can you process the ORI number <strong>FL920010Z</strong>?</li>
            <li>What is the <strong>total price</strong>, including government and service fees?</li>
            <li>Will I receive a receipt and <strong>TCN</strong> to track the submission?</li>
          </ul>
        </div>

        <div style={{ marginBottom: "74px" }}>
          <p className="eyebrow">SPACE COAST EXAMPLE</p>
          <h2 style={{ maxWidth: "850px" }}>Looking in Brevard County?</h2>
          <p style={{ maxWidth: "870px", lineHeight: 1.75, color: "#4d4b46" }}>
            Several providers advertise LiveScan appointments in Cocoa,
            Rockledge/Viera, Merritt Island, and Melbourne. One example is
            A1A Fingerprints &amp; Mobile Fingerprinting, which advertises
            services for DBPR and real estate applicants. Check its current
            locations and call to confirm the ORI, appointment, and fee before
            booking. Greyson has no confirmed discount or referral arrangement
            with this provider.
          </p>
          <a
            href="https://www.a1afingerprints.com/brevard-county"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-block", fontWeight: 700, textDecoration: "underline", textUnderlineOffset: "4px", marginTop: "8px" }}
          >
            View an example of Brevard LiveScan locations ↗
          </a>
          <p style={{ color: "#6e6b65", fontSize: "0.88rem", marginTop: "16px", maxWidth: "850px", lineHeight: 1.7 }}>
            The provider above is an informational example, not an exclusive
            recommendation. You may choose any suitable FDLE-registered
            provider anywhere in Florida.
          </p>
        </div>

        <div style={{ marginBottom: "70px" }}>
          <p className="eyebrow">COMMON QUESTIONS</p>
          <h2 style={{ marginBottom: "24px" }}>Florida real estate fingerprinting FAQ</h2>
          <div style={{ borderTop: "1px solid rgba(17, 23, 23, 0.16)" }}>
            {questions.map((item) => (
              <details
                key={item.question}
                style={{
                  borderBottom: "1px solid rgba(17, 23, 23, 0.16)",
                  padding: "22px 0",
                }}
              >
                <summary
                  style={{
                    cursor: "pointer",
                    fontFamily: "var(--font-serif), Georgia, serif",
                    fontSize: "clamp(1.3rem, 2.6vw, 1.65rem)",
                    lineHeight: 1.35,
                  }}
                >
                  {item.question}
                </summary>
                <p style={{ marginBottom: 0, color: "#4d4b46", lineHeight: 1.75, maxWidth: "850px" }}>
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
            padding: "clamp(28px, 5vw, 46px)",
            marginBottom: "56px",
          }}
        >
          <p className="eyebrow">OFFICIAL RESOURCES</p>
          <h2 style={{ marginBottom: "24px" }}>Keep these three links handy.</h2>
          <div style={{ display: "grid", gap: "24px" }}>
            {officialLinks.map((item) => (
              <div key={item.url}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontWeight: 700, textDecoration: "underline", textUnderlineOffset: "4px" }}
                >
                  {item.title} ↗
                </a>
                <p style={{ color: "#5b5a55", margin: "6px 0 0", lineHeight: 1.65 }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ maxWidth: "860px", borderTop: "1px solid rgba(17, 23, 23, 0.18)", paddingTop: "30px" }}>
          <p className="eyebrow">YOUR LICENSING PATH</p>
          <h2>Need help with the other steps?</h2>
          <p style={{ color: "#4d4b46", lineHeight: 1.75 }}>
            Greyson can help you understand the required 63-hour course, the
            DBPR application, and the state licensing exam. Fingerprinting
            and background checks are performed by independent providers and
            government agencies—not Greyson Institute.
          </p>
          <div className="button-row" style={{ marginTop: "22px" }}>
            <Link href="/how-to-get-a-florida-real-estate-license" className="button">
              See All Licensing Steps →
            </Link>
            <Link href="/florida-63-hour-real-estate-pre-licensing-course#choose-pre-license-package" className="text-link">
              Compare 63-Hour Courses →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
