/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'steel-blue': '#669bbc',
        'deep-space-blue': '#003049',
        'papaya-whip': '#fdf0d5',
        'brick-red': '#c1121f',
        'molten-lava': '#780000',
      },
    },
  },
  plugins: [],
}
