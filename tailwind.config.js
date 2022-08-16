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
        primary: "#ffffff",
        secondary: "#ffffff",
        tertiary: "#000000"
      },
      maxHeight: {
        optimal: "65vh",
        profile: "55vh",
        details: "80vh"
      }
    },
  },
  plugins: [],
}