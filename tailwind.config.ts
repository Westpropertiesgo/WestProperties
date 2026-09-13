import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // "ink" — near-black, the dark cinematic base used across dark sections
        ink: {
          DEFAULT: "#0C0D0F",
          50: "#F0F1F2",
          100: "#D6D8DA",
          200: "#AEB2B6",
          300: "#82878D",
          400: "#565B61",
          500: "#34383D",
          600: "#1C1E21",
          700: "#0C0D0F",
          800: "#080909",
          900: "#040404",
        },
        // "ivory" — soft cool white for light sections
        ivory: {
          DEFAULT: "#F5F6F8",
          soft: "#FAFBFC",
        },
        // "stone" — cool slate gray for light sections
        stone: {
          DEFAULT: "#E3E6EA",
          line: "#D2D7DD",
          deep: "#B8BFC8",
        },
        // "brass" — vivid warm gold accent (kept the name for compatibility)
        brass: {
          DEFAULT: "#E0A83E",
          light: "#EDC27A",
          dark: "#B9822E",
          50: "#FBF0DA",
        },
        charcoal: "#1B1F26",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-space-grotesk)", "monospace"],
        logo: ["var(--font-playfair-logo)", "serif"],
      },
      letterSpacing: {
        widest2: "0.22em",
      },
      maxWidth: {
        "8xl": "90rem",
      },
      transitionTimingFunction: {
        signature: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
