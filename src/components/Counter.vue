<script setup lang="ts">
import { useCounterStore } from "../store/counter";
const props = defineProps<{ name: string }>();
const counter = useCounterStore();
</script>

<template>
  <p>Hello, {{ props.name }}!</p>
  <button type="button" @click="counter.increment">increment</button>
  <p>
    <span data-testid="countValue">count:{{ counter.count }}</span>
  </p>
</template>

<style scoped></style>
