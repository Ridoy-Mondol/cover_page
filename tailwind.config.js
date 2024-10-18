/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: '#0F071B',
        lavender: '#A560FF',
        deepPurple: '#421D82',
        darkPurple: '#1E1039',
        white: '#FFFFFF',
        black: '#000000',
      },
      boxShadow: {
        'custom': '0 0 16px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}

