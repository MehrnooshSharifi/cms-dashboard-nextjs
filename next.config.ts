import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_DISABLE_TURBOPACK: "1",
  },
};

export default nextConfig;
