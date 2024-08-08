import { plugins, theme } from "../libs/common-tailwind.config";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/popup-vue/**/*.{html,js}"],
  theme,
  plugins,
};
