"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hoverType, setHoverType] = useState<"default" | "link" | "button">("default");
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { damping: 25, stiffness: 300 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 300 });
  const isDesktop = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(pointer: fine) and (min-width: 768px)");
    if (!mq.matches) return;
    isDesktop.current = true;
    setVisible(true);

    document.documentElement.style.cursor = "none";

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const updateHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const el = target.closest("a, button, [role=button], input, textarea, select, label");
      if (el) {
        const tag = el.tagName.toLowerCase();
        if (tag === "a") setHoverType("link");
        else setHoverType("button");
      } else {
        setHoverType("default");
      }
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", updateHover, { passive: true });

    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", updateHover);
    };
  }, [cursorX, cursorY]);

  if (!visible) return null;

  const size = hoverType === "link" ? 40 : hoverType === "button" ? 32 : 16;
  const bgColor = hoverType === "link"
    ? "rgba(249, 115, 22, 0.2)"
    : hoverType === "button"
    ? "rgba(212, 163, 78, 0.25)"
    : "rgba(193, 114, 75, 0.4)";
  const borderColor = hoverType === "link"
    ? "rgba(249, 115, 22, 0.6)"
    : hoverType === "button"
    ? "rgba(212, 163, 78, 0.5)"
    : "rgba(193, 114, 75, 0.6)";

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        width: size,
        height: size,
        translateX: "-50%",
        translateY: "-50%",
        backgroundColor: bgColor,
        border: `1.5px solid ${borderColor}`,
        zIndex: 9999,
        transition: "width 0.2s, height 0.2s, background-color 0.2s, border-color 0.2s",
      }}
      aria-hidden="true"
    />
  );
}
