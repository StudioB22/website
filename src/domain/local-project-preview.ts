import { z } from "zod";
import type { Project } from "./project";
import { parseLocalDemoUrl } from "./local-demo-url";

const text = z.string().trim().min(1);
const captureFields = {
  sourceFilename: z.string().regex(/^[a-zA-Z0-9_-]+\.png$/),
  width: z.int().positive(),
  height: z.int().positive(),
  alt: text,
};
const localPreviewSchema = z.object({
  projectSlug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  displayTitle: text,
  formatLabel: text,
  overviewTitle: text,
  overview: text,
  demoUrl: text,
  demoUrlEnv: z
    .string()
    .regex(/^STUDIOB22_LOCAL_[A-Z0-9_]+$/)
    .optional(),
  captureDate: z.iso.date(),
  sourceCommit: z.string().regex(/^[a-f0-9]{40}$/),
  captureCredits: z.array(text).min(1),
  captures: z.tuple([
    z.object({ ...captureFields, name: z.literal("desktop") }),
    z.object({ ...captureFields, name: z.literal("mobile") }),
  ]),
});

/** Registry entry of a local preview: evidence captures, credits and a loopback demo URL. */
export type LocalProjectPreviewInput = z.infer<typeof localPreviewSchema>;

/** Join registered previews to existing drafts without publishing or performing IO. */
export const parseLocalProjectPreviews = (
  input: readonly unknown[],
  projects: readonly Project[],
  today = new Date().toISOString().slice(0, 10),
) => {
  const entries = z.array(localPreviewSchema).parse(input);
  const seen = new Set<string>();
  const overrideNames = new Set<string>();
  return entries.map((entry) => {
    if (seen.has(entry.projectSlug)) {
      throw new Error(`Duplicate local preview: ${entry.projectSlug}`);
    }
    seen.add(entry.projectSlug);
    if (entry.demoUrlEnv !== undefined) {
      if (overrideNames.has(entry.demoUrlEnv)) {
        throw new Error(
          `Duplicate local demo override: ${entry.demoUrlEnv} (${entry.projectSlug})`,
        );
      }
      overrideNames.add(entry.demoUrlEnv);
    }
    const project = projects.find((item) => item.slug === entry.projectSlug);
    if (!project || project.published) {
      throw new Error(
        `Local preview requires an existing draft: ${entry.projectSlug}`,
      );
    }
    if (entry.captureDate > today) {
      throw new Error(
        `Capture evidence cannot be in the future: ${entry.projectSlug}`,
      );
    }
    const captures = entry.captures.map((capture) => ({
      ...capture,
      src: `/atelier-local/captures/${entry.projectSlug}/${capture.name}.png`,
    }));
    return {
      ...entry,
      project,
      demoUrl: parseLocalDemoUrl(entry.demoUrl),
      // Preserve the validated desktop/mobile order and nonempty tuple contract.
      captures: [captures[0]!, captures[1]!] as const,
    };
  });
};
