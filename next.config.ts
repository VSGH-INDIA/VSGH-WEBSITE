import type { NextConfig } from "next";
import { securityHeaders } from "./src/lib/security-headers";

const isProduction = process.env.VERCEL_ENV === "production";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  images: {
    dangerouslyAllowSVG: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders(isProduction),
      },
    ];
  },
};

export default nextConfig;
