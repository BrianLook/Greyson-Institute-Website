import Link from "next/link";
import { BrandLockup } from "./BrandMark";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="header-brand" aria-label="Greyson Institute home">
          <BrandLockup />
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link href="/courses">Courses</Link>
          <Link href="/about">About</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <Link className="button button--small" href="/courses">Explore Courses</Link>
      </div>
    </header>
  );
}
