"use client";

import { useState, type MouseEvent } from "react";

const dbprLicenseNumberSearch =
  "https://www.myfloridalicense.com/portalsearches/VerifyLicensee?Mode=0&SearchType=SearchByLicenseNumber";

const dbprGeneralSearch =
  "https://www.myfloridalicense.com/portalsearches/VerifyLicensee";

export function FloridaLicenseExpirationCheck() {
  const [licenseNumber, setLicenseNumber] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const cleanedLicenseNumber = licenseNumber.trim().toUpperCase();

  async function handleDbprClick(
    event: MouseEvent<HTMLAnchorElement>,
  ) {
    if (!cleanedLicenseNumber) {
      event.preventDefault();
      setMessage("");
      setError("Enter your Florida real estate license number first.");
      return;
    }

    setError("");

    try {
      await navigator.clipboard.writeText(cleanedLicenseNumber);

      setMessage(
        `License number ${cleanedLicenseNumber} copied. When DBPR opens, choose Search by License Number and paste it into the search field.`,
      );
    } catch {
      setMessage(
        `When DBPR opens, choose Search by License Number and enter ${cleanedLicenseNumber}.`,
      );
    }
  }

  return (
    <div className="fl-license-check">
      <style>
        {`
          .fl-license-check {
            background: #eee6d9;
            border: 1px solid rgba(17, 23, 23, 0.16);
            padding: clamp(30px, 5vw, 50px);
          }

          .fl-license-field-wrap {
            max-width: 680px;
            margin-top: 28px;
          }

          .fl-license-label {
            display: block;
            margin-bottom: 9px;
            color: #111717;
            font-size: 0.78rem;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }

          .fl-license-input {
            width: 100%;
            min-height: 56px;
            border: 1px solid rgba(17, 23, 23, 0.4);
            background: #faf7f1;
            color: #111717;
            padding: 0 16px;
            border-radius: 0;
            font: inherit;
            font-size: 1rem;
            outline: none;
            transition:
              border-color 0.2s ease,
              box-shadow 0.2s ease;
          }

          .fl-license-input:focus {
            border-color: #111717;
            box-shadow: 0 0 0 3px rgba(125, 95, 58, 0.16);
          }

          .fl-license-helper {
            color: #6e6b65;
            font-size: 0.84rem;
            line-height: 1.6;
            margin: 8px 0 0;
          }

          .fl-license-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            margin-top: 22px;
          }

          .fl-license-primary,
          .fl-license-secondary {
            min-height: 50px;
            padding: 0 20px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            font-size: 14px;
            font-weight: 650;
            letter-spacing: 0.03em;
            text-decoration: none;
            transition:
              transform 0.2s ease,
              background-color 0.2s ease,
              color 0.2s ease,
              box-shadow 0.2s ease;
          }

          .fl-license-primary {
            background: #111717;
            border: 1px solid #111717;
            color: #f5f0e7;
          }

          .fl-license-secondary {
            background: transparent;
            border: 1px solid #111717;
            color: #111717;
          }

          .fl-license-message {
            max-width: 760px;
            margin: 18px 0 0;
            padding: 14px 16px;
            background: rgba(255, 255, 255, 0.48);
            border-left: 3px solid #7d5f3a;
            color: #3f3d38;
            font-size: 0.9rem;
            line-height: 1.6;
          }

          .fl-license-error {
            max-width: 680px;
            margin: 12px 0 0;
            color: #8a2d25;
            font-size: 0.88rem;
            font-weight: 600;
          }

          .fl-license-note {
            max-width: 820px;
            margin: 26px 0 0;
            padding-top: 22px;
            border-top: 1px solid rgba(17, 23, 23, 0.14);
            color: #5f5c56;
            font-size: 0.86rem;
            line-height: 1.7;
          }

          @media (hover: hover) and (pointer: fine) {
            .fl-license-primary:hover {
              background: #1f2d30;
              transform: translateY(-3px);
              box-shadow: 0 12px 28px rgba(17, 23, 23, 0.14);
            }

            .fl-license-secondary:hover {
              background: #111717;
              color: #f5f0e7;
              transform: translateY(-3px);
              box-shadow: 0 12px 28px rgba(17, 23, 23, 0.1);
            }
          }

          @media (max-width: 600px) {
            .fl-license-actions {
              display: grid;
              grid-template-columns: 1fr;
            }

            .fl-license-primary,
            .fl-license-secondary {
              width: 100%;
            }
          }
        `}
      </style>

      <p className="eyebrow">CHECK YOUR LICENSE</p>

      <h2
        style={{
          fontSize: "clamp(2rem, 4vw, 3rem)",
          maxWidth: "760px",
          marginBottom: "14px",
        }}
      >
        Find your official Florida real estate license expiration date.
      </h2>

      <p
        style={{
          color: "#4d4b46",
          maxWidth: "800px",
          marginBottom: 0,
        }}
      >
        Enter your Florida real estate license number below. We&apos;ll copy
        it for you and open Florida DBPR&apos;s official live license search so
        you can verify your current status and expiration date.
      </p>

      <div className="fl-license-field-wrap">
        <label
          className="fl-license-label"
          htmlFor="florida-license-number"
        >
          Florida license number
        </label>

        <input
          id="florida-license-number"
          className="fl-license-input"
          type="text"
          value={licenseNumber}
          onChange={(event) => {
            setLicenseNumber(event.target.value);
            setError("");
            setMessage("");
          }}
          placeholder="Example: SL1234567"
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          aria-describedby="florida-license-number-help"
        />

        <p
          id="florida-license-number-help"
          className="fl-license-helper"
        >
          Enter the license number shown on your Florida record, such as an
          SL, BK, or BL license number.
        </p>
      </div>

      {error && (
        <p className="fl-license-error" role="alert">
          {error}
        </p>
      )}

      <div className="fl-license-actions">
        <a
          className="fl-license-primary"
          href={dbprLicenseNumberSearch}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleDbprClick}
        >
          Verify Live on Florida DBPR ↗
        </a>

        <a
          className="fl-license-secondary"
          href={dbprGeneralSearch}
          target="_blank"
          rel="noopener noreferrer"
        >
          I Don&apos;t Know My License Number ↗
        </a>
      </div>

      {message && (
        <p className="fl-license-message" aria-live="polite">
          {message}
        </p>
      )}

      <p className="fl-license-note">
        <strong>Important:</strong> Greyson Institute is not the Florida
        Department of Business and Professional Regulation. The official DBPR
        license record is the source to confirm your current license status and
        expiration date. In this first version, your license number is not
        submitted to Greyson Institute; it is used only in your browser to help
        you complete the official DBPR search.
      </p>
    </div>
  );
}
