import { html, render } from "../deps/preact.js";

function App() {
  return html`
    <div class="flex flex-col gap-3">
      <button
        class="border rounded shadow-xl p-3 w-32"
        onClick=${() => alert("hello")}
      >
        A button
      </button>
    </div>
  `;
}

render(html`<${App} />`, document.body);
