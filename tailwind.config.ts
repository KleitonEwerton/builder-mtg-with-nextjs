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
        background: "var(--background)",
        foreground: "var(--foreground)",
        red: {
          400: '#F87171',
        },
        blue: {
          400: '#60A5FA',
        },
        green: {
          400: '#34D399',
        },
        white: '#FFFFFF',
        gray: {
          400: '#9CA3AF',
          700: '#374151',
          900: '#111827',
        },
      },
    },
  },
  plugins: [],
};
export default config;
