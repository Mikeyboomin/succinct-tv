/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx,ts,tsx}", // covers all source files
  ],
  theme: {
    extend: {
      fontFamily: {
        replica: ['"ReplicaProRegular"', 'sans-serif'],
        replicabold: ['"ReplicaProBold"', 'sans-serif'],
        replicalight: ['"ReplicaProLight"', 'sans-serif'],
      },
      animation: {
        fadeOutLeft: 'fadeOutLeft 0.4s ease forwards',
        fadeOutRight: 'fadeOutRight 0.4s ease forwards',
        fadeInLeft: 'fadeInLeft 0.4s ease forwards',
        fadeInRight: 'fadeInRight 0.4s ease forwards',
      },
      keyframes: {
        fadeOutLeft: {
          '0%': { opacity: '1', transform: 'translateX(0)' },
          '100%': { opacity: '0', transform: 'translateX(-40px)' },
        },
        fadeOutRight: {
          '0%': { opacity: '1', transform: 'translateX(0)' },
          '100%': { opacity: '0', transform: 'translateX(40px)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
