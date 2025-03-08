import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
    NEXT_PUBLIC_API_DOMAIN: process.env.NEXT_PUBLIC_API_DOMAIN,
    NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY:
      process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
    NEXT_PUBLIC_MAPBOX_API_KEY: process.env.NEXT_PUBLIC_MAPBOX_API_KEY,
  },
};

export default nextConfig;
