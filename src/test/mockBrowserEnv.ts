import { setupWorker } from "msw/browser";
import { mockHandlers } from "./handlers";

export async function startMock() {
  const worker = setupWorker(...mockHandlers);
  await worker.start();
}
