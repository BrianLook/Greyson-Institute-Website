import {
  getCeShopCourseUrl,
  type CeShopCourseKey,
} from "@/lib/ce-shop-partner";

type PartnerEnrollmentButtonProps = {
  course: CeShopCourseKey;
  label?: string;
  pendingLabel?: string;
  dark?: boolean;
};

export function PartnerEnrollmentButton({
  course,
  label = "Enroll through The CE Shop →",
  pendingLabel = "Enrollment link coming soon",
  dark = false,
}: PartnerEnrollmentButtonProps) {
  const href = getCeShopCourseUrl(course);

  if (!href) {
    return (
      <span
        aria-disabled="true"
        style={{
          minHeight: "48px",
          padding: "0 20px",
          border: dark
            ? "1px solid rgba(245, 240, 231, 0.62)"
            : "1px solid rgba(17, 23, 23, 0.28)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          color: dark
            ? "rgba(245, 240, 231, 0.72)"
            : "#6e6b65",
          fontSize: "14px",
          fontWeight: 650,
          letterSpacing: "0.03em",
          textAlign: "center",
          cursor: "not-allowed",
        }}
      >
        {pendingLabel}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      style={{
        minHeight: "48px",
        padding: "0 20px",
        border: dark
          ? "1px solid #f5f0e7"
          : "1px solid #111717",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: dark
          ? "transparent"
          : "#111717",
        color: dark
          ? "#f5f0e7"
          : "#f5f0e7",
        textDecoration: "none",
        fontSize: "14px",
        fontWeight: 700,
        letterSpacing: "0.03em",
        textAlign: "center",
      }}
    >
      {label}
    </a>
  );
}
