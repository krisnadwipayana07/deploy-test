/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "atixbali.oss-ap-southeast-5.aliyuncs.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  reactStrictMode: true,
  swcMinify: true,
  i18n,
};

module.exports = nextConfig;
