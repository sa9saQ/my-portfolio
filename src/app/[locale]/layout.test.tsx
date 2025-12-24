import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock next-intl/server
vi.mock("next-intl/server", () => ({
  getMessages: vi.fn().mockResolvedValue({}),
  setRequestLocale: vi.fn(),
}));

// Mock theme-provider
vi.mock("@/components/theme-provider", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="theme-provider">{children}</div>
  ),
}));

// Mock aurora-background
vi.mock("@/components/ui/aurora-background", () => ({
  AuroraBackground: () => <div data-testid="aurora-background" />,
}));

// Mock next-intl
vi.mock("next-intl", () => ({
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="intl-provider">{children}</div>
  ),
}));

describe("RootLayout", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("exports metadata with correct title", async () => {
    const { metadata } = await import("./layout");
    expect(metadata.title).toBe("Portfolio | Creative Developer");
  });

  it("exports metadata with correct description", async () => {
    const { metadata } = await import("./layout");
    expect(metadata.description).toBe(
      "A creative portfolio showcasing innovative web development projects"
    );
  });

  it("generates static params for all locales", async () => {
    const { generateStaticParams } = await import("./layout");
    const params = generateStaticParams();
    expect(params).toEqual([{ locale: "en" }, { locale: "ja" }]);
  });
});
