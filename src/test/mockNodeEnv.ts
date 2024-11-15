import { afterAll, afterEach, beforeAll } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { setupServer } from "msw/node";
import { mockHandlers } from "./handlers";

if (import.meta.env.VITE_MOCK) {
  const server = setupServer(...mockHandlers);
  beforeAll(() => {
    server.listen({ onUnhandledRequest: "error" });
    setActivePinia(createPinia());
  });
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());
}
