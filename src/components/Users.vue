<script setup lang="ts">
import { onMounted } from "vue";
import { useUsersStore } from "../store/users";
const users = useUsersStore();

onMounted(async () => {
  console.log("Users component mounted");
  await users.load();
  console.log(users.users);
});
</script>

<template>
  <template v-if="users.loaded">Loading...</template>
  <template v-else>
    <ul>
      <li v-for="user in users.users" :key="user.id">
        {{ user.name }}
      </li>
    </ul>
  </template>
</template>

<style scoped></style>
