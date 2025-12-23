"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
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
      { name: "Webサイト制作", level: 85 },
      { name: "UIデザイン", level: 75 },
      { name: "プロンプト設計", level: 95 },
      { name: "企画 / アイデア", level: 95 },
    ],
  },
];

function SkillBar({ skill, delay }: { skill: Skill; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium">{skill.name}</span>
        <span className="text-muted-foreground">{skill.level}%</span>
      </div>
      <div className="h-2 bg-white/10 dark:bg-white/5 rounded-full overflow-hidden">
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
    <section id="skills" className="py-24 px-4 relative overflow-hidden">
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
          <div className="flex flex-wrap justify-center gap-3">
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
                className="px-4 py-2 rounded-full glass text-sm font-medium cursor-pointer hover:glow-aurora transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 1 + index * 0.05 }}
                whileHover={{ scale: 1.1 }}
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
