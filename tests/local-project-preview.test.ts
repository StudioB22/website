import {
  mkdtempSync,
  mkdirSync,
  rmSync,
  writeFileSync,
  readFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { describe, expect, it } from "vitest";
import { parseLocalProjectPreviews } from "../src/domain/local-project-preview";
import { buildLocalProjectPreviews } from "../src/config/local-project-preview";
import { localProjectPreviewInputs } from "../src/data/local-project-previews";
import { projects as portfolioProjects } from "../src/data/projects";
import { parseProjects } from "../src/domain/project";

const projects = parseProjects(
  ["test-alpha", "test-beta"].map((slug, index) => ({
    slug,
    title: `Synthetic test project ${index}`,
    sector: index === 0 ? "commerce" : "immobilier",
    summary:
      "Synthetic fixture for automated tests only, never a real portfolio example.",
    status: "concept",
    demonstratedCapabilities: ["Test-only capability"],
    credits: ["Synthetic test fixture"],
    limitations: ["Not a real project"],
    reviewedAt: "2026-01-01",
    published: false,
  })),
);
const entries = projects.map((project, index) => ({
  projectSlug: project.slug,
  displayTitle: `Fixture ${index}`,
  formatLabel: "Test-only preview",
  overviewTitle: `Test overview ${index}`,
  overview: `Synthetic description ${index}`,
  demoUrl: `http://127.0.0.1:${4501 + index}/`,
  demoUrlEnv: `STUDIOB22_LOCAL_TEST_${index}`,
  captureDate: "2026-01-01",
  sourceCommit: String(index + 1).repeat(40),
  captureCredits: ["Synthetic media, tests only"],
  captures: [
    {
      name: "desktop",
      sourceFilename: "desktop.png",
      width: 1280,
      height: 900,
      alt: "Test desktop",
    },
    {
      name: "mobile",
      sourceFilename: "mobile.png",
      width: 390,
      height: 844,
      alt: "Test mobile",
    },
  ],
}));
const first = entries[0]!;

describe("pure multi-project preview validation", () => {
  it("registers Maison Marceau and Maison Aureline as distinct unpublished drafts", () => {
    const result = buildLocalProjectPreviews(
      localProjectPreviewInputs,
      portfolioProjects,
      new URL("../docs/product/reviews/", import.meta.url),
    );

    expect(result.map((item) => item.projectSlug)).toEqual([
      "maison-marceau",
      "maison-aureline",
    ]);
    expect(result.every((item) => !item.project.published)).toBe(true);
    expect(new Set(result.map((item) => item.demoUrl)).size).toBe(2);
    expect(
      result.map((item) => item.captures.map((capture) => capture.src)),
    ).toEqual([
      [
        "/atelier-local/captures/maison-marceau/desktop.png",
        "/atelier-local/captures/maison-marceau/mobile.png",
      ],
      [
        "/atelier-local/captures/maison-aureline/desktop.png",
        "/atelier-local/captures/maison-aureline/mobile.png",
      ],
    ]);
  });

  it("joins two distinct drafts in registry order without changing publication", () => {
    const result = parseLocalProjectPreviews(
      [...entries].reverse(),
      projects,
      "2026-01-02",
    );
    expect(result.map((item) => item.displayTitle)).toEqual([
      "Fixture 1",
      "Fixture 0",
    ]);
    expect(result.map((item) => item.project.sector)).toEqual([
      "immobilier",
      "commerce",
    ]);
    expect(result.map((item) => item.demoUrl)).toEqual([
      "http://127.0.0.1:4502/",
      "http://127.0.0.1:4501/",
    ]);
    expect(result.map((item) => item.captures[0].src)).toEqual([
      "/atelier-local/captures/test-beta/desktop.png",
      "/atelier-local/captures/test-alpha/desktop.png",
    ]);
    expect(projects.every((item) => !item.published)).toBe(true);
  });

  it("permits no registered previews", () => {
    expect(parseLocalProjectPreviews([], projects)).toEqual([]);
  });

  it("rejects reused override names without reading an environment", () => {
    // arrange: distinct projects accidentally reference the same override.
    const duplicates = entries.map((entry) => ({
      ...entry,
      demoUrlEnv: first.demoUrlEnv,
    }));
    // act and assert: reject the registry before resolving any runtime values.
    expect(() =>
      parseLocalProjectPreviews(duplicates, projects, "2026-01-02"),
    ).toThrow(`Duplicate local demo override: ${first.demoUrlEnv} (test-beta)`);
  });

  it("allows multiple absent override names and preserves default URLs", () => {
    // arrange: cover both omitted and explicitly undefined optional properties.
    const { demoUrlEnv: omitted, ...withoutOverride } = first;
    expect(omitted).toBeDefined();
    const defaults = [
      withoutOverride,
      { ...entries[1]!, demoUrlEnv: undefined },
    ];
    // act
    const result = parseLocalProjectPreviews(defaults, projects, "2026-01-02");
    // assert
    expect(result.map((entry) => entry.demoUrlEnv)).toEqual([
      undefined,
      undefined,
    ]);
    expect(result.map((entry) => entry.demoUrl)).toEqual(
      entries.map((entry) => entry.demoUrl),
    );
  });

  it("allows shared default URLs with distinct override names", () => {
    // arrange
    const shared = entries.map((entry) => ({
      ...entry,
      demoUrl: first.demoUrl,
    }));
    // act
    const result = parseLocalProjectPreviews(shared, projects, "2026-01-02");
    // assert: uniqueness applies to names, not destinations.
    expect(result.map((entry) => entry.demoUrl)).toEqual([
      first.demoUrl,
      first.demoUrl,
    ]);
    expect(result.map((entry) => entry.demoUrlEnv)).toEqual(
      entries.map((entry) => entry.demoUrlEnv),
    );
  });

  it("rejects duplicate registration and missing or published catalogue references", () => {
    expect(() => parseLocalProjectPreviews([first, first], projects)).toThrow(
      "Duplicate",
    );
    expect(() => parseLocalProjectPreviews([first], [])).toThrow(
      "existing draft",
    );
    // Published references are rejected before any publication fields are used.
    const published = projects.map((project) => ({
      ...project,
      published: true as const,
      visualDirection: "editoriale" as const,
      previewAssets: [],
      reviewDates: {
        content: "2026-01-01",
        rights: "2026-01-01",
        security: "2026-01-01",
        dependencies: "2026-01-01",
        accessibility: "2026-01-01",
        performance: "2026-01-01",
        responsive: "2026-01-01",
        demoMaturity: "2026-01-01",
      },
      publishedAt: "2026-01-01",
    }));
    expect(() => parseLocalProjectPreviews([first], published)).toThrow(
      "existing draft",
    );
  });

  it.each([
    { displayTitle: " " },
    { formatLabel: "" },
    { overviewTitle: "" },
    { overview: "" },
    { captureCredits: [] },
    { projectSlug: "../outside" },
    { demoUrl: "https://example.com/" },
    { demoUrl: "http://user:pass@localhost/" },
    { demoUrlEnv: "PUBLIC_DEMO_URL" },
    { demoUrlEnv: "OTHER_KEY" },
    { captureDate: "2026-02-30" },
    { captureDate: "2099-01-01" },
    { sourceCommit: "not-a-commit" },
    { captures: [] },
    { captures: [first.captures[0], first.captures[0]] },
    {
      captures: [
        { ...first.captures[0], sourceFilename: "../secret.png" },
        first.captures[1],
      ],
    },
    {
      captures: [
        { ...first.captures[0], sourceFilename: "/absolute.png" },
        first.captures[1],
      ],
    },
    {
      captures: [
        { ...first.captures[0], sourceFilename: "file.svg" },
        first.captures[1],
      ],
    },
    { captures: [{ ...first.captures[0], width: 0 }, first.captures[1]] },
    { captures: [{ ...first.captures[0], height: -1 }, first.captures[1]] },
    { captures: [{ ...first.captures[0], alt: " " }, first.captures[1]] },
  ])("rejects malformed configuration %j", (change) => {
    expect(() =>
      parseLocalProjectPreviews(
        [{ ...first, ...change }],
        projects,
        "2026-01-02",
      ),
    ).toThrow();
  });
});

describe("local filesystem and environment boundary", () => {
  it("resolves distinct files and per-project overrides; rejects missing files and unsafe overrides", () => {
    const directory = mkdtempSync(join(tmpdir(), "portfolio-preview-test-"));
    const root = pathToFileURL(`${directory}/`);
    try {
      entries.forEach((entry) => {
        mkdirSync(join(directory, entry.projectSlug));
        entry.captures.forEach((capture) =>
          writeFileSync(
            join(directory, entry.projectSlug, capture.sourceFilename),
            entry.projectSlug,
          ),
        );
      });
      const result = buildLocalProjectPreviews(entries, projects, root, {
        STUDIOB22_LOCAL_TEST_1: "http://localhost:4602/",
      });
      expect(
        result.map((preview) =>
          readFileSync(preview.captures[0].fileUrl, "utf8"),
        ),
      ).toEqual(["test-alpha", "test-beta"]);
      expect(result.map((preview) => preview.demoUrl)).toEqual([
        "http://127.0.0.1:4501/",
        "http://localhost:4602/",
      ]);
      expect(() =>
        buildLocalProjectPreviews(entries, projects, root, {
          STUDIOB22_LOCAL_TEST_0: "http://external.example/",
        }),
      ).toThrow();
      expect(() =>
        buildLocalProjectPreviews(entries, projects, root, {
          STUDIOB22_LOCAL_TEST_0: false,
        }),
      ).toThrow("string demo override");
      rmSync(join(directory, "test-beta", "mobile.png"));
      expect(() => buildLocalProjectPreviews(entries, projects, root)).toThrow(
        "Missing local capture: test-beta/mobile.png",
      );
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });
});
