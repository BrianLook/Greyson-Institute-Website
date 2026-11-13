/**
 * Manually checked CE Shop reference prices.
 *
 * These are NOT live API values, quotes, or promises of checkout pricing.
 * The CE Shop may adjust prices and promotions independently.
 *
 * Until an approved partner pricing feed becomes available, update reference
 * prices here so every Greyson page stays consistent.
 */
export const ceShopReferencePrices = {
  lastChecked: "November 13, 2026",
  sales63: {
    individual: "$125",
    courseOnly: "$139",
    standard: "$239",
    value: "$315",
    premium: "$459",
  },
  continuing14: {
    basic: "$39",
    realtor: "$45",
    proPath: "$60",
    proPathRegular: "$75",
  },
} as const;
