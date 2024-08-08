// @ts-nocheck

/**
 * Tells the bundler to prepare npm installed dependencies for the browser.
 *
 * There are two ways of exporting stuff here:
 *
 * 1) Directly exporting a symbol from a package (see `render` from `preact`).
 * 2) Exporting a namespace object that contains symbols (see `vue`).
 *
 * The first one is simpler and allows us to import the symbol directly. But as we do it more, we
 * might need things that have the same name. If that is the case, we can use the second approach.
 */
import { createApp, h, ref } from "vue";

export const vue = {
  createApp,
  h,
  ref,
};

export { html } from "htm/preact";
export { render } from "preact";
export { default as htm } from "htm";
