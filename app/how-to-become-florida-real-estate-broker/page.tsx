import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GuideStructuredData } from "@/components/GuideStructuredData";

export const metadata: Metadata = {
  title: "How to Become a Florida Real Estate Broker",
  description:
    "Learn the Florida real estate broker path, including experience requirements, broker pre-license education, the broker exam, application steps, and first renewal requirements.",
};

const path = "/how-to-become-florida-real-estate-broker";

const steps = [
  ["01", "Meet the experience requirement", "Florida broker applicants generally must have the required real estate experience before applying for a broker license."],
  ["02", "Complete broker pre-license education", "Complete the approved Florida broker pre-license course before taking the broker examination."],
  ["03", "Submit your DBPR application", "Complete the application process, required screening steps, and receive authorization to take the exam."],
  ["04", "Pass the Florida broker exam", "Successfully complete the Florida Real Estate Broker Examination."],
  ["05", "Activate your broker license", "Complete the steps needed to practice as an active Florida broker."],
];

export default function BrokerPathPage() {
  return (
    <section className="page-hero" style={{ paddingBottom: "100px" }}>
      <GuideStructuredData
        title="How to Become a Florida Real Estate Broker"
        description={metadata.description as string}
        path={path}
      />
      <div className="container" style={{ maxWidth: "1040px", minWidth: 0 }}>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Guides", href: "/guides" }, { label: "Broker Path", href: path, current: true }]} />

        <div style={{ maxWidth: "860px", marginBottom: "70px" }}>
          <p className="eyebrow">FLORIDA BROKER PATH</p>
          <h1>How to Become a Florida Real Estate Broker</h1>
          <p className="page-lead">
            Advance your real estate career with a clear path from sales associate to Florida broker.
            Understand the experience, education, application, exam, and first-renewal steps.
          </p>
        </div>

        <div style={{ background: "#eee6d9", padding: "clamp(30px, 5vw, 48px)", marginBottom: "70px" }}>
          <p className="eyebrow">QUICK ANSWER</p>
          <h2>Experience → Broker Education → Application → Exam → License</h2>
          <p style={{ color: "#4d4b46" }}>
            Florida brokers follow a different path than first-time sales associates. Greyson helps you understand each step before you move forward.
          </p>
        </div>

        <div style={{ marginBottom: "80px" }}>
          <p className="eyebrow">THE BROKER JOURNEY</p>
          {steps.map((step) => (
            <div key={step[0]} style={{ borderTop: "1px solid rgba(17,23,23,.16)", padding: "28px 0" }}>
              <span style={{ color: "#7d5f3a", letterSpacing: ".15em", fontSize: ".7rem" }}>{step[0]}</span>
              <h2>{step[1]}</h2>
              <p style={{ color: "#5f5c56" }}>{step[2]}</p>
            </div>
          ))}
        </div>

        <div style={{ background: "#1f2d30", color: "#f5f0e7", padding: "clamp(34px, 6vw, 60px)", marginBottom: "80px" }}>
          <p className="eyebrow eyebrow--light">FIRST BROKER RENEWAL</p>
          <h2 className="light-heading">Your first broker renewal is different.</h2>
          <p style={{ color: "rgba(245,240,231,.8)" }}>
            Before your first broker renewal, Florida brokers generally complete 60 hours of broker post-license education. Later renewals move to the regular continuing-education cycle.
          </p>
          <Link className="button" href="/florida-60-hour-broker-post-license-requirements">Understand the 60-Hour Requirement →</Link>
        </div>

        <div style={{ border: "1px solid rgba(17,23,23,.16)", padding: "clamp(28px,5vw,42px)" }}>
          <p className="eyebrow">READY TO ADVANCE?</p>
          <h2>Find your Florida broker path.</h2>
          <p style={{ color: "#5f5c56" }}>
            Use Greyson&apos;s path finder to understand your current license status and likely next education step.
          </p>
          <Link className="button" href="/find-my-path">Find My Exact Path →</Link>
        </div>
      </div>
    </section>
  );
}
