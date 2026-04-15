import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        rust:     { DEFAULT: "#BF4E2A", dark: "#9A3A1E", light: "#D4694A" },
        gold:     { DEFAULT: "#C9960D", light: "#E5B03A" },
        turmeric: "#E5B03A",
        cream:    "#F6EDD9",
        ink:      { DEFAULT: "#291808", light: "#3D2510" },
        muted:    "#785535",
        paper:    "#FDFAF2",
        spice:    "#180F06",
        sage:     "#3D6B35",
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        sans:    ["Outfit", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],
      },
      spacing: {
        18: "4.5rem",
        "nav": "64px",
      },
      maxWidth: {
        site: "1280px",
      },
      animation: {
        "fade-up":    "fadeUp 0.7s ease both",
        "fade-in":    "fadeIn 0.3s ease both",
        "slide-in":   "slideIn 0.35s ease both",
        "ticker":     "ticker 36s linear infinite",
        "scroll-bar": "scrollBar 2.2s ease-in-out infinite",
        "hot-pulse":  "hotPulse 2.4s ease-in-out infinite",
        "bg-glow":    "bgGlow 8s ease-in-out infinite alternate",
        "float-up":   "floatUp var(--dur,8s) ease-in var(--delay,0s) infinite",
        "notif":      "notif 3s ease forwards",
        "page-in":    "pageIn 0.35s ease both",
      },
      keyframes: {
        fadeUp:    { from: { opacity: "0", transform: "translateY(24px)" }, to: { opacity: "1", transform: "none" } },
        fadeIn:    { from: { opacity: "0" },                                 to: { opacity: "1" } },
        slideIn:   { from: { opacity: "0", transform: "translateX(16px)" }, to: { opacity: "1", transform: "none" } },
        ticker:    { from: { transform: "translateX(0)" },                   to: { transform: "translateX(-50%)" } },
        scrollBar: {
          "0%":   { transform: "scaleY(0)", transformOrigin: "top",    opacity: "0" },
          "50%":  { transform: "scaleY(1)", transformOrigin: "top",    opacity: "1" },
          "100%": { transform: "scaleY(0)", transformOrigin: "bottom", opacity: "0" },
        },
        hotPulse: { "0%,100%": { transform: "scale(1)" }, "50%": { transform: "scale(1.06)" } },
        bgGlow:   { "0%": { opacity: "0.6" },              "100%": { opacity: "1" } },
        floatUp:  {
          "0%":   { opacity: "0", transform: "translateY(0) scale(0.5)" },
          "20%":  { opacity: "0.6" },
          "80%":  { opacity: "0.2" },
          "100%": { opacity: "0", transform: "translateY(-100vh) scale(1.5)" },
        },
        notif: {
          "0%":   { opacity: "0", transform: "translateX(110%)" },
          "12%":  { opacity: "1", transform: "none" },
          "85%":  { opacity: "1", transform: "none" },
          "100%": { opacity: "0", transform: "translateX(110%)" },
        },
        pageIn: { from: { opacity: "0", transform: "translateY(12px)" }, to: { opacity: "1", transform: "none" } },
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(ellipse 75% 55% at 68% 38%, rgba(201,150,13,0.2), transparent 60%), radial-gradient(ellipse 55% 75% at 22% 62%, rgba(191,78,42,0.25), transparent 55%)",
      },
      boxShadow: {
        card: "0 2px 8px rgba(24,15,6,0.06)",
        "card-hover": "0 18px 40px rgba(24,15,6,0.13)",
      },
    },
  },
  plugins: [],
} satisfies Config;
