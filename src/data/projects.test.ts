import { describe, it, expect } from "vitest";
import { projects, type Project } from "./projects";

describe("projects data", () => {
  it("exports an array of projects", () => {
    expect(Array.isArray(projects)).toBe(true);
    expect(projects.length).toBeGreaterThan(0);
  });

  it("each project has required fields", () => {
    projects.forEach((project: Project) => {
      expect(project.id).toBeDefined();
      expect(typeof project.id).toBe("number");
      expect(project.titleKey).toBeDefined();
      expect(project.descriptionKey).toBeDefined();
      expect(Array.isArray(project.tags)).toBe(true);
      expect(project.image).toBeDefined();
      expect(project.color).toBeDefined();
      expect(["ai", "web", "mobile", "hp"]).toContain(project.category);
    });
  });

  it("has unique project ids", () => {
    const ids = projects.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});
