"use client";

import { useState } from "react";
import {
  canCreateLicenseCalendar,
  downloadLicenseRenewalCalendar,
} from "@/lib/florida-license-calendar";

type LicenseRenewalCalendarButtonProps = {
  licenseNumber: string;
  licenseeName: string;
  expirationDate: string;
};

export function LicenseRenewalCalendarButton({
  licenseNumber,
  licenseeName,
  expirationDate,
}: LicenseRenewalCalendarButtonProps) {
  const [
    status,
    setStatus,
  ] = useState<
    "idle" | "success" | "error"
  >("idle");

  const canCreate =
    canCreateLicenseCalendar(
      expirationDate,
    );

  if (!canCreate) {
    return null;
  }

  function handleCalendarDownload() {
    setStatus("idle");

    const created =
      downloadLicenseRenewalCalendar({
        licenseNumber,
        licenseeName,
        expirationDate,
      });

    if (created) {
      setStatus("success");
      return;
    }

    setStatus("error");
  }

  return (
    <div className="license-calendar-reminder">
      <style>
        {`
          .license-calendar-reminder {
            margin: 4px 28px 26px;
            padding: 22px;
            border: 1px solid rgba(17, 23, 23, 0.14);
            background: #faf7f1;
          }

          .license-calendar-reminder-title {
            margin: 0 0 7px;
            color: #111717;
            font-family: var(--font-serif), Georgia, serif;
            font-size: 1.4rem;
          }

          .license-calendar-reminder-copy {
            max-width: 700px;
            margin: 0;
            color: #4d4b46;
            font-size: 0.87rem;
            line-height: 1.65;
          }

          .license-calendar-reminder-button {
            min-height: 46px;
            margin-top: 16px;
            padding: 0 18px;
            border: 1px solid #111717;
            background: #faf7f1;
            color: #111717;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font: inherit;
            font-size: 13px;
            font-weight: 650;
            cursor: pointer;
            transition:
              background-color 0.2s ease,
              color 0.2s ease,
              transform 0.2s ease,
              box-shadow 0.2s ease;
          }

          .license-calendar-reminder-note {
            margin: 12px 0 0;
            color: #6e6b65;
            font-size: 0.78rem;
            line-height: 1.55;
          }

          .license-calendar-reminder-success {
            margin: 14px 0 0;
            padding: 12px 14px;
            border-left: 3px solid #7d5f3a;
            background: #eee6d9;
            color: #3f3d38;
            font-size: 0.84rem;
            line-height: 1.55;
          }

          .license-calendar-reminder-error {
            margin: 14px 0 0;
            padding: 12px 14px;
            border-left: 3px solid #8a2d25;
            background: rgba(138, 45, 37, 0.06);
            color: #6f261f;
            font-size: 0.84rem;
            line-height: 1.55;
          }

          @media (hover: hover) and (pointer: fine) {
            .license-calendar-reminder-button:hover {
              background: #111717;
              color: #f5f0e7;
              transform: translateY(-2px);
              box-shadow:
                0 10px 24px
                rgba(17, 23, 23, 0.12);
            }
          }

          @media (max-width: 650px) {
            .license-calendar-reminder {
              margin-left: 18px;
              margin-right: 18px;
            }

            .license-calendar-reminder-button {
              width: 100%;
            }
          }
        `}
      </style>

      <p className="eyebrow">
        LICENSE RENEWAL REMINDERS
      </p>

      <h3 className="license-calendar-reminder-title">
        Add your renewal deadline to your calendar.
      </h3>

      <p className="license-calendar-reminder-copy">
        Create a calendar event for your current
        Florida real estate license expiration date,
        with advance reminders scheduled before the
        deadline.
      </p>

      <button
        type="button"
        className="license-calendar-reminder-button"
        onClick={
          handleCalendarDownload
        }
      >
        Add Renewal Reminders to My Calendar →
      </button>

      <p className="license-calendar-reminder-note">
        Greyson creates a standard .ics calendar
        file on your device. The reminder reflects
        the expiration date shown in the DBPR record
        when you add it. Verify your current record
        again after renewing.
      </p>

      {status === "success" && (
        <p
          className="license-calendar-reminder-success"
          aria-live="polite"
        >
          Your calendar file is ready. Open the
          downloaded file to add the renewal event
          and available reminders to your calendar.
        </p>
      )}

      {status === "error" && (
        <p
          className="license-calendar-reminder-error"
          role="alert"
        >
          Greyson could not create the calendar file
          from this expiration date. Please verify
          the current expiration date with Florida
          DBPR.
        </p>
      )}
    </div>
  );
}
