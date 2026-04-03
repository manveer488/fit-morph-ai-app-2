/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#6e3dff",
        "background-light": "#f6f5f8",
        "background-dark": "#140f23",
        "neon-blue": "#00f2ff",
        "accent-cyan": "#00f2ff",
        "accent-aqua": "#00f2ea",
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"],
        "urbanist": ["Urbanist", "sans-serif"]
      },
      borderRadius: {"DEFAULT": "1rem", "lg": "2rem", "xl": "3rem", "full": "9999px"},
    },
  },
  plugins: [],
}
