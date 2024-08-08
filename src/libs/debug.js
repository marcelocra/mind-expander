import { isDev } from "../deps-bundled.mjs";

/**
 * @param  {...any} args
 */
export function debug(...args) {
  if (isDev) {
    console.log.apply(console, args);
  }
}
