// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // DO NOT set a global loader here.
    // We will use remotePatterns for the default loader.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // Add Cloudinary here
        pathname: "/**",
      },
      { protocol: "https", hostname: "jubileeinsurance.com" },
      { protocol: "https", hostname: "mua.co.ug" },
      { protocol: "https", hostname: "goldstarinsurance.com" },
      { protocol: "https", hostname: "ibau.ug" },
      { protocol: "https", hostname: "ug.cicinsurancegroup.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "drive.google.com" },
      { protocol: "https", hostname: "docs.google.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; img-src 'self' https: data: blob:; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; font-src 'self' data:; connect-src 'self' https://api.open-meteo.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // Add the images block here
//   images: {
//     remotePatterns: [
//       { protocol: 'https', hostname: 'jubileeinsurance.com' },
//       { protocol: 'https', hostname: 'mua.co.ug' },
//       { protocol: 'https', hostname: 'goldstarinsurance.com' },
//       { protocol: 'https', hostname: 'ibau.ug' },
//       { protocol: 'https', hostname: 'ug.cicinsurancegroup.com' },
//       // Add any other external image domains you use here
//     ],
//   },
// };

// export default nextConfig;
