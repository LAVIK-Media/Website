"use client";

import { useRef, useEffect, useState, type MutableRefObject, type RefObject } from "react";

/**
 * Two-phase trigger animation hook — v9.
 *
 * Key insight: checking position in the WHEEL handler (not scroll handler)
 * prevents overshoot. The wheel event fires BEFORE the browser scrolls,
 * so we can preventDefault on the exact event that would push past center.
 *
 * Flow:
 * 1. User scrolls. Each wheel event: check if section is at/past trigger →
 *    if yes, preventDefault (stop THIS scroll), snap to center, lock.
 * 2. User is stuck, frame centered. Next wheel → start animation.
 * 3. Animation ends → instant unlock.
 */

const DURATION = 8000;

interface AutoAnimationResult {
  progress: MutableRefObject<number>;
  done: boolean;
}

export function useAutoAnimation(
  triggerRef: RefObject<HTMLElement | null>
): AutoAnimationResult {
  const progress = useRef(0);
  const hasPlayed = useRef(false);
  const [done, setDone] = useState(false);

  const state = useRef<"watching" | "locked" | "animating" | "done">("watching");

  useEffect(() => {
    const el = triggerRef.current;
    if (!el || hasPlayed.current) return;

    // ── Unified wheel handler — handles ALL states ──
    function handleWheel(e: WheelEvent) {
      if (state.current === "watching") {
        // Check if we should lock NOW — before the browser processes this scroll
        const sectionRect = el!.getBoundingClientRect();
        const vh = window.innerHeight;

        // Only trigger when scrolling DOWN and section is near/past viewport top
        if (e.deltaY > 0 && sectionRect.top <= vh * 0.08 && sectionRect.bottom > vh) {
          // BLOCK this wheel event — prevents the overshoot
          e.preventDefault();

          // Snap section top to exactly viewport top
          if (Math.abs(sectionRect.top) > 1) {
            window.scrollBy(0, sectionRect.top);
          }

          state.current = "locked";
          return;
        }
        // Otherwise let scroll happen naturally (don't preventDefault)

      } else if (state.current === "locked") {
        e.preventDefault();
        startAnimation();

      } else if (state.current === "animating") {
        e.preventDefault();
      }
    }

    function handleTouch(e: TouchEvent) {
      if (state.current === "locked" || state.current === "animating") {
        e.preventDefault();
        if (state.current === "locked") startAnimation();
      }
    }

    function handleKey(e: KeyboardEvent) {
      if (state.current !== "locked" && state.current !== "animating") return;
      if (["ArrowDown", "ArrowUp", " ", "PageDown", "PageUp", "Home", "End"].includes(e.key)) {
        e.preventDefault();
        if (state.current === "locked" && ["ArrowDown", " ", "PageDown"].includes(e.key)) {
          startAnimation();
        }
      }
    }

    // Register from the start — handler checks state internally
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchmove", handleTouch, { passive: false });
    window.addEventListener("keydown", handleKey as EventListener);

    function removeAllListeners() {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchmove", handleTouch);
      window.removeEventListener("keydown", handleKey as EventListener);
    }

    // ── Start animation ──
    function startAnimation() {
      if (state.current !== "locked") return;
      state.current = "animating";

      const start = performance.now();

      function animate(now: number) {
        const elapsed = now - start;
        const raw = Math.min(elapsed / DURATION, 1);
        progress.current = raw;

        if (raw < 1) {
          requestAnimationFrame(animate);
        } else {
          progress.current = 1;
          hasPlayed.current = true;
          state.current = "done";
          removeAllListeners();
          setDone(true);
        }
      }

      requestAnimationFrame(animate);
    }

    return () => {
      removeAllListeners();
    };
  }, [triggerRef]);

  return { progress, done };
}
