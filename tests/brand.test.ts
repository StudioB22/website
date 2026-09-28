import { describe, expect, it } from "vitest";

import { brand } from "../src/config/brand";
import { validateBrandForRelease } from "../src/domain/brand";

describe("validateBrandForRelease", () => {
  it("accepts the provisional identity for a private preview", () => {
    // arrange / act
    const result = validateBrandForRelease(brand, "preview");

    // assert
    expect(result).toEqual(brand);
  });

  it("rejects the provisional identity for a public release", () => {
    // arrange / act / assert
    expect(() => validateBrandForRelease(brand, "public")).toThrow(
      "A public release requires an approved brand",
    );
  });

  it("accepts a complete approved identity for a public release", () => {
    // arrange
    const approvedBrand = {
      ...brand,
      name: "Approved studio",
      isProvisional: false,
      publicLaunchApproved: true,
      canonicalOrigin: "https://example.com",
      contactEmail: "contact@example.com",
    } as const;

    // act
    const result = validateBrandForRelease(approvedBrand, "public");

    // assert
    expect(result).toEqual(approvedBrand);
  });

  it("rejects a public release until all launch gates are explicitly approved", () => {
    // arrange
    const unapprovedLaunch = {
      ...brand,
      name: "Approved studio",
      isProvisional: false,
      canonicalOrigin: "https://example.com",
      contactEmail: "contact@example.com",
    } as const;

    // act / assert
    expect(() => validateBrandForRelease(unapprovedLaunch, "public")).toThrow(
      "explicit launch approval",
    );
  });
});
