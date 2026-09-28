import { z } from "zod";

export const projectStatusSchema = z.enum([
  "concept",
  "demonstration",
  "client-work",
]);

export const projectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().trim().min(1),
  sector: z.string().trim().min(1),
  summary: z.string().trim().min(40).max(220),
  status: projectStatusSchema,
  demonstratedCapabilities: z.array(z.string().trim().min(1)).min(1),
  credits: z.array(z.string().trim().min(1)).min(1),
  limitations: z.array(z.string().trim().min(1)),
  reviewedAt: z.iso.date(),
  published: z.boolean(),
});

export type Project = z.infer<typeof projectSchema>;

export const parseProjects = (input: readonly unknown[]): readonly Project[] =>
  z.array(projectSchema).parse(input);
