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
      },
      keyframes:{
        'change-font':{
          '0%' :{ fontFamily: 'Handlee'},
          '20%':{ fontFamily: 'Finger Paint'},
          '40%':{ fontFamily: 'Sacramento'},
          '60%':{ fontFamily: 'Shadows Into Light Two'},
          '80%':{ fontFamily: 'Reenie Beanie'},
          // '100%':{ fontFamily: 'sans-serif'}
        }
      },
      animation:{
        'change-font': 'change-font 2s linear infinite'
      }, 
      fontFamily: {
        fontTitle: ['Handlee', 'Sacramento', 'Finger Paint', 'Shadows Into Light Two', 'Reenie Beanie']
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

