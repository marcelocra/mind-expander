import { createApp, h, ref } from "../vendored/vue.mjs";

const MyComponent = {
  setup() {
    const count = ref(0);
    const buttonClass = "border rounded shadow-xl p-3 w-32";

    return () =>
      h("div", { class: "flex flex-col gap-3 justify-center items-center" }, [
        h(
          "button",
          { class: buttonClass, onClick: () => count.value++ },
          "Increment",
        ),
        h("p", count.value),
        h(
          "button",
          { class: buttonClass, onClick: () => count.value-- },
          "Decrement",
        ),
      ]);
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
