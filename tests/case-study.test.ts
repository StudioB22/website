import { describe, expect, it } from "vitest";
import { caseStudySchema, projectSchema } from "../src/domain/project";
import { projects } from "../src/data/projects";

const study = {
  context: "Fictional context",
  objective: "Clear visitor goal",
  decisions: [
    {
      title: "Decision",
      reason: "Reason",
      example: "Example",
      evidenceLimit: "Source observation only",
    },
  ],
  milestones: [
    {
      title: "Scope",
      methodSteps: [1],
      status: "documented",
      explanation: "Documented, not final acceptance",
    },
  ],
};

describe("case-study contract", () => {
  it("accepts a narrative without publishing the actual bakery draft", () => {
    // arrange / act
    const bakery = projects.find((project) => project.slug === "maison-doree");
    // assert
    expect(bakery?.published).toBe(false);
    expect(bakery?.caseStudy?.decisions.length).toBeGreaterThan(0);
    expect(bakery && "reviewedDemoUrl" in bakery).toBe(false);
    expect(
      projectSchema.safeParse({ ...bakery, published: true }).success,
    ).toBe(false);
  });
  it("preserves all fifteen steps without presenting launch as completed", () => {
    // arrange / act
    const milestones = projects.find(
      (project) => project.slug === "maison-doree",
    )?.caseStudy?.milestones;
    // assert
    expect(milestones?.flatMap((item) => item.methodSteps)).toEqual(
      Array.from({ length: 15 }, (_, index) => index + 1),
    );
    expect(
      milestones
        ?.filter((item) => item.methodSteps.some((step) => step >= 13))
        .every((item) => item.status === "pending"),
    ).toBe(true);
  });
  it("keeps older catalogue entries valid without narratives", () => {
    // arrange / act
    const existing = projects.filter(
      (project) => project.slug !== "maison-doree",
    );
    // assert
    expect(existing.map((project) => project.slug)).toEqual([
      "maison-marceau",
      "maison-aureline",
    ]);
    for (const project of existing) {
      expect(project.caseStudy).toBeUndefined();
      expect(projectSchema.safeParse(project).success).toBe(true);
    }
  });
  it("preserves plain text rather than treating content as trusted HTML", () => {
    // arrange / act
    const result = caseStudySchema.parse({
      ...study,
      context: "<script>example</script>",
    });
    // assert: escaping belongs to the Astro renderer, not schema sanitization.
    expect(result.context).toBe("<script>example</script>");
  });
  it.each([0, 16, 1.5])("rejects invalid method step %s", (step) => {
    // arrange / act
    const result = caseStudySchema.safeParse({
      ...study,
      milestones: [{ ...study.milestones[0], methodSteps: [step] }],
    });
    // assert
    expect(result.success).toBe(false);
  });
  it.each(["decisions", "milestones"] as const)(
    "rejects an empty %s section",
    (key) => {
      // arrange / act / assert
      expect(caseStudySchema.safeParse({ ...study, [key]: [] }).success).toBe(
        false,
      );
    },
  );
  it("rejects empty evidence and uncontrolled milestone statuses", () => {
    // arrange / act / assert
    expect(
      caseStudySchema.safeParse({
        ...study,
        decisions: [{ ...study.decisions[0], evidenceLimit: " " }],
      }).success,
    ).toBe(false);
    expect(
      caseStudySchema.safeParse({
        ...study,
        milestones: [{ ...study.milestones[0], status: "certified" }],
      }).success,
    ).toBe(false);
  });
});
