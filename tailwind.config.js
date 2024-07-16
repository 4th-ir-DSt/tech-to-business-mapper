const { nextui } = require("@nextui-org/react");


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'custom-bg': "url('../public/bg.png')",
      },
      colors: {
        ttb: {
          violet: "#800080",
          glass: "#724F6E4D",

        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}

