/** @type {import("next").NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/orlando-florida-real-estate-education",
        destination: "/florida-online-real-estate-education",
        permanent: true,
      },
    ];
  },
  outputFileTracingIncludes: {
    "/api/florida-license-name-search": [
      "./data/florida-real-estate-name-index/**/*",
    ],
  },
};

export default nextConfig;
