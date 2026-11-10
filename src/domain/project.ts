import { z } from "zod";

/** Truthful statuses a gallery entry may declare (ADR-0002: no implied client work). */
export const projectStatusSchema = z.enum([
  "concept",
  "mock-up",
  "demonstrator",
  "client-work",
  "archived-experiment",
]);

/** Sectors the gallery is filtered by. */
export const projectSectorSchema = z.enum([
  "artisans-et-metiers",
  "restauration-et-hospitalite",
  "commerce",
  "beaute-et-bien-etre",
  "sante",
  "immobilier",
  "sport",
  "photographie",
  "services-locaux",
]);

/** Visual directions a published entry declares. */
export const visualDirectionSchema = z.enum([
  "editoriale",
  "chaleureuse-et-organique",
  "contemporaine-et-affirmee",
  "elegante-et-minimale",
  "ludique-et-coloree",
  "technique-et-fonctionnelle",
]);

const reviewedDateSchema = z.iso
  .date()
  .refine(
    (value) => value <= new Date().toISOString().slice(0, 10),
    "Review evidence cannot be dated in the future",
  );

const caseStudyText = z.string().trim().min(1);
/** Case study: decisions with their evidence limit, milestones mapped to method steps. */
export const caseStudySchema = z.object({
  context: caseStudyText,
  objective: caseStudyText,
  decisions: z
    .array(
      z.object({
        title: caseStudyText,
        reason: caseStudyText,
        example: caseStudyText,
        evidenceLimit: caseStudyText,
      }),
    )
    .min(1),
  milestones: z
    .array(
      z.object({
        title: caseStudyText,
        methodSteps: z.array(z.int().min(1).max(15)).min(1),
        status: z.enum([
          "documented",
          "partially-verified",
          "pending",
          "not-applicable",
        ]),
        explanation: caseStudyText,
      }),
    )
    .min(1),
});

/** Validated case study of a published project. */
export type CaseStudy = z.infer<typeof caseStudySchema>;

const projectCoreSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().trim().min(1),
  sector: projectSectorSchema,
  summary: z.string().trim().min(40).max(220),
  status: projectStatusSchema,
  demonstratedCapabilities: z.array(z.string().trim().min(1)).min(1),
  credits: z.array(z.string().trim().min(1)).min(1),
  limitations: z.array(z.string().trim().min(1)),
  reviewedAt: reviewedDateSchema,
  caseStudy: caseStudySchema.optional(),
});

const previewAssetSchema = z.object({
  src: z
    .string()
    .regex(/^\/[a-zA-Z0-9_-]+(?:\/[a-zA-Z0-9_-]+)*\.(?:avif|jpe?g|png|webp)$/),
  width: z.int().positive(),
  height: z.int().positive(),
  alt: z.string().trim().min(1),
  credit: z.string().trim().min(1),
  rights: z.string().trim().min(1),
});

const reviewDatesSchema = z.object({
  content: reviewedDateSchema,
  rights: reviewedDateSchema,
  security: reviewedDateSchema,
  dependencies: reviewedDateSchema,
  accessibility: reviewedDateSchema,
  performance: reviewedDateSchema,
  responsive: reviewedDateSchema,
  demoMaturity: reviewedDateSchema,
});

const secureWebUrlSchema = z
  .url()
  .refine(
    (value) => URL.canParse(value) && new URL(value).protocol === "https:",
    "Expected an HTTPS URL",
  );

const draftProjectSchema = projectCoreSchema.extend({
  published: z.literal(false),
});

const publishedProjectSchema = projectCoreSchema.extend({
  published: z.literal(true),
  visualDirection: visualDirectionSchema,
  previewAssets: z.array(previewAssetSchema).min(1),
  reviewDates: reviewDatesSchema,
  reviewedDemoUrl: secureWebUrlSchema.optional(),
  publishedAt: reviewedDateSchema,
});

/** A draft carries the core only; a published entry adds assets and dated review evidence. */
export const projectSchema = z.discriminatedUnion("published", [
  draftProjectSchema,
  publishedProjectSchema,
]);

/** Validated gallery entry, draft or published. */
export type Project = z.infer<typeof projectSchema>;

const projectListSchema = z
  .array(projectSchema)
  .superRefine((projects, context) => {
    const knownSlugs = new Set<string>();

    projects.forEach((project, index) => {
      if (knownSlugs.has(project.slug)) {
        context.addIssue({
          code: "custom",
          message: `Duplicate project slug: ${project.slug}`,
          path: [index, "slug"],
        });
      }

      knownSlugs.add(project.slug);
    });
  });

/** Validate the catalogue and refuse a published entry whose preview asset is not shipped. */
export const parseProjects = (
  input: readonly unknown[],
  availableAssetPaths: ReadonlySet<string> = new Set(),
): readonly Project[] => {
  const projects = projectListSchema.parse(input);

  for (const project of projects) {
    if (!project.published) {
      continue;
    }

    for (const asset of project.previewAssets) {
      if (!availableAssetPaths.has(asset.src)) {
        throw new Error(
          `Published project ${project.slug} references a missing preview asset: ${asset.src}`,
        );
      }
    }
  }

  return projects;
};
