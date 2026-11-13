export const ceShopPartner = {
  providerName: "The CE Shop",
  status: "live" as const,
  coBrandedBaseUrl: "https://greyson.theceshop.com/",
  disclosure: "Education provided by The CE Shop.",
  links: {
    floridaPreLicense63: "https://greyson.theceshop.com/florida/pre-licensing/fl-sales-associate-pre-licensing-cost/",
    floridaPostLicense45: "https://greyson.theceshop.com/online-education/florida/real-estate/sales-associate/post-licensing/courses.html",
    floridaContinuingEducation14: "https://greyson.theceshop.com/online-education/florida/real-estate/broker-and-sales-license/continuing-education/courses.html",
    // Individual CE Shop package product URLs retain the Greyson-branded storefront.
    // Product slugs/IDs are shared across CE Shop co-branded storefronts.
    floridaCE14Basic: "https://greyson.theceshop.com/online-education/florida/real-estate/broker-and-sales-license/continuing-education/course/14-hr-fl-ce-package-with-ethics-course-7082-26281.html",
    floridaCE14Realtors: "https://greyson.theceshop.com/online-education/florida/real-estate/broker-and-sales-license/continuing-education/course/14-hr-fl-ce-package-for-realtors-7377-27046.html",
    floridaCE14ProPath: "https://greyson.theceshop.com/online-education/florida/real-estate/broker-and-sales-license/continuing-education/course/14-hr-fl-ce-package-with-ethics-course-plus-professional-development-7083-26282.html",
    floridaBrokerPreLicense72: "https://greyson.theceshop.com/florida/pre-licensing/fl-broker-pre-licensing-cost/",
    floridaBrokerPostLicense60: "https://greyson.theceshop.com/online-education/florida/real-estate/broker/post-licensing/courses.html",
    floridaInstructorCE: "",
    floridaReactivation14: "https://greyson.theceshop.com/online-education/florida/real-estate/broker-and-sales-license/continuing-education/courses.html",
    floridaReactivation28: "https://greyson.theceshop.com/florida/pre-licensing/fl-reinstatement-pre-licensing-cost/",
    floridaExamPrep: "https://greyson.theceshop.com/florida/real-estate-exam-prep/fl-sales-associate-exam-prep-cost/",
  },
};

export type CeShopCourseKey = keyof typeof ceShopPartner.links;

export function getCeShopCourseUrl(course: CeShopCourseKey) {
  const url = ceShopPartner.links[course].trim();
  return url || null;
}
