/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pilcrow: ["Pilcrow Rounded, sans-serif"],
        hind: ["Hind, sans-serif"]
      },
      colors: {
        primary: "#FFFFFF",
        secondary: "#0437F2",
        tertiary: "#121212"
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

