import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize for container deployment
  output: 'standalone',
  // Do not fail the production build on ESLint warnings/errors
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
