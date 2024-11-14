// @vitest-environment happy-dom
import HelloWorld from "./HelloWorld.vue";
import { expect, test } from "vitest";
import { shallowMount } from "@vue/test-utils";

test("hello world", async () => {
  expect("HelloWorld").toBe(HelloWorld.__name);
});
test("Component Test", async () => {
  const expected = "test message";
  const wrapper = shallowMount(HelloWorld, {
    propsData: { msg: expected },
  });
  expect(wrapper.text()).toContain(expected);
});
