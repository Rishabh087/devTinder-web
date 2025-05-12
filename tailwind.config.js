/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Add all files that contain Tailwind classes
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // This scans all JS/JSX files in src/
    
    // If you have other directories with HTML/JSX files:
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")]
}
