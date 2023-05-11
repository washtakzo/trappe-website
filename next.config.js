/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["https://sas-production-uploads.s3.eu-west-2.amazonaws.com/"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sas-production-uploads.s3.eu-west-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
