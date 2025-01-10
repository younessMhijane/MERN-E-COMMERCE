/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: { 
      fontFamily: {
        'tan-mon-cheri': ['"Tan Mon Cheri"', 'sans-serif'], // Remplacez "sans-serif" par une autre police de secours si nécessaire
      },
    },
  },
  plugins: [],
}

