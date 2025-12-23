import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { AboutSection } from "./about";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      title: "私について",
      heading: "Who I Am",
      hello: "こんにちは！",
      description: "AIを活用して革新的なWebプロダクトを創造するクリエイターです。",
      intro: "プログラミングの深い知識がなくても...",
      "features.cleanCode.title": "AI活用力",
      "features.cleanCode.description": "ChatGPT、Claude等のAIツールを使いこなし",
      "features.creativeDesign.title": "アイデア力",
      "features.creativeDesign.description": "独創的な発想で",
      "features.performance.title": "学習意欲",
      "features.performance.description": "新しい技術やツールを積極的に学び",
      "features.innovation.title": "実現力",
      "features.innovation.description": "アイデアを形にする",
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

describe("AboutSection", () => {
  it("renders section heading", () => {
    render(<AboutSection />);
    expect(screen.getByText("Who I Am")).toBeInTheDocument();
  });

  it("renders feature cards", () => {
    render(<AboutSection />);
    expect(screen.getByText("AI活用力")).toBeInTheDocument();
    expect(screen.getByText("アイデア力")).toBeInTheDocument();
    expect(screen.getByText("学習意欲")).toBeInTheDocument();
    expect(screen.getByText("実現力")).toBeInTheDocument();
  });

  it("renders description text", () => {
    render(<AboutSection />);
    expect(screen.getByText("こんにちは！")).toBeInTheDocument();
  });
});
