"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/lib/motion";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  amount?: number;
  once?: boolean;
  /** Weichzeichner beim Einblenden (px), z. B. 10 */
  blur?: number;
  /** Start-Skalierung, z. B. 0.96 */
  scaleFrom?: number;
}

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  duration = 0.75,
  direction = "up",
  amount = 0.15,
  once = true,
  blur = 0,
  scaleFrom,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount, once });
  const prefersReduced = useReducedMotion();

  const directionMap = {
    up: { y: 28, x: 0 },
    down: { y: -28, x: 0 },
    left: { x: 28, y: 0 },
    right: { x: -28, y: 0 },
    none: { x: 0, y: 0 },
  };

  const show = prefersReduced || isInView;

  const initial: Record<string, number | string> = {
    opacity: 0,
    ...directionMap[direction],
  };
  if (blur > 0) initial.filter = `blur(${blur}px)`;
  if (scaleFrom !== undefined) initial.scale = scaleFrom;

  const animate: Record<string, number | string> = {
    opacity: 1,
    x: 0,
    y: 0,
  };
  if (blur > 0) animate.filter = "blur(0px)";
  if (scaleFrom !== undefined) animate.scale = 1;

  const transitionDuration =
    blur > 0 ? Math.max(duration, 0.78) : duration;

  if (prefersReduced) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={initial}
      animate={show ? animate : initial}
      transition={{
        duration: transitionDuration,
        delay,
        ease: easeOutExpo,
      }}
    >
      {children}
    </motion.div>
  );
}
