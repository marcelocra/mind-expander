import { plugins, theme } from "../libs/common-tailwind.config";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/popup/**/*.{html,js}"],
  theme,
  plugins,
};
