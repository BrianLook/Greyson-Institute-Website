export const ceShopPartner = {
  providerName: "The CE Shop",
  status: "live" as const,
  coBrandedBaseUrl: "https://greyson.theceshop.com/",
  disclosure: "Education provided by The CE Shop.",
  links: {
    floridaPreLicense63: "https://greyson.theceshop.com/florida/pre-licensing/fl-sales-associate-pre-licensing-cost/",
    floridaPreLicense63CourseOnly: "https://greyson.theceshop.com/online-education/florida/real-estate/sales-associate/pre-licensing/course/63-hr-fl-sales-pre-licensing-course-only-package-3850-18175.html",
    floridaPreLicense63Standard: "https://greyson.theceshop.com/online-education/florida/real-estate/sales-associate/pre-licensing/course/63-hr-fl-real-estate-sales-associate-licensing-standard-package-3622-17392.html",
    floridaPreLicense63Value: "https://greyson.theceshop.com/online-education/florida/real-estate/sales-associate/pre-licensing/course/fl-63-hour-pre-licensing-value-package-2951-13332.html",
    floridaPreLicense63Premium: "https://greyson.theceshop.com/online-education/florida/real-estate/sales-associate/pre-licensing/course/fl-63-hour-pre-licensing-premium-package-2952-13333.html",
    floridaPostLicense45: "https://greyson.theceshop.com/online-education/florida/real-estate/sales-associate/post-licensing/courses.html",
    floridaPostLicense45Package1: "https://greyson.theceshop.com/online-education/florida/real-estate/sales-associate/post-licensing/course/fl-pl-sales-associate-package-2417-10497.html",
    floridaPostLicense45Package2: "https://greyson.theceshop.com/online-education/florida/real-estate/sales-associate/post-licensing/course/45-hr-fl-sales-post-licensing-package-2-3600-17243.html",
    floridaPostLicense45ProPath: "https://greyson.theceshop.com/online-education/florida/real-estate/sales-associate/post-licensing/course/45-hr-fl-sales-post-licensing-package-plus-propath-6258-24579.html",
    floridaContinuingEducation14: "https://greyson.theceshop.com/online-education/florida/real-estate/broker-and-sales-license/continuing-education/courses.html",
    // Individual CE Shop package product URLs retain the Greyson-branded storefront.
    // Product slugs/IDs are shared across CE Shop co-branded storefronts.
    floridaCE14Basic: "https://greyson.theceshop.com/online-education/florida/real-estate/broker-and-sales-license/continuing-education/course/14-hr-fl-ce-package-with-ethics-course-7082-26281.html",
    floridaCE14Realtors: "https://greyson.theceshop.com/online-education/florida/real-estate/broker-and-sales-license/continuing-education/course/14-hr-fl-ce-package-for-realtors-7377-27046.html",
    floridaCE14ProPath: "https://greyson.theceshop.com/online-education/florida/real-estate/broker-and-sales-license/continuing-education/course/14-hr-fl-ce-package-with-ethics-course-plus-professional-development-7083-26282.html",
    // Broker Standard currently goes to the official two-option broker pricing page
    // until The CE Shop confirms a stable individual-product URL.
    floridaBrokerPreLicense72: "https://greyson.theceshop.com/florida/pre-licensing/fl-broker-pre-licensing-cost/",
    floridaBrokerPreLicense72Premium: "https://greyson.theceshop.com/online-education/florida/real-estate/broker/pre-licensing/course/72-hr-fl-broker-pre-licensing-premium-package-4022-19216.html",
    floridaBrokerPostLicense60: "https://greyson.theceshop.com/online-education/florida/real-estate/broker/post-licensing/courses.html",
    floridaBrokerPostLicense60Standard: "https://greyson.theceshop.com/online-education/florida/real-estate/broker/post-licensing/course/60-hr-fl-broker-post-licensing-package-3063-14356.html",
    floridaBrokerPostLicense60ProPath: "https://greyson.theceshop.com/online-education/florida/real-estate/broker/post-licensing/course/60-hr-fl-broker-post-licensing-package-plus-propath-6259-24580.html",
    floridaInstructorCE: "",
    floridaReactivation14: "https://greyson.theceshop.com/online-education/florida/real-estate/broker-and-sales-license/continuing-education/courses.html",
    floridaReactivation28: "https://greyson.theceshop.com/florida/pre-licensing/fl-reinstatement-pre-licensing-cost/",
    floridaExamPrep: "https://greyson.theceshop.com/online-education/florida/real-estate/sales-associate/exam-prep/course/fl-sales-associate-exam-prep-edge-3618-17358.html",
  },
};

export type CeShopCourseKey = keyof typeof ceShopPartner.links;

export function getCeShopCourseUrl(course: CeShopCourseKey) {
  const url = ceShopPartner.links[course].trim();
  return url || null;
}
