/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'org-main': '#FF8B00',
        'red-main': '#D86351',
        'black' : '#151419',
        'dark' : '#262626',
        'gray' : '#878787',
      },
      fontFamily: {
        sans: ['"IBM Plex Sans Thai"', 'sans-serif']
      },
    },
  },
  plugins: [],
};
