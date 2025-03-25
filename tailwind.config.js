export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#e6f7ff',
          100: '#bae7ff',
          200: '#91d5ff',
          300: '#69c0ff',
          400: '#40a9ff',
          500: '#00a1e3', // Color principal
          600: '#0083b8',
          700: '#006591',
          800: '#00486a',
          900: '#003046',
        },
        indigo: {
          50: '#f0f5ff',
          100: '#d9e2ff',
          200: '#b4c6fc',
          300: '#8ea6fb',
          400: '#6a85f8',
          500: '#4364f7',
          600: '#3250dc',
          700: '#2942b8',
          800: '#1e3393',
          900: '#162970',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};