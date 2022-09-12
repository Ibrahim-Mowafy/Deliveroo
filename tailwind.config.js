/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './screens/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#00ccbb',
      },
    },
  },
  plugins: [],
};
