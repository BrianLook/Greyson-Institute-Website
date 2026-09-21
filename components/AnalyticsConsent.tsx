"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const MEASUREMENT_ID = "G-PSR0D5H2CR";
const STORAGE_KEY = "greyson-analytics-consent";

type ConsentState = "loading" | "accepted" | "declined" | "undecided";

export function AnalyticsConsent() {
  const [consent, setConsent] = useState<ConsentState>("loading");

  useEffect(() => {
    const savedConsent = window.localStorage.getItem(STORAGE_KEY);

    if (savedConsent === "accepted") {
      setConsent("accepted");
    } else if (savedConsent === "declined") {
      setConsent("declined");
    } else {
      setConsent("undecided");
    }
  }, []);

  function allowAnalytics() {
    window.localStorage.setItem(STORAGE_KEY, "accepted");
    setConsent("accepted");
  }

  function declineAnalytics() {
    window.localStorage.setItem(STORAGE_KEY, "declined");
    setConsent("declined");
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
        <div
          role="dialog"
          aria-label="Analytics cookie preferences"
          style={{
            position: "fixed",
            left: "24px",
            right: "24px",
            bottom: "24px",
            zIndex: 9999,
            maxWidth: "1180px",
            margin: "0 auto",
            background: "#fbf8f2",
            border: "1px solid rgba(17, 23, 23, 0.18)",
            boxShadow: "0 12px 40px rgba(17, 23, 23, 0.16)",
            padding: "22px 24px",
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
                flex: "1 1 520px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  color: "#111717",
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
              }}
            >
              <button
                type="button"
                onClick={declineAnalytics}
                style={{
                  minHeight: "44px",
                  padding: "10px 18px",
                  border: "1px solid #1f2d30",
                  background: "transparent",
                  color: "#1f2d30",
                  fontFamily: "inherit",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Decline
              </button>

              <button
                type="button"
                onClick={allowAnalytics}
                style={{
                  minHeight: "44px",
                  padding: "10px 18px",
                  border: "1px solid #1f2d30",
                  background: "#1f2d30",
                  color: "#f5f0e7",
                  fontFamily: "inherit",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Allow Analytics
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
