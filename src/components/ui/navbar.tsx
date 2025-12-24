"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Sun, Moon, Menu, X, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { locales, localeNames, type Locale } from "@/i18n/config";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: t("home"), href: "#home" },
    { name: t("about"), href: "#about" },
    { name: t("projects"), href: "#projects" },
    { name: t("skills"), href: "#skills" },
    { name: t("contact"), href: "#contact" },
  ];

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const switchLocale = (newLocale: Locale) => {
    const currentPath = pathname.replace(`/${locale}`, "") || "/";
    router.push(`/${newLocale}${currentPath}`);
    setIsLangMenuOpen(false);
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-4 left-4 right-4 z-50 transition-all duration-300 glass-navbar navbar-fallback",
          isScrolled && "shadow-lg shadow-black/5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <motion.a
              href="#home"
              className="text-xl font-heading font-bold text-aurora cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Portfolio
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="text-muted-foreground hover:text-foreground transition-colors relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.button>
              ))}

              {/* Language Switcher */}
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

              {/* Theme Toggle */}
              <motion.button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2.5 rounded-full glass hover:glow-aurora transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
              >
                {mounted ? (
                  theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />
                ) : (
                  <Sun className="w-4 h-4" />
                )}
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              {/* Language Switcher Mobile */}
              <motion.button
                onClick={() => switchLocale(locale === "ja" ? "en" : "ja")}
                className="p-2 rounded-full glass flex items-center gap-1 cursor-pointer"
                whileTap={{ scale: 0.9 }}
              >
                <Globe className="w-4 h-4" />
                <span className="text-xs uppercase">{locale === "ja" ? "EN" : "JA"}</span>
              </motion.button>

              <motion.button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full glass cursor-pointer"
                whileTap={{ scale: 0.9 }}
              >
                {mounted ? (
                  theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />
                ) : (
                  <Sun className="w-4 h-4" />
                )}
              </motion.button>
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 glass rounded-full cursor-pointer"
                whileTap={{ scale: 0.9 }}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-20 z-40 md:hidden glass rounded-2xl"
          >
            <div className="px-6 py-6 space-y-4">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="block w-full text-left text-lg text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
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
