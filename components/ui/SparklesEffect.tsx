"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  opacityDir: number;
  maxOpacity: number;
}

interface SparklesEffectProps {
  className?: string;
  density?: number;
}

export default function SparklesEffect({
  className,
  density = 1,
}: SparklesEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function createParticle(w: number, h: number): Particle {
      const maxOp = Math.random() * 0.4 + 0.1;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        size: Math.random() * 1.2 + 0.3,
        opacity: Math.random() * maxOp,
        opacityDir: Math.random() > 0.5 ? 1 : -1,
        maxOpacity: maxOp,
      };
    }

    function resize(c: HTMLCanvasElement) {
      c.width = c.offsetWidth;
      c.height = c.offsetHeight;
      const count = Math.min(
        Math.floor(((c.width * c.height) / 16000) * density),
        70
      );
      particlesRef.current = Array.from({ length: count }, () =>
        createParticle(c.width, c.height)
      );
    }

    const ro = new ResizeObserver(() => resize(canvas));
    ro.observe(canvas);
    resize(canvas);

    function draw() {
      const c = canvasRef.current;
      if (!c) return;
      const ctx = c.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, c.width, c.height);

      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.opacity += p.opacityDir * 0.003;

        if (p.opacity >= p.maxOpacity) p.opacityDir = -1;
        if (p.opacity <= 0) p.opacityDir = 1;

        if (p.x < -2) p.x = c.width + 2;
        if (p.x > c.width + 2) p.x = -2;
        if (p.y < -2) p.y = c.height + 2;
        if (p.y > c.height + 2) p.y = -2;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.opacity);
        // Alternate between white and the green-light tone
        ctx.fillStyle = p.size > 0.9 ? "#1FBF8F" : "#D9E2DF";
        ctx.shadowBlur = 5;
        ctx.shadowColor = "rgba(31, 191, 143, 0.6)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none", className)}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
