import { describe, expect, it } from "vitest";

import { parseProjects, projectSchema } from "../src/domain/project";

const validProject = {
  slug: "atelier-floral",
  title: "Atelier floral",
  sector: "artisans-et-metiers",
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
      visualDirection: "editoriale",
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
        dependencies: "2026-09-25",
        accessibility: "2026-09-25",
        performance: "2026-09-25",
        responsive: "2026-09-25",
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
      visualDirection: "editoriale",
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
        dependencies: "2026-09-25",
        accessibility: "2026-09-25",
        performance: "2026-09-25",
        responsive: "2026-09-25",
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

  it.each(["mailto:test@example.com", "http://demo.example.com"])(
    "rejects the non-HTTPS demo URL %s",
    (reviewedDemoUrl) => {
      // arrange
      const publishedProject = {
        ...validProject,
        published: true,
        visualDirection: "editoriale",
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
          dependencies: "2026-09-25",
          accessibility: "2026-09-25",
          performance: "2026-09-25",
          responsive: "2026-09-25",
          demoMaturity: "2026-09-25",
        },
        reviewedDemoUrl,
        publishedAt: "2026-09-25",
      } as const;

      // act
      const result = projectSchema.safeParse(publishedProject);

      // assert
      expect(result.success).toBe(false);
    },
  );

  it("rejects a live demo without all required review evidence", () => {
    // arrange
    const insufficientlyReviewedDemo = {
      ...validProject,
      published: true,
      visualDirection: "editoriale",
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
    const result = projectSchema.safeParse(insufficientlyReviewedDemo);

    // assert
    expect(result.success).toBe(false);
  });

  it("rejects an uncontrolled sector value", () => {
    // arrange
    const uncontrolledProject = {
      ...validProject,
      sector: "Artisanat",
    };

    // act
    const result = projectSchema.safeParse(uncontrolledProject);

    // assert
    expect(result.success).toBe(false);
  });

  it("rejects an uncontrolled visual-direction value", () => {
    // arrange
    const uncontrolledProject = {
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
        dependencies: "2026-09-25",
        accessibility: "2026-09-25",
        performance: "2026-09-25",
        responsive: "2026-09-25",
        demoMaturity: "2026-09-25",
      },
      publishedAt: "2026-09-25",
    } as const;

    // act
    const result = projectSchema.safeParse(uncontrolledProject);

    // assert
    expect(result.success).toBe(false);
  });

  it("rejects protocol-relative preview asset paths", () => {
    // arrange
    const publishedProject = {
      ...validProject,
      published: true,
      visualDirection: "editoriale",
      previewAssets: [
        {
          src: "//images/atelier-floral.webp",
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
        dependencies: "2026-09-25",
        accessibility: "2026-09-25",
        performance: "2026-09-25",
        responsive: "2026-09-25",
        demoMaturity: "2026-09-25",
      },
      publishedAt: "2026-09-25",
    } as const;

    // act
    const result = projectSchema.safeParse(publishedProject);

    // assert
    expect(result.success).toBe(false);
  });

  it("rejects a preview asset with a non-image extension", () => {
    // arrange
    const publishedProject = {
      ...validProject,
      published: true,
      visualDirection: "editoriale",
      previewAssets: [
        {
          src: "/images/atelier-floral.txt",
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
        dependencies: "2026-09-25",
        accessibility: "2026-09-25",
        performance: "2026-09-25",
        responsive: "2026-09-25",
        demoMaturity: "2026-09-25",
      },
      publishedAt: "2026-09-25",
    } as const;

    // act
    const result = projectSchema.safeParse(publishedProject);

    // assert
    expect(result.success).toBe(false);
  });

  it("rejects future-dated review evidence", () => {
    // arrange
    const futureReview = {
      ...validProject,
      reviewedAt: "2999-01-01",
    };

    // act
    const result = projectSchema.safeParse(futureReview);

    // assert
    expect(result.success).toBe(false);
  });

  it("keeps an empty reviewed catalogue valid during foundation work", () => {
    // arrange / act
    const result = parseProjects([]);

    // assert
    expect(result).toEqual([]);
  });

  it("rejects duplicate catalogue slugs", () => {
    // arrange
    const duplicateProjects = [validProject, { ...validProject }];

    // act / assert
    expect(() => parseProjects(duplicateProjects)).toThrow(
      "Duplicate project slug",
    );
  });

  it("rejects a published entry whose preview asset is unavailable", () => {
    // arrange
    const publishedProject = {
      ...validProject,
      published: true,
      visualDirection: "editoriale",
      previewAssets: [
        {
          src: "/images/missing.webp",
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
        dependencies: "2026-09-25",
        accessibility: "2026-09-25",
        performance: "2026-09-25",
        responsive: "2026-09-25",
        demoMaturity: "2026-09-25",
      },
      publishedAt: "2026-09-25",
    } as const;

    // act / assert
    expect(() => parseProjects([publishedProject], new Set())).toThrow(
      "references a missing preview asset",
    );
  });
});
