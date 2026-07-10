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
        gold: {
          400: '#E5C158',
          500: '#D4AF37',
          600: '#B8952B',
        },
        charcoal: {
          800: '#1F2937',
          900: '#111827',
          950: '#0A0A0A'
        }
      },
    },
  },
  plugins: [],
};
export default config;
