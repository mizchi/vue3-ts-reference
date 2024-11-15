// Network store examples
import { ref, Ref } from "vue";
import { defineStore } from "pinia";
import { createClient } from "../api/client";
import type { User } from "../api/impl";

type UsersStore = {
  loaded: Ref<boolean>;
  users: Ref<User[] | null>;
  load: () => Promise<void>;
};

export const useUsersStore = defineStore<"users", UsersStore>("users", () => {
  const loaded = ref(false);
  const users = ref<User[] | null>(null);
  const load = async () => {
    const client = createClient();
    loaded.value = false;
    const result = await client.GET("/users", {});
    if (result.data) {
      users.value = result.data;
    }
    loaded.value = true;
  };
  return { loaded, users, load };
});
