/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans"], // Use Poppins as the default font family
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
