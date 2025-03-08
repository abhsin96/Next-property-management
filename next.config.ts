import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
  publicRuntimeConfig: {
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
    NEXT_PUBLIC_API_DOMAIN: process.env.NEXT_PUBLIC_API_DOMAIN,
    NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY:
      process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
    NEXT_PUBLIC_MAPBOX_API_KEY: process.env.NEXT_PUBLIC_MAPBOX_API_KEY,
  },
  serverRuntimeConfig: {
    MONGODB_URI: process.env.MONGODB_URI,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_URL_INTERNAL: process.env.NEXTAUTH_URL_INTERNAL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    CLOUDNARY_CLOUD_NAME: process.env.CLOUDNARY_CLOUD_NAME,
    CLOUDNARY_SECRET: process.env.CLOUDNARY_SECRET,
    CLOUDNARY_API_KEY: process.env.CLOUDNARY_API_KEY,
  },
};

export default nextConfig;
