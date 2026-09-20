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
    <section className="page-hero">
      <div className="container narrow">
        <p className="eyebrow">ABOUT GREYSON INSTITUTE</p>

        <h1>Our Expert Team</h1>

        <p className="page-lead">
          Meet the dedicated professionals behind Greyson Institute.
        </p>
      </div>

      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "42px",
          alignItems: "start",
        }}
      >
        {team.map((member) => (
          <article key={member.name}>
            <div
              style={{
                aspectRatio: "4 / 5",
                overflow: "hidden",
                background: "#eee6d9",
                border: "1px solid rgba(17, 23, 23, 0.14)",
                marginBottom: "28px",
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
                fontSize: "2.25rem",
                marginBottom: "10px",
              }}
            >
              {member.name}
            </h2>

            <p
              style={{
                fontFamily: "var(--font-serif), Georgia, serif",
                fontSize: "1.1rem",
                lineHeight: 1.45,
                margin: "0 0 5px",
              }}
            >
              {member.title}
            </p>

            {member.secondary && (
              <p
                style={{
                  color: "#9b7a52",
                  fontSize: "0.75rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  margin: "0 0 22px",
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
          </article>
        ))}
      </div>
    </section>
  );
}
