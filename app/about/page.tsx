import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

const team = [
  {
    name: "Brian Smith",
    title: "Licensed Florida Real Estate Broker & Instructor",
    secondary: "Founder, Greyson Institute",
    image: "/smith-brian.png",
    bio:
      "Brian is a licensed Florida Real Estate Broker and Instructor with extensive experience in real estate law, brokerage, sales, agent training, and education. He brings a practical, real-world perspective to Greyson Institute, helping shape student guidance with a focus on clarity, professionalism, and the knowledge real estate professionals need to move confidently into the next stage of their careers.",
  },
  {
    name: "Jessica Smith",
    title: "Technology Manager & Sales Manager",
    secondary: "Co-Founder, Greyson Institute",
    image: "/jessica-smith.png",
    bio:
      "Jessica is a licensed Florida real estate professional and Co-Founder of Greyson Institute who combines sales leadership with a strong focus on technology and student experience. She helps streamline course delivery, improve digital systems, support enrollment growth, and make the learning experience easier to navigate. Her role connects the technology, communication, and sales sides of Greyson Institute so students have a smoother path from interest to enrollment.",
  },
  {
    name: "Jennifer Wilson",
    title: "Customer Support Specialist & HR Coordinator",
    secondary: "Student Support & Operations",
    image: "/jennifer-wilson.png",
    bio:
      "Jennifer supports students and staff throughout the learning experience, from initial questions through course completion. She manages customer support, helps resolve issues quickly, and coordinates internal HR processes that keep the organization running smoothly. Her focus is creating a responsive, organized, and supportive environment where students feel taken care of and the team can operate efficiently.",
  },
];

const approachItems = [
  {
    number: "01",
    title: "Clear direction",
    body:
      "Helping students understand which education fits where they are in their real estate journey.",
  },
  {
    number: "02",
    title: "Practical education",
    body:
      "Presenting real estate education in a way that feels useful, professional, and connected to the work itself.",
  },
  {
    number: "03",
    title: "Student support",
    body:
      "Creating a straightforward experience from choosing a course through completing the next step.",
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
                    color: "#7d5f3a",
                    fontSize: "0.74rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    margin: 0,
                  }}
                >
                  {member.secondary}
                </p>
              )}

              <div
                aria-hidden="true"
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
              columnGap: "28px",
              rowGap: 0,
              borderTop: "1px solid rgba(245, 240, 231, 0.22)",
            }}
          >
            {approachItems.map((item) => (
              <div
                key={item.number}
                style={{
                  padding: "28px 0",
                  borderBottom: "1px solid rgba(245, 240, 231, 0.16)",
                  minWidth: 0,
                }}
              >
                <p
                  style={{
                    color: "#d6bd9c",
                    fontSize: "0.72rem",
                    letterSpacing: "0.18em",
                    margin: "0 0 28px",
                  }}
                >
                  {item.number}
                </p>

                <h3
                  style={{
                    color: "#f5f0e7",
                    marginBottom: "18px",
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    color: "rgba(245, 240, 231, 0.82)",
                    margin: 0,
                    lineHeight: 1.75,
                  }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
