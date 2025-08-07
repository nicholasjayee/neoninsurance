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
    ],
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
