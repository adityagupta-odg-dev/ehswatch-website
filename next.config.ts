import type { NextConfig } from "next";

const IS_VERCEL = process.env.VERCEL === '1';
const BASE_PATH = IS_VERCEL ? "" : "/ehswatch-stage";

const nextConfig: NextConfig = {
  output: IS_VERCEL ? undefined : 'standalone',
  trailingSlash: true,
  basePath: BASE_PATH,
  assetPrefix: BASE_PATH,
  env: { NEXT_PUBLIC_BASE_PATH: BASE_PATH },
  experimental: {
    staleTimes: {
      dynamic: 0,
      static: 0,
    },
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "stage.odigma.ooo" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
