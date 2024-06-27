import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: "#3b82f6",
        red: "#ef4444",
        green: "#22c55e",
        yellow: "#eab308",
        cyan: "#04f5ff",
        purple: "#38003c",
        "light-green": "#00ff85",
        "dark-blue": "#1e293b",
        "dark-green": "#004600",
      },
      screens: { rs: "520px" },
    },
  },
  plugins: [],
};
export default config;
