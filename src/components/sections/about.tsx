"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Code, Palette, Rocket, Sparkles } from "lucide-react";

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const t = useTranslations("about");

  const features = [
    {
      icon: Code,
      title: t("features.cleanCode.title"),
      description: t("features.cleanCode.description"),
    },
    {
      icon: Palette,
      title: t("features.creativeDesign.title"),
      description: t("features.creativeDesign.description"),
    },
    {
      icon: Rocket,
      title: t("features.performance.title"),
      description: t("features.performance.description"),
    },
    {
      icon: Sparkles,
      title: t("features.innovation.title"),
      description: t("features.innovation.description"),
    },
  ];

  return (
    <section id="about" className="py-24 px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-2">
            {t("heading")}
          </h2>
          <p className="text-muted-foreground text-lg">{t("title")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-2xl" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/20 rounded-full" />

              <div className="relative z-10 w-full h-full rounded-3xl overflow-hidden bg-card border border-border p-8 flex flex-col justify-center">
                <div className="space-y-4">
                  <span className="text-5xl">👋</span>
                  <h3 className="text-2xl font-bold">{t("hello")}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("description")}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("intro")}
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <feature.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="font-semibold mb-2">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
