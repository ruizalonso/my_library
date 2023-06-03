/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      container: {
        center: true,
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['night'],
  },
}
