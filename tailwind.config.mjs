/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Charte graphique "Nous Avons Des Elles" (nousavonsdeselles.fr)
        // Vert sauge — couleur principale (#8EAF90, #4A7C5F, #274E39)
        primary: {
          50: '#f3f7f3',
          100: '#e4ede4',
          200: '#c9dbca',
          300: '#abc6ad',
          400: '#8eaf90',
          500: '#6b9670',
          600: '#4a7c5f',
          700: '#3c6650',
          800: '#274e39',
          900: '#203f2f',
          950: '#11241a',
        },
        // Neutres chauds — creme, taupe, brun (#FBF4EB, #6B6660, #3D2B1F, #361F10)
        secondary: {
          50: '#fbf4eb',
          100: '#f4ebdf',
          200: '#e8dccb',
          300: '#d2c4b2',
          400: '#a89d90',
          500: '#857c72',
          600: '#6b6660',
          700: '#524339',
          800: '#3d2b1f',
          900: '#361f10',
          950: '#252117',
        },
        // Corail / orange — accents (#EC8D70, #E97957, #E56814)
        accent: {
          50: '#fdf4f0',
          100: '#fbe6dd',
          200: '#f7cbbb',
          300: '#f2ad96',
          400: '#ec8d70',
          500: '#e97957',
          600: '#e56814',
          700: '#bd5410',
          800: '#964313',
          900: '#793913',
          950: '#421b07',
        },
        // Ocre dore — secondaire (#CE9534, #D4A017)
        warm: {
          50: '#fcf7ed',
          100: '#f7ebd2',
          200: '#efd5a4',
          300: '#e4bb6f',
          400: '#d4a017',
          500: '#ce9534',
          600: '#b27a26',
          700: '#925f21',
          800: '#784d21',
          900: '#63401f',
          950: '#38210e',
        },
        cream: '#fbf4eb',
      },
      fontFamily: {
        sans: ['Lato', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
};
