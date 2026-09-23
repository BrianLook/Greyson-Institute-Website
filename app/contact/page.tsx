import type { Metadata } from "next";
import { ContactForm } from "../../components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Greyson Institute for help choosing the right real estate education path.",
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
          marginBottom: "72px",
          minWidth: 0,
        }}
      >
        <p className="eyebrow">CONTACT GREYSON INSTITUTE</p>

        <h1
          style={{
            maxWidth: "850px",
            overflowWrap: "anywhere",
          }}
        >
          Questions about your next step?
        </h1>

        <p className="page-lead">
          If you are unsure which real estate education path applies to you,
          Greyson Institute is here to help you understand your options.
        </p>
      </div>

      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
          gap: "42px",
          alignItems: "start",
          minWidth: 0,
        }}
      >
        <div
          style={{
            background: "#fbf8f2",
            border: "1px solid rgba(17, 23, 23, 0.14)",
            padding: "clamp(32px, 5vw, 52px)",
            minWidth: 0,
          }}
        >
          <p className="eyebrow">GET IN TOUCH</p>

          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              marginBottom: "18px",
              overflowWrap: "anywhere",
            }}
          >
            We’re here to help.
          </h2>

          <p
            style={{
              color: "#6e6b65",
              lineHeight: 1.75,
              marginBottom: "34px",
            }}
          >
            Send us a message and tell us where you are in your real estate
            journey. We’ll help point you toward the most relevant next step.
          </p>

          <div
            style={{
              borderTop: "1px solid rgba(17, 23, 23, 0.16)",
              minWidth: 0,
            }}
          >
            <div
              style={{
                padding: "24px 0",
                borderBottom: "1px solid rgba(17, 23, 23, 0.16)",
                minWidth: 0,
              }}
            >
              <p
                style={{
                  margin: "0 0 6px",
                  fontSize: "0.72rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#7d5f3a",
                  fontWeight: 700,
                }}
              >
                Email
              </p>

              <a
                href="mailto:support@greysoninstitute.com"
                style={{
                  fontFamily: "var(--font-serif), Georgia, serif",
                  fontSize: "1.25rem",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                  overflowWrap: "anywhere",
                  wordBreak: "break-word",
                }}
              >
                support@greysoninstitute.com
              </a>
            </div>

            <div
              style={{
                padding: "24px 0",
                borderBottom: "1px solid rgba(17, 23, 23, 0.16)",
                minWidth: 0,
              }}
            >
              <p
                style={{
                  margin: "0 0 6px",
                  fontSize: "0.72rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#7d5f3a",
                  fontWeight: 700,
                }}
              >
                Business
              </p>

              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--font-serif), Georgia, serif",
                  fontSize: "1.15rem",
                  lineHeight: 1.5,
                  overflowWrap: "anywhere",
                }}
              >
                BrightPath Education Group, LLC
              </p>
            </div>

            <div
              style={{
                padding: "24px 0",
                borderBottom: "1px solid rgba(17, 23, 23, 0.16)",
                minWidth: 0,
              }}
            >
              <p
                style={{
                  margin: "0 0 6px",
                  fontSize: "0.72rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#7d5f3a",
                  fontWeight: 700,
                }}
              >
                Website
              </p>

              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--font-serif), Georgia, serif",
                  fontSize: "1.15rem",
                  overflowWrap: "anywhere",
                  wordBreak: "break-word",
                }}
              >
                greysoninstitute.com
              </p>
            </div>

            <div
              style={{
                padding: "24px 0 0",
                minWidth: 0,
              }}
            >
              <p
                style={{
                  margin: "0 0 6px",
                  fontSize: "0.72rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#7d5f3a",
                  fontWeight: 700,
                }}
              >
                Need help choosing?
              </p>

              <a
                href="/courses#find-your-path"
                style={{
                  fontFamily: "var(--font-serif), Georgia, serif",
                  fontSize: "1.15rem",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                  overflowWrap: "anywhere",
                }}
              >
                Find Your Path →
              </a>
            </div>
          </div>
        </div>

        <div
          style={{
            minWidth: 0,
          }}
        >
          <ContactForm />
        </div>
      </div>

      <div
        className="container"
        style={{
          marginTop: "72px",
          paddingTop: "32px",
          borderTop: "1px solid rgba(17, 23, 23, 0.18)",
          minWidth: 0,
        }}
      >
        <p
          style={{
            maxWidth: "820px",
            color: "#6e6b65",
            fontSize: "0.9rem",
            lineHeight: 1.75,
            margin: 0,
            overflowWrap: "anywhere",
          }}
        >
          Course-specific enrollment, technical support, completion
          requirements, and provider questions may be directed to the
          appropriate education provider when applicable.
        </p>
      </div>
    </section>
  );
}
