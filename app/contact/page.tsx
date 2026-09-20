import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <section
      className="page-hero"
      style={{
        paddingBottom: "110px",
      }}
    >
      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "70px",
          alignItems: "start",
        }}
      >
        <div>
          <p className="eyebrow">CONTACT GREYSON INSTITUTE</p>

          <h1>Questions about your next step?</h1>

          <p className="page-lead">
            If you are unsure which real estate education path applies to you,
            Greyson Institute is here to help you understand your options.
          </p>
        </div>

        <div
          style={{
            background: "#f5f0e7",
            border: "1px solid rgba(17, 23, 23, 0.14)",
            padding: "clamp(32px, 5vw, 52px)",
          }}
        >
          <p className="eyebrow">GET IN TOUCH</p>

          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              marginBottom: "30px",
            }}
          >
            We’re here to help.
          </h2>

          <div
            style={{
              borderTop: "1px solid rgba(17, 23, 23, 0.16)",
            }}
          >
            <div
              style={{
                padding: "24px 0",
                borderBottom: "1px solid rgba(17, 23, 23, 0.16)",
              }}
            >
              <p
                style={{
                  margin: "0 0 6px",
                  fontSize: "0.72rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#9b7a52",
                }}
              >
                Email
              </p>

              <a
                href="mailto:support@greysoninstitute.com"
                style={{
                  fontFamily: "var(--font-serif), Georgia, serif",
                  fontSize: "1.35rem",
                }}
              >
                support@greysoninstitute.com
              </a>
            </div>

            <div
              style={{
                padding: "24px 0",
                borderBottom: "1px solid rgba(17, 23, 23, 0.16)",
              }}
            >
              <p
                style={{
                  margin: "0 0 6px",
                  fontSize: "0.72rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#9b7a52",
                }}
              >
                Business
              </p>

              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--font-serif), Georgia, serif",
                  fontSize: "1.2rem",
                }}
              >
                BrightPath Education Group, LLC
              </p>
            </div>

            <div
              style={{
                padding: "24px 0 0",
              }}
            >
              <p
                style={{
                  margin: "0 0 6px",
                  fontSize: "0.72rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#9b7a52",
                }}
              >
                Website
              </p>

              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--font-serif), Georgia, serif",
                  fontSize: "1.2rem",
                }}
              >
                greysoninstitute.com
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="container"
        style={{
          marginTop: "80px",
          paddingTop: "34px",
          borderTop: "1px solid rgba(17, 23, 23, 0.18)",
        }}
      >
        <p
          style={{
            maxWidth: "760px",
            color: "#6e6b65",
            fontSize: "0.95rem",
            lineHeight: 1.75,
            margin: 0,
          }}
        >
          Course-specific enrollment, technical support, completion
          requirements, and provider questions will be directed to the
          appropriate resource when applicable.
        </p>
      </div>
    </section>
  );
}
