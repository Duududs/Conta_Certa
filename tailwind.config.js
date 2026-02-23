/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 10px 40px -20px rgb(15 23 42 / 0.45)",
      },
    },
  },
  plugins: [],
};
