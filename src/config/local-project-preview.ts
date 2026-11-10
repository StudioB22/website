import { statSync } from "node:fs";
import { projects } from "../data/projects";
import { localProjectPreviewInputs } from "../data/local-project-previews";
import { parseLocalDemoUrl } from "../domain/local-demo-url";
import { parseLocalProjectPreviews } from "../domain/local-project-preview";
import type { Project } from "../domain/project";

/** Resolve registered review files and server-only overrides; never start demo servers. */
export const buildLocalProjectPreviews = (
  input: readonly unknown[],
  catalogue: readonly Project[],
  reviewRoot: URL,
  environment: Readonly<Record<string, unknown>> = {},
) =>
  parseLocalProjectPreviews(input, catalogue).map((preview) => {
    const captures = preview.captures.map((capture) => {
      const fileUrl = new URL(
        `${preview.projectSlug}/${capture.sourceFilename}`,
        reviewRoot,
      );
      if (!statSync(fileUrl, { throwIfNoEntry: false })?.isFile()) {
        throw new Error(
          `Missing local capture: ${preview.projectSlug}/${capture.sourceFilename}`,
        );
      }
      return { ...capture, fileUrl };
    });
    const override = preview.demoUrlEnv
      ? environment[preview.demoUrlEnv]
      : undefined;
    if (override !== undefined && typeof override !== "string") {
      throw new Error(`Expected a string demo override: ${preview.demoUrlEnv}`);
    }
    return {
      ...preview,
      demoUrl: parseLocalDemoUrl(override ?? preview.demoUrl),
      captures: [captures[0]!, captures[1]!] as const,
    };
  });

/**
 * Resolved local previews. Empty outside `import.meta.env.DEV`: the configuration and the route
 * generation both enforce the development-only boundary, so previews never reach a build.
 */
export const localProjectPreviews = import.meta.env.DEV
  ? buildLocalProjectPreviews(
      localProjectPreviewInputs,
      projects,
      new URL("../../docs/product/reviews/", import.meta.url),
      import.meta.env,
    )
  : [];
