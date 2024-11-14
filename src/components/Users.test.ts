// @vitest-environment happy-dom
import Users from "./Users.vue";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { shallowMount } from "@vue/test-utils";
import { setActivePinia, createPinia } from "pinia";

beforeEach(() => {
  // const mockedFetch = vi
  //   .spyOn(globalThis, "fetch")
  //   .mockImplementation(async () => {
  //     console.log("mocked:fetch-----------------------");
  //     return new Response('{ "key": "value" }', { status: 200 });
  //   });

  window.fetch = globalThis.fetch = vi
    .fn()
    .mockImplementation(
      async () => new Response('{ "key": "value" }', { status: 200 })
    );
  setActivePinia(createPinia());

  // @ts-ignore
  // window.fetch = async (url, init) => {
  //   // TODO:
  //   console.log("intercept", url, init);
  //   return {
  //     json: async () => {
  //       return [
  //         {
  //           id: 1,
  //           name: "John Doe",
  //           email: "",
  //         },
  //       ];
  //     },
  //   };
  // };
});
afterEach(() => {
  vi.restoreAllMocks();
});

test("Users Test", async () => {
  const wrapper = shallowMount(Users, {});
  console.log(wrapper.html());
});
