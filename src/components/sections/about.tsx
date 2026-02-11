"use client";

import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Code, Palette, Rocket, Sparkles } from "lucide-react";

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-4, 4]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const t = useTranslations("about");

  const features = [
    { icon: Code, title: t("features.cleanCode.title"), description: t("features.cleanCode.description") },
    { icon: Palette, title: t("features.creativeDesign.title"), description: t("features.creativeDesign.description") },
    { icon: Rocket, title: t("features.performance.title"), description: t("features.performance.description") },
    { icon: Sparkles, title: t("features.innovation.title"), description: t("features.innovation.description") },
  ];

  const headingText = t("heading");

  return (
    <section id="about" className="py-16 sm:py-24 px-4 relative overflow-hidden">
      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, x: -60, rotate: -3 }}
          animate={isInView ? { opacity: 1, x: 0, rotate: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-3">
            {headingText.split("").map((char, i) => (
              <motion.span
                key={i}
                style={{ display: "inline-block" }}
                initial={{ opacity: 0, y: 15, rotate: -10 + Math.random() * 20 }}
                animate={isInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.04 }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </h2>
          <p className="text-muted-foreground text-lg">{t("title")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -80, rotate: -2 }}
            animate={isInView ? { opacity: 1, x: 0, rotate: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative max-w-md mx-auto">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-sm" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-sm" />
              <div className="relative z-10 glass-card p-8 flex flex-col justify-center min-h-[320px]">
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-3xl">👋</div>
                  <h3 className="text-2xl font-heading font-bold">{t("hello")}</h3>
                  <p className="text-muted-foreground leading-relaxed">{t("description")}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 80, rotate: 2 }}
            animate={isInView ? { opacity: 1, x: 0, rotate: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <p className="text-lg text-muted-foreground leading-relaxed">{t("intro")}</p>
            <div className="grid sm:grid-cols-2 gap-4" style={{ perspective: "600px" }}>
              {features.map((feature, index) => (
                <TiltCard key={feature.title} className="glass-card group cursor-pointer">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  >
                    <feature.icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary mb-3 sm:mb-4 group-hover:scale-110 transition-all duration-300" />
                    <h4 className="font-heading font-semibold mb-1 sm:mb-2 text-sm sm:text-base">{feature.title}</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">{feature.description}</p>
                  </motion.div>
                </TiltCard>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
