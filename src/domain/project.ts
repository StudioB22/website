import { z } from "zod";

export const projectStatusSchema = z.enum([
  "concept",
  "mock-up",
  "demonstrator",
  "client-work",
  "archived-experiment",
]);

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

export const projectSchema = z.discriminatedUnion("published", [
  draftProjectSchema,
  publishedProjectSchema,
]);

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
