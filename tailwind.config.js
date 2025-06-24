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
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#008000",
        secondary: "#006400",
        accent: "#32CD32",
        muted: "#666666",
        dark: "#222222",
        light: "#F0F0F0",
      },
    },
  },
  plugins: [],
};
