import { html, render, useReducer, useEffect } from "../deps/preact.js";

/** @param {{name: string}} props */
function ExampleReducer({ name }) {
  // @ts-ignore
  const [count, add] = useReducer((a, b) => a + b, 0);

  useEffect(() => {
    console.log("Count changed to:", count);
  }, [count]);

  return html`
    <div class="flex flex-col gap-3 justify-around min-h-screen bg-slate-100 p-10">
      <h1 class="text-center text-lg font-bold">${name}</h1>
      <button class="border rounded shadow-xl p-3 hover:animate-pulse" onClick=${() => add(-1)}>Decrement</button>
      <input class="text-center bg-transparent" readonly value=${count + 1} />
      <input class="text-center bg-transparent" readonly value=${count} />
      <button class="border rounded shadow-xl p-3 hover:animate-pulse" onClick=${() => add(1)}>Increment</button>
    </div>
  `;
}

function App() {
  return html`<${ExampleReducer} name="The Reducer" />`;
}

render(html`<${App} />`, document.body);
