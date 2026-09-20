import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

const team = [
  {
    name: "Brian Smith",
    title: "Licensed Florida Real Estate Broker & Instructor",
    secondary: "Founder, Greyson Institute",
    image: "/brian-smith.png",
    bio:
      "A licensed Florida Real Estate Instructor with extensive expertise in real estate law and education. Responsible for developing engaging, up-to-date courses that align with FREC standards and meet the evolving needs of real estate professionals. Committed to delivering high-quality, practical instruction that helps agents stay compliant and excel in their careers.",
  },
  {
    name: "Jessica Smith",
    title: "Technology Manager & Sales Manager",
    image: "/jessica-smith.png",
    bio:
      "A licensed real estate professional with a passion for education, blending sales leadership with tech-savvy expertise. Specializes in streamlining course delivery, enhancing student engagement, and driving enrollment growth through innovative platforms and strategic outreach.",
  },
  {
    name: "Jennifer Wilson",
    title: "Customer Support Specialist & HR Coordinator",
    image: "/jennifer-wilson.png",
    bio:
      "Provides exceptional support to students and staff, ensuring a seamless and positive experience from enrollment through course completion. Handles inquiries, resolves issues promptly, and manages internal HR processes to maintain a supportive and efficient learning environment. Dedicated to upholding a high standard of service and fostering student success.",
  },
];

export default function AboutPage() {
  return (
    <section
      className="page-hero"
      style={{
        paddingBottom: 0,
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: "1180px",
          marginBottom: "72px",
        }}
      >
        <p className="eyebrow">ABOUT GREYSON INSTITUTE</p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "48px",
            alignItems: "end",
          }}
        >
          <h1
            style={{
              maxWidth: "700px",
              marginBottom: 0,
            }}
          >
            The people behind Greyson Institute.
          </h1>

          <p
            className="page-lead"
            style={{
              margin: 0,
              maxWidth: "520px",
            }}
          >
            Experienced leadership, thoughtful technology, and responsive
            student support work together to make real estate education easier
            to navigate.
          </p>
        </div>
      </div>

      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "28px",
          alignItems: "stretch",
        }}
      >
        {team.map((member) => (
          <article
            key={member.name}
            style={{
              display: "flex",
              flexDirection: "column",
              background: "#f5f0e7",
              border: "1px solid rgba(17, 23, 23, 0.14)",
              minWidth: 0,
            }}
          >
            <div
              style={{
                aspectRatio: "4 / 5",
                overflow: "hidden",
                background: "#eee6d9",
                borderBottom: "1px solid rgba(17, 23, 23, 0.14)",
              }}
            >
              <img
                src={member.image}
                alt={member.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  display: "block",
                }}
              />
            </div>

            <div
              style={{
                padding: "30px 28px 32px",
                display: "flex",
                flexDirection: "column",
                flex: 1,
              }}
            >
              <p
                className="eyebrow"
                style={{
                  marginBottom: "10px",
                }}
              >
                GREYSON INSTITUTE
              </p>

              <h2
                style={{
                  fontSize: "2.15rem",
                  marginBottom: "8px",
                }}
              >
                {member.name}
              </h2>

              <p
                style={{
                  fontFamily: "var(--font-serif), Georgia, serif",
                  fontSize: "1.12rem",
                  lineHeight: 1.4,
                  margin: "0 0 5px",
                }}
              >
                {member.title}
              </p>

              {member.secondary && (
                <p
                  style={{
                    color: "#9b7a52",
                    fontSize: "0.74rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    margin: "0",
                  }}
                >
                  {member.secondary}
                </p>
              )}

              <div
                style={{
                  width: "42px",
                  height: "1px",
                  background: "#9b7a52",
                  margin: "22px 0",
                }}
              />

              <p
                style={{
                  color: "#4d4b46",
                  fontSize: "0.95rem",
                  lineHeight: 1.75,
                  margin: 0,
                }}
              >
                {member.bio}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div
        style={{
          marginTop: "100px",
          background: "#1f2d30",
          color: "#f5f0e7",
          padding: "90px 0",
        }}
      >
        <div className="container">
          <p className="eyebrow eyebrow--light">THE GREYSON APPROACH</p>

          <h2
            className="light-heading"
            style={{
              maxWidth: "760px",
              marginBottom: "55px",
            }}
          >
            A professional education experience built around clarity and
            support.
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              borderTop: "1px solid rgba(245, 240, 231, 0.22)",
            }}
          >
            <div
              style={{
                padding: "28px 28px 0 0",
              }}
            >
              <p
                style={{
                  color: "#c6aa85",
                  fontSize: "0.72rem",
                  letterSpacing: "0.18em",
                  marginTop: 0,
                }}
              >
                01
              </p>
              <h3 style={{ color: "#f5f0e7" }}>Clear direction</h3>
              <p style={{ color: "rgba(245, 240, 231, 0.7)" }}>
                Helping students understand which education fits where they
                are in their real estate journey.
              </p>
            </div>

            <div
              style={{
                padding: "28px",
              }}
            >
              <p
                style={{
                  color: "#c6aa85",
                  fontSize: "0.72rem",
                  letterSpacing: "0.18em",
                  marginTop: 0,
                }}
              >
                02
              </p>
              <h3 style={{ color: "#f5f0e7" }}>Practical education</h3>
              <p style={{ color: "rgba(245, 240, 231, 0.7)" }}>
                Presenting real estate education in a way that feels useful,
                professional, and connected to the work itself.
              </p>
            </div>

            <div
              style={{
                padding: "28px 0 0 28px",
              }}
            >
              <p
                style={{
                  color: "#c6aa85",
                  fontSize: "0.72rem",
                  letterSpacing: "0.18em",
                  marginTop: 0,
                }}
              >
                03
              </p>
              <h3 style={{ color: "#f5f0e7" }}>Student support</h3>
              <p style={{ color: "rgba(245, 240, 231, 0.7)" }}>
                Creating a straightforward experience from choosing a course
                through completing the next step.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
