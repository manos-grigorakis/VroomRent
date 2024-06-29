/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      Roboto: ['Roboto', 'sans-serif'],
      Montserrat: ['Montserrat', 'sans-serif']
    },
    colors: {
      vibrantOrange: '#FFA500',
      goldenYellow: '#FFD700',
      customBlue: '#007BFF',
      charcoalGray: '#424242',
      charcoal: '#333333',
      linen: '#FAF9F6', // background-color
      offWhite: '#F5F5F5',
      lightGray: '#E0E0E0'
    },
    extend: {}
  },
  plugins: []
}
