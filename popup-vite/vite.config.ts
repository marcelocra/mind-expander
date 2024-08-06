import { babel } from "@rollup/plugin-babel";
import type { UserConfig } from "vite";

export default {
  base: "/popup-out/",
  build: {
    outDir: "../popup-out",
    emptyOutDir: true,
  },
  plugins: [babel()],
} satisfies UserConfig;
