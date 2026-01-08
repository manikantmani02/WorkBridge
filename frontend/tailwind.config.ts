import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./pages/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1d4ed8",
        accent: "#f97316",
        muted: "#f5f5f5",
      },
    },
  },
  plugins: [],
};

export default config;
