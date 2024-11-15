import "../test/mockNodeEnv";

import { expect, test } from "vitest";
import { useUsersStore } from "./users";
import flushPromises from "flush-promises";

test("usersStore Test", async () => {
  const userStore = useUsersStore();
  expect(userStore.loaded).toBe(false);
  await userStore.load();
  await flushPromises();
  expect(userStore.loaded).toBe(true);
  expect(userStore.users).toEqual([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ]);
});
