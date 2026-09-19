import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";

const paths = [
  ["Get Licensed", "Start with the education required to begin your real estate career.", "Pre-Licensing"],
  ["Post-License", "Stay on track after licensure with the next required education step.", "Post-License"],
  ["Continuing Education", "Keep your license current with clear, convenient education options.", "CE"],
  ["Become a Broker", "Prepare for the next level of your real estate career.", "Broker"],
  ["Exam Preparation", "Study with focus and walk into exam day better prepared.", "Exam Prep"],
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">ONLINE REAL ESTATE EDUCATION</p>
            <h1>A stronger foundation for your real estate career.</h1>
            <p className="hero-lead">Greyson Institute makes the education path easier to understand — so you can spend less time figuring out what comes next and more time moving forward.</p>
            <div className="button-row">
              <Link className="button" href="/courses">Explore Courses</Link>
              <Link className="text-link" href="/about">Meet the Instructor <span>→</span></Link>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="hero-art__frame">
              <BrandMark />
              <div className="architectural-lines"><i/><i/><i/><i/><i/></div>
            </div>
            <div className="hero-art__caption">EST. FOR MODERN REAL ESTATE EDUCATION</div>
          </div>
        </div>
      </section>

      <section className="section section--cream-darkline">
        <div className="container section-heading-row">
          <div>
            <p className="eyebrow">FIND YOUR NEXT STEP</p>
            <h2>Where are you in your real estate career?</h2>
          </div>
          <p className="section-intro">Choose the path that fits where you are now. Course-provider and enrollment details will be connected after our current partner setup is finalized.</p>
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
            <p className="eyebrow eyebrow--light">WHY GREYSON</p>
            <h2 className="light-heading">Education should feel clear, credible, and built around what comes next.</h2>
          </div>
          <div className="principles">
            <article><span>01</span><h3>Clear direction</h3><p>Know what education applies to your stage of licensure without sorting through a maze of options.</p></article>
            <article><span>02</span><h3>Professional standard</h3><p>A polished learning experience designed to feel as serious as the career you are building.</p></article>
            <article><span>03</span><h3>Human guidance</h3><p>Real-estate education presented with context, not just another catalog of course links.</p></article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container instructor-panel">
          <div className="portrait-placeholder" aria-label="Instructor portrait placeholder"><span>INSTRUCTOR<br/>PORTRAIT</span></div>
          <div>
            <p className="eyebrow">YOUR GUIDE</p>
            <h2>Real estate education with an instructor’s perspective.</h2>
            <p>Greyson Institute was created by a Florida real estate instructor who wanted the online education experience to be easier to navigate, more professional, and more useful from the very first click.</p>
            <p className="muted">Instructor name, credentials, biography, and photo will be inserted here before launch.</p>
            <Link className="text-link" href="/about">About Greyson Institute <span>→</span></Link>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container centered-callout">
          <BrandMark compact />
          <p className="eyebrow">GREYSON INSTITUTE</p>
          <h2>Start with the right course. Build from there.</h2>
          <p>Explore the education paths we’re preparing for launch.</p>
          <Link className="button" href="/courses">View Course Paths</Link>
        </div>
      </section>
    </>
  );
}
