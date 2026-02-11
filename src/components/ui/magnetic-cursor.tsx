"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

interface RipplePoint {
  id: number;
  x: number;
  y: number;
}

export function MagneticCursor() {
  const [visible, setVisible] = useState(false);
  const [hoverType, setHoverType] = useState<"default" | "link" | "button" | "text">("default");
  const [isClicking, setIsClicking] = useState(false);
  const [ripples, setRipples] = useState<RipplePoint[]>([]);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const trailX = useMotionValue(-100);
  const trailY = useMotionValue(-100);
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const trailConfig = { damping: 30, stiffness: 150, mass: 1 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);
  const trailSpringX = useSpring(trailX, trailConfig);
  const trailSpringY = useSpring(trailY, trailConfig);
  const rippleId = useRef(0);
  const lastRippleTime = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(pointer: fine) and (min-width: 768px)");
    if (!mq.matches) return;
    setVisible(true);
    document.documentElement.style.cursor = "none";

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      trailX.set(e.clientX);
      trailY.set(e.clientY);

      // Ripple trail (throttled)
      const now = Date.now();
      if (now - lastRippleTime.current > 80) {
        lastRippleTime.current = now;
        const id = ++rippleId.current;
        setRipples(prev => [...prev.slice(-5), { id, x: e.clientX, y: e.clientY }]);
        setTimeout(() => {
          setRipples(prev => prev.filter(r => r.id !== id));
        }, 600);
      }
    };

    const updateHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const el = target.closest("a, button, [role=button], input, textarea, select, label");
      const textEl = target.closest("h1, h2, h3, h4, p");
      if (el) {
        const tag = el.tagName.toLowerCase();
        setHoverType(tag === "a" ? "link" : "button");
      } else if (textEl) {
        setHoverType("text");
      } else {
        setHoverType("default");
      }
    };

    const down = () => setIsClicking(true);
    const up = () => setIsClicking(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", updateHover, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", updateHover);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [cursorX, cursorY, trailX, trailY]);

  if (!visible) return null;

  const sizes = { default: 12, link: 48, button: 36, text: 60 };
  const size = isClicking ? sizes[hoverType] * 0.8 : sizes[hoverType];

  return (
    <>
      {/* Ripple trails */}
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.div
            key={r.id}
            className="fixed pointer-events-none rounded-full"
            style={{
              left: r.x,
              top: r.y,
              translateX: "-50%",
              translateY: "-50%",
              zIndex: 9997,
            }}
            initial={{ width: 4, height: 4, opacity: 0.4, border: "1px solid hsl(var(--primary) / 0.4)" }}
            animate={{ width: 30, height: 30, opacity: 0, border: "1px solid hsl(var(--primary) / 0)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      {/* Trailing circle */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none"
        style={{
          x: trailSpringX,
          y: trailSpringY,
          width: size + 16,
          height: size + 16,
          translateX: "-50%",
          translateY: "-50%",
          border: "1px solid hsl(var(--primary) / 0.2)",
          zIndex: 9998,
          transition: "width 0.3s, height 0.3s",
        }}
        aria-hidden="true"
      />

      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none"
        style={{
          x: springX,
          y: springY,
          width: size,
          height: size,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: hoverType === "default" 
            ? "hsl(var(--primary) / 0.5)" 
            : hoverType === "text"
            ? "hsl(var(--primary) / 0.08)"
            : "hsl(var(--primary) / 0.15)",
          border: hoverType === "text" ? "1px solid hsl(var(--primary) / 0.3)" : "none",
          mixBlendMode: hoverType === "text" ? "difference" : "normal",
          zIndex: 9999,
          transition: "width 0.3s, height 0.3s, background-color 0.3s",
        }}
        aria-hidden="true"
      />
    </>
  );
}
