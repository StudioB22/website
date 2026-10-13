import { describe, expect, it } from "vitest";
import { parseLocalDemoUrl } from "../src/domain/local-demo-url";

describe("local demo URL boundary", () => {
  it.each([
    "http://127.0.0.1:4401/",
    "http://localhost:4321/",
    "http://[::1]:4401/",
  ])("accepts loopback %s", (value) => {
    expect(parseLocalDemoUrl(value)).toBe(value);
  });
  it.each([
    "https://example.com/",
    "http://example.com/",
    "http://127.0.0.1.example.com/",
    "javascript:alert(1)",
    "http://user:password@localhost/",
    "http://localhost/?token=test",
    "http://localhost/#fragment",
    "/relative",
  ])("rejects unsafe or non-local %s", (value) => {
    expect(() => parseLocalDemoUrl(value)).toThrow();
  });
});
