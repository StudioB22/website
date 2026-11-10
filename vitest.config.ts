import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
    coverage: {
      provider: "v8",
      include: ["src/**/*.ts"],
      // Astro route handlers are exercised by the generated-site test (tests/site-build.test.mjs).
      exclude: ["src/**/*.d.ts", "src/pages/**"],
      reporter: ["text", "lcov"],
      // Owner floor is 80 % (rule 2026-10-16); raise as a ratchet, never lower.
      thresholds: { statements: 80, branches: 80, functions: 80, lines: 80 },
    },
  },
});
