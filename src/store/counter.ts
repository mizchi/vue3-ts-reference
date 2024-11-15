// Local store example
import { ref, computed, Ref } from "vue";
import { defineStore } from "pinia";

type CounterStore = {
  count: Ref<number>;
  doubleCount: Ref<number>;
  increment: () => void;
};

export const useCounterStore = defineStore("counter", (): CounterStore => {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);

  function increment() {
    count.value++;
  }

  return { count, doubleCount, increment };
});
