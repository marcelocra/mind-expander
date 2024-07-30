import { h } from "./vendored/preact.mjs";
import { default as htm } from "./vendored/htm.mjs";
export * from "./vendored/preact-hooks.mjs";
export const html = htm.bind(h);
