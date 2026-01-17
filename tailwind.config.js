/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        handwritten: ['var(--font-handwritten)', 'cursive'],
      },
      colors: {
        background: '#0f0d0a',      // warm black (was #0a0a0a)
        surface: '#1a1612',         // aged paper shadow (was #141414)
        'text-primary': '#e8e4df',  // cream (was #e5e5e5)
        'text-muted': '#9a918a',    // warm stone (was #737373)
        accent: '#c4a882',          // muted gold (was #a3a3a3)
      },
    },
  },
  plugins: [],
}
