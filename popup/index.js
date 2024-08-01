import { html, render, useReducer, useEffect } from "../deps/preact.js";

/** @param {{name: string}} props */
function App({ name }) {
  // @ts-ignore
  const [count, add] = useReducer((a, b) => a + b, 0);

  useEffect(() => {
    console.log("Count changed to", count);
  }, [count]);

  return html`
    <div class="flex flex-col">
      <button onClick=${() => add(-1)}>Decrement</button>
      <input readonly size="4" value=${count + 1} />
      <input readonly size="4" value=${count} />
      <button onClick=${() => add(1)}>Increment</button>
    </div>
  `;
}

render(html`<${App} name="World" />`, document.body);
