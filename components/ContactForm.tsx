"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

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
          border: "1px solid rgba(17, 23, 23, 0.16)",
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

        <button
          type="button"
          className="button"
          onClick={() => setStatus("idle")}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-busy={status === "submitting"}
      style={{
        border: "1px solid rgba(17, 23, 23, 0.16)",
        background: "#f5f0e7",
        padding: "clamp(32px, 5vw, 52px)",
      }}
    >
      <input
        type="hidden"
        name="_subject"
        value="New Greyson Institute Website Inquiry"
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
          marginBottom: "30px",
        }}
      >
        How can we help?
      </h2>

      <div
        style={{
          display: "grid",
          gap: "22px",
        }}
      >
        <label>
          <span style={labelStyle}>Name</span>

          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            style={fieldStyle}
          />
        </label>

        <label>
          <span style={labelStyle}>Email</span>

          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            style={fieldStyle}
          />
        </label>

        <label>
          <span style={labelStyle}>State</span>

          <input
            type="text"
            name="state"
            autoComplete="address-level1"
            placeholder="Florida"
            style={fieldStyle}
          />
        </label>

        <label>
          <span style={labelStyle}>What do you need help with?</span>

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
          <span style={labelStyle}>Message</span>

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
              }}
            >
              support@greysoninstitute.com
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

const fieldStyle = {
  width: "100%",
  minHeight: "50px",
  padding: "12px 14px",
  border: "1px solid rgba(17, 23, 23, 0.22)",
  background: "#fbf8f2",
  color: "#111717",
  borderRadius: 0,
  outline: "none",
  fontFamily: "inherit",
  fontSize: "1rem",
};
