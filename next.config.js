/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // We'll handle TypeScript errors separately
    ignoreBuildErrors: false,
  },
  // Allow importing from the SDK source
  transpilePackages: [],
};

module.exports = nextConfig;
