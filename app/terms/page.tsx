import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Read the Greyson Institute Terms of Use covering website information, course enrollment, licensing requirements, third-party services, refunds, and intellectual property.",
};

export default function TermsPage() {
  return (
    <section className="page-hero">
      <div className="container narrow prose-card">
        <p className="eyebrow">LEGAL</p>

        <h1>Terms of Use</h1>

        <p className="page-lead">
          These Terms of Use govern your use of the Greyson Institute website
          and the information provided through it.
        </p>

        <p className="muted">
          Last updated: September 23, 2026
        </p>

        <h2>Website Information</h2>

        <p>
          Greyson Institute provides information about real estate education,
          licensing paths, course options, and related educational resources.
          Website content is intended for general informational and
          educational purposes.
        </p>

        <h2>Course Enrollment</h2>

        <p>
          Some courses, enrollment services, payments, student accounts, or
          completion services may be provided through third-party education
          platforms. Additional terms may apply when using those services.
        </p>

        <h2>Licensing Requirements</h2>

        <p>
          Real estate licensing and education requirements may change. Students
          are responsible for confirming that a course satisfies the
          requirements applicable to their license status and goals.
        </p>

        <h2>No Guarantee of Licensing or Exam Results</h2>

        <p>
          Completion of a course, study program, or exam-preparation resource
          does not guarantee passage of a licensing examination, issuance of a
          license, employment, income, or success in the real estate industry.
        </p>

        <h2>Third-Party Services</h2>

        <p>
          Greyson Institute may provide links to third-party websites or
          platforms. Those services are governed by their own terms, policies,
          and procedures. Greyson Institute is not responsible for the
          availability or operation of third-party services.
        </p>

        <h2>Refunds and Course Policies</h2>

        <p>
          Refund, cancellation, access, completion, and student-support
          policies may vary by course or provider. Applicable policies will be
          displayed before enrollment or provided through the course platform.
        </p>

        <h2>Intellectual Property</h2>

        <p>
          Unless otherwise stated, the Greyson Institute name, branding,
          website design, written content, and original materials are protected
          by applicable intellectual property laws and may not be reproduced or
          distributed without permission.
        </p>

        <h2>Changes to These Terms</h2>

        <p>
          Greyson Institute may update these Terms of Use as the website,
          course offerings, enrollment systems, and services evolve.
        </p>

        <h2>Business Entity</h2>

        <p>
          Greyson Institute is operated by BrightPath Education Group, LLC.
        </p>

        <p className="muted">
          These terms may be updated before course enrollment opens to reflect
          final provider, payment, refund, and student-support arrangements.
        </p>
      </div>
    </section>
  );
}
