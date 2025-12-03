import type { NextConfig } from "next";

// const isDev = process.env.NODE_ENV === "development";
const nextConfig: NextConfig = {
  /* config options here */

  reactCompiler: true,
  // output: isDev ? undefined : "export", // ❗ тільки для продакшену

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
