// @vitest-environment happy-dom
import "../test/mockNodeEnv";

import { shallowMount } from "@vue/test-utils";
import flushPromises from "flush-promises";
import { expect, test } from "vitest";
import Users from "./UserList.vue";

test("Users Test", async () => {
  const wrapper = shallowMount(Users);
  expect(wrapper.text()).toContain("Loading...");
  await flushPromises();
  expect(wrapper.text()).toContain("Alice");
  expect(wrapper.html()).toContain("Bob");
});
