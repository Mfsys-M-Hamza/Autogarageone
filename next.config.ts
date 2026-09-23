import type { NextConfig } from "next";
import { client } from "./src/config/client";

const isDev = process.env.NODE_ENV !== "production";
const analytics = Boolean(client.analytics.ga4Id);

/**
 * Content Security Policy. Next.js injects small inline scripts for hydration, so
 * 'unsafe-inline' is required for scripts on a statically generated site (nonces
 * would force every page to render dynamically). Everything else is locked down.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}${analytics ? " https://www.googletagmanager.com" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob:${analytics ? " https://www.google-analytics.com https://www.googletagmanager.com" : ""}`,
  "font-src 'self'",
  `connect-src 'self'${analytics ? " https://*.google-analytics.com https://*.analytics.google.com" : ""}${isDev ? " ws:" : ""}`,
  "frame-src https://www.google.com https://maps.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: { root: process.cwd() },
  poweredByHeader: false,
  compress: true,
  images: { formats: ["image/avif", "image/webp"] },
  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      { source: "/brand/(.*)", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
    ];
  },
  /** Friendly/legacy URLs → canonical pages (301). Add old-site URLs here when migrating. */
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/appointment", destination: "/book-appointment", permanent: true },
      { source: "/book", destination: "/book-appointment", permanent: true },
      { source: "/offers", destination: "/special-offers", permanent: true },
      { source: "/offer", destination: "/special-offers", permanent: true },
      { source: "/testimonials", destination: "/reviews", permanent: true },
      { source: "/privacy", destination: "/privacy-policy", permanent: true },
      { source: "/terms", destination: "/terms-and-conditions", permanent: true },
      { source: "/services/computerized-vehicle-scanning", destination: "/services/computerized-scanning", permanent: true },
      { source: "/services/ac-repair", destination: "/services/ac-heater-maintenance", permanent: true },
      { source: "/services/brakes", destination: "/services/brake-service", permanent: true },
    ];
  },
};

export default nextConfig;
