"use client";

import { useEffect, useRef, useCallback } from "react";

interface AuroraColor {
  r: number;
  g: number;
  b: number;
}

// Warm, subtle color palette - avoid typical AI rainbow
const AURORA_COLORS: AuroraColor[] = [
  { r: 249, g: 115, b: 22 }, // Orange (primary)
  { r: 245, g: 158, b: 11 }, // Amber
  { r: 239, g: 68, b: 68 }, // Rose/Red accent
];

export function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      timeRef.current += 0.001; // Slower, more subtle animation
      const time = timeRef.current;

      ctx.clearRect(0, 0, width, height);

      // 3つのオーロラレイヤーを描画
      for (let i = 0; i < 3; i++) {
        const gradient = ctx.createRadialGradient(
          width * (0.3 + Math.sin(time + i * 2) * 0.3),
          height * (0.3 + Math.cos(time * 0.7 + i * 1.5) * 0.3),
          0,
          width * 0.5,
          height * 0.5,
          width * 0.9
        );

        const c1 = AURORA_COLORS[i % AURORA_COLORS.length];
        const c2 = AURORA_COLORS[(i + 1) % AURORA_COLORS.length];

        // Very subtle gradient - less is more
        gradient.addColorStop(0, `rgba(${c1.r},${c1.g},${c1.b},0.15)`);
        gradient.addColorStop(0.5, `rgba(${c2.r},${c2.g},${c2.b},0.08)`);
        gradient.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      // 追加のアクセントレイヤー (Primary orange)
      const accentGradient = ctx.createRadialGradient(
        width * (0.7 + Math.sin(time * 1.3) * 0.2),
        height * (0.6 + Math.cos(time * 0.9) * 0.2),
        0,
        width * 0.6,
        height * 0.6,
        width * 0.7
      );
      accentGradient.addColorStop(0, "rgba(249, 115, 22, 0.12)");
      accentGradient.addColorStop(0.5, "rgba(249, 115, 22, 0.05)");
      accentGradient.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = accentGradient;
      ctx.fillRect(0, 0, width, height);
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // prefers-reduced-motion チェック
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const animate = () => {
      draw(ctx, window.innerWidth, window.innerHeight);
      animationRef.current = requestAnimationFrame(animate);
    };

    if (prefersReducedMotion) {
      // 静的な描画のみ
      draw(ctx, window.innerWidth, window.innerHeight);
    } else {
      animate();
    }

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ opacity: 0.6 }}
      aria-hidden="true"
    />
  );
}
