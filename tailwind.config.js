/** @type {import('tailwindcss').Config} */

const { join } = require('path');

module.exports = {
  content: [
    join(__dirname, './pages/**/*.{js,ts,jsx,tsx}'),
    join(__dirname, './components/**/*.{js,ts,jsx,tsx}'),
    join(__dirname, './layout/**/*.{js,ts,jsx,tsx}'),
  ],
  theme: {
    extend: {
      keyframes: {
        'shimmer': {
          '0%': {
            backgroundPosition: '-200px 0',
          },
          '100%': {
            backgroundPosition: 'calc(200px + 100%) 0',
          },
        }
      },
      animation: {
        'shimmer': 'shimmer 1.5s infinite linear',
      },
    },
  },
  plugins: [],
}
