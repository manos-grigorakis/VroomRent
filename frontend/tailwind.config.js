// const animate = require('tailwindcss-animate')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,jsx,vue}',
    './components/**/*.{js,jsx,vue}',
    './app/**/*.{js,jsx,vue}',
    './src/**/*.{js,jsx,vue}',
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  prefix: '',
  theme: {
    fontFamily: {
      Roboto: ['Roboto', 'sans-serif'],
      Montserrat: ['Montserrat', 'sans-serif']
    },
    colors: {
      vibrantOrange: {
        default: '#FFA500',
        700: '#e69500'
      },
      goldenYellow: {
        default: '#FFD700',
        700: '#CCAA00'
      },
      customBlue: {
        default: '#007BFF',
        700: '#0056B3'
      },
      green: '#84cc16',
      red: {
        default: '#ef4444',
        700: '#cc3939'
      },
      charcoalGray: '#424242',
      charcoal: '#333333',
      linen: '#FAF9F6', // background-color
      offWhite: '#F5F5F5',
      lightGray: '#E0E0E0',
      white: '#FFFFFF'
    },
    // shadcn-vue
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      backgroundImage: {
        'hero-image': "url('/maksim-tarasov-bFTVxTo266E-unsplash2.webp')"
      }
    }
  }
  // plugins: [animate]
}
