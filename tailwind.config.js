/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      height: {
        header_Height: "65px",
      },
      colors: {
        primary: "#d70018",
        main: "bg-red-50",
        category_hover: "#f5f5f5",
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
