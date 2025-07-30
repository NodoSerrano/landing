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
        // Custom off-white color (slightly gray)
        'off-white': '#FAFAFA',
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
        // Enhanced pastel color scheme (intensity level 3)
        cyan: {
          50: '#E0FAF8',
          100: '#B8F2EE', 
          200: '#7AE7E0',
          300: '#4DD4CA',
          400: '#2BB8B0',
          500: '#1E9B94',
          600: '#187E78',
          700: '#146360',
          800: '#104A4A',
          900: '#0A3335'
        },
        violet: {
          50: '#F5F0FC',
          100: '#E8DDF8',
          200: '#D4BFF0',
          300: '#B998DF', 
          400: '#A073CC',
          500: '#8954BA',
          600: '#7340A2',
          700: '#5D3384',
          800: '#482866',
          900: '#321C46'
        },
        blue: {
          50: '#EBF4FD',
          100: '#D2E6FB',
          200: '#A4CCF6',
          300: '#6BA8ED',
          400: '#4286E4',
          500: '#2B69D3',
          600: '#2253BA',
          700: '#1C429C',
          800: '#163379',
          900: '#0F2554'
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
