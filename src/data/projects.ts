import { parseProjects, type Project } from "../domain/project";

const projectInputs = [] satisfies readonly Project[];

export const projects = parseProjects(projectInputs);
