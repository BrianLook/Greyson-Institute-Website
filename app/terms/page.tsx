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
          Last updated: September 30, 2026
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
          Greyson Institute is preparing to refer students to partner-delivered
          online courses through a co-branded affiliate relationship with The
          CE Shop. When those enrollment links are activated, The CE Shop will
          handle checkout, enrollment, course access, course-specific student
          support, certificates, and regulatory completion reporting for those
          courses. Additional provider terms will apply.
        </p>

        <h2>Licensing Requirements</h2>

        <p>
          Real estate licensing and education requirements may change. Greyson's
          Find My Path and license-lookup tools provide guidance based on
          available records and user answers; they are not a DBPR determination.
          Students should verify their live DBPR record and confirm that a
          course satisfies the requirements applicable to their license status
          and goals before purchasing education.
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
          platforms, including co-branded course pages operated by The CE Shop.
          Those services are governed by their own terms, policies, procedures,
          payment systems, and course-support processes. Greyson does not
          develop The CE Shop's course content or operate its classroom
          platform.
        </p>

        <h2>Refunds and Course Policies</h2>

        <p>
          Refund, cancellation, access, completion, and course-support policies
          are controlled by the applicable course provider. For The CE Shop
          partner courses, The CE Shop handles those requests through its
          customer-service process, while Greyson may assist with partner
          escalation when appropriate.
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
