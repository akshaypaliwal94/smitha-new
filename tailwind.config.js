/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'teal': {
          DEFAULT: '#14B87E',
          '600': '#0E8A5F',
        },
        'dark': '#0B1017',
        'muted': '#8FA3B3',
      },
      fontFamily: {
        'bebas': ['Bebas Neue', 'cursive'],
        'barlow': ['Barlow', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
      }
    },
  },
  plugins: [],
}