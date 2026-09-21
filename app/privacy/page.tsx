import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the Greyson Institute Privacy Policy and learn how website inquiries, analytics data, and personal information are handled.",
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

        <p className="muted">
          Last updated: September 21, 2026
        </p>

        <h2>Information We Collect</h2>

        <p>
          Greyson Institute may collect information that you voluntarily
          provide through this website, including your name, email address,
          state, education interests, and information you include in a message
          or inquiry.
        </p>

        <p>
          Our website hosting, analytics, and service providers may also
          process limited technical and usage information necessary to operate,
          secure, measure, and improve the website.
        </p>

        <h2>Contact Form and Formspree</h2>

        <p>
          Greyson Institute uses Formspree to process submissions made through
          our website contact form.
        </p>

        <p>
          When you submit the contact form, the information you provide is sent
          to Formspree for processing, stored within our Formspree account, and
          used to deliver a notification to Greyson Institute so that we can
          respond to your inquiry.
        </p>

        <p>
          Formspree may process this information in accordance with its own
          privacy and security practices.
        </p>

        <h2>Google Analytics</h2>

        <p>
          Greyson Institute uses Google Analytics to understand how visitors
          use our website and to help us improve website content, navigation,
          and performance.
        </p>

        <p>
          Google Analytics may collect information such as page views, website
          interactions, session information, approximate geographic location,
          browser type, device information, referral information, and other
          website usage data.
        </p>

        <p>
          Google Analytics may use first-party cookies and similar
          technologies to distinguish users and sessions and to measure website
          activity.
        </p>

        <p>
          Information collected through Google Analytics is processed by
          Google in accordance with Google's privacy and data practices.
        </p>

        <p>
          You can learn more about how Google handles information by visiting{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google's Privacy Policy
          </a>
          .
        </p>

        <h2>How We Use Information</h2>

        <p>
          Information may be used to respond to questions, help visitors
          understand real estate education options, provide
          enrollment-related guidance, understand website traffic and usage,
          improve our website and services, maintain business records, prevent
          abuse or fraud, and operate Greyson Institute.
        </p>

        <h2>Course Providers and Third-Party Services</h2>

        <p>
          Some courses, enrollment services, payment processing, learning
          platforms, or student services may be provided through third-party
          providers.
        </p>

        <p>
          When you leave the Greyson Institute website and use a third-party
          website or service, that provider's privacy policy and terms may
          apply separately.
        </p>

        <h2>Cookies and Similar Technologies</h2>

        <p>
          Greyson Institute and its service providers may use cookies and
          similar technologies that are necessary for website operation,
          security, analytics, and measurement.
        </p>

        <p>
          Browser settings may allow you to block, limit, or delete cookies.
          Some website features or analytics measurements may function
          differently when cookies are restricted.
        </p>

        <h2>Sharing of Information</h2>

        <p>
          Greyson Institute does not sell personal information.
        </p>

        <p>
          Information may be shared with service providers when reasonably
          necessary to operate the website, process inquiries, analyze website
          usage, support enrollment or student services, maintain security, or
          comply with legal obligations.
        </p>

        <h2>Data Retention</h2>

        <p>
          We may retain contact-form submissions and related correspondence for
          as long as reasonably necessary to respond to inquiries, maintain
          business records, resolve issues, and meet legal or operational
          requirements.
        </p>

        <p>
          Analytics information may be retained in accordance with our Google
          Analytics settings and Google's applicable retention practices.
        </p>

        <h2>Your Choices</h2>

        <p>
          You may contact Greyson Institute if you would like to ask a question
          about personal information you previously submitted through the
          website or request that we review a deletion request where
          appropriate.
        </p>

        <p>
          You may also use your browser's privacy and cookie controls to limit
          certain website tracking technologies.
        </p>

        <h2>Contact</h2>

        <p>
          Questions about this Privacy Policy may be sent to:
        </p>

        <p>
          <a href="mailto:support@greysoninstitute.com">
            support@greysoninstitute.com
          </a>
        </p>

        <p className="muted">
          Greyson Institute is operated by BrightPath Education Group, LLC.
          This Privacy Policy may be updated as additional enrollment,
          advertising, analytics, and student-service systems are implemented.
        </p>
      </div>
    </section>
  );
}
