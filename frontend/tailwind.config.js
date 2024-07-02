/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      Roboto: ['Roboto', 'sans-serif'],
      Montserrat: ['Montserrat', 'sans-serif']
    },
    colors: {
      vibrantOrange: {
        default: '#FFA500',
        700: '#DE8F00'
      },
      goldenYellow: {
        DEFAULT: '#FFD700',
        700: '#CCAA00'
      },
      customBlue: {
        DEFAULT: '#007BFF',
        700: '#0056B3'
      },
      charcoalGray: '#424242',
      charcoal: '#333333',
      linen: '#FAF9F6', // background-color
      offWhite: '#F5F5F5',
      lightGray: '#E0E0E0',
      white: '#FFFFFF'
    },
    extend: {
      backgroundImage: {
        'hero-image': "url('./src/assets/images/maksim-tarasov-bFTVxTo266E-unsplash.jpg')"
      }
    }
  },
  plugins: [],
  // declared for the basebutton component had some issues retrieving the color prop!!!
  safelist: [
    'border-vibrantOrange',
    'text-vibrantOrange',
    'hover:bg-vibrantOrange',
    'border-goldenYellow',
    'text-goldenYellow',
    'hover:bg-goldenYellow',
    'border-customBlue',
    'text-customBlue',
    'hover:bg-customBlue',
    'bg-vibrantOrange',
    'bg-goldenYellow',
    'bg-customBlue',
    'hover:bg-vibrantOrange-700',
    'hover:bg-goldenYellow-700',
    'hover:bg-customBlue-700'
  ]
}
