import Image from "next/image";
import Link from "next/link";

const paths = [
  {
    title: "Get Licensed",
    body: "Start with the education required to begin your real estate career.",
    meta: "Pre-Licensing",
    href: "/courses#pre-licensing",
  },
  {
    title: "Post-License",
    body: "Stay on track after licensure with the next required education step.",
    meta: "Post-License",
    href: "/courses#post-license",
  },
  {
    title: "Continuing Education",
    body: "Keep your license current with clear, convenient education options.",
    meta: "CE",
    href: "/courses#continuing-education",
  },
  {
    title: "Become a Broker",
    body: "Prepare for the next level of your real estate career.",
    meta: "Broker",
    href: "/courses#broker",
  },
  {
    title: "Exam Preparation",
    body: "Study with focus and walk into exam day better prepared.",
    meta: "Exam Prep",
    href: "/courses#exam-prep",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div
          className="container hero-grid"
          style={{
            minWidth: 0,
          }}
        >
          <div
            className="hero-copy"
            style={{
              minWidth: 0,
            }}
          >
            <p className="eyebrow">ONLINE REAL ESTATE EDUCATION</p>

            <h1
              style={{
                overflowWrap: "anywhere",
              }}
            >
              Get licensed.
              <br />
              Understand what comes next.
            </h1>

            <p className="hero-lead">
              Online real estate education, at your pace.
            </p>

            <div className="button-row">
              <Link className="button" href="/courses">
                Explore Courses
              </Link>
            </div>
          </div>

          <div
            style={{
              position: "relative",
              minHeight: "clamp(320px, 50vw, 560px)",
              height: "100%",
              overflow: "hidden",
              border: "1px solid rgba(17, 23, 23, 0.12)",
              background: "#eee6d9",
              minWidth: 0,
            }}
          >
            <Image
              src="/greyson-hero-study.png"
              alt="Professional real estate study workspace"
              fill
              priority
              sizes="(max-width: 980px) 100vw, 55vw"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </div>
        </div>
      </section>

      <section className="section section--cream-darkline">
        <div
          className="container section-heading-row"
          style={{
            minWidth: 0,
          }}
        >
          <div
            style={{
              minWidth: 0,
            }}
          >
            <p className="eyebrow">FIND YOUR NEXT STEP</p>

            <h2
              style={{
                overflowWrap: "anywhere",
              }}
            >
              Where are you in your real estate career?
            </h2>
          </div>

          <p
            className="section-intro"
            style={{
              minWidth: 0,
            }}
          >
            Whether you are preparing for your first license, completing
            post-license education, renewing, or advancing toward a broker
            license, start with the path that fits where you are today.
          </p>
        </div>

        <div
          className="container path-grid"
          style={{
            minWidth: 0,
          }}
        >
          {paths.map((path) => (
            <a
              className="path-card"
              href={path.href}
              key={path.title}
              style={{
                minWidth: 0,
                overflowWrap: "anywhere",
              }}
            >
              <span className="path-meta">{path.meta}</span>

              <h3>{path.title}</h3>

              <p>{path.body}</p>

              <span className="card-arrow">Explore →</span>
            </a>
          ))}
        </div>
      </section>

      <section className="section section--dark">
        <div
          className="container split-layout"
          style={{
            minWidth: 0,
          }}
        >
          <div
            style={{
              minWidth: 0,
            }}
          >
            <p className="eyebrow eyebrow--light">
              THE GREYSON STANDARD
            </p>

            <h2
              className="light-heading"
              style={{
                overflowWrap: "anywhere",
              }}
            >
              Real estate education should feel clear, credible, and
              professionally presented.
            </h2>
          </div>

          <div
            className="principles"
            style={{
              minWidth: 0,
            }}
          >
            <article style={{ minWidth: 0 }}>
              <span>01</span>

              <h3>Clear direction</h3>

              <p>
                Understand which education applies to your stage of licensure
                without sorting through an overwhelming catalog.
              </p>
            </article>

            <article style={{ minWidth: 0 }}>
              <span>02</span>

              <h3>Professional standard</h3>

              <p>
                Begin your real estate career with an education experience
                designed to reflect the profession you are entering.
              </p>
            </article>

            <article style={{ minWidth: 0 }}>
              <span>03</span>

              <h3>Instructor perspective</h3>

              <p>
                Learn with the perspective of a Florida real estate broker and
                instructor who understands both the licensing process and the
                realities of the business.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div
          className="container instructor-panel"
          style={{
            minWidth: 0,
          }}
        >
          <div
            style={{
              position: "relative",
              minHeight: "clamp(320px, 50vw, 520px)",
              overflow: "hidden",
              border: "1px solid rgba(17, 23, 23, 0.16)",
              background: "#eee6d9",
              minWidth: 0,
            }}
          >
            <Image
              src="/smith-brian.png"
              alt="Brian Smith, Licensed Florida Real Estate Broker and Instructor"
              fill
              sizes="(max-width: 980px) 100vw, 40vw"
              style={{
                objectFit: "cover",
                objectPosition: "center top",
              }}
            />
          </div>

          <div
            style={{
              minWidth: 0,
            }}
          >
            <p className="eyebrow">YOUR INSTRUCTOR</p>

            <h2
              style={{
                overflowWrap: "anywhere",
              }}
            >
              Brian Smith
            </h2>

            <p
              style={{
                fontFamily: "var(--font-serif), Georgia, serif",
                fontSize: "1.2rem",
                lineHeight: 1.45,
                marginBottom: "4px",
                overflowWrap: "anywhere",
              }}
            >
              Licensed Florida Real Estate Broker & Instructor
            </p>

            <p
              style={{
                color: "#7d5f3a",
                fontSize: "0.8rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginTop: 0,
                marginBottom: "28px",
                overflowWrap: "anywhere",
              }}
            >
              Founder, Greyson Institute
            </p>

            <p>
              Licensed in real estate since 1997, Brian brings experience in
              sales, listings, buyer representation, brokerage operations,
              agent training, and real estate company ownership.
            </p>

            <p>
              His focus is practical, real-world education designed to help
              students understand both the licensing material and the business
              that follows.
            </p>

            <Link className="text-link" href="/about">
              Meet the Greyson Institute Team <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div
          className="container centered-callout"
          style={{
            minWidth: 0,
          }}
        >
          <Image
            src="/brand/greyson-icon-color.png"
            alt=""
            aria-hidden="true"
            width={72}
            height={72}
            sizes="72px"
            style={{
              width: "72px",
              maxWidth: "100%",
              height: "auto",
              display: "block",
              marginBottom: "22px",
            }}
          />

          <p
            className="eyebrow"
            style={{
              color: "#7d5f3a",
            }}
          >
            GREYSON INSTITUTE
          </p>

          <h2
            style={{
              overflowWrap: "anywhere",
            }}
          >
            Find the education that fits your next step.
          </h2>

          <p
            style={{
              color: "#4d4b46",
            }}
          >
            Explore real estate education paths for licensing, post-license,
            continuing education, broker education, and exam preparation.
          </p>

          <a
            className="button"
            href="/courses#find-your-path"
          >
            Find Your Path
          </a>
        </div>
      </section>
    </>
  );
}
