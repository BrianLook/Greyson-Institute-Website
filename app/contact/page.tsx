import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <section className="page-hero">
      <div className="container narrow">
        <p className="eyebrow">CONTACT</p>
        <h1>Not sure where to begin?</h1>
        <p className="page-lead">Send Greyson Institute a message and we’ll help point you toward the right education path.</p>
        <div className="contact-card">
          <p><strong>Email:</strong> <span className="muted">Add final Greyson Institute email before launch</span></p>
          <p><strong>Business:</strong> BrightPath Education Group, LLC</p>
          <p><strong>Website:</strong> greysoninstitute.com</p>
        </div>
      </div>
    </section>
  );
}
