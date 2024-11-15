// @vitest-environment happy-dom
import Counter from "./Counter.vue";
import { beforeEach, expect, test } from "vitest";
import { shallowMount } from "@vue/test-utils";
import { setActivePinia, createPinia } from "pinia";
beforeEach(async () => {
  setActivePinia(createPinia());
});

test("Component Test", async () => {
  const wrapper = shallowMount(Counter, {
    propsData: {
      name: "John",
    },
  });

  expect(wrapper.text()).toContain("Hello, John");
  expect(wrapper.text()).toContain("count:0");

  await wrapper.find("button").trigger("click");
  expect(wrapper.text()).toContain("count:1");
});
