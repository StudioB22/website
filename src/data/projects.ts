import { globSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { parseProjects, type Project } from "../domain/project";

const projectInputs = [] satisfies readonly Project[];
const publicDirectory = fileURLToPath(
  new URL("../../public/", import.meta.url),
);
const publicAssetPaths = new Set(
  globSync("**/*", { cwd: publicDirectory })
    .map((path) => `/${path.replaceAll("\\", "/")}`)
    .filter((path) => path.includes(".")),
);

export const projects = parseProjects(projectInputs, publicAssetPaths);
