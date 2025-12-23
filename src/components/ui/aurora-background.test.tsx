import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { AuroraBackground } from "./aurora-background";

// Canvas mock
const mockGetContext = vi.fn(() => ({
  clearRect: vi.fn(),
  createRadialGradient: vi.fn(() => ({
    addColorStop: vi.fn(),
  })),
  fillRect: vi.fn(),
  scale: vi.fn(),
  fillStyle: null,
}));

describe("AuroraBackground", () => {
  let originalMatchMedia: typeof window.matchMedia;
  let rafSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // Mock canvas getContext
    HTMLCanvasElement.prototype.getContext = mockGetContext as unknown as typeof HTMLCanvasElement.prototype.getContext;

    // Mock matchMedia
    originalMatchMedia = window.matchMedia;
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    // Mock requestAnimationFrame
    rafSpy = vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      return 1;
    });
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
    rafSpy.mockRestore();
    vi.clearAllMocks();
  });

  it("renders canvas element", () => {
    render(<AuroraBackground />);
    const canvas = document.querySelector("canvas");
    expect(canvas).toBeInTheDocument();
  });

  it("has correct accessibility attributes", () => {
    render(<AuroraBackground />);
    const canvas = document.querySelector("canvas");
    expect(canvas).toHaveAttribute("aria-hidden", "true");
  });

  it("has fixed positioning class", () => {
    render(<AuroraBackground />);
    const canvas = document.querySelector("canvas");
    expect(canvas).toHaveClass("fixed", "inset-0", "z-[1]");
  });

  it("has pointer-events-none to not block interactions", () => {
    render(<AuroraBackground />);
    const canvas = document.querySelector("canvas");
    expect(canvas).toHaveClass("pointer-events-none");
  });

  it("initializes canvas context on mount", () => {
    render(<AuroraBackground />);
    expect(mockGetContext).toHaveBeenCalledWith("2d");
  });

  it("respects prefers-reduced-motion", () => {
    // Mock reduced motion preference
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === "(prefers-reduced-motion: reduce)",
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    render(<AuroraBackground />);

    // Should not start animation loop when reduced motion is preferred
    // First call is for static draw, no continuous animation
    expect(rafSpy).not.toHaveBeenCalled();
  });

  it("starts animation when motion is allowed", () => {
    render(<AuroraBackground />);
    expect(rafSpy).toHaveBeenCalled();
  });
});
