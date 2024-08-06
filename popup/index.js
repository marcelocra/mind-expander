import { html, render, useState } from "../deps/preact.js";

function App() {
  const [count, setCount] = useState(0);
  const buttonClass = "border rounded shadow-xl p-3 w-32";

  return html`
    <div class="flex flex-col items-center justify-center gap-3">
      <button
        class="${buttonClass}"
        onClick=${() => setCount((/** @type {number} */ count) => count + 1)}
      >
        Increment
      </button>
      <p>${count}</p>
      <button
        class="${buttonClass}"
        onClick=${() => setCount((/** @type {number} */ count) => count - 1)}
      >
        Decrement
      </button>
    </div>
  `;
}

render(html`<${App} />`, document.body);
