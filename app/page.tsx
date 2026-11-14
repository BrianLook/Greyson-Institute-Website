import Image from "next/image";
import Link from "next/link";
import { CeShopAutomatedPromo } from "@/components/CeShopAutomatedPromo";

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
    meta: "Continuing Education",
    href: "/courses#continuing-education",
  },
  {
    title: "Become a Broker",
    body: "Prepare for the next level of your real estate career.",
    meta: "Broker",
    href: "/how-to-become-florida-real-estate-broker",
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
            <p className="eyebrow">FLORIDA REAL ESTATE EDUCATION</p>

            <h1
              style={{
                overflowWrap: "anywhere",
              }}
            >
              Florida Real Estate Education
              <br />
              for Every Step of Your License.
            </h1>

            <p className="hero-lead">
              Greyson Institute helps aspiring and current Florida real estate
              professionals understand which education path most likely fits
              their license — then makes the next step easier to navigate.
            </p>

            <div
              className="button-row"
              style={{
                alignItems: "center",
              }}
            >
              <Link
                className="button"
                href="/find-my-path"
              >
                Find My Exact Path
              </Link>

              <Link
                className="text-link"
                href="/courses"
                style={{
                  fontSize: "0.92rem",
                }}
              >
                Explore Courses <span>→</span>
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

      <section
        aria-labelledby="vacation-ownership-feature-title"
        className="section--cream-darkline"
        style={{
          padding: "clamp(28px, 5vw, 52px) 0",
          borderTop: "1px solid rgba(17, 23, 23, 0.16)",
        }}
      >
        <div
          className="container"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 310px), 1fr))",
            alignItems: "center",
            gap: "28px",
            padding: "clamp(24px, 4vw, 44px)",
            background: "#eee6d9",
            border: "1px solid rgba(17, 23, 23, 0.13)",
          }}
        >
          <div>
            <p className="eyebrow" style={{ marginBottom: "12px" }}>
              A SPECIAL PATH FOR VACATION OWNERSHIP PROFESSIONALS
            </p>
            <h2
              id="vacation-ownership-feature-title"
              style={{
                fontSize: "clamp(2rem, 3.5vw, 3.05rem)",
                lineHeight: 1.13,
                marginBottom: "16px",
              }}
            >
              You Sell Vacations. Your License Still Matters.
            </h2>
            <p style={{ color: "#4d4b46", lineHeight: 1.8, margin: 0 }}>
              Work in timeshare or vacation ownership sales? Find the
              Florida 14-hour continuing education, 45-hour first-renewal post-license,
              or broker education that fits your license—without searching
              an overwhelming course catalog.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gap: "14px",
              justifyItems: "start",
            }}
          >
            <Link
              className="button"
              href="/florida-timeshare-sales-continuing-education"
            >
              Timeshare &amp; Vacation Ownership Continuing Education →
            </Link>
            <p style={{ color: "#6e6b65", fontSize: ".85rem", lineHeight: 1.6, margin: 0 }}>
              Florida licensed resort and vacation ownership sales professionals
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="greyson-get-started-title"
        style={{
          padding: "clamp(40px, 6vw, 72px) 0",
          borderBottom: "1px solid rgba(17, 23, 23, 0.16)",
        }}
      >
        <div className="container" style={{ maxWidth: "1080px", minWidth: 0 }}>
          <p className="eyebrow">HOW TO GET STARTED</p>
          <h2
            id="greyson-get-started-title"
            style={{
              fontSize: "clamp(2rem, 3.7vw, 3rem)",
              maxWidth: "820px",
              marginBottom: "16px",
            }}
          >
            Find your course. Know what you're buying.
          </h2>
          <p
            style={{
              color: "#4d4b46",
              maxWidth: "810px",
              marginBottom: "28px",
            }}
          >
            Greyson helps you navigate Florida's education requirements
            and compare your options before you enroll with our course partner.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 235px), 1fr))",
              gap: "16px",
            }}
          >
            <article style={{ padding: "22px", border: "1px solid rgba(17,23,23,.18)", minWidth: 0 }}>
              <p className="eyebrow" style={{ marginBottom: "10px" }}>01 / FIND YOUR PATH</p>
              <h3 style={{ fontSize: "1.55rem", marginBottom: "8px" }}>Check your requirement.</h3>
              <p style={{ margin: 0, color: "#4d4b46", fontSize: "0.93rem" }}>
                Use our licensing guides or Find My Exact Path, and confirm
                your official status with Florida DBPR.
              </p>
            </article>
            <article style={{ padding: "22px", border: "1px solid rgba(17,23,23,.18)", minWidth: 0 }}>
              <p className="eyebrow" style={{ marginBottom: "10px" }}>02 / COMPARE</p>
              <h3 style={{ fontSize: "1.55rem", marginBottom: "8px" }}>Choose your course.</h3>
              <p style={{ margin: 0, color: "#4d4b46", fontSize: "0.93rem" }}>
                Review required hours, package options, and current prices
                before deciding what fits your situation.
              </p>
            </article>
            <article style={{ padding: "22px", border: "1px solid rgba(17,23,23,.18)", minWidth: 0 }}>
              <p className="eyebrow" style={{ marginBottom: "10px" }}>03 / ENROLL</p>
              <h3 style={{ fontSize: "1.55rem", marginBottom: "8px" }}>Finish with The CE Shop.</h3>
              <p style={{ margin: 0, color: "#4d4b46", fontSize: "0.93rem" }}>
                Our course links open The CE Shop, which handles payment,
                student access, coursework, and course-specific support.
              </p>
            </article>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              flexWrap: "wrap",
              marginTop: "24px",
            }}
          >
            <Link className="button" href="/courses#choose-your-course">
              Compare Course Options →
            </Link>
            <Link className="text-link" href="/faq">
              Questions before enrolling? <span>→</span>
            </Link>
          </div>
          <p style={{ color: "#6e6b65", fontSize: "0.82rem", maxWidth: "840px", marginBottom: 0 }}>
            Education provided by The CE Shop. Greyson may earn a commission
            from eligible purchases made through partner enrollment links.
          </p>
        </div>
      </section>

      <CeShopAutomatedPromo />

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
          <div className="instructor-photo-card">
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
            className="instructor-copy"
            style={{
              minWidth: 0,
            }}
          >
            <p className="eyebrow">FOUNDER & FLORIDA INSTRUCTOR</p>

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
              At Greyson, Brian focuses on practical licensing guidance and real-world
              context. Online partner courses are completed through the course
              provider&apos;s platform.
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
            alt="Greyson Institute logo"
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
            href="/find-my-path"
          >
            Find Your Path
          </a>
        </div>
      </section>
    </>
  );
}
