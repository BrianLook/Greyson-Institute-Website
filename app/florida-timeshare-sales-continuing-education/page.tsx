import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GuideStructuredData } from "@/components/GuideStructuredData";

const pageTitle = "Florida Timeshare Sales & Vacation Ownership License Renewal";
const pageDescription =
  "Florida timeshare and vacation ownership sales professionals: compare 14-hour continuing education, 45-hour first-renewal post-license, and 60-hour broker post-license pathways.";
const pagePath = "/florida-timeshare-sales-continuing-education";

export const metadata: Metadata = {
  title: "Florida Timeshare Sales Continuing Education | Greyson Institute",
  description: pageDescription,
  alternates: { canonical: pagePath },
};

const pathways = [
  {
    hours: "14",
    eyebrow: "SECOND & LATER RENEWALS",
    title: "I need regular license renewal CE.",
    detail:
      "For eligible sales associates, broker associates, and brokers who have already met their first-renewal requirements.",
    coursework: "3 Core Law + 3 Ethics & Business Practices + 8 specialty",
    href: "/florida-14-hour-real-estate-continuing-education#choose-ce-option",
    action: "Compare 14-Hour CE Packages",
  },
  {
    hours: "45",
    eyebrow: "FIRST SALES ASSOCIATE RENEWAL",
    title: "This is my first license renewal.",
    detail:
      "New Florida sales associates generally need approved post-license education before their initial license expiration.",
    coursework: "45-hour post-license education—not the usual 14-hour CE",
    href: "/florida-45-hour-post-license-requirements#choose-post-license-package",
    action: "Compare 45-Hour Packages",
  },
  {
    hours: "60",
    eyebrow: "FIRST BROKER RENEWAL",
    title: "I'm renewing a broker license for the first time.",
    detail:
      "Florida brokers and broker associates generally complete broker post-license education before the first broker renewal.",
    coursework: "60-hour broker post-license requirement",
    href: "/florida-60-hour-broker-post-license-requirements#choose-post-license-package",
    action: "Compare 60-Hour Packages",
  },
];

const faqs = [
  {
    question: "I only sell timeshares. Do I still have to renew my Florida real estate license?",
    answer:
      "If you hold a Florida real estate sales associate, broker associate, or broker license, the applicable state renewal and education requirements generally still apply even if all your sales work is in timeshare or vacation ownership. Confirm your exact license record with DBPR.",
  },
  {
    question: "Isn't my next renewal always just 14 hours?",
    answer:
      "Not always. The initial renewal generally requires 45 hours of post-license education for a sales associate or 60 hours for a broker. Standard 14-hour continuing education generally begins after the first renewal. License status, exemptions, and renewal history matter.",
  },
  {
    question: "Do timeshare sales agents have to buy the REALTOR package?",
    answer:
      "No—not solely because they sell vacation ownership. REALTOR association membership is different from having a Florida real estate license. If you only need ordinary Florida 14-hour CE, the basic approved package may fit. Choose REALTOR-related extras only when relevant to your own requirements.",
  },
  {
    question: "Does this apply to marketing representatives who just book resort tours?",
    answer:
      "Not necessarily. Florida law includes an exemption for solicitors engaged only in solicitation of prospective purchasers. Your particular duties and whether you hold a real estate license determine which rules apply. Verify with DBPR and your employer.",
  },
  {
    question: "What if my license is inactive or I missed a deadline?",
    answer:
      "Do not buy the standard CE package assuming it will reactivate the license. The required steps depend on your license type, renewal history, and how long the license has been inactive. Review your live DBPR record and Greyson's reactivation guide first.",
  },
  {
    question: "Are the courses provided by my resort company?",
    answer:
      "No. Greyson Institute is independent of resort developers, hotel brands, and vacation ownership employers. The CE Shop provides the education, course support, and checkout; Greyson helps you identify and compare the appropriate paths.",
  },
];

export default function FloridaTimeshareSalesEducationPage() {
  return (
    <section className="page-hero timeshare-page">
      <GuideStructuredData
        title={pageTitle}
        description={pageDescription}
        path={pagePath}
        datePublished="2026-11-13"
        dateModified="2026-11-13"
      />

      <div className="container" style={{ maxWidth: "1120px", minWidth: 0 }}>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Courses", href: "/courses" },
            { label: "Vacation Ownership Professionals", href: pagePath, current: true },
          ]}
        />

        <header className="timeshare-hero">
          <div className="timeshare-hero__content">
            <p className="eyebrow eyebrow--light">
              FOR FLORIDA TIMESHARE &amp; VACATION OWNERSHIP SALES PROFESSIONALS
            </p>
            <h1>
              You sell vacations.
              <span>Your license still matters.</span>
            </h1>
            <p className="timeshare-hero__lead">
              Your career may be in resort sales, owner updates, or vacation
              ownership—not traditional home sales. But your Florida real
              estate license still comes with renewal responsibilities.
              Greyson Institute helps you find the right education without
              digging through courses that may not apply to you.
            </p>
            <div className="timeshare-hero__actions">
              <Link href="#choose-vacation-ownership-path">
                Find My Renewal Course →
              </Link>
              <Link href="/check-florida-real-estate-license-expiration">
                Check My Florida License →
              </Link>
            </div>
          </div>
        </header>

        <div className="timeshare-intro">
          <p className="eyebrow">YOUR INDUSTRY. YOUR FLORIDA LICENSE.</p>
          <h2>
            Working in vacation ownership doesn't eliminate your real estate
            education requirements.
          </h2>
          <p>
            Florida generally requires sellers of timeshare plans to hold an
            appropriate real estate license, subject to statutory exceptions.
            If you hold a Florida sales associate or broker license, your
            continuing-education path depends on the <strong>license you hold,
            whether this is your first renewal, and your current DBPR
            status</strong>—not whether you list homes on the MLS.
          </p>
          <p className="timeshare-intro__note">
            This resource is for licensed sales professionals; not every
            resort employee or solicitation-only marketer is required to
            hold a real estate license.
          </p>
        </div>

        <section
          id="choose-vacation-ownership-path"
          className="timeshare-chooser"
          aria-labelledby="timeshare-chooser-heading"
        >
          <p className="eyebrow">LET'S MAKE THIS SIMPLE</p>
          <h2 id="timeshare-chooser-heading">Which renewal are you completing?</h2>
          <p className="timeshare-chooser__lead">
            Choose the one that matches your real estate license history.
            We'll take you to Greyson's specific course comparison, where
            you can view the appropriate CE Shop options and current checkout
            details before enrolling.
          </p>
          <div className="timeshare-paths">
            {pathways.map((item) => (
              <article className="timeshare-path" key={item.hours}>
                <p className="eyebrow timeshare-path__eyebrow">{item.eyebrow}</p>
                <div className="timeshare-path__hours">
                  <span>{item.hours}</span>
                  <small>HOURS</small>
                </div>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
                <p className="timeshare-path__details">{item.coursework}</p>
                <Link href={item.href}>{item.action} →</Link>
              </article>
            ))}
          </div>
          <p className="timeshare-chooser__note">
            Not sure which renewal you're on?{" "}
            <Link href="/find-my-path">Let Greyson help find your likely path →</Link>{" "}
            Always verify your live DBPR license information before purchasing.
          </p>
        </section>

        <div className="timeshare-insights">
          <article>
            <p className="eyebrow">TIMESHARE SALES IS STILL REAL ESTATE</p>
            <h2>You don't need to sell houses to have a Florida renewal deadline.</h2>
            <p>
              Whether you're in a resort sales gallery or an owner-update
              environment, your state licensing obligations generally follow
              the real estate license you actually hold.
            </p>
          </article>
          <article>
            <p className="eyebrow">ONLY BUY WHAT YOU NEED</p>
            <h2>You don't automatically need a REALTOR-specific package.</h2>
            <p>
              A Florida real estate license and REALTOR association
              membership are different. If you only need the standard
              14-hour state CE requirement, start with the basic approved
              package and compare any extras before buying.
            </p>
          </article>
        </div>

        <div className="timeshare-community">
          <p className="eyebrow">BUILT WITH YOUR INDUSTRY IN MIND</p>
          <h2>From the sales gallery to the owner workshop.</h2>
          <p>
            If you work in the vacation ownership world—whether you're familiar
            with Disney Vacation Club, Marriott Vacation Club, Hilton Grand
            Vacations, Wyndham, Westgate, or another resort sales
            organization—this education guide was written with your work
            in mind.
          </p>
          <p className="timeshare-community__disclaimer">
            The companies named above are examples of the vacation ownership
            industry only. Greyson Institute is an independent education
            guidance website and is not affiliated with, sponsored by, or
            endorsed by any of those companies.
          </p>
        </div>

        <div className="timeshare-verify">
          <div>
            <p className="eyebrow eyebrow--light">BEFORE YOU ENROLL</p>
            <h2 className="light-heading">
              Your expiration date decides your deadline. Your renewal
              history helps decide your course.
            </h2>
            <p>
              Check your official DBPR license record, then choose the
              correct education path. If your license is inactive or your
              first-renewal deadline has passed, don't guess.
            </p>
          </div>
          <div className="timeshare-verify__actions">
            <Link href="/check-florida-real-estate-license-expiration">
              Check My License →
            </Link>
            <Link href="/florida-real-estate-license-reactivation">
              Inactive? Review Reactivation →
            </Link>
          </div>
        </div>

        <section className="timeshare-faq" aria-labelledby="timeshare-faq-heading">
          <p className="eyebrow">COMMON QUESTIONS</p>
          <h2 id="timeshare-faq-heading">Florida timeshare salesperson CE FAQ</h2>
          <div>
            {faqs.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="timeshare-official">
          <p className="eyebrow">OFFICIAL FLORIDA SOURCES</p>
          <h2>Verify the requirements that apply to you.</h2>
          <p>
            This guide is educational and isn't a determination of your
            individual licensing status. State requirements and provider
            course offerings can change.
          </p>
          <div>
            <a
              href="https://www.flsenate.gov/Laws/Statutes/2026/721.20"
              target="_blank"
              rel="noopener noreferrer"
            >
              Florida Statute 721.20 — Timeshare licensing &amp; exceptions ↗
            </a>
            <a
              href="https://www2.myfloridalicense.com/real-estate-commission/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Florida DBPR — Sales Associate &amp; Broker renewals ↗
            </a>
            <a
              href="https://www.flsenate.gov/Laws/Statutes/2026/475.182"
              target="_blank"
              rel="noopener noreferrer"
            >
              Florida Statute 475.182 — Continuing education ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
