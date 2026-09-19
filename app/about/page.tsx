import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <section className="page-hero">
      <div className="container narrow">
        <p className="eyebrow">ABOUT GREYSON INSTITUTE</p>

        <h1>Experience behind the education.</h1>

        <p className="page-lead">
          Greyson Institute was created to provide practical, online real
          estate education with real-world context and the flexibility to
          learn at your own pace.
        </p>
      </div>

      <div className="container about-grid">
        <div
          style={{
            minHeight: "560px",
            overflow: "hidden",
            border: "1px solid rgba(17, 23, 23, 0.16)",
            background: "#eee6d9",
          }}
        >
          <img
            src="/ChatGPT Image Sep 19, 2026, 06_28_39 PM.png"
            alt="Brian Smith, Licensed Florida Real Estate Broker and Instructor"
            style={{
              width: "100%",
              height: "100%",
              minHeight: "560px",
              objectFit: "cover",
              objectPosition: "center top",
              display: "block",
            }}
          />
        </div>

        <div className="prose-card">
          <p className="eyebrow">FOUNDER & INSTRUCTOR</p>

          <h2>Brian Smith</h2>

          <p
            style={{
              fontFamily: "var(--font-serif), Georgia, serif",
              fontSize: "1.2rem",
              lineHeight: 1.45,
              marginBottom: "4px",
            }}
          >
            Licensed Florida Real Estate Broker & Instructor
          </p>

          <p
            style={{
              color: "#9b7a52",
              fontSize: "0.8rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginTop: 0,
              marginBottom: "30px",
            }}
          >
            Founder, Greyson Institute
          </p>

          <p>
            Brian Smith first became licensed in real estate in 1997, earned
            his Florida broker license in 2003, and became a licensed Florida
            real estate instructor in 2005.
          </p>

          <p>
            His real estate experience includes sales, listings, buyer
            representation, brokerage operations, agent training, and owning
            and operating a real estate company.
          </p>

          <p>
            Brian holds a Bachelor&apos;s degree in Legal Studies from the
            University of Central Florida.
          </p>

          <p>
            His areas of focus include real estate math, law, ethics,
            brokerage, and licensing exam concepts. Greyson Institute was
            created to provide practical, online real estate education with
            real-world context and flexible, self-paced learning.
          </p>
        </div>
      </div>
    </section>
  );
}
