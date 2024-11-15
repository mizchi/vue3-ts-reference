import {
  defineConfig,
  coverageConfigDefaults,
  defaultExclude,
} from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  test: {
    exclude: [...defaultExclude, "e2e/**"],
    coverage: {
      exclude: [
        ...coverageConfigDefaults.exclude,
        "**/node_modules/**",
        "src/api/mock.ts",
        "src/api/types.ts",
        "src/test/mockBrowserEnv.ts",
        "public/**",
        "script/**",
      ],
    },
  },
});
