"use client";

import { useEffect, useRef } from "react";

export function LiquidBackground() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let turbulence: SVGFETurbulenceElement | null = null;
    let frame: number;
    let time = 0;

    const svg = svgRef.current;
    if (!svg) return;
    turbulence = svg.querySelector("#liquid-turbulence") as SVGFETurbulenceElement;
    if (!turbulence) return;

    const animate = () => {
      time += 0.003;
      const bfX = 0.01 + Math.sin(time) * 0.005;
      const bfY = 0.02 + Math.cos(time * 0.7) * 0.005;
      turbulence?.setAttribute("baseFrequency", `${bfX} ${bfY}`);
      frame = requestAnimationFrame(animate);
    };
    animate();

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <svg ref={svgRef} className="fixed inset-0 w-full h-full -z-20 pointer-events-none opacity-30" aria-hidden="true">
      <defs>
        <filter id="liquid-filter" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            id="liquid-turbulence"
            type="fractalNoise"
            baseFrequency="0.01 0.02"
            numOctaves={3}
            seed={42}
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={30}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill="url(#liquid-gradient)"
        filter="url(#liquid-filter)"
      />
      <defs>
        <radialGradient id="liquid-gradient" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="hsl(25 65% 55% / 0.15)" />
          <stop offset="50%" stopColor="hsl(35 50% 55% / 0.08)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
    </svg>
  );
}
