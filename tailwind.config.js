/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#DD0000",
        main: "bg-red-50",
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
