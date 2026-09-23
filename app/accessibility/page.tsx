import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description:
    "Read Greyson Institute's commitment to digital accessibility and WCAG 2.2 Level AA.",
};

export default function AccessibilityPage() {
  return (
    <section className="page-hero accessibility-page">
      <div className="container narrow prose-card">
        <p className="eyebrow">ACCESSIBILITY</p>

        <h1>Accessibility Statement</h1>

        <p className="page-lead">
          Greyson Institute is committed to providing a website that is
          accessible and usable for as many people as possible.
        </p>

        <p className="muted">Last updated: September 23, 2026</p>

        <h2>Our Accessibility Goal</h2>

        <p>
          Greyson Institute aims to conform to the Web Content Accessibility
          Guidelines (WCAG) 2.2, Level AA.
        </p>

        <p>
          These guidelines provide recommendations for making digital content
          more accessible to people with disabilities, including people who use
          screen readers, keyboard navigation, magnification, voice control,
          and other assistive technologies.
        </p>

        <h2>Accessibility Measures</h2>

        <p>
          We have taken accessibility into account throughout the design and
          development of this website. Measures include:
        </p>

        <ul>
          <li>Keyboard-accessible navigation and interactive controls</li>
          <li>A skip-to-main-content link</li>
          <li>Visible keyboard focus indicators</li>
          <li>Responsive layouts designed to support high zoom levels</li>
          <li>
            Accessible form labels, required-field identification, and status
            messages
          </li>
          <li>Appropriate color contrast for text and interactive elements</li>
          <li>Alternative text for meaningful images</li>
          <li>Reduced-motion support for users who request it</li>
          <li>
            Screen-reader-friendly headings, landmarks, links, and navigation
          </li>
        </ul>

        <h2>Testing and Review</h2>

        <p>
          Greyson Institute performs automated and manual accessibility reviews
          as the website evolves.
        </p>

        <p>
          Testing may include keyboard-only navigation, screen-reader review,
          mobile testing, high-zoom and reflow testing, color-contrast review,
          and automated accessibility tools.
        </p>

        <h2>Third-Party Services</h2>

        <p>
          Some course, enrollment, payment, learning, or student-support
          services may be provided through third-party websites or platforms.
          Those services may have their own accessibility features, policies,
          and procedures.
        </p>

        <p>
          Greyson Institute will make reasonable efforts to consider
          accessibility when selecting and integrating third-party services
          used as part of the student experience.
        </p>

        <h2>Accessibility Feedback</h2>

        <p>
          If you experience difficulty accessing any part of the Greyson
          Institute website, encounter an accessibility barrier, or need
          information in another format, please contact us.
        </p>

        <p>
          Email:{" "}
          <a href="mailto:support@greysoninstitute.com">
            support@greysoninstitute.com
          </a>
        </p>

        <p>
          Please describe the page or feature you were trying to access and the
          difficulty you experienced. We will review accessibility feedback and
          make reasonable efforts to address identified barriers.
        </p>

        <h2>Ongoing Commitment</h2>

        <p>
          Accessibility is an ongoing process. Greyson Institute may update
          this statement as the website, course offerings, technologies, and
          third-party services change.
        </p>

        <p className="muted">
          Greyson Institute is operated by BrightPath Education Group, LLC.
        </p>
      </div>
    </section>
  );
}
