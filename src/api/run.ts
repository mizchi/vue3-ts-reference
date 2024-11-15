import { createMockClient } from "./mock.ts";

const mockClient = createMockClient();
console.log(
  await mockClient.GET("/users", {
    headers: {
      "x-mock-status": "200",
    },
  })
);
