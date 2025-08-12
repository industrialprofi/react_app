import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--primary-color)",
          hover: "var(--primary-hover)",
        },
        text: {
          DEFAULT: "var(--text-color)",
          light: "var(--text-light)",
        },
        background: {
          DEFAULT: "var(--background)",
          light: "var(--background-light)",
          dark: "var(--background-dark)",
        },
      },
    },
  },
  plugins: [],
};

export default config;
