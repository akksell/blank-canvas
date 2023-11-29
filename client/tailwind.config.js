/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        eisle: {
          800: '#EFC88B'
        }
      },
      height: {
        '128': '36rem',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

