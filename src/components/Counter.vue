<script setup lang="ts">
import { useCounterStore } from "../store/counter";
const props = defineProps<{ name: string }>();
const counter = useCounterStore();
</script>

<template>
  <p>Hello, {{ props.name }}!</p>
  <button type="button" @click="counter.increment">
    Counter: {{ counter.count }}
  </button>
</template>

<style scoped></style>
