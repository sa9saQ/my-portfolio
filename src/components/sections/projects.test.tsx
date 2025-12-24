import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectsSection } from "./projects";

// Mock next-intl
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

// Mock @/i18n/navigation
vi.mock("@/i18n/navigation", () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, className }: { children: React.ReactNode; className?: string }) => (
      <div className={className}>{children}</div>
    ),
    span: ({ children, className }: { children: React.ReactNode; className?: string }) => (
      <span className={className}>{children}</span>
    ),
    button: ({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => (
      <button className={className} onClick={onClick}>{children}</button>
    ),
    a: ({ children, className, href }: { children: React.ReactNode; className?: string; href?: string }) => (
      <a className={className} href={href}>{children}</a>
    ),
  },
  useInView: () => true,
}));

// Mock projects data
vi.mock("@/data/projects", () => ({
  projects: [
    {
      id: 1,
      titleKey: "items.test.title",
      descriptionKey: "items.test.description",
      category: "web",
      image: "/test.png",
      color: "from-blue-500 to-purple-500",
      tags: ["React", "TypeScript"],
      github: "https://github.com/test",
      demo: "https://test.com",
    },
  ],
}));

describe("ProjectsSection", () => {
  it("renders section heading", () => {
    render(<ProjectsSection />);
    expect(screen.getByText("allProjects")).toBeInTheDocument();
  });

  it("renders category filters", () => {
    render(<ProjectsSection />);
    expect(screen.getByText("categories.all")).toBeInTheDocument();
  });
});
