const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
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
          hover: "hsl(var(--card-hover))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
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
        flip: {
          to: {
            transform: "rotate(360deg)",
          },
        },
        rotate: {
          to: {
            transform: "rotate(90deg)",
          },
        },
        infiniteSlider: {
          "0%": { transform: "translateX(0)" },
          "100%": {
            transform: "translateX(calc(-250px * 5))",
          },
        },
        // Fade up and down
        "fade-up": {
          "0%": {
            opacity: 0,
            transform: "translateY(10px)",
          },
          "80%": {
            opacity: 0.6,
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0px)",
          },
        },
        "fade-down": {
          "0%": {
            opacity: 0,
            transform: "translateY(-10px)",
          },
          "80%": {
            opacity: 0.6,
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0px)",
          },
        },
        fade: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        // Tooltip
        "slide-up-fade": {
          "0%": { opacity: 0, transform: "translateY(6px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "slide-down-fade": {
          "0%": { opacity: 0, transform: "translateY(-6px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        // Scale in
        "scale-in": {
          "0%": {
            opacity: 0,
            transform: "scale(0.7)",
          },
          "80%": {
            opacity: 0.6,
          },
          "100%": {
            opacity: 1,
            transform: "scale(1)",
          },
        },
        // Fade in
        "fade-in": {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
        // Reveal Effect
        reveal: {
          "0%": {
            opacity: 0,
            filter: "brightness(1) blur(15px)",
            scale: "1.0125",
          },
          "10%": { opacity: 1, filter: "brightness(1.25) blur(10px)" },
          "100%": { opacity: 1, filter: "brightness(1) blur(0)", scale: "1" },
        },
        // spinner-loader
        spinner: {
          "0%": {
            opacity: 1,
          },
          "100%": {
            opacity: 0.15,
          },
        },
      },
      animation: {
        // spinner loader
        spinner: "spinner 1.2s linear infinite",
        // Reveal Effect
        reveal: "reveal 0.7s ease-in-out",
        "reveal-repeat": "reveal 0.7s ease-in-out infinite",

        // Accordion
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",

        // Fade up and down
        fade: "fade 0.8s cubic-bezier(0.32, 0.72, 0, 1) forwards",
        "fade-up": "fade-up 0.5s",
        "fade-down": "fade-down 0.5s",
        "fade-in": "fade-in 0.2s",
        "scale-in": "scale-in 0.2s ease-out",

        // Tooltip
        "slide-up-fade": "slide-up-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-down-fade": "slide-down-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        flip: "flip 6s infinite steps(2, end)",
        rotate: "rotate 3s linear infinite both",
        ["infinite-slider"]: "infiniteSlider 20s linear infinite",
      },
      scale: {
        102: "1.02",
      },
      boxShadow: {
        "card-light":
          "0px 32px 40px -16px rgba(0, 0, 0, 0.12), 0px 2px 6px rgba(0, 0, 0, 0.06)",
        outline:
          // "5px 8px 9px 0.8px rgba(0, 0, 0, 0.09), 0.05px 1px 2.55px 0px rgba(255,255,255,0.25) inset, 0px -1.55px 1px 0px rgba(255,255,255,0.1) inset",
          // "0px 8px 6px 0px rgba(0,0,0,0.05), 0px 1px 1px 0px rgba(255,255,255,0.25) inset, 0px -1px 1px 0px rgba(255,255,255,0.1) inset",
          "0px 1px 0.5px 0px rgba(255 , 255, 255,0.15) inset, 0px 1.551px 1.201px 0px rgba(255, 255, 255, 0.10) inset, 1.15px 0px 1.551px 0px rgba(255, 255, 255, 0.20) inset",
        "outline-light":
          "0px 1px 0.5px 0px rgba(0, 0, 0,0.15) inset, 0px 1.551px 1.201px 0px rgba(0, 0, 0, 0.10) inset, 1.15px 0px 1.551px 0px rgba(0, 0, 0, 0.20) inset",
        "inner-outline":
          "inset 0px -0.73px 0.73px rgba(255,255,255,0.59), inset 1.46px 2.92px 2.92px -0.73px rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}
