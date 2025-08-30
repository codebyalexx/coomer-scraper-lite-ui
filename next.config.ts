import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_API_HOST?.startsWith("https")
          ? "https"
          : "http",
        hostname: new URL(
          process.env.NEXT_PUBLIC_API_HOST || "http://localhost"
        ).hostname,
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "csapi.local",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.coomer.st",
        port: "",
        pathname: "/**",
      },
    ],
    domains: [
      "img.coomer.st",
      new URL(process.env.NEXT_PUBLIC_API_HOST || "http://localhost").hostname,
      "csapi.local",
    ],
    minimumCacheTTL: 3600 * 12,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
