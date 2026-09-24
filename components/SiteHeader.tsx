"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { BrandLockup } from "./BrandMark";

const guidePaths = [
  "/guides",
  "/how-to-get-a-florida-real-estate-license",
  "/how-much-does-a-florida-real-estate-license-cost",
  "/how-long-does-it-take-to-get-a-florida-real-estate-license",
  "/florida-63-hour-real-estate-pre-licensing-course",
  "/florida-real-estate-exam",
  "/what-happens-after-you-pass-the-florida-real-estate-exam",
  "/florida-45-hour-post-license-requirements",
  "/florida-14-hour-real-estate-continuing-education",
];

export function SiteHeader() {
  const menuRef = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  function closeMenu(returnFocus = false) {
    const menu = menuRef.current;

    if (menu) {
      menu.open = false;
      setIsOpen(false);
    }

    if (returnFocus) {
      window.requestAnimationFrame(() => {
        summaryRef.current?.focus();
      });
    }
  }

  function handleToggle() {
    setIsOpen(Boolean(menuRef.current?.open));
  }

  function handleNavClick() {
    closeMenu(false);
  }

  function isCurrentPage(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  function isGuidesSection() {
    return guidePaths.some(
      (path) => pathname === path || pathname.startsWith(`${path}/`),
    );
  }

  useEffect(() => {
    function handleOutsideClick(event: PointerEvent) {
      const menu = menuRef.current;

      if (
        menu?.open &&
        event.target instanceof Node &&
        !menu.contains(event.target)
      ) {
        closeMenu(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && menuRef.current?.open) {
        event.preventDefault();
        closeMenu(true);
      }
    }

    document.addEventListener("pointerdown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <header className="site-header">
      <style>
        {`
          /*
            At narrow effective viewport widths, including desktop browsers
            zoomed to 400%, the header becomes part of the normal page flow
            instead of remaining pinned over the content.
          */
          @media (max-width: 640px) {
            .site-header {
              position: static;
            }
          }
        `}
      </style>

      <div
        style={{
          background: "#1f2d30",
          color: "#f5f0e7",
          borderBottom: "1px solid rgba(245, 240, 231, 0.14)",
        }}
      >
        <div
          className="container"
          style={{
            minHeight: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            textAlign: "center",
            fontSize: "12px",
            lineHeight: 1.4,
            paddingTop: "7px",
            paddingBottom: "7px",
            flexWrap: "wrap",
          }}
        >
          <span>
            Not sure which course you need? We’ll point you to the right one.
          </span>

          <a
            href="/courses#find-your-path"
            style={{
              color: "#d6bd9c",
              fontWeight: 600,
              whiteSpace: "nowrap",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
            onClick={handleNavClick}
          >
            Find your path →
          </a>
        </div>
      </div>

      <div className="container header-inner">
        <Link
          href="/"
          className="header-brand"
          aria-label="Greyson Institute home"
          aria-current={isCurrentPage("/") ? "page" : undefined}
          onClick={handleNavClick}
        >
          <BrandLockup />
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link
            href="/courses"
            aria-current={isCurrentPage("/courses") ? "page" : undefined}
          >
            Courses
          </Link>

          <Link
            href="/guides"
            aria-current={isGuidesSection() ? "page" : undefined}
          >
            Guides
          </Link>

          <Link
            href="/check-florida-real-estate-license-expiration"
            aria-current={
              isCurrentPage("/check-florida-real-estate-license-expiration")
                ? "page"
                : undefined
            }
          >
            License Check
          </Link>

          <Link
            href="/about"
            aria-current={isCurrentPage("/about") ? "page" : undefined}
          >
            About
          </Link>

          <Link
            href="/faq"
            aria-current={isCurrentPage("/faq") ? "page" : undefined}
          >
            FAQ
          </Link>

          <Link
            href="/contact"
            aria-current={isCurrentPage("/contact") ? "page" : undefined}
          >
            Contact
          </Link>
        </nav>

        <Link
          className="button button--small"
          href="/courses"
          aria-current={isCurrentPage("/courses") ? "page" : undefined}
        >
          Explore Courses
        </Link>

        <details
          className="mobile-menu"
          ref={menuRef}
          onToggle={handleToggle}
        >
          <summary
            ref={summaryRef}
            aria-label={
              isOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            <span className="mobile-menu__icon" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </summary>

          <nav
            id="mobile-navigation"
            className="mobile-menu__panel"
            aria-label="Mobile navigation"
          >
            <Link
              href="/courses"
              aria-current={isCurrentPage("/courses") ? "page" : undefined}
              onClick={handleNavClick}
            >
              Courses
            </Link>

            <Link
              href="/guides"
              aria-current={isGuidesSection() ? "page" : undefined}
              onClick={handleNavClick}
            >
              Guides
            </Link>

            <Link
              href="/check-florida-real-estate-license-expiration"
              aria-current={
                isCurrentPage("/check-florida-real-estate-license-expiration")
                  ? "page"
                  : undefined
              }
              onClick={handleNavClick}
            >
              License Check
            </Link>

            <Link
              href="/about"
              aria-current={isCurrentPage("/about") ? "page" : undefined}
              onClick={handleNavClick}
            >
              About
            </Link>

            <Link
              href="/faq"
              aria-current={isCurrentPage("/faq") ? "page" : undefined}
              onClick={handleNavClick}
            >
              FAQ
            </Link>

            <Link
              href="/contact"
              aria-current={isCurrentPage("/contact") ? "page" : undefined}
              onClick={handleNavClick}
            >
              Contact
            </Link>

            <Link
              href="/privacy"
              aria-current={isCurrentPage("/privacy") ? "page" : undefined}
              onClick={handleNavClick}
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              aria-current={isCurrentPage("/terms") ? "page" : undefined}
              onClick={handleNavClick}
            >
              Terms
            </Link>

            <Link
              href="/accessibility"
              aria-current={
                isCurrentPage("/accessibility") ? "page" : undefined
              }
              onClick={handleNavClick}
            >
              Accessibility
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
