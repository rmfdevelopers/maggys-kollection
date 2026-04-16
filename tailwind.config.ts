import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7eb6d9",
        secondary: "#FFF9E3",
        accent: "#1a1a1a"
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        sans: ["var(--font-body)"]
      }
    }
  },
  plugins: []
};
export default config;