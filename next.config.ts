import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // Corrected: Comma is now outside the quotes
        hostname: "placehold.co",
        port: "",
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
