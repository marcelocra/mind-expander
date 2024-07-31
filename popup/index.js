import { render, useReducer, useEffect } from "./deps.js";
import { html } from "./globals.js";

function App(props) {
  const [count, add] = useReducer((a, b) => a + b, 0);

  useEffect(() => {
    console.log("Count changed to", count);
  }, [count]);

  return html`
    <div class="align">
      <button onClick=${() => add(-1)}>Decrement</button>
      <input readonly size="4" value=${count + 1} />
      <input readonly size="4" value=${count} />
      <button onClick=${() => add(1)}>Increment</button>
    </div>
  `;
}

render(html`<${App} name="World" />`, document.body);
