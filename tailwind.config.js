/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        zentry: ["zentry", "sans-serif"],
        general: ["general", "sans-serif"],
        "circular-web": ["circular-web", "sans-serif"],
        "robert-medium": ["robert-medium", "sans-serif"],
        "robert-regular": ["robert-regular", "sans-serif"],
      },
      colors: {
        // Dark theme base colors
        dark: {
          50: "#f8fafc",
          100: "#f1f5f9", 
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
        // Neon accent colors
        neon: {
          blue: "#00d4ff",
          purple: "#8b5cf6", 
          pink: "#ec4899",
          green: "#10b981",
          yellow: "#fbbf24",
          red: "#ef4444",
          cyan: "#06b6d4",
        },
        // Gaming theme colors
        gaming: {
          primary: "#1a1a2e",
          secondary: "#16213e", 
          accent: "#0f3460",
          highlight: "#e94560",
          glow: "#00d4ff",
        },
        // Legacy colors for compatibility
        blue: {
          50: "#f0f9ff",
          75: "#e0f2fe", 
          100: "#bae6fd",
          200: "#7dd3fc",
          300: "#38bdf8",
          400: "#0ea5e9",
          500: "#0284c7",
          600: "#0369a1",
          700: "#075985",
          800: "#0c4a6e",
          900: "#082f49",
        },
        violet: {
          300: "#8b5cf6",
          400: "#7c3aed",
          500: "#6d28d9",
        },
        yellow: {
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fbbf24",
          400: "#f59e0b",
        },
      },
    },
  },
  plugins: [],
};