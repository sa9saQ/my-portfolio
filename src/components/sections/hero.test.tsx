import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroSection } from "./hero";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      welcome: "ポートフォリオへようこそ",
      greeting: "こんにちは、",
      name: "Iori Kobayashi",
      subtitle: "AI × クリエイター",
      viewProjects: "プロジェクトを見る",
      contactMe: "お問い合わせ",
      scrollDown: "スクロール",
    };
    return translations[key] ?? key;
  },
}));

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div {...props}>{children}</div>
    ),
    span: ({ children, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
      <span {...props}>{children}</span>
    ),
    h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h1 {...props}>{children}</h1>
    ),
    p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
      <p {...props}>{children}</p>
    ),
    a: ({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <a {...props}>{children}</a>
    ),
  },
}));

// Mock canvas
HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
  clearRect: vi.fn(),
  beginPath: vi.fn(),
  arc: vi.fn(),
  fill: vi.fn(),
  moveTo: vi.fn(),
  lineTo: vi.fn(),
  stroke: vi.fn(),
})) as unknown as typeof HTMLCanvasElement.prototype.getContext;

describe("HeroSection", () => {
  it("renders hero greeting", () => {
    render(<HeroSection />);
    expect(screen.getByText("こんにちは、")).toBeInTheDocument();
  });

  it("renders name", () => {
    render(<HeroSection />);
    expect(screen.getByText("Iori Kobayashi")).toBeInTheDocument();
  });

  it("renders CTA buttons", () => {
    render(<HeroSection />);
    expect(screen.getByText("プロジェクトを見る")).toBeInTheDocument();
    expect(screen.getByText("お問い合わせ")).toBeInTheDocument();
  });
});
