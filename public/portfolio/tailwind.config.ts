import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#0A0A0F",     // background
        surface: "#121218",       // card surface
        surface2: "#191922",      // raised surface (modals)
        line: "#26262F",          // hairline borders
        ink: "#F5F5F5",           // primary text
        muted: "#8B8B9A",         // secondary text
        signal: "#6E5AF0",        // primary accent — violet, "neural" signal color
        pulse: "#00E5C7",         // secondary accent — cyan, "data pulse"
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(3.2rem, 8vw, 7rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2rem, 4vw, 3rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
      },
      backgroundImage: {
        "grid-fade": "linear-gradient(to bottom, transparent, #0A0A0F)",
      },
    },
  },
  plugins: [],
};

export default config;
