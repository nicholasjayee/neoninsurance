import type { Config } from "tailwindcss";

const config: Config = {
  // This content array is crucial. It tells Tailwind which files to scan.
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // The theme object is intentionally left empty because you are
  // defining all of your theme variables inside globals.css with @theme.
  theme: {},
  plugins: [],
};
export default config;
