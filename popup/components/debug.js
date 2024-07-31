/**
 * A component to help debugging the application.
 */

import { html } from "../globals.js";

const DEBUG = true;

export function Debug() {
  if (!DEBUG) {
    return html`<div></div>`;
  }

  return html`<div></div>`;
}
