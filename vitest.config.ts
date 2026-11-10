import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
    coverage: {
      provider: "v8",
      include: ["src/**/*.ts"],
      // The only route handler, the DEV-only capture endpoint, is covered by the manual
      // `npm run test:local`; the generated-site test proves production emits none of it.
      exclude: ["src/**/*.d.ts", "src/pages/**"],
      reporter: ["text", "lcov"],
      // Owner floor is 80 % (rule 2026-10-16); set just under the measured figures as a ratchet.
      thresholds: { statements: 95, branches: 90, functions: 95, lines: 95 },
    },
  },
});
