/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // We'll handle TypeScript errors separately
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;
