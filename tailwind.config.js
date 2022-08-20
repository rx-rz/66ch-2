/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        albertsans: ["Albert Sans, sans-serif"],
        cormorant: ["EB Garamond, serif"]
      },
      colors: {
        primary: "#DBEEF4",
        secondary: "#DBEEF4",
        tertiary: "#000000"
      },
      minHeight: {
        details: "50vh"
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