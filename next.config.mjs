/** @type {import("next").NextConfig} */
const nextConfig = {
  outputFileTracingIncludes: {
    "/api/florida-license-name-search": [
      "./data/florida-real-estate-name-index/**/*",
    ],
  },
};

export default nextConfig;
