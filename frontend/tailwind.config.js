/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  // Optionnel : choisir un thème daisyUI
  daisyui: {
    themes: ["light", "dark", "cupcake", "emerald","synthwave","night"], // ou ton propre thème
  },
}

