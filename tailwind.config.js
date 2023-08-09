/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blaze: '#F0D40A',
        glow: '#EFA315',
        midnight: '#121322',
        violet: '#2A1D5B',
        sapphire: '#3452C7',
      },
    },
  },
  plugins: [],
};
