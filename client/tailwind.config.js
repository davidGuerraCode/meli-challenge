/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        meli: {
          yellow: '#FFE600',
          green: '#00A650',
          blue_link: '#3483FA',
        },
      },
    },
  },
  plugins: [],
};
