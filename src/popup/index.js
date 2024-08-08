import { html, render } from "../vendored/htm-preact.js";
import { App } from "./components/App.js";

render(html`<${App} />`, document.body);
