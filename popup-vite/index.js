import htm from "../vendored/htm.mjs";
import { createApp, ref, h as vendoredH } from "../vendored/vue.mjs";

const html = htm.bind(vendoredH);

const MyComponent = {
  setup() {
    const count = ref(0);
    const buttonClass = "border rounded shadow-xl p-3 w-32";

    return () => html`
      <div class="flex flex-col items-center justify-center gap-3">
        <button class="${buttonClass}" onclick=${() => count.value++}>
          Increment
        </button>
        <p>${count.value}</p>
        <button class="${buttonClass}" onclick=${() => count.value--}>
          Decrement
        </button>
      </div>
    `;
  },
};

createApp(MyComponent).mount("#app");

/*
<script setup>
import { ref, onMounted } from 'vue'

// reactive state
const count = ref(0)

// functions that mutate state and trigger updates
function increment() {
  count.value++
}

// lifecycle hooks
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>

*/
