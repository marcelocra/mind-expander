// import { render , useReducer, html } from './deps.js';

import { h, render, htm } from "./deps.js";

// Initialize htm with Preact
const html = htm.bind(h);

function App(props) {
  return html`<h1>Hello ${props.name}!</h1>`;
}

render(html`<${App} name="World" />`, document.body);

// export function App() {
//   const [count, add] = useReducer((a, b) => a + b, 0);

//   return html`
//     <button onClick=${() => add(-1)}>Decrement</button>
//     <input readonly size="4" value=${count} />
//     <button onClick=${() => add(1)}>Increment</button>
//   `;
// }

// render(html`<${App} />`, document.body);
