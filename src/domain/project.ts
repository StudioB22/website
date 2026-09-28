import { z } from "zod";

export const projectStatusSchema = z.enum([
  "concept",
  "mock-up",
  "demonstrator",
  "client-work",
  "archived-experiment",
]);

const projectCoreSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().trim().min(1),
  sector: z.string().trim().min(1),
  summary: z.string().trim().min(40).max(220),
  status: projectStatusSchema,
  demonstratedCapabilities: z.array(z.string().trim().min(1)).min(1),
  credits: z.array(z.string().trim().min(1)).min(1),
  limitations: z.array(z.string().trim().min(1)),
  reviewedAt: z.iso.date(),
});

const previewAssetSchema = z.object({
  src: z.string().regex(/^\/[a-zA-Z0-9/_-]+\.[a-zA-Z0-9]+$/),
  width: z.int().positive(),
  height: z.int().positive(),
  alt: z.string().trim().min(1),
  credit: z.string().trim().min(1),
  rights: z.string().trim().min(1),
});

const reviewDatesSchema = z.object({
  content: z.iso.date(),
  rights: z.iso.date(),
  security: z.iso.date(),
  demoMaturity: z.iso.date(),
});

const draftProjectSchema = projectCoreSchema.extend({
  published: z.literal(false),
});

const publishedProjectSchema = projectCoreSchema.extend({
  published: z.literal(true),
  visualDirection: z.string().trim().min(1),
  previewAssets: z.array(previewAssetSchema).min(1),
  reviewDates: reviewDatesSchema,
  reviewedDemoUrl: z.url().optional(),
  publishedAt: z.iso.date(),
});

export const projectSchema = z.discriminatedUnion("published", [
  draftProjectSchema,
  publishedProjectSchema,
]);

export type Project = z.infer<typeof projectSchema>;

export const parseProjects = (input: readonly unknown[]): readonly Project[] =>
  z.array(projectSchema).parse(input);
