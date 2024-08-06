import { babel } from "@rollup/plugin-babel";
import type { UserConfig } from "vite";

export default {
  base: "/popup-dist/",
  build: {
    outDir: "../popup-dist",
    emptyOutDir: true,
  },
  plugins: [babel()],
} satisfies UserConfig;
