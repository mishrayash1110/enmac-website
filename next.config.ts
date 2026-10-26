import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: { root: process.cwd() },
  reactStrictMode: true,
  poweredByHeader: false,
};
export default nextConfig;
