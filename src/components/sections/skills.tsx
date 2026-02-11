"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Bot, Wrench, Lightbulb, type LucideIcon } from "lucide-react";

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  titleKey: string;
  icon: LucideIcon;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    titleKey: "categories.ai",
    icon: Bot,
    skills: [
      { name: "Claude / Claude Code", level: 95 },
      { name: "ChatGPT / Codex", level: 90 },
      { name: "Gemini", level: 85 },
      { name: "Cursor", level: 90 },
    ],
  },
  {
    titleKey: "categories.tools",
    icon: Wrench,
    skills: [
      { name: "CodeRabbit", level: 85 },
      { name: "BugBot", level: 80 },
      { name: "Git / GitHub", level: 75 },
      { name: "VS Code", level: 85 },
    ],
  },
  {
    titleKey: "categories.creating",
    icon: Lightbulb,
    skills: [
      { name: "Web\u30b5\u30a4\u30c8\u5236\u4f5c", level: 85 },
      { name: "UI\u30c7\u30b6\u30a4\u30f3", level: 75 },
      { name: "\u30d7\u30ed\u30f3\u30d7\u30c8\u8a2d\u8a08", level: 95 },
      { name: "\u4f01\u753b / \u30a2\u30a4\u30c7\u30a2", level: 95 },
    ],
  },
];

function AnimatedNumber({ value, inView }: { value: number; inView: boolean }) {
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) {
      const controls = animate(motionVal, value, {
        duration: 1.2,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [inView, value, motionVal]);

  useEffect(() => {
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return unsub;
  }, [rounded]);

  return <>{display}%</>;
}

function SkillBar({ skill, delay, sectionInView }: { skill: Skill; delay: number; sectionInView: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium">{skill.name}</span>
        <span className="text-muted-foreground tabular-nums">
          <AnimatedNumber value={skill.level} inView={isInView && sectionInView} />
        </span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary via-primary to-accent rounded-full"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const t = useTranslations("skills");

  return (
    <section id="skills" className="py-16 sm:py-24 px-4 relative overflow-hidden">
      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
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

        {/* Skills Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.titleKey}
              className="glass-card group"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: categoryIndex * 0.2 }}
              whileHover={{ y: -5 }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl glass group-hover:glow-aurora transition-all duration-300">
                  <category.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-bold">{t(category.titleKey)}</h3>
              </div>

              {/* Skill Bars */}
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill}
                    delay={categoryIndex * 0.2 + skillIndex * 0.1}
                    sectionInView={isInView}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Tech Tags */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-center text-muted-foreground mb-8">
            {t("alsoExperienced")}
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {[
              "Vercel",
              "Notion",
              "Figma",
              "Canva",
              "Discord",
              "Supabase",
              "Next.js",
              "Tailwind CSS",
            ].map((tech, index) => (
              <motion.div
                key={tech}
                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass text-xs sm:text-sm font-medium hover:border-primary/30 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 1 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
