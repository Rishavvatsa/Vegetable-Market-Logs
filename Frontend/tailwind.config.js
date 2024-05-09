/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    daisyui: {
      themes: [],
    },
  },
  plugins: [require("daisyui"), require("tailwind-scrollbar")],
};
