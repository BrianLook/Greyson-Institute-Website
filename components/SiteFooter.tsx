import Link from "next/link";
import { BrandLockup } from "./BrandMark";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <BrandLockup inverse />
          <p className="footer-copy">A clearer path through real estate education — from first license to what comes next.</p>
        </div>
        <div className="footer-links">
          <Link href="/courses">Courses</Link>
          <Link href="/about">About</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="footer-links">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <span>BrightPath Education Group, LLC</span>
        </div>
      </div>
      <div className="container footer-bottom">© {new Date().getFullYear()} Greyson Institute. All rights reserved.</div>
    </footer>
  );
}
