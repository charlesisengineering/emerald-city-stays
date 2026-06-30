/** @type {import('next').NextConfig} */

// Content-Security-Policy allowlist of the origins the site actually loads at
// runtime. Shipped as Report-Only first (see headers() below) so violations are
// logged but nothing is blocked — verify against real traffic, then switch the
// header name to "Content-Security-Policy" to enforce. See issue #44.
//
// 'unsafe-inline'/'unsafe-eval' are permitted for now because Next.js App Router
// injects inline hydration scripts; tighten to a nonce-based policy when enforcing.
const csp = [
  "default-src 'self'",
  // Hospitable widget, Google Maps, Plausible, Vercel analytics/speed-insights.
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://hospitable.b-cdn.net https://maps.googleapis.com https://maps.gstatic.com https://plausible.io https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  // Hospitable booking iframe.
  "frame-src 'self' https://booking.hospitable.com",
  // XHR/fetch: Supabase, Maps tiles, Plausible events, Vercel vitals.
  "connect-src 'self' https://*.supabase.co https://maps.googleapis.com https://plausible.io https://vitals.vercel-insights.com https://va.vercel-scripts.com",
  // Images: Maps tiles + the next/image domains below, plus data/blob URIs.
  "img-src 'self' data: blob: https://maps.googleapis.com https://maps.gstatic.com https://*.googleusercontent.com https://lh3.googleusercontent.com https://pbs.twimg.com https://images.unsplash.com https://logos-world.net",
  "object-src 'none'",
  "base-uri 'self'",
  "frame-ancestors 'self'",
].join("; ");

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      // NextJS <Image> component needs to whitelist domains for src={}
      "lh3.googleusercontent.com",
      "pbs.twimg.com",
      "images.unsplash.com",
      "logos-world.net",
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Report-Only: log violations, enforce nothing. Flip the key to
          // "Content-Security-Policy" once the allowlist is verified (#44).
          { key: "Content-Security-Policy-Report-Only", value: csp },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
