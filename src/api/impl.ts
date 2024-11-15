import createClient, { Client, ClientOptions } from "openapi-fetch";
import type { paths, components } from "./types";

export type ApiClient = Client<paths>;
export function createHttpClient(options: ClientOptions = {}): ApiClient {
  return createClient<paths>({
    baseUrl: "http://localhost:8001/api/v1",
    ...options,
  });
}

export type User = components["schemas"]["User"];
