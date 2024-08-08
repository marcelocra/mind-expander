import htm from "../vendored/htm.mjs";
import { createApp, ref, h as vendoredH } from "../vendored/vue.mjs";

const html = htm.bind(vendoredH);

const MyComponent = {
  setup() {
    const count = ref(0);
    const buttonClass = "border rounded shadow-xl p-3 w-32";

    function increment() {
      count.value++;
    }

    return () => html`
      <div class="flex flex-col items-center justify-center gap-3">
        <button class="${buttonClass}" onClick=${increment}>Increment</button>
        <p>${count.value}</p>
        <button class="${buttonClass}" onclick=${() => count.value--}>
          Decrement
        </button>
      </div>
    `;
  },
};

createApp(MyComponent).mount("#app");
