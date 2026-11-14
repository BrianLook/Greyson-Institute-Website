"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";

const FORM_ENDPOINT = "https://formspree.io/f/xgavkvzg";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "success") {
      successRef.current?.focus();
    }
  }, [status]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Form submission failed.");
      }

      window.gtag?.("event", "generate_lead", {
        method: "contact_form",
      });

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        tabIndex={-1}
        style={{
          border: "1px solid rgba(17, 23, 23, 0.28)",
          background: "#f5f0e7",
          padding: "clamp(32px, 5vw, 52px)",
        }}
      >
        <p className="eyebrow">MESSAGE SENT</p>

        <h2
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            marginBottom: "18px",
          }}
        >
          Thank you for reaching out.
        </h2>

        <p
          style={{
            color: "#6e6b65",
            lineHeight: 1.75,
            marginBottom: "28px",
          }}
        >
          Your message has been sent to Greyson Institute. We’ll review your
          question and get back to you as soon as possible.
        </p>

        <p
          style={{
            color: "#4d4b46",
            lineHeight: 1.65,
            margin: "0 0 16px",
          }}
        >
          While you wait, you can check your likely Florida education
          requirement or compare available courses. There&apos;s no need to
          submit your question again.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <Link className="button" href="/find-my-path">
            Find My Education Path →
          </Link>
          <Link
            href="/courses#choose-your-course"
            style={{
              minHeight: "48px",
              padding: "12px 18px",
              border: "1px solid #111717",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
              fontWeight: 650,
              lineHeight: 1.5,
              textAlign: "center",
            }}
          >
            Compare Courses →
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setStatus("idle")}
          style={{
            display: "inline-block",
            marginTop: "24px",
            padding: 0,
            border: 0,
            background: "transparent",
            color: "#111717",
            fontSize: "14px",
            fontWeight: 650,
            cursor: "pointer",
            textDecoration: "underline",
            textUnderlineOffset: "4px",
          }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-busy={status === "submitting"}
      style={{
        border: "1px solid rgba(17, 23, 23, 0.28)",
        background: "#f5f0e7",
        padding: "clamp(32px, 5vw, 52px)",
      }}
    >
      <input
        type="hidden"
        name="subject"
        value="Greyson Institute Inquiry — {{ help_with }}"
      />

      <input
        type="hidden"
        name="source"
        value="greysoninstitute.com contact form"
      />

      <p className="eyebrow">SEND A MESSAGE</p>

      <h2
        style={{
          fontSize: "clamp(2rem, 4vw, 3rem)",
          marginBottom: "14px",
        }}
      >
        How can we help?
      </h2>

      <p
        style={{
          color: "#6e6b65",
          fontSize: "0.85rem",
          lineHeight: 1.6,
          margin: "0 0 30px",
        }}
      >
        Fields identified as required must be completed before submitting.
      </p>

      <div
        style={{
          display: "grid",
          gap: "22px",
        }}
      >
        <label>
          <span style={labelStyle}>
            Name{" "}
            <span style={requiredStyle}>(required)</span>
          </span>

          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            style={fieldStyle}
          />
        </label>

        <label>
          <span style={labelStyle}>
            Email{" "}
            <span style={requiredStyle}>(required)</span>
          </span>

          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            style={fieldStyle}
          />
        </label>

        <label>
          <span style={labelStyle}>
            State{" "}
            <span style={optionalStyle}>(optional)</span>
          </span>

          <input
            type="text"
            name="state"
            autoComplete="address-level1"
            style={fieldStyle}
          />
        </label>

        <label>
          <span style={labelStyle}>
            What do you need help with?{" "}
            <span style={requiredStyle}>(required)</span>
          </span>

          <select
            name="help_with"
            required
            defaultValue=""
            style={fieldStyle}
          >
            <option value="" disabled>
              Select an option
            </option>

            <option value="First license">
              Getting my first license
            </option>

            <option value="Exam preparation">
              Exam preparation
            </option>

            <option value="Post-license education">
              Post-license education
            </option>

            <option value="Continuing education">
              Continuing education
            </option>

            <option value="Timeshare or vacation ownership education">
              Timeshare or vacation ownership education
            </option>

            <option value="Instructor continuing education">
              Instructor continuing education
            </option>

            <option value="Choosing a course">
              Help choosing the right course
            </option>

            <option value="Broker education">
              Becoming a broker
            </option>

            <option value="License reactivation">
              License reactivation
            </option>

            <option value="General question">
              General question
            </option>
          </select>
        </label>

        <label>
          <span style={labelStyle}>
            Message{" "}
            <span style={requiredStyle}>(required)</span>
          </span>

          <textarea
            name="message"
            required
            rows={7}
            style={{
              ...fieldStyle,
              resize: "vertical",
              minHeight: "160px",
            }}
          />
        </label>

        {status === "error" && (
          <p
            role="alert"
            aria-live="assertive"
            style={{
              color: "#8d2f2f",
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            We weren’t able to send your message. Please try again or email{" "}
            <a
              href="mailto:support@greysoninstitute.com"
              style={{
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              support@greysoninstitute.com
            </a>
            {" "}or call{" "}
            <a
              href="tel:+13213242418"
              style={{
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              321-324-2418
            </a>
            .
          </p>
        )}

        <button
          className="button"
          type="submit"
          disabled={status === "submitting"}
          aria-disabled={status === "submitting"}
          style={{
            width: "fit-content",
            opacity: status === "submitting" ? 0.65 : 1,
            cursor: status === "submitting" ? "wait" : "pointer",
          }}
        >
          {status === "submitting" ? "Sending..." : "Send Message"}
        </button>

        <p
          style={{
            color: "#6e6b65",
            fontSize: "0.78rem",
            lineHeight: 1.65,
            margin: 0,
          }}
        >
          By submitting this form, you are contacting Greyson Institute about
          real estate education and related support. Information submitted
          through this form is processed in accordance with our{" "}
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
          .
        </p>
      </div>
    </form>
  );
}

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  fontSize: "0.78rem",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
};

const requiredStyle = {
  color: "#5d5043",
  fontSize: "0.72rem",
  fontWeight: 600,
  letterSpacing: "0.04em",
  textTransform: "none" as const,
};

const optionalStyle = {
  color: "#5d5043",
  fontSize: "0.72rem",
  fontWeight: 600,
  letterSpacing: "0.04em",
  textTransform: "none" as const,
};

const fieldStyle = {
  width: "100%",
  minHeight: "50px",
  padding: "12px 14px",
  border: "2px solid #6f6b64",
  background: "#fbf8f2",
  color: "#111717",
  borderRadius: 0,
  outline: "none",
  fontFamily: "inherit",
  fontSize: "1rem",
};
