import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', ...fontFamily.sans],
        display: ['Cabinet Grotesk', ...fontFamily.sans],
      },
      colors: {
        primary: {
          50: '#f4f1ff',
          100: '#e8e1ff',
          200: '#d3c4ff',
          300: '#b49aff',
          400: '#9163ff',
          500: '#7c2cff',
          600: '#6b0fff',
          700: '#5d07ef',
          800: '#4e08c4',
          900: '#410b9e',
        },
        accent: {
          50: '#fff1f4',
          100: '#ffe4ea',
          200: '#ffccd8',
          300: '#ffa3ba',
          400: '#ff6992',
          500: '#ff296b',
          600: '#ff0055',
          700: '#e50049',
          800: '#c00040',
          900: '#9e003a',
        },
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
      },
    },
  },
  plugins: [],
}