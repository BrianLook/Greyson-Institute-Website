"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { BrandLockup } from "./BrandMark";

export function SiteHeader() {
  const menuRef = useRef<HTMLDetailsElement>(null);

  function closeMenu() {
    if (menuRef.current) {
      menuRef.current.open = false;
    }
  }

  useEffect(() => {
    function handleOutsideClick(event: PointerEvent) {
      const menu = menuRef.current;

      if (
        menu?.open &&
        event.target instanceof Node &&
        !menu.contains(event.target)
      ) {
        menu.open = false;
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMenu();
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
          }}
        >
          <span>
            Not sure which course you need? We’ll point you to the right one.
          </span>

          <Link
            href="/courses#find-your-path"
            style={{
              color: "#c6aa85",
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
            onClick={closeMenu}
          >
            Find your path →
          </Link>
        </div>
      </div>

      <div className="container header-inner">
        <Link
          href="/"
          className="header-brand"
          aria-label="Greyson Institute home"
          onClick={closeMenu}
        >
          <BrandLockup />
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link href="/courses">Courses</Link>
          <Link href="/about">About</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <Link className="button button--small" href="/courses">
          Explore Courses
        </Link>

        <details className="mobile-menu" ref={menuRef}>
          <summary aria-label="Open navigation menu">
            <span className="mobile-menu__icon" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </summary>

          <nav className="mobile-menu__panel" aria-label="Mobile navigation">
            <Link href="/courses" onClick={closeMenu}>
              Courses
            </Link>

            <Link href="/about" onClick={closeMenu}>
              About
            </Link>

            <Link href="/faq" onClick={closeMenu}>
              FAQ
            </Link>

            <Link href="/contact" onClick={closeMenu}>
              Contact
            </Link>

            <Link href="/privacy" onClick={closeMenu}>
              Privacy
            </Link>

            <Link href="/terms" onClick={closeMenu}>
              Terms
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
