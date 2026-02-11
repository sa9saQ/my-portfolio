"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ExternalLink, Github, ChevronRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { projects } from "@/data/projects";

export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const t = useTranslations("projects");

  const categories = [
    { key: "all", label: t("categories.all") },
    { key: "hp", label: t("categories.hp") },
    { key: "ai", label: t("categories.ai") },
    { key: "web", label: t("categories.web") },
    { key: "mobile", label: t("categories.mobile") },
  ];

  const filteredProjects = activeCategory === "all"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section className="py-24 px-4 bg-secondary/30 min-h-screen">
      <div ref={ref} className="max-w-7xl mx-auto">
        {/* Back Button */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          <Link href="/#projects">
            <motion.span
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ x: -5 }}
            >
              <ArrowLeft className="w-4 h-4" />
              {t("backToTop")}
            </motion.span>
          </Link>
        </motion.div>

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
          <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
            {t("allProjects")}
          </h1>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                activeCategory === category.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border hover:border-primary/50"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              layout
            >
              <div
                className={cn(
                  "relative rounded-3xl overflow-hidden bg-card border border-border transition-all duration-500",
                  hoveredProject === project.id && "border-primary/50 shadow-2xl shadow-primary/10"
                )}
              >
                {/* Project Image/Gradient */}
                <div className="relative h-48 overflow-hidden">
                  {project.image && !project.image.includes("coming-soon") ? (
                    <img
                      src={project.image}
                      alt={t(project.titleKey)}
                      className="absolute inset-0 w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-br opacity-80",
                        project.color
                      )}
                    />
                  )}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{
                      scale: hoveredProject === project.id ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    {(!project.image || project.image.includes("coming-soon")) && (
                      <span className="text-6xl opacity-30 font-bold text-white">
                        {project.id.toString().padStart(2, "0")}
                      </span>
                    )}
                  </motion.div>

                  {/* Hover Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center gap-4"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: hoveredProject === project.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-card border border-border hover:border-primary transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github className="w-5 h-5" />
                      </motion.a>
                    )}
                    {project.demo && (
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-primary text-primary-foreground"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink className="w-5 h-5" />
                      </motion.a>
                    )}
                  </motion.div>
                </div>

                {/* Project Info */}
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                    {t(project.titleKey)}
                    <ChevronRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {t(project.descriptionKey)}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs rounded-full bg-secondary text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-muted-foreground">{t("noProjects")}</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
