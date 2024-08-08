import { htm, vue } from "../deps-bundled.mjs";

const { createApp, h, ref } = vue;
const html = htm.bind(h);

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
