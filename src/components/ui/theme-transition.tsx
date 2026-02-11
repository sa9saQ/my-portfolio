"use client";

import { useTheme } from "next-themes";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [ripple, setRipple] = useState<{ x: number; y: number; active: boolean } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  const toggle = useCallback((e: React.MouseEvent) => {
    if (!mounted) return;
    const rect = buttonRef.current?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : e.clientX;
    const y = rect ? rect.top + rect.height / 2 : e.clientY;
    
    setRipple({ x, y, active: true });
    
    // Small delay for the ripple to start before theme changes
    setTimeout(() => {
      setTheme(theme === "dark" ? "light" : "dark");
    }, 150);
    
    setTimeout(() => {
      setRipple(null);
    }, 800);
  }, [mounted, theme, setTheme]);

  const isDark = theme === "dark";

  return (
    <>
      <motion.button
        ref={buttonRef}
        onClick={toggle}
        className="relative p-2.5 rounded-full glass hover:glow-aurora transition-all duration-300 cursor-pointer overflow-hidden"
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {mounted && isDark ? (
            <motion.div
              key="sun"
              initial={{ rotate: -90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Sun className="w-4 h-4" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: 90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Moon className="w-4 h-4" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Ripple overlay */}
      <AnimatePresence>
        {ripple?.active && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-[9000]"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute rounded-full"
              style={{
                left: ripple.x,
                top: ripple.y,
                translateX: "-50%",
                translateY: "-50%",
                background: isDark
                  ? "radial-gradient(circle, hsl(40 20% 97% / 0.15) 0%, transparent 70%)"
                  : "radial-gradient(circle, hsl(25 15% 12% / 0.1) 0%, transparent 70%)",
              }}
              initial={{ width: 0, height: 0 }}
              animate={{ width: "300vmax", height: "300vmax" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function ThemeToggleMobile() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <motion.button
      onClick={() => mounted && setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full glass cursor-pointer"
      whileTap={{ scale: 0.9 }}
    >
      {mounted ? (
        theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />
      ) : (
        <Sun className="w-4 h-4" />
      )}
    </motion.button>
  );
}
