import { createHttpClient, type ApiClient } from "./impl";

// import { createMockClient } from "./mock";
export let createClient: () => ApiClient;
createClient = createHttpClient;

// if (import.meta.env.VITE_MOCK) {
//   console.info("---- Using local mock client ----");
//   createClient = createMockClient;
// } else {
//   createClient = createHttpClient;
// }
