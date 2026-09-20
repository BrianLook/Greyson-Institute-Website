import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <section className="page-hero">
      <div className="container narrow prose-card">
        <p className="eyebrow">LEGAL</p>

        <h1>Privacy Policy</h1>

        <p className="page-lead">
          Greyson Institute respects your privacy and is committed to handling
          personal information responsibly.
        </p>

        <h2>Information We May Collect</h2>

        <p>
          Greyson Institute may collect information that you voluntarily
          provide, such as your name, email address, and information submitted
          through contact or enrollment-related forms.
        </p>

        <p>
          We may also collect limited technical information about how visitors
          use the website, such as browser type, device information, pages
          visited, and general website activity.
        </p>

        <h2>How Information May Be Used</h2>

        <p>
          Information may be used to respond to questions, provide information
          about real estate education options, improve the website, support
          enrollment-related communication, and operate Greyson Institute.
        </p>

        <h2>Course Providers and Third-Party Services</h2>

        <p>
          Some courses, enrollment services, payment processing, or student
          services may be provided through third-party platforms. When a
          student leaves the Greyson Institute website and uses a third-party
          service, that provider&apos;s privacy policy may also apply.
        </p>

        <h2>Cookies and Analytics</h2>

        <p>
          Greyson Institute may use cookies or analytics tools to understand
          website traffic and improve the user experience. Additional details
          will be provided if analytics or advertising tools are added.
        </p>

        <h2>Sharing of Information</h2>

        <p>
          Greyson Institute does not sell personal information. Information may
          be shared with service providers when necessary to operate the
          website, process enrollment, provide student services, or comply with
          legal requirements.
        </p>

        <h2>Contact</h2>

        <p>
          Questions about this Privacy Policy may be directed to Greyson
          Institute through the contact information provided on this website.
        </p>

        <p className="muted">
          This policy will be updated as additional enrollment, analytics,
          advertising, and student-service systems are implemented.
        </p>
      </div>
    </section>
  );
}
