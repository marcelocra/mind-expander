import type { UserConfig } from "vite";

export default {
  base: "/popup-dist/",
  build: {
    outDir: "../popup-dist",
    emptyOutDir: true,
  },
} satisfies UserConfig;
