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
        primary: "#101010",
        secondary: "#3A7CA5",
        tertiary: "#FCF7FF"
      },
      maxHeight: {
        optimal: "65vh"
      }
    },
  },
  plugins: [],
}