import { describe, it, expect, vi } from "vitest";

// Mock next-intl/server
vi.mock("next-intl/server", () => ({
  setRequestLocale: vi.fn(),
}));

// Mock all section components
vi.mock("@/components/ui/navbar", () => ({
  Navbar: () => <nav data-testid="navbar">Navbar</nav>,
}));

vi.mock("@/components/ui/footer", () => ({
  Footer: () => <footer data-testid="footer">Footer</footer>,
}));

vi.mock("@/components/sections/hero", () => ({
  HeroSection: () => <section data-testid="hero">Hero</section>,
}));

vi.mock("@/components/sections/about", () => ({
  AboutSection: () => <section data-testid="about">About</section>,
}));

vi.mock("@/components/sections/projects-preview", () => ({
  ProjectsPreview: () => <section data-testid="projects">Projects</section>,
}));

vi.mock("@/components/sections/skills", () => ({
  SkillsSection: () => <section data-testid="skills">Skills</section>,
}));

vi.mock("@/components/sections/contact", () => ({
  ContactSection: () => <section data-testid="contact">Contact</section>,
}));

describe("Home Page", () => {
  it("exports a default async function", async () => {
    const { default: Home } = await import("./page");
    expect(typeof Home).toBe("function");
  });

  it("returns a main element with correct classes", async () => {
    const { default: Home } = await import("./page");
    const result = await Home({ params: Promise.resolve({ locale: "en" }) });

    expect(result.type).toBe("main");
    expect(result.props.className).toContain("min-h-screen");
    expect(result.props.className).toContain("relative");
    expect(result.props.className).toContain("z-10");
  });
});
