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
        primary: "#978535",
        main: "bg-red-50",
        category_hover: "#f5f5f5",
        blue: "#5d83db",
        cart_bg: "#f4f6f8",
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
