"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowDown, Github, Mail } from "lucide-react";
import { XIcon } from "@/components/icons/x-icon";

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("hero");

  useEffect(() => {
    setMounted(true);
  }, []);

  const socialLinks = [
    { icon: Github, href: "https://github.com/sa9saQ", label: "GitHub" },
    { icon: XIcon, href: "https://x.com/act_0001", label: "X" },
    { icon: Mail, href: "mailto:yizhix797@gmail.com", label: "Email" },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-between overflow-hidden pt-24 sm:pt-28 pb-8"
    >
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background z-10 pointer-events-none" />

      {/* Top spacer for balanced layout */}
      <div className="flex-shrink-0" />

      <div className="relative z-20 text-center px-4 max-w-4xl">
        <motion.div
          initial={mounted ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Glass Badge */}
          <motion.span
            className="inline-block px-5 py-2.5 mb-8 text-sm font-medium rounded-full glass text-foreground/90"
            initial={mounted ? { opacity: 0, scale: 0.8 } : false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            {t("welcome")}
          </motion.span>

          {/* Main Heading with Aurora gradient */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-6 tracking-tight"
            initial={mounted ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {t("greeting")}
            <span className="text-aurora">{t("name")}</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
            initial={mounted ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {t("subtitle")}
          </motion.p>

          {/* Social Links with Glass effect */}
          <motion.div
            className="flex items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-12"
            initial={mounted ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 sm:p-4 rounded-full glass hover:glow-aurora transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.a>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full px-4 sm:px-0"
            initial={mounted ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {/* Primary CTA with Glow */}
            <motion.a
              href="#projects"
              className="relative w-full sm:w-auto min-w-[200px] px-8 py-4 sm:py-3.5 rounded-full bg-primary text-primary-foreground font-medium text-center overflow-hidden group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="absolute inset-0 bg-primary/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative">{t("viewProjects")}</span>
            </motion.a>

            {/* Secondary CTA with Glass */}
            <motion.a
              href="#contact"
              className="w-full sm:w-auto min-w-[200px] px-8 py-4 sm:py-3.5 rounded-full glass font-medium text-center hover:glow-aurora transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t("contactMe")}
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator - minimal design for visual balance */}
      <motion.div
        className="relative z-20 flex-shrink-0"
        initial={mounted ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.a
          href="#about"
          className="flex items-center justify-center w-10 h-10 rounded-full glass text-muted-foreground hover:text-foreground hover:glow-aurora transition-all duration-300 cursor-pointer"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.1 }}
        >
          <ArrowDown className="w-5 h-5" />
        </motion.a>
      </motion.div>
    </section>
  );
}
