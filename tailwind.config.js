/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Synonym: ["Satoshi, sans-serif"],
        Amulya: ["General Sans, sans-serif"]
      },
      colors: {
        primary: "#EEECE7",
        secondary: "#8E9789",
        tertiary: "#2F3630"
      },
      maxHeight: {
        optimal: "65vh"
      }
    },
  },
  plugins: [],
}