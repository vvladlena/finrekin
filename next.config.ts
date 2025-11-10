import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";
const nextConfig: NextConfig = {
  /* config options here */

  reactCompiler: true,
  output: isDev ? undefined : "export", // ❗ тільки для продакшену
  basePath: isDev ? undefined : "/finrekin",
  assetPrefix: isDev ? undefined : "/finrekin/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
