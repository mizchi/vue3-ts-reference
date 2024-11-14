import { ref, computed, Ref } from "vue";
import { defineStore } from "pinia";

type CounteStore = {
  count: Ref<number>;
  doubleCount: Ref<number>;
  increment: () => void;
};

export const useCounterStore = defineStore<"counter", CounteStore>(
  "counter",
  () => {
    const count = ref(0);

    const doubleCount = computed(() => count.value * 2);

    function increment() {
      count.value++;
    }

    return { count, doubleCount, increment };
  }
);
