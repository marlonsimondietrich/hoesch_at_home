/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}',
    './public/**/*.html',
    './node_modules/flowbite/**/*.js',
    './node_modules/flowbite-react/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
};
