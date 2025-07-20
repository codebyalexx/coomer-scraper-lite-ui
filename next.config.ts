import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL(`${process.env.API_HOST}/**`),
      new URL("https://img.coomer.su/**"),
    ],
  },
};

export default nextConfig;
