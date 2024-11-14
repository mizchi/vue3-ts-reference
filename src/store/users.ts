import { ref, Ref } from "vue";
import { defineStore } from "pinia";
import { client } from "../api/api";
import type { User } from "../api/api";

type UsersStore = {
  loaded: Ref<boolean>;
  users: Ref<User[] | null>;
  load: () => Promise<void>;
};

export const useUsersStore = defineStore<"users", UsersStore>("users", () => {
  const loaded = ref(false);
  const users = ref<User[] | null>(null);
  const load = async () => {
    loaded.value = false;
    const { data } = await client.GET("/users", {});
    loaded.value = true;
    if (data) {
      users.value = data;
    }
  };
  return { loaded, users, load };
});
