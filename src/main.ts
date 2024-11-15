import { createApp } from "vue";
import "./style.css";
import { createPinia } from "pinia";
import App from "./App.vue";

if (import.meta.env.VITE_MOCK) {
  const { startMock } = await import("./test/mockBrowserEnv");
  await startMock();
}
createApp(App).use(createPinia()).mount("#app");
