"use client";

import { useRef, useEffect, MutableRefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Returns a ref that holds the current scroll progress (0–1)
 * driven by GSAP ScrollTrigger pinned to the given container.
 */
export function useScrollProgress(
  containerRef: MutableRefObject<HTMLElement | null>
) {
  const progress = useRef(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        progress.current = self.progress;
      },
    });

    return () => {
      trigger.kill();
    };
  }, [containerRef]);

  return progress;
}
