import fs from "node:fs";
import path from "node:path";
import yaml from "yaml";
import type { OpenAPIV3_1 as OpenAPI } from "openapi-types";
import prettier from "prettier";

function loadSchema(): OpenAPI.Document {
  const schemaRaw = fs.readFileSync(
    path.join(process.cwd(), "schema.yaml"),
    "utf8"
  );
  return yaml.parse(schemaRaw);
}

const rootSchema = loadSchema();
type Operation = {
  status: number;
  operationId?: string;
  method: string;
  tags?: string[];
  isJson: boolean;
  description?: string;
  examples: any[];
  schema?: any;
};

function _access<T>(root: OpenAPI.Document, paths: string[]): T {
  let resolved = root;
  for (const path of paths) {
    resolved = resolved[path];
  }
  return resolved as T;
}

function resolveResponse(
  responseOrRef: OpenAPI.ReferenceObject | OpenAPI.ResponseObject,
  root: OpenAPI.Document
): OpenAPI.ResponseObject {
  if (responseOrRef["$ref"]) {
    const ref = responseOrRef["$ref"];
    const [_, refPath] = ref.split("/");
    const accessPath = refPath.split("/").slice(1);
    return _access<OpenAPI.ResponseObject>(root, accessPath);
  }
  return responseOrRef as OpenAPI.ResponseObject;
}

const ops: Operation[] = Object.entries(rootSchema.paths!).flatMap(
  ([path, methods]) => {
    return Object.entries(methods!).flatMap(([method, operation]) => {
      if (typeof operation === "string") return [];
      const responses = (operation as OpenAPI.OperationObject)
        .responses as OpenAPI.ResponsesObject;
      return Object.entries(responses).flatMap(([status, response]) => {
        const resolvedResponse = resolveResponse(response, rootSchema);
        const schema = resolvedResponse.content?.["application/json"];
        const examples = [
          ...(schema?.example ? [schema.example] : []),
          schema?.examples ?? [],
        ];
        const op = operation as OpenAPI.OperationObject;
        return [
          {
            operationId: op.operationId,
            tags: op.tags,
            isJson: !!resolvedResponse.content?.["application/json"],
            description: op.description,
            path,
            method: method,
            status: Number(status),
            schema,
            examples,
          },
        ];
      });
    });
  }
);

const mockCode = `import type {ApiClient} from "./impl";

type Operation = {
  operationId?: string;
  method: string;
  tags?: string[];
  isJson: boolean;
  status: number;
  path: string;
  description?: string;
  examples: any[];
  schema?: any;
};

// prettier-ignore
export const ops: Array<Operation> = ${JSON.stringify(ops, null, 2)};

export function createMockClient(): ApiClient {
  if (process.env.NODE_ENV === "production") {
    throw new Error("Mock client should only be used in development");
  }
  const createMethod = (method: string) => {
    return async function (path: string, _init: any): Promise<any> {
      const resolved = ops.find((m) => {
        return m.method === method && m.path === path
      });
      if (!resolved) {
        throw new Error("Not implemented");
      }
      return {
        data: resolved.examples[0],
      };
    };
  };
  return {
    GET: createMethod("get"),
    PUT: createMethod("put"),
    POST: createMethod("post"),
    DELETE: createMethod("delete"),
    OPTIONS: createMethod("options"),
    HEAD: createMethod("head"),
    PATCH: createMethod("patch"),
    TRACE: createMethod("trace"),
    use: () => {},
    eject: () => {},
  } as ApiClient;
}
`;
// console.log(mockCode);
fs.writeFileSync(
  path.join(process.cwd(), "src/api/mock.ts"),
  await prettier.format(mockCode, { parser: "typescript" })
);
console.log("Mock client generated > src/api/mock.ts");
