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
        },
        'slide-up': {
          '0%': {
            transform: 'translateY(100%)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        },
        'slide-left': {
          '0%': {
            transform: 'translateX(100%)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        },
      },
      animation: {
        'shimmer': 'shimmer 1.5s infinite linear',
        'slide-up': 'slide-up 0.3s ease-out',
        'slide-left': 'slide-left 0.3s ease-out',
      },
    },
  },
  plugins: [],
}
