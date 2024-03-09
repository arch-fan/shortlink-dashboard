/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        primary: {
          bg: "#000",
          item: "#0a0a0a",
          border: "#181818",
          highlight: "#ededed",
        },
      },
    },
  },
  plugins: [],
};
