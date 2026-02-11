"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Github, Linkedin, Heart, ArrowUp } from "lucide-react";
import { XIcon } from "@/components/icons/x-icon";

const socialLinks = [
  { icon: Github, href: "https://github.com/sa9saQ", label: "GitHub" },
  { icon: XIcon, href: "https://x.com/act_0001", label: "X" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/iori-kobayashi-099745390", label: "LinkedIn" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { name: tNav("home"), href: "#home" },
    { name: tNav("about"), href: "#about" },
    { name: tNav("projects"), href: "#projects" },
    { name: tNav("skills"), href: "#skills" },
    { name: tNav("contact"), href: "#contact" },
  ];

  return (
    <>
      <footer className="py-12 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <motion.a
                href="#home"
                className="text-2xl font-bold text-gradient inline-block mb-4"
                whileHover={{ scale: 1.05 }}
              >
                Portfolio
              </motion.a>
              <p className="text-muted-foreground text-sm max-w-xs">
                {t("description")}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">{t("quickLinks")}</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-semibold mb-4">{t("connect")}</h4>
              <div className="flex gap-3">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-secondary hover:bg-primary/20 hover:text-primary transition-all"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={link.label}
                  >
                    <link.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              {t("madeWith")} <Heart className="w-4 h-4 text-red-500 fill-red-500" /> in{" "}
              {currentYear}
            </p>
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} Portfolio. {t("rights")}
            </p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 cursor-pointer"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
