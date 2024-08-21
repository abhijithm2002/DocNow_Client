/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: '#0067FF',
        yellowColor: '#FEB60D',
        purpleColor: '#9771FF',
        irishBlueColor: '#01B5C5',
        headingColor: '#181A1E',
        textColor: '#4E545F',
        lightBlue: '#D0F0FF', 
        lightPink: '#FFEBEE',
        beige: '#f5f5dc',
        softGray: '#d3d3d3',
        taupe: '#483C32',
        deepBlue: '#1E3A8A',
        skyBlue: '#3B82F6',
        softGray: '#F3F4F6',
        darkGray: '#111827',
        mediumGray: '#6B7280',
      },
      boxShadow: {
        panelShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;"
      }
    },
  },
  plugins: [],
};

