import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectsPreview } from "./projects-preview";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      title: "ポートフォリオ",
      heading: "作ったもの",
      viewAll: "すべて見る",
      "items.schoolHp.title": "学園ホームページ",
      "items.schoolHp.description": "教育機関向けのコーポレートサイト",
      "items.chatbot.title": "AIチャットボット",
      "items.chatbot.description": "最新のAI APIを活用",
      "items.portfolio.title": "ポートフォリオサイト",
      "items.portfolio.description": "このサイト自体もAIと一緒に作りました",
    };
    return translations[key] ?? key;
  },
}));

vi.mock("@/i18n/navigation", () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div {...props}>{children}</div>
    ),
    span: ({ children, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
      <span {...props}>{children}</span>
    ),
    a: ({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <a {...props}>{children}</a>
    ),
  },
  useInView: () => true,
}));

describe("ProjectsPreview", () => {
  it("renders section heading", () => {
    render(<ProjectsPreview />);
    expect(screen.getByText("作ったもの")).toBeInTheDocument();
  });

  it("renders view all button", () => {
    render(<ProjectsPreview />);
    expect(screen.getByText("すべて見る")).toBeInTheDocument();
  });

  it("renders first 3 projects", () => {
    render(<ProjectsPreview />);
    expect(screen.getByText("学園ホームページ")).toBeInTheDocument();
  });
});
