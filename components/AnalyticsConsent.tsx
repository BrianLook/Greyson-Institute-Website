"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

const MEASUREMENT_ID = "G-PSR0D5H2CR";
const STORAGE_KEY = "greyson-analytics-consent";
const OPEN_SETTINGS_EVENT = "greyson-open-analytics-settings";
const GA_DISABLE_KEY = `ga-disable-${MEASUREMENT_ID}`;

type ConsentState = "loading" | "accepted" | "declined" | "undecided";

export function AnalyticsConsent() {
  const [consent, setConsent] = useState<ConsentState>("loading");
  const [shouldFocusBanner, setShouldFocusBanner] = useState(false);
  const bannerRef = useRef<HTMLElement>(null);

  function setAnalyticsDisabled(disabled: boolean) {
    (
      window as unknown as Record<string, boolean>
    )[GA_DISABLE_KEY] = disabled;
  }

  useEffect(() => {
    try {
      const savedConsent = window.localStorage.getItem(STORAGE_KEY);

      if (savedConsent === "accepted") {
        setAnalyticsDisabled(false);
        setConsent("accepted");
      } else if (savedConsent === "declined") {
        setAnalyticsDisabled(true);
        setConsent("declined");
      } else {
        setAnalyticsDisabled(true);
        setConsent("undecided");
      }
    } catch {
      setAnalyticsDisabled(true);
      setConsent("undecided");
    }
  }, []);

  useEffect(() => {
    function openAnalyticsSettings() {
      setAnalyticsDisabled(true);
      setShouldFocusBanner(true);
      setConsent("undecided");
    }

    window.addEventListener(
      OPEN_SETTINGS_EVENT,
      openAnalyticsSettings
    );

    return () => {
      window.removeEventListener(
        OPEN_SETTINGS_EVENT,
        openAnalyticsSettings
      );
    };
  }, []);

  useEffect(() => {
    if (consent === "undecided" && shouldFocusBanner) {
      window.requestAnimationFrame(() => {
        bannerRef.current?.focus();
        setShouldFocusBanner(false);
      });
    }
  }, [consent, shouldFocusBanner]);

  function saveConsent(value: "accepted" | "declined") {
    setAnalyticsDisabled(value === "declined");

    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // The choice still applies for the current page even if
      // browser storage is unavailable.
    }

    setConsent(value);
  }

  function allowAnalytics() {
    saveConsent("accepted");
  }

  function declineAnalytics() {
    saveConsent("declined");
  }

  return (
    <>
      {consent === "accepted" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />

          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${MEASUREMENT_ID}');
            `}
          </Script>
        </>
      )}

      {consent === "undecided" && (
        <aside
          ref={bannerRef}
          role="region"
          aria-labelledby="analytics-consent-heading"
          aria-describedby="analytics-consent-description"
          tabIndex={-1}
          style={{
            position: "fixed",
            left: "clamp(12px, 3vw, 24px)",
            right: "clamp(12px, 3vw, 24px)",
            bottom: "clamp(12px, 3vw, 24px)",
            zIndex: 9999,
            maxWidth: "1180px",
            maxHeight: "45vh",
            overflowY: "auto",
            margin: "0 auto",
            background: "#fbf8f2",
            border: "2px solid #1f2d30",
            boxShadow: "0 12px 40px rgba(17, 23, 23, 0.18)",
            padding: "clamp(18px, 4vw, 24px)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "22px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                flex: "1 1 480px",
                minWidth: 0,
              }}
            >
              <h2
                id="analytics-consent-heading"
                style={{
                  margin: "0 0 8px",
                  color: "#111717",
                  fontFamily: "var(--font-serif), Georgia, serif",
                  fontSize: "1.25rem",
                  lineHeight: 1.3,
                }}
              >
                Analytics choices
              </h2>

              <p
                id="analytics-consent-description"
                style={{
                  margin: 0,
                  color: "#4d4b46",
                  fontSize: "0.95rem",
                  lineHeight: 1.7,
                }}
              >
                We use optional analytics cookies to understand how visitors use
                Greyson Institute and improve the website. You can allow or
                decline analytics.{" "}
                <a
                  href="/privacy"
                  style={{
                    color: "#111717",
                    textDecoration: "underline",
                    textDecorationThickness: "1px",
                    textUnderlineOffset: "3px",
                  }}
                >
                  Privacy Policy
                </a>
              </p>
            </div>

            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <button
                type="button"
                onClick={declineAnalytics}
                style={{
                  minWidth: "110px",
                  minHeight: "44px",
                  padding: "10px 18px",
                  border: "2px solid #1f2d30",
                  background: "#fbf8f2",
                  color: "#1f2d30",
                  fontFamily: "inherit",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Decline
              </button>

              <button
                type="button"
                onClick={allowAnalytics}
                style={{
                  minWidth: "150px",
                  minHeight: "44px",
                  padding: "10px 18px",
                  border: "2px solid #1f2d30",
                  background: "#1f2d30",
                  color: "#f5f0e7",
                  fontFamily: "inherit",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Allow Analytics
              </button>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}
