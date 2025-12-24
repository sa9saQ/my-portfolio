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
      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-3">
            {t("heading")}
          </h2>
          <p className="text-muted-foreground text-lg">{t("title")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Card with Glass Effect */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative max-w-md mx-auto">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-sm" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-sm" />

              <div className="relative z-10 glass-card p-8 flex flex-col justify-center min-h-[320px]">
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-3xl">
                    👋
                  </div>
                  <h3 className="text-2xl font-heading font-bold">{t("hello")}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("description")}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Features Grid */}
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
                  className="glass-card group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <feature.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-all duration-300" />
                  <h4 className="font-heading font-semibold mb-2">{feature.title}</h4>
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
