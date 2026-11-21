import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 90 is used for full-bleed hero photos; everything else uses the default 75
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sobzlpisvolenppqklhl.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    // Some dev networks (NAT64 / IPv6-only) resolve public hosts to addresses that
    // Next's SSRF guard treats as private. Opt in locally via .env.local only —
    // never set this in production.
    dangerouslyAllowLocalIP: process.env.NEXT_IMAGE_ALLOW_LOCAL_IP === "1",
  },
};

export default nextConfig;
