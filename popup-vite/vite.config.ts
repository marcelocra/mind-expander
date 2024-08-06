import type { UserConfig } from "vite";

export default {
  base: "/popup-out/",
  build: {
    outDir: "../popup-out",
    emptyOutDir: true,
  },
} satisfies UserConfig;
