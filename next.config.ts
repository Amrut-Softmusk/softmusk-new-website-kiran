import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

// Static marketing site: no third-party scripts or analytics, fonts are self-hosted by next/font,
// remote images go through the /_next/image optimizer, the only embed is the Google Maps iframe.
// 'unsafe-inline' scripts are needed for Next's inline bootstrap on statically rendered pages
// (nonces would force every page to render dynamically).
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://images.unsplash.com https://images.pexels.com",
  "font-src 'self' data:",
  `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
  "media-src 'self'",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  "frame-src https://www.google.com https://maps.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=(), serial=(), hid=(), browsing-topics=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Origin-Agent-Cluster", value: "?1" },
  ...(isDev ? [] : [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }]),
];

// Files in /public are not content-hashed, so cache them for a day and revalidate in the background.
const publicAssetCache = { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" };

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    dangerouslyAllowSVG: false,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "images.pexels.com", pathname: "/**" },
    ],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/:file(.+\\.(?:png|jpg|jpeg|webp|avif|svg|ico|mp4|webm|woff2))", headers: [publicAssetCache] },
    ];
  },
};

export default nextConfig;
