import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    turbo: false,
  },
  env: {
    NEXT_DISABLE_TURBOPACK: "1",
  },
};

export default nextConfig;
