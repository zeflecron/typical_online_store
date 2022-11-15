/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        latoLight: "Lato-Light",
        latoRegular: "Lato-Regular",
        latoBold: "Lato-Bold",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
