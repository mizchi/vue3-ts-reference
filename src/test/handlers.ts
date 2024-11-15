import { http, HttpResponse } from "msw";
import { createMockClient, ops } from "../api/mock";

export const mockHandlers = ops.map((op) => {
  const mockClient = createMockClient();
  const fullUrl = `http://localhost:8001/api/v1${op.path}`;
  const method = op.method.toLowerCase() as keyof typeof http;
  const client = mockClient as any;
  return http[method](fullUrl, async () => {
    try {
      const result = await client[method.toUpperCase()](op.path, {});
      return HttpResponse.json(result.data);
    } catch (err) {
      return HttpResponse.json(
        {
          data: undefined,
          error: "wip",
        },
        {
          status: 500,
        }
      );
    }
  });
});
