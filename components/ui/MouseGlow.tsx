"use client";

import { useEffect, useRef } from "react";

export default function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    let x = -9999;
    let y = -9999;
    let currentX = -9999;
    let currentY = -9999;
    let rafId: number;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    function animate() {
      currentX = lerp(currentX, x, 0.07);
      currentY = lerp(currentY, y, 0.07);
      el!.style.transform = `translate(${currentX - 300}px, ${currentY - 300}px)`;
      rafId = requestAnimationFrame(animate);
    }

    function onMove(e: MouseEvent) {
      x = e.clientX;
      y = e.clientY;
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-0 w-[600px] h-[600px] rounded-full"
      style={{
        background:
          "radial-gradient(circle at center, rgba(15, 122, 90, 0.07) 0%, transparent 70%)",
        willChange: "transform",
      }}
    />
  );
}
