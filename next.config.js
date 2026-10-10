/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  devIndicators: {
    buildActivity: false,
  }
};

module.exports = nextConfig;
