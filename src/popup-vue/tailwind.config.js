import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/popup-vite/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
};
