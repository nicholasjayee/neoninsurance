// const config = {
//   plugins: ["@tailwindcss/postcss"],
// };

// export default config;

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // This is the new, correct way to declare the plugins as an object.
    // It is more robust and allows for future configuration.
    "@tailwindcss/postcss": {},

    // Autoprefixer is essential for adding browser-specific prefixes
    // (-webkit-, -moz-, etc.) for production builds.
    autoprefixer: {},
  },
};

export default config;
