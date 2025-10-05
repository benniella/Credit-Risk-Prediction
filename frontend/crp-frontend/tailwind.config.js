/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          300: "#FFD966", // soft gold for hover
          400: "#FFC107", // primary bright gold
          500: "#D4AF37", // metallic deep gold
          600: "#B8860B", // dark goldenrod
          700: "#7B5E00", // deep antique gold
        },
        black: {
          DEFAULT: "#000000", // solid black
          900: "#0a0a0a",     // near black for depth
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"], // clean modern font
      },
    },
  },
  plugins: [],
}
