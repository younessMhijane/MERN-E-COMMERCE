/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: { 
      fontFamily: {
        'tan-mon-cheri': ['"Tan Mon Cheri"', 'sans-serif'], // Remplacez "sans-serif" par une autre police de secours si nécessaire
      },
      dropShadow: {
        '3xl': '0 8px 15px rgba(0, 0, 0, 0.6)',
      },
      colors: {
        violet: {
          dark: '#6A0DAD', // Violet profond
          accent: '#7F00FF', // Violet royal
          light: '#E6E6FA', // Lavande claire
        },
        gold: '#FFD700', // Doré
        pink: {
          light: '#FFC0CB', // Rose pâle
        },
      }
    },
  },
  plugins: [],
}

