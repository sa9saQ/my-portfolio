"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";

interface Skill {
  name: string;
  level: number;
  color: string;
}

interface SkillCategory {
  titleKey: string;
  icon: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    titleKey: "categories.ai",
    icon: "🤖",
    skills: [
      { name: "Claude / Claude Code", level: 95, color: "from-orange-500 to-amber-500" },
      { name: "ChatGPT / Codex", level: 90, color: "from-green-500 to-emerald-500" },
      { name: "Gemini", level: 85, color: "from-blue-500 to-cyan-500" },
      { name: "Cursor", level: 90, color: "from-purple-500 to-violet-500" },
    ],
  },
  {
    titleKey: "categories.tools",
    icon: "🛠️",
    skills: [
      { name: "CodeRabbit", level: 85, color: "from-orange-500 to-red-500" },
      { name: "BugBot", level: 80, color: "from-pink-500 to-rose-500" },
      { name: "Git / GitHub", level: 75, color: "from-gray-600 to-gray-400" },
      { name: "VS Code", level: 85, color: "from-blue-500 to-indigo-500" },
    ],
  },
  {
    titleKey: "categories.creating",
    icon: "✨",
    skills: [
      { name: "Webサイト制作", level: 85, color: "from-cyan-500 to-blue-500" },
      { name: "UIデザイン", level: 75, color: "from-indigo-500 to-purple-500" },
      { name: "プロンプト設計", level: 95, color: "from-amber-500 to-orange-500" },
      { name: "企画 / アイデア", level: 95, color: "from-red-500 to-pink-500" },
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
      <div className="h-3 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
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
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary text-sm font-medium uppercase tracking-wider">
            {t("title")}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
            {t("heading")}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.titleKey}
              className="p-6 rounded-3xl bg-card border border-border hover:border-primary/30 transition-colors"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: categoryIndex * 0.2 }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{category.icon}</span>
                <h3 className="text-xl font-bold">{t(category.titleKey)}</h3>
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

        {/* Additional Tech Icons */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-center text-muted-foreground mb-8">
            {t("alsoExperienced")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
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
                className="px-4 py-2 rounded-full bg-secondary text-sm font-medium"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 1 + index * 0.05 }}
                whileHover={{ scale: 1.1, backgroundColor: "hsl(var(--primary) / 0.2)" }}
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
