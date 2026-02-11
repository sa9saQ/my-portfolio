"use client";

import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ExternalLink, Github, ChevronRight, ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { projects, type Project } from "@/data/projects";

const PREVIEW_COUNT = 3;

function ProjectCard({
  project,
  index,
  isHovered,
  onHover,
  onLeave,
  t,
  isInView,
  onSelect,
}: {
  project: Project;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  t: (key: string) => string;
  isInView: boolean;
  onSelect: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    onLeave();
  }, [mouseX, mouseY, onLeave]);

  return (
    <motion.div
      ref={cardRef}
      layoutId={`project-card-${project.id}`}
      className="group relative cursor-pointer"
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
      onMouseEnter={onHover}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
    >
      <div
        className={cn(
          "relative rounded-2xl overflow-hidden glass transition-all duration-500",
          isHovered && "shadow-lg shadow-primary/20 border-primary/40"
        )}
      >
        <div className="relative h-48 overflow-hidden">
          {project.image && !project.image.includes("coming-soon") ? (
            <>
              {!imgLoaded && (
                <div className="absolute inset-0 bg-muted animate-pulse" />
              )}
              <img
                src={project.image}
                alt={t(project.titleKey)}
                className={cn(
                  "absolute inset-0 w-full h-full object-cover object-top transition-all duration-500",
                  imgLoaded ? "opacity-100" : "opacity-0",
                  isHovered && "scale-110"
                )}
                onLoad={() => setImgLoaded(true)}
              />
            </>
          ) : (
            <div className={cn("absolute inset-0 bg-gradient-to-br opacity-80", project.color)} />
          )}
          {(!project.image || project.image.includes("coming-soon")) && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl opacity-30 font-bold text-white">
                {project.id.toString().padStart(2, "0")}
              </span>
            </div>
          )}

          <motion.div
            className="absolute inset-0 glass flex items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full glass hover:glow-aurora transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-5 h-5" />
              </motion.a>
            )}
            {project.demo && (
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-primary text-primary-foreground glow-primary cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-5 h-5" />
              </motion.a>
            )}
          </motion.div>
        </div>

        <div className="p-5">
          <h3 className="text-lg font-heading font-bold mb-2 flex items-center gap-2">
            {t(project.titleKey)}
            <ChevronRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
          </h3>
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {t(project.descriptionKey)}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-2.5 py-1 text-xs rounded-full glass text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, t, onClose }: { project: Project; t: (key: string) => string; onClose: () => void }) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <>
      <motion.div
        className="fixed inset-0 bg-background/80 backdrop-blur-md z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
        <motion.div
          layoutId={`project-card-${project.id}`}
          className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl glass-card"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full glass hover:glow-aurora transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative h-56 sm:h-72 overflow-hidden rounded-t-2xl">
            {project.image && !project.image.includes("coming-soon") ? (
              <img
                src={project.image}
                alt={t(project.titleKey)}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className={cn("w-full h-full bg-gradient-to-br", project.color)} />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </div>

          <div className="p-6 sm:p-8 -mt-12 relative">
            <motion.h2
              className="text-2xl sm:text-3xl font-heading font-bold mb-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {t(project.titleKey)}
            </motion.h2>
            <motion.p
              className="text-muted-foreground mb-6 leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {t(project.descriptionKey)}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-2 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              {project.tags.map((tag) => (
                <span key={tag} className="px-3 py-1.5 text-sm rounded-full glass text-muted-foreground">
                  {tag}
                </span>
              ))}
            </motion.div>

            <motion.div
              className="flex gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full glass hover:glow-aurora transition-all"
                >
                  <Github className="w-4 h-4" /> GitHub
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground"
                >
                  <ExternalLink className="w-4 h-4" /> Demo
                </a>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export function ProjectsPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const t = useTranslations("projects");

  const previewProjects = projects.slice(0, PREVIEW_COUNT);

  return (
    <section id="projects" className="py-16 sm:py-24 px-4">
      <div ref={ref} className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SplitText text={t("heading")} isInView={isInView} className="text-4xl md:text-5xl font-heading font-bold mb-3" />
          <p className="text-muted-foreground text-lg">{t("title")}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {previewProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isHovered={hoveredProject === project.id}
              onHover={() => setHoveredProject(project.id)}
              onLeave={() => setHoveredProject(null)}
              t={t}
              isInView={isInView}
              onSelect={() => setSelectedProject(project)}
            />
          ))}
        </div>

        <AnimatePresence>
          {selectedProject && (
            <ProjectModal
              project={selectedProject}
              t={t}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </AnimatePresence>

        <motion.div
          className="text-center mt-8 sm:mt-12 px-4 sm:px-0"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link href="/projects" className="block sm:inline-block">
            <motion.span
              className="relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 sm:py-3.5 rounded-full bg-primary text-primary-foreground font-medium overflow-hidden group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="absolute inset-0 bg-primary/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative">{t("viewAll")}</span>
              <ArrowRight className="relative w-5 h-5" />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function SplitText({ text, isInView, className }: { text: string; isInView: boolean; className?: string }) {
  return (
    <h2 className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, rotateX: -40 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.4, delay: i * 0.03, ease: "easeOut" }}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </h2>
  );
}
