/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['index.html', 'node_modules/preline/dist/*.js'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '16px',
    },

    extend: {
      fontFamily: {
        poppins: ['Poppins'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
      },

      screens: {
        '2xl': '1320px',
      },
    },
  },
  plugins: [require('preline/plugin'), require('daisyui')],
};
