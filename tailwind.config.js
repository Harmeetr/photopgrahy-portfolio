/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        surface: '#141414',
        'text-primary': '#e5e5e5',
        'text-muted': '#737373',
        accent: '#a3a3a3',
      },
    },
  },
  plugins: [],
}
