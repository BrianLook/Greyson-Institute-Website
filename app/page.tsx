import Link from "next/link";

const paths = [
  [
    "Get Licensed",
    "Start with the education required to begin your real estate career.",
    "Pre-Licensing",
  ],
  [
    "Post-License",
    "Stay on track after licensure with the next required education step.",
    "Post-License",
  ],
  [
    "Continuing Education",
    "Keep your license current with clear, convenient education options.",
    "CE",
  ],
  [
    "Become a Broker",
    "Prepare for the next level of your real estate career.",
    "Broker",
  ],
  [
    "Exam Preparation",
    "Study with focus and walk into exam day better prepared.",
    "Exam Prep",
  ],
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">ONLINE REAL ESTATE EDUCATION</p>

            <h1>
              A stronger foundation for your real estate career.
            </h1>

            <p className="hero-lead">
              Greyson Institute brings clarity and professional guidance to
              every stage of your real estate education, from your first
              license through the next step in your career.
            </p>

            <div className="button-row">
              <Link className="button" href="/courses">
                Explore Courses
              </Link>

              <Link className="text-link" href="/about">
                Meet the Instructor <span>→</span>
              </Link>
            </div>
          </div>

          <div
            className="hero-art"
            style={{
              minHeight: "500px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "520px",
                padding: "64px 48px",
                borderTop: "1px solid rgba(155, 122, 82, 0.35)",
                borderBottom: "1px solid rgba(155, 122, 82, 0.35)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src="/brand/greyson-stacked-color.png"
                alt="Greyson Institute — Real Estate Education"
                style={{
                  display: "block",
                  width: "100%",
                  maxWidth: "430px",
                  height: "auto",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section section--cream-darkline">
        <div className="container section-heading-row">
          <div>
            <p className="eyebrow">FIND YOUR NEXT STEP</p>
            <h2>Where are you in your real estate career?</h2>
          </div>

          <p className="section-intro">
            Whether you are preparing for your first license, completing
            post-license education, renewing, or advancing toward a broker
            license, start with the path that fits where you are today.
          </p>
        </div>

        <div className="container path-grid">
          {paths.map(([title, body, meta]) => (
            <Link className="path-card" href="/courses" key={title}>
              <span className="path-meta">{meta}</span>
              <h3>{title}</h3>
              <p>{body}</p>
              <span className="card-arrow">Explore →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section section--dark">
        <div className="container split-layout">
          <div>
            <p className="eyebrow eyebrow--light">THE GREYSON STANDARD</p>

            <h2 className="light-heading">
              Real estate education should feel clear, credible, and
              professionally presented.
            </h2>
          </div>

          <div className="principles">
            <article>
              <span>01</span>
              <h3>Clear direction</h3>
              <p>
                Understand which education applies to your stage of licensure
                without sorting through an overwhelming catalog.
              </p>
            </article>

            <article>
              <span>02</span>
              <h3>Professional standard</h3>
              <p>
                Begin your real estate career with an education experience
                designed to reflect the profession you are entering.
              </p>
            </article>

            <article>
              <span>03</span>
              <h3>Instructor perspective</h3>
              <p>
                Learn with the perspective of a Florida real estate instructor
                who understands the path students are navigating.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container instructor-panel">
          <div
            className="portrait-placeholder"
            aria-label="Instructor portrait placeholder"
          >
            <span>
              INSTRUCTOR
              <br />
              PORTRAIT
            </span>
          </div>

          <div>
            <p className="eyebrow">YOUR INSTRUCTOR</p>

            <h2>
              Real estate education with an instructor’s perspective.
            </h2>

            <p>
              Greyson Institute was founded by a Florida real estate
              instructor with a simple goal: make online real estate education
              easier to understand, more professional, and more personal from
              the very first step.
            </p>

            <p className="muted">
              Instructor biography, credentials, and portrait will be added
              before launch.
            </p>

            <Link className="text-link" href="/about">
              About Greyson Institute <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container centered-callout">
          <img
            src="/brand/greyson-icon-color.png"
            alt=""
            aria-hidden="true"
            style={{
              width: "72px",
              height: "auto",
              display: "block",
              marginBottom: "22px",
            }}
          />

          <p className="eyebrow">GREYSON INSTITUTE</p>

          <h2>Find the education that fits your next step.</h2>

          <p>
            Explore real estate education paths for licensing, post-license,
            continuing education, broker education, and exam preparation.
          </p>

          <Link className="button" href="/courses">
            Explore Courses
          </Link>
        </div>
      </section>
    </>
  );
}
