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
        protocol: "https",
        hostname: "img.coomer.su",
        port: "",
        pathname: "/**",
      },
    ],
    domains: [
      "img.coomer.su",
      new URL(process.env.NEXT_PUBLIC_API_HOST || "http://localhost").hostname,
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
