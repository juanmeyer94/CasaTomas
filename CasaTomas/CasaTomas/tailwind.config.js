/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage:{
        "merceriadashboard": "url('./src/assets/merceria.jpg')",
        "maquinadashboard": "url('./src/assets/MaquinaDash.png')"
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require("daisyui"),
    require("tw-elements-react/dist/plugin.cjs"),
  ],
  darkMode:"class",
}

