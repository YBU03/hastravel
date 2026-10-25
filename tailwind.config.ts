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
        // Tema Kencana Executive (Luxury)
        kencana: {
          black: "#0b0b0b",
          coal: "#141312",
          line: "#2b2721",
          gold: "#c9a96e",
          "gold-light": "#e3cc9c",
          ivory: "#f5efe3",
        },
        // Tema Armada Ria (Bold & Ceria)
        ria: { yellow: "#ffcc00", ink: "#1a1a1a", orange: "#ff5a1f", cream: "#fff4c2", sky: "#7fd3ff" },
        // Tema Langkah Nusa (Natural & Hangat)
        nusa: { cream: "#f4ead8", sand: "#eadcc2", brown: "#3b2a20", terra: "#c8623d", sage: "#8fa382", moss: "#5d6e52" },
        // Tema Raudhah Safar (Islami Elegan)
        raudhah: { deep: "#0a2a20", emerald: "#0f3d2e", leaf: "#1d5c45", gold: "#d4af37", "gold-soft": "#e9d28a", ivory: "#f6f1e4" },
        // Tema Gaspol Bali (Street / Urban)
        gaspol: { ink: "#0d0d0d", coal: "#1a1a1a", line: "#2b2b2b", pink: "#ff2e93", "pink-dark": "#d81b78", acid: "#d7ff3a" },
        // Tema Selat Express (Ocean)
        selat: { foam: "#e6f7f8", deep: "#063b4c", sea: "#0b6e80", teal: "#00a6b4", aqua: "#7fd6dd", sand: "#f6e7c8", coral: "#ff7a59" },
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
