"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { locales, localeNames, type Locale } from "@/i18n/config";
import { ThemeToggle, ThemeToggleMobile } from "@/components/ui/theme-transition";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: t("home"), href: "#home", id: "home" },
    { name: t("about"), href: "#about", id: "about" },
    { name: t("projects"), href: "#projects", id: "projects" },
    { name: t("skills"), href: "#skills", id: "skills" },
    { name: t("contact"), href: "#contact", id: "contact" },
  ];

  useEffect(() => {
    const sectionIds = ["home", "about", "projects", "skills", "contact"];
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveSection(id);
          });
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = useCallback((href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const switchLocale = (newLocale: Locale) => {
    const currentPath = pathname.replace(`/${locale}`, "") || "/";
    router.push(`/${newLocale}${currentPath}`);
    setIsLangMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className={cn(
          "fixed top-4 left-4 right-4 z-50 transition-all duration-500 glass-navbar",
          isScrolled && "shadow-lg shadow-black/5"
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          backdropFilter: `blur(${isScrolled ? 20 : 12}px)`,
          WebkitBackdropFilter: `blur(${isScrolled ? 20 : 12}px)`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            <motion.a
              href="#home"
              className="text-xl font-heading font-bold text-primary cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Portfolio
            </motion.a>

            <div className="hidden md:!flex items-center gap-6 lg:gap-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    "relative text-muted-foreground hover:text-foreground transition-colors cursor-pointer",
                    activeSection === item.id && "text-foreground"
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                  {activeSection === item.id && (
                    <motion.span
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                      layoutId="navbar-indicator"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}

              <div className="relative">
                <motion.button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="p-2.5 rounded-full glass hover:glow-aurora transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-xs font-medium uppercase">{locale}</span>
                </motion.button>
                <AnimatePresence>
                  {isLangMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute right-0 mt-2 py-2 w-32 glass rounded-xl shadow-lg"
                    >
                      {locales.map((loc) => (
                        <button
                          key={loc}
                          onClick={() => switchLocale(loc)}
                          className={cn(
                            "w-full px-4 py-2 text-left text-sm hover:bg-white/10 transition-colors cursor-pointer",
                            locale === loc && "text-primary font-medium"
                          )}
                        >
                          {localeNames[loc]}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <ThemeToggle />
            </div>

            <div className="flex md:!hidden items-center gap-2">
              <motion.button
                onClick={() => switchLocale(locale === "ja" ? "en" : "ja")}
                className="p-2 rounded-full glass flex items-center gap-1 cursor-pointer"
                whileTap={{ scale: 0.9 }}
              >
                <Globe className="w-4 h-4" />
                <span className="text-xs uppercase">{locale === "ja" ? "EN" : "JA"}</span>
              </motion.button>
              <ThemeToggleMobile />
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 glass rounded-full cursor-pointer"
                whileTap={{ scale: 0.9 }}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-20 z-40 md:!hidden glass rounded-2xl"
          >
            <div className="px-6 py-6 space-y-4">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    "block w-full text-left text-lg transition-colors cursor-pointer",
                    activeSection === item.id
                      ? "text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
