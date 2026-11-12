/**
 * Records outbound CE Shop interest in GA4 only when the visitor
 * explicitly allows optional analytics on Greyson Institute.
 *
 * Never include names, email addresses, license numbers, or other PII.
 */
type AffiliateClickSource =
  | "course_button"
  | "automated_banner"
  | "find_my_path";

const ANALYTICS_CONSENT_KEY = "greyson-analytics-consent";
const GA_DISABLE_KEY = "ga-disable-G-PSR0D5H2CR";

export function trackCeShopClick(
  courseCategory: string,
  clickSource: AffiliateClickSource,
) {
  if (typeof window === "undefined") return;

  try {
    if (
      window.localStorage.getItem(ANALYTICS_CONSENT_KEY) !==
      "accepted"
    ) {
      return;
    }
  } catch {
    // If consent cannot be read, do not track.
    return;
  }

  const windowWithAnalytics = window as Window & {
    gtag?: (...args: unknown[]) => void;
    [GA_DISABLE_KEY]?: boolean;
  };

  if (windowWithAnalytics[GA_DISABLE_KEY]) return;

  if (typeof windowWithAnalytics.gtag !== "function") return;

  windowWithAnalytics.gtag("event", "ce_shop_click", {
    course_category: courseCategory,
    click_source: clickSource,
  });
}
