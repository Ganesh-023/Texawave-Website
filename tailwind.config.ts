import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "var(--text-primary)",
        graphite: "var(--text-secondary)",
        mist: "var(--bg-secondary)",
        line: "var(--border-color)",
        steel: "var(--text-secondary)",
        signal: "var(--accent)",
        copper: "#c87537",
        marine: "var(--text-primary)",
        "bg-primary": "var(--bg-primary)",
        "bg-secondary": "var(--bg-secondary)",
        "bg-card": "var(--bg-card)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "border-primary": "var(--border-color)"
      },
      maxWidth: {
        "8xl": "1440px"
      },
      boxShadow: {
        premium: "0 24px 80px rgba(16, 19, 24, 0.14)",
        crisp: "0 10px 30px rgba(16, 19, 24, 0.08)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"]
      },
      transitionDuration: {
        "400": "400ms"
      }
    }
  },
  plugins: []
};

export default config;
