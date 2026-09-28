import { describe, expect, it } from "vitest";

import { parseProjects, projectSchema } from "../src/domain/project";

const validProject = {
  slug: "atelier-floral",
  title: "Atelier floral",
  sector: "Artisanat",
  summary:
    "Une démonstration éditoriale conçue pour présenter clairement un savoir-faire artisanal.",
  status: "demonstrator",
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

  it.each([
    "concept",
    "mock-up",
    "demonstrator",
    "client-work",
    "archived-experiment",
  ] as const)("accepts the approved %s status", (status) => {
    // arrange
    const candidate = { ...validProject, status };

    // act
    const result = projectSchema.safeParse(candidate);

    // assert
    expect(result.success).toBe(true);
  });

  it("rejects a published entry without publication evidence", () => {
    // arrange
    const incompletePublishedProject = {
      ...validProject,
      published: true,
    };

    // act
    const result = projectSchema.safeParse(incompletePublishedProject);

    // assert
    expect(result.success).toBe(false);
  });

  it("accepts a published entry with complete publication evidence", () => {
    // arrange
    const publishedProject = {
      ...validProject,
      published: true,
      visualDirection: "Éditoriale et lumineuse",
      previewAssets: [
        {
          src: "/images/atelier-floral.webp",
          width: 1600,
          height: 1000,
          alt: "Page d’accueil de la démonstration Atelier floral",
          credit: "Conception StudioB22",
          rights: "Création originale StudioB22",
        },
      ],
      reviewDates: {
        content: "2026-09-25",
        rights: "2026-09-25",
        security: "2026-09-25",
        demoMaturity: "2026-09-25",
      },
      reviewedDemoUrl: "https://demo.example.com/atelier-floral/",
      publishedAt: "2026-09-25",
    } as const;

    // act
    const result = projectSchema.parse(publishedProject);

    // assert
    expect(result).toEqual(publishedProject);
  });

  it("rejects an invalid demo URL on a published entry", () => {
    // arrange
    const publishedProject = {
      ...validProject,
      published: true,
      visualDirection: "Éditoriale et lumineuse",
      previewAssets: [
        {
          src: "/images/atelier-floral.webp",
          width: 1600,
          height: 1000,
          alt: "Page d’accueil de la démonstration Atelier floral",
          credit: "Conception StudioB22",
          rights: "Création originale StudioB22",
        },
      ],
      reviewDates: {
        content: "2026-09-25",
        rights: "2026-09-25",
        security: "2026-09-25",
        demoMaturity: "2026-09-25",
      },
      reviewedDemoUrl: "not-a-url",
      publishedAt: "2026-09-25",
    } as const;

    // act
    const result = projectSchema.safeParse(publishedProject);

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
