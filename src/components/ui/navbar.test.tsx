import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Mock next-intl
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "en",
}));

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: () => "/en",
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

// Mock next-themes
vi.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "dark",
    setTheme: vi.fn(),
  }),
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    nav: ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => (
      <nav className={className} {...props}>{children}</nav>
    ),
    a: ({ children, className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <a className={className} {...props}>{children}</a>
    ),
    button: ({ children, className, onClick, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
      <button className={className} onClick={onClick} {...props}>{children}</button>
    ),
    div: ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div className={className} {...props}>{children}</div>
    ),
    span: ({ children, className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
      <span className={className} {...props}>{children}</span>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("Navbar", () => {
  beforeEach(() => {
    // Reset scroll position
    Object.defineProperty(window, "scrollY", { value: 0, writable: true });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders navigation element", async () => {
    const { Navbar } = await import("./navbar");
    render(<Navbar />);
    const nav = document.querySelector("nav");
    expect(nav).toBeInTheDocument();
  });

  it("renders logo", async () => {
    const { Navbar } = await import("./navbar");
    render(<Navbar />);
    expect(screen.getByText("Portfolio")).toBeInTheDocument();
  });

  it("renders navigation items", async () => {
    const { Navbar } = await import("./navbar");
    render(<Navbar />);
    expect(screen.getByText("home")).toBeInTheDocument();
    expect(screen.getByText("about")).toBeInTheDocument();
    expect(screen.getByText("projects")).toBeInTheDocument();
    expect(screen.getByText("skills")).toBeInTheDocument();
    expect(screen.getByText("contact")).toBeInTheDocument();
  });

  it("has glass-navbar class for floating effect", async () => {
    const { Navbar } = await import("./navbar");
    render(<Navbar />);
    const nav = document.querySelector("nav");
    expect(nav).toHaveClass("glass-navbar");
  });

  it("has proper fixed positioning classes", async () => {
    const { Navbar } = await import("./navbar");
    render(<Navbar />);
    const nav = document.querySelector("nav");
    expect(nav).toHaveClass("fixed");
    expect(nav).toHaveClass("top-4");
    expect(nav).toHaveClass("left-4");
    expect(nav).toHaveClass("right-4");
  });
});
