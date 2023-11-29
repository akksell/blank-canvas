/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      keyframes:{
        'change-font':{
          '0%':{ fontFamily: 'Handlee'},
          '20%':{ fontFamily: 'Finger Paint'},
          '40%':{ fontFamily: 'Sacramento'},
          '60%':{ fontFamily: 'Shadows Into Light Two'},
          '80%':{ fontFamily: 'Reenie Beanie'},
          // '100%':{ fontFamily: 'sans-serif'}
        }
      },
      animation:{
        'change-font': 'change-font 3s linear infinite'
      }, 
      fontFamily: {
        fontTitle: ['Handlee', 'Sacramento', 'Finger Paint', 'Shadows Into Light Two', 'Reenie Beanie']
      }
    },
  },
  plugins: [],
}

