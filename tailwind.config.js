/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "org-main": "#FF8B00",
        "red-main": "#D86351",
        "green-main": "#949A76",
        "brown-main": "#A68E74",
        black: "#151419",
        dark: "#262626",
        gray: "#878787",
      },
      fontFamily: {
        sans: ['"IBM Plex Sans Thai"', "sans-serif"],
      },
      fontSize: {
        h1: "32px",
        h2: "24px",
        h3: "20px",
        body1: "18px",
        body2: "16px",
        body3: "14px",
        small: "12px",
      },
    },
  },
  plugins: [],
};
