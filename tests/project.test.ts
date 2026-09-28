import { describe, expect, it } from "vitest";

import { parseProjects, projectSchema } from "../src/domain/project";

const validProject = {
  slug: "atelier-floral",
  title: "Atelier floral",
  sector: "Artisanat",
  summary:
    "Une démonstration éditoriale conçue pour présenter clairement un savoir-faire artisanal.",
  status: "demonstration",
  demonstratedCapabilities: ["Direction éditoriale", "Interface responsive"],
  credits: ["Conception StudioB22"],
  limitations: ["Démonstration sans client réel"],
  reviewedAt: "2026-09-25",
  published: false,
} as const;

describe("projectSchema", () => {
  it("accepts a complete and truthful catalogue entry", () => {
    // arrange / act
    const result = projectSchema.parse(validProject);

    // assert
    expect(result).toEqual(validProject);
  });

  it("rejects an invalid slug and missing credits", () => {
    // arrange
    const invalidProject = {
      ...validProject,
      slug: "Atelier floral",
      credits: [],
    };

    // act
    const result = projectSchema.safeParse(invalidProject);

    // assert
    expect(result.success).toBe(false);
  });

  it("keeps an empty reviewed catalogue valid during foundation work", () => {
    // arrange / act
    const result = parseProjects([]);

    // assert
    expect(result).toEqual([]);
  });
});
