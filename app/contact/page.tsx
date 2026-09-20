import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <section className="page-hero">
      <div className="container narrow">
        <p className="eyebrow">CONTACT GREYSON INSTITUTE</p>

        <h1>Questions about your next step?</h1>

        <p className="page-lead">
          If you are unsure which real estate education path applies to you,
          Greyson Institute is here to help you understand your options.
        </p>

        <div className="contact-card">
          <p>
            <strong>Email</strong>
            <br />
            <span className="muted">Greyson Institute email coming soon</span>
          </p>

          <p>
            <strong>Business</strong>
            <br />
            BrightPath Education Group, LLC
          </p>

          <p>
            <strong>Website</strong>
            <br />
            greysoninstitute.com
          </p>
        </div>

        <p
          style={{
            marginTop: "30px",
            color: "#6e6b65",
            fontSize: "0.95rem",
            lineHeight: 1.7,
          }}
        >
          Course-specific enrollment, technical support, and completion
          questions will be directed to the appropriate provider when
          applicable.
        </p>
      </div>
    </section>
  );
}
