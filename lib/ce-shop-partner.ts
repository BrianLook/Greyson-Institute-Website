export const ceShopPartner = {
  providerName: "The CE Shop",
  status: "onboarding" as const,
  coBrandedBaseUrl: "",
  disclosure: "",
  links: {
    floridaPreLicense63: "https://greyson.theceshop.com/florida/pre-licensing/fl-sales-associate-pre-licensing-cost/",
    floridaPostLicense45: "https://greyson.theceshop.com/online-education/florida/real-estate/sales-associate/post-licensing/courses.html",
    floridaContinuingEducation14: "https://greyson.theceshop.com/online-education/florida/real-estate/broker-and-sales-license/continuing-education/courses.html",
    floridaBrokerPreLicense72: "https://greyson.theceshop.com/florida/pre-licensing/fl-broker-pre-licensing-cost/",
    floridaBrokerPostLicense60: "https://greyson.theceshop.com/online-education/florida/real-estate/broker/post-licensing/courses.html",
    floridaInstructorCE: "",
    floridaReactivation14: "",
    floridaReactivation28: "",
    floridaExamPrep: "https://greyson.theceshop.com/florida/real-estate-exam-prep/fl-sales-associate-exam-prep-cost/",
  },
};

export type CeShopCourseKey = keyof typeof ceShopPartner.links;

export function getCeShopCourseUrl(course: CeShopCourseKey) {
  const url = ceShopPartner.links[course].trim();
  return url || null;
}
