import createClient from "openapi-fetch";
import { paths, components } from "./gen";

export const client = createClient<paths>({ baseUrl: "https://myapi.dev/v1/" });
export type User = components["schemas"]["User"];
