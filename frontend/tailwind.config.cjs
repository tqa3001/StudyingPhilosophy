/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      minWidth: {
        '2/5': '40%',
      },
      maxWidth: {
        '2/5': '40%',
        '1/2': '50%'
      }
    },
  },
  plugins: [],
}
