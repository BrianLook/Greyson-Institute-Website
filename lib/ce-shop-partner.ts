export const ceShopPartner = {
  providerName: "The CE Shop",
  status: "onboarding" as const,
  coBrandedBaseUrl: "",
  disclosure: "",
  links: {
    floridaPreLicense63: "",
    floridaPostLicense45: "",
    floridaContinuingEducation14: "https://greyson.theceshop.com/online-education/florida/real-estate/broker-and-sales-license/continuing-education/courses.html",
    floridaBrokerPreLicense72: "",
    floridaBrokerPostLicense60: "",
    floridaInstructorCE: "",
    floridaReactivation14: "",
    floridaReactivation28: "",
    floridaExamPrep: "",
  },
};

export type CeShopCourseKey = keyof typeof ceShopPartner.links;

export function getCeShopCourseUrl(course: CeShopCourseKey) {
  const url = ceShopPartner.links[course].trim();
  return url || null;
}
