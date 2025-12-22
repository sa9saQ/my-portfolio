import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ContactSection } from "./contact";

// Mock next-intl
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      title: "お問い合わせ",
      heading: "お気軽にどうぞ",
      description: "お気軽にご連絡ください。",
      email: "メール",
      location: "所在地",
      locationValue: "東京, 日本",
      followMe: "フォローする",
      "form.name": "お名前",
      "form.namePlaceholder": "お名前",
      "form.email": "メールアドレス",
      "form.emailPlaceholder": "your@email.com",
      "form.subject": "件名",
      "form.subjectPlaceholder": "ご用件は？",
      "form.message": "メッセージ",
      "form.messagePlaceholder": "お気軽にメッセージをどうぞ...",
      "form.send": "送信する",
      "form.sent": "送信完了！",
      "form.sentMessage": "お問い合わせありがとうございます。",
      "form.error": "送信に失敗しました。",
    };
    return translations[key] ?? key;
  },
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div {...props}>{children}</div>
    ),
    button: ({
      children,
      ...props
    }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
      <button {...props}>{children}</button>
    ),
    a: ({
      children,
      ...props
    }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <a {...props}>{children}</a>
    ),
  },
  useInView: () => true,
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

describe("ContactSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders contact form with all fields", () => {
    render(<ContactSection />);

    expect(screen.getByPlaceholderText("お名前")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("your@email.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("ご用件は？")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("お気軽にメッセージをどうぞ...")
    ).toBeInTheDocument();
  });

  it("renders submit button", () => {
    render(<ContactSection />);

    expect(
      screen.getByRole("button", { name: /送信する/i })
    ).toBeInTheDocument();
  });

  it("renders contact info", () => {
    render(<ContactSection />);

    expect(screen.getByText("yizhix797@gmail.com")).toBeInTheDocument();
    expect(screen.getByText("東京, 日本")).toBeInTheDocument();
  });

  it("renders social links", () => {
    render(<ContactSection />);

    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute(
      "href",
      "https://github.com/sa9saQ"
    );
    expect(screen.getByRole("link", { name: /x/i })).toHaveAttribute(
      "href",
      "https://x.com/act_0001"
    );
  });

  it("shows loading state when submitting", async () => {
    // Mock fetch for Formspree
    const mockFetch = vi.fn().mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ ok: true }), 100)
        )
    );
    global.fetch = mockFetch;

    // Set FORMSPREE_ENDPOINT via env
    const originalEnv = process.env.NEXT_PUBLIC_FORMSPREE_ID;
    process.env.NEXT_PUBLIC_FORMSPREE_ID = "test123";

    // Need to re-import to pick up env change
    vi.resetModules();

    render(<ContactSection />);

    const submitButton = screen.getByRole("button", { name: /送信する/i });
    fireEvent.click(submitButton);

    // Button should show loading state
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });

    process.env.NEXT_PUBLIC_FORMSPREE_ID = originalEnv;
  });

  it("falls back to mailto when Formspree is not configured", () => {
    // Ensure FORMSPREE_ENDPOINT is not set
    const originalEnv = process.env.NEXT_PUBLIC_FORMSPREE_ID;
    delete process.env.NEXT_PUBLIC_FORMSPREE_ID;

    const mockLocation = { href: "" };
    Object.defineProperty(window, "location", {
      value: mockLocation,
      writable: true,
    });

    render(<ContactSection />);

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText("お名前"), {
      target: { value: "テスト太郎" },
    });
    fireEvent.change(screen.getByPlaceholderText("your@email.com"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("ご用件は？"), {
      target: { value: "テスト件名" },
    });
    fireEvent.change(
      screen.getByPlaceholderText("お気軽にメッセージをどうぞ..."),
      {
        target: { value: "テストメッセージ" },
      }
    );

    const form = screen.getByRole("button", { name: /送信する/i }).closest("form");
    fireEvent.submit(form!);

    // Should redirect to mailto
    expect(mockLocation.href).toContain("mailto:yizhix797@gmail.com");

    process.env.NEXT_PUBLIC_FORMSPREE_ID = originalEnv;
  });
});
