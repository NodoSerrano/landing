import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Pastel color scheme based on logo colors
        cyan: {
          50: '#F0FDFC',
          100: '#D4F6F5', 
          200: '#A4EDEA',
          300: '#8FD9D4',
          400: '#5EBEBC',
          500: '#3A9D9B',
          600: '#2B7A7F',
          700: '#1E5F65',
          800: '#1A3F6B',
          900: '#0F2A3E'
        },
        violet: {
          50: '#FAF8FD',
          100: '#F3ECFA',
          200: '#E6D4F5',
          300: '#D4B8E2', 
          400: '#C29AD4',
          500: '#B285C1',
          600: '#9A6BAD',
          700: '#7D5292',
          800: '#5F3E73',
          900: '#3F2A4F'
        },
        blue: {
          50: '#F4F9FE',
          100: '#E8F2FD',
          200: '#C9E3FA',
          300: '#A4C8E8',
          400: '#7EADDC',
          500: '#5B93D1',
          600: '#4A7BC4',
          700: '#2684C4',
          800: '#1E6BA8',
          900: '#164F7D'
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
