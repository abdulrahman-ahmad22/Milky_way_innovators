import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "rgb(var(--canvas) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        palm: {
          DEFAULT: "rgb(var(--palm) / <alpha-value>)",
          deep: "rgb(var(--palm-deep) / <alpha-value>)",
          soft: "rgb(var(--palm-soft) / <alpha-value>)",
        },
        sand: "rgb(var(--sand) / <alpha-value>)",
        brass: "rgb(var(--brass) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Arial", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 24px 70px rgba(28, 32, 27, 0.08)",
        card: "0 16px 50px rgba(28, 32, 27, 0.06)",
      },
      backgroundImage: {
        grain: "radial-gradient(circle at 20% 10%, rgba(189, 155, 91, 0.12), transparent 26%), radial-gradient(circle at 85% 12%, rgba(35, 92, 69, 0.09), transparent 30%)",
      },
    },
  },
  plugins: [],
};

export default config;
