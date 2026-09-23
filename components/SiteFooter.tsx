"use client";

import Link from "next/link";
import { BrandLockup } from "./BrandMark";

const OPEN_SETTINGS_EVENT = "greyson-open-analytics-settings";

export function SiteFooter() {
  function openAnalyticsSettings() {
    window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
  }

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <BrandLockup inverse />

          <p className="footer-copy">
            A clearer path through real estate education — from first license
            to what comes next.
          </p>

          <a
            href="mailto:support@greysoninstitute.com"
            style={{
              display: "inline-block",
              marginTop: "10px",
              color: "rgba(245, 240, 231, 0.82)",
              fontSize: "13px",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
          >
            support@greysoninstitute.com
          </a>
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
          <Link href="/accessibility">Accessibility</Link>

          <button
            type="button"
            onClick={openAnalyticsSettings}
            style={{
              appearance: "none",
              width: "fit-content",
              minHeight: "24px",
              padding: 0,
              margin: 0,
              border: 0,
              background: "transparent",
              color: "inherit",
              font: "inherit",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              textAlign: "left",
            }}
          >
            Analytics Settings
          </button>

          <span>
            Greyson Institute is operated by BrightPath Education Group, LLC
          </span>
        </div>
      </div>

      <div
        className="container footer-bottom"
        style={{
          color: "#a8a39a",
        }}
      >
        © {new Date().getFullYear()} Greyson Institute. All rights reserved.
      </div>
    </footer>
  );
}
