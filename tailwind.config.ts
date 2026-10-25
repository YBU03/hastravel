import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Tema Sayap Shuttle (Dark Modern)
        sayap: {
          ink: "#070B17",
          navy: "#0B1020",
          card: "#111933",
          line: "#1f2a48",
          lime: "#C6F432",
          "lime-dark": "#a9d417",
        },
        brand: {
          50: "#eef5ff",
          100: "#d9e8ff",
          200: "#bcd7ff",
          300: "#8ebeff",
          400: "#5999ff",
          500: "#2f74fb",
          600: "#0064e7",
          700: "#0050c0",
          800: "#06449b",
          900: "#0b3c7a",
          950: "#0a264d",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
