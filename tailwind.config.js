/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
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
  plugins: [],
}

