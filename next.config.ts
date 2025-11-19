import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";
const nextConfig: NextConfig = {
  /* config options here */

  reactCompiler: true,
  output: isDev ? undefined : "export",
  // i18n: {
  //   locales: ["pl", "uk", "en", "ru"],
  //   defaultLocale: "pl",
  // },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
