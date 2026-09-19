import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <section className="page-hero">
      <div className="container narrow">
        <p className="eyebrow">ABOUT GREYSON INSTITUTE</p>
        <h1>Real estate education should be easier to navigate.</h1>
        <p className="page-lead">Greyson Institute was created to give students a clearer starting point — with professional guidance, an intentional course path, and an online experience that respects their time.</p>
      </div>
      <div className="container about-grid">
        <div className="portrait-placeholder portrait-placeholder--large"><span>INSTRUCTOR<br/>PORTRAIT</span></div>
        <div className="prose-card">
          <h2>Instructor biography</h2>
          <p>This section is intentionally held for your final public biography, Florida instructor credential language, teaching background, and personal reason for creating Greyson Institute.</p>
          <p>We will finalize this copy after reviewing the exact CE Shop partnership model so the site accurately distinguishes your role from the course provider’s role.</p>
        </div>
      </div>
    </section>
  );
}
