/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // Include your source files (adjust if needed)
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00022e', // Blue
        secondary: '#ff6347', // Tomato Red
        background: '#f7fafc', // Light Gray
        card: '#ffffff', // White 
        accent: '#4CAF50', // Green
      },
    },
  },
  plugins: [],
}
