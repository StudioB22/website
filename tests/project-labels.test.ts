import { describe, expect, it } from "vitest";

import {
  formatReviewDate,
  reviewDateLabels,
  sectorLabels,
} from "../src/data/project-labels";
import { projectSectorSchema } from "../src/domain/project";

describe("published project labels", () => {
  it("labels every sector available to a gallery filter", () => {
    expect(Object.keys(sectorLabels).sort()).toEqual(
      [...projectSectorSchema.options].sort(),
    );
  });

  it("labels every required publication review date", () => {
    expect(Object.keys(reviewDateLabels).sort()).toEqual(
      [
        "content",
        "rights",
        "security",
        "dependencies",
        "accessibility",
        "performance",
        "responsive",
        "demoMaturity",
      ].sort(),
    );
  });

  it("formats review dates in French without timezone drift", () => {
    expect(formatReviewDate("2026-09-28")).toBe("28 sept. 2026");
  });
});
