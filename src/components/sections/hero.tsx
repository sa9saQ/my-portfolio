"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowDown, Github, Mail } from "lucide-react";
import { XIcon } from "@/components/icons/x-icon";

function CinematicText({ text, delay = 0, className }: { text: string; delay?: number; className?: string }) {
  const chars = useMemo(() => text.split(""), [text]);
  
  return (
    <span className={className}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block", willChange: "transform" }}
          initial={{ 
            y: 80, 
            opacity: 0, 
            rotateX: -80,
            filter: "blur(8px)",
          }}
          animate={{ 
            y: 0, 
            opacity: 1, 
            rotateX: 0,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.035,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

function MagneticButton({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.3);
    y.set((e.clientY - cy) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  );
}

function FloatingOrb({ delay, size, x, y }: { delay: number; size: number; x: string; y: string }) {
  return (
    <motion.div
      className="absolute rounded-full bg-primary/10 blur-3xl"
      style={{ width: size, height: size, left: x, top: y }}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, 0],
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 6 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("hero");
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const socialLinks = [
    { icon: Github, href: "https://github.com/sa9saQ", label: "GitHub" },
    { icon: XIcon, href: "https://x.com/act_0001", label: "X" },
    { icon: Mail, href: "mailto:yizhix797@gmail.com", label: "Email" },
  ];

  const subtitleText = t("subtitle");
  const nameText = t("name");
  const greetingText = t("greeting");

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-between overflow-hidden pt-24 sm:pt-28 pb-8"
    >
      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingOrb delay={0} size={300} x="10%" y="20%" />
        <FloatingOrb delay={2} size={200} x="70%" y="60%" />
        <FloatingOrb delay={4} size={250} x="80%" y="10%" />
        <FloatingOrb delay={1} size={150} x="20%" y="70%" />
      </div>

      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background z-10 pointer-events-none"
        style={{ y: bgY, scale: bgScale }}
      />

      <div className="flex-shrink-0" />

      <motion.div 
        className="relative z-20 text-center px-4 max-w-4xl"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        {/* Welcome badge with shimmer */}
        <motion.div
          initial={mounted ? { opacity: 0, y: 30, filter: "blur(10px)" } : false}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            className="inline-block px-5 py-2.5 mb-8 text-sm font-medium rounded-full glass text-foreground/90 relative overflow-hidden"
            initial={mounted ? { opacity: 0, scale: 0.8 } : false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            />
            <span className="relative">{t("welcome")}</span>
          </motion.span>
        </motion.div>

        {/* Main heading with cinematic entrance */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-6 tracking-tight" style={{ perspective: "800px" }}>
          {mounted && (
            <>
              <CinematicText text={greetingText} delay={0.3} />
              <span className="text-primary relative">
                <CinematicText text={nameText} delay={0.3 + greetingText.length * 0.035} />
                {/* Underline animation */}
                <motion.span
                  className="absolute -bottom-2 left-0 h-[3px] bg-gradient-to-r from-primary via-accent to-primary rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
              </span>
            </>
          )}
        </h1>

        {/* Subtitle with staggered blur-in */}
        <motion.p 
          className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
          initial={mounted ? { opacity: 0, y: 20, filter: "blur(8px)" } : false}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 1.0, duration: 0.8, ease: "easeOut" }}
        >
          {subtitleText}
        </motion.p>

        {/* Social links with magnetic effect */}
        <motion.div
          className="flex items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-12"
          initial={mounted ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          {socialLinks.map((link, i) => (
            <MagneticButton
              key={link.label}
              href={link.href}
              className="relative group p-3 sm:p-4 rounded-full glass hover:glow-aurora transition-all duration-300 cursor-pointer"
            >
              <link.icon className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:scale-110" />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                {link.label}
              </span>
            </MagneticButton>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full px-4 sm:px-0"
          initial={mounted ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          <motion.a
            href="#projects"
            className="relative w-full sm:w-auto min-w-[200px] px-8 py-4 sm:py-3.5 rounded-full bg-primary text-primary-foreground font-medium text-center overflow-hidden group cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
              style={{ opacity: 0.3 }}
            />
            <span className="relative">{t("viewProjects")}</span>
          </motion.a>
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

      {/* Scroll indicator */}
      <motion.div
        className="relative z-20 flex-shrink-0"
        initial={mounted ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.5 }}
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-300 cursor-pointer"
          whileHover={{ scale: 1.1 }}
        >
          <motion.span className="text-xs uppercase tracking-widest">scroll</motion.span>
          <motion.div
            className="w-5 h-8 rounded-full border-2 border-current flex justify-center pt-1"
          >
            <motion.div
              className="w-1 h-2 rounded-full bg-current"
              animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.a>
      </motion.div>
    </section>
  );
}
