import { describe, expect, it } from "vitest";
import { pageDescription, previewOnly } from "../src/domain/release-copy";

describe("release copy", () => {
  it("labels preview metadata and preview-only content", () => {
    expect(pageDescription("Présentation du studio.", "preview")).toBe(
      "Présentation du studio. Préversion privée.",
    );
    expect(previewOnly("Nom de travail", "preview")).toBe("Nom de travail");
  });

  it("keeps public copy free of private-preview wording", () => {
    expect(pageDescription("Présentation du studio.", "public")).toBe(
      "Présentation du studio.",
    );
    expect(previewOnly("Nom de travail", "public")).toBeNull();
  });
});
