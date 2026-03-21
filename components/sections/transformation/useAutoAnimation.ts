"use client";

import {
  useRef,
  useLayoutEffect,
  type RefObject,
  type MutableRefObject,
} from "react";

/**
 * Transformation v11 — Lock → ein Scroll triggert → Auto-Animation (kein Scrub).
 *
 * - Erstes Mal (pro Tab-Session): Sektion einrasten, nächstes Scroll startet die
 *   volle Animation automatisch (~8s).
 * - Danach (hoch/runter): nur Endzustand, keine Wiederholung.
 * - Nach Browser-Reload: wieder einmal möglich (sessionStorage wird geleert).
 */

const STORAGE_KEY = "lavik-transformation-played";
const DURATION_MS = 8000;

type Phase = "idle" | "watching" | "locked" | "animating" | "done";

interface AutoAnimationResult {
  progress: MutableRefObject<number>;
}

export function useAutoAnimation(
  triggerRef: RefObject<HTMLElement | null>
): AutoAnimationResult {
  const progress = useRef(0);
  const phaseRef = useRef<Phase>("idle");
  const scrollYStored = useRef(0);
  const scrollLockActive = useRef(false);

  useLayoutEffect(() => {
    const el = triggerRef.current;
    if (!el) return;

    function lockViewportScroll() {
      if (scrollLockActive.current) return;
      scrollLockActive.current = true;
      const y = window.scrollY;
      scrollYStored.current = y;
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${y}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
    }

    function unlockViewportScroll() {
      if (!scrollLockActive.current) return;
      scrollLockActive.current = false;
      // y aus body.top lesen (wie beim Lock gesetzt) — zuverlässiger als nur Ref
      const topStyle = document.body.style.top;
      const yFromBody =
        topStyle && topStyle !== "0px"
          ? Math.abs(parseInt(topStyle, 10) || 0)
          : scrollYStored.current;

      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.top = "";

      const html = document.documentElement;
      // html hat global scroll-behavior: smooth — sonst animiert scrollTo() und wirkt wie Sprung
      const prevScrollBehavior = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
      window.scrollTo(0, yFromBody);
      html.style.scrollBehavior = prevScrollBehavior;
    }

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      progress.current = 1;
      phaseRef.current = "done";
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* noop */
      }
      return;
    }

    const nav = performance.getEntriesByType(
      "navigation"
    )[0] as PerformanceNavigationTiming | undefined;
    if (nav?.type === "reload") {
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch {
        /* noop */
      }
    }

    let alreadyPlayed = false;
    try {
      alreadyPlayed = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      alreadyPlayed = false;
    }

    if (alreadyPlayed) {
      progress.current = 1;
      phaseRef.current = "done";
      return;
    }

    phaseRef.current = "watching";

    const section = el;

    function handleWheel(e: WheelEvent) {
      if (phaseRef.current === "watching") {
        const sectionRect = section.getBoundingClientRect();
        const vh = window.innerHeight;

        if (
          e.deltaY > 0 &&
          sectionRect.top <= vh * 0.08 &&
          sectionRect.bottom > vh
        ) {
          e.preventDefault();
          if (Math.abs(sectionRect.top) > 1) {
            window.scrollBy(0, sectionRect.top);
          }
          phaseRef.current = "locked";
          lockViewportScroll();
        }
      } else if (phaseRef.current === "locked") {
        e.preventDefault();
        startAnimation();
      } else if (phaseRef.current === "animating") {
        e.preventDefault();
      }
    }

    function handleTouchMove(e: TouchEvent) {
      if (
        phaseRef.current === "locked" ||
        phaseRef.current === "animating"
      ) {
        e.preventDefault();
        if (phaseRef.current === "locked") startAnimation();
      }
    }

    function handleKey(e: KeyboardEvent) {
      if (
        phaseRef.current !== "locked" &&
        phaseRef.current !== "animating"
      ) {
        return;
      }
      if (
        ["ArrowDown", "ArrowUp", " ", "PageDown", "PageUp", "Home", "End"].includes(
          e.key
        )
      ) {
        e.preventDefault();
        if (
          phaseRef.current === "locked" &&
          ["ArrowDown", " ", "PageDown"].includes(e.key)
        ) {
          startAnimation();
        }
      }
    }

    function removeListeners() {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKey as EventListener);
    }

    function startAnimation() {
      if (phaseRef.current !== "locked") return;
      phaseRef.current = "animating";

      const start = performance.now();

      function frame(now: number) {
        const elapsed = now - start;
        const raw = Math.min(elapsed / DURATION_MS, 1);
        progress.current = raw;

        if (raw < 1) {
          requestAnimationFrame(frame);
        } else {
          progress.current = 1;
          phaseRef.current = "done";
          try {
            sessionStorage.setItem(STORAGE_KEY, "1");
          } catch {
            /* noop */
          }
          unlockViewportScroll();
          removeListeners();
        }
      }

      requestAnimationFrame(frame);
    }

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("keydown", handleKey as EventListener);

    return () => {
      removeListeners();
      unlockViewportScroll();
    };
  }, [triggerRef]);

  return { progress };
}
