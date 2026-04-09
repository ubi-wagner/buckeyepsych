import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f2f8f4",
          100: "#dcecdf",
          200: "#bad9c1",
          300: "#8cbe97",
          400: "#5a9d6c",
          500: "#3b8350",
          600: "#2a6940",
          700: "#235535",
          800: "#1d452b",
          900: "#123820",
          950: "#0a2113",
        },
        gold: {
          300: "#e3c789",
          400: "#d4b26a",
          500: "#c29a4d",
        },
        cream: "#faf8f3",
        ink: "#111111",
      },
      fontFamily: {
        display: ['"Fraunces"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.03em",
      },
    },
  },
  plugins: [],
};

export default config;
