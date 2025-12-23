import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { SkillsSection } from "./skills";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      title: "できること",
      heading: "スキル & ツール",
      "categories.ai": "AI活用",
      "categories.tools": "使用ツール",
      "categories.creating": "制作スキル",
      alsoExperienced: "その他使えるもの",
    };
    return translations[key] ?? key;
  },
}));

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div {...props}>{children}</div>
    ),
  },
  useInView: () => true,
}));

describe("SkillsSection", () => {
  it("renders section heading", () => {
    render(<SkillsSection />);
    expect(screen.getByText("スキル & ツール")).toBeInTheDocument();
  });

  it("renders skill categories", () => {
    render(<SkillsSection />);
    expect(screen.getByText("AI活用")).toBeInTheDocument();
    expect(screen.getByText("使用ツール")).toBeInTheDocument();
    expect(screen.getByText("制作スキル")).toBeInTheDocument();
  });

  it("renders skill names", () => {
    render(<SkillsSection />);
    expect(screen.getByText("Claude / Claude Code")).toBeInTheDocument();
  });
});
