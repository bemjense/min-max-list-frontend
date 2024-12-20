/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#202225',
        secondary: '#5865f2',
        mmgreen: '#AFDD66',
        mmblue: '#3AA7FA'
      }




    },
    
  },
  plugins: [
    require('tailwindcss-motion'),
  ],
}
