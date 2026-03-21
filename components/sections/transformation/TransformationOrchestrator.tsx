"use client";

import { useEffect, useRef, type MutableRefObject } from "react";
import {
  PHASES,
  FRAME_ANIM,
  CAMERA,
  OLD_TILES,
  NEW_TILES,
  OLD_SCATTER,
  NEW_SCATTER,
  OLD_STAGGER,
  NEW_STAGGER,
  PARTICLES,
  PARTICLE_COUNT,
  easeInOut,
  easeOut,
  easeOutBack,
  mapRange,
  type ScatterVector,
} from "./transformationConfig";

interface OrchestratorProps {
  progress: MutableRefObject<number>;
  stickyRef: MutableRefObject<HTMLDivElement | null>;
  cameraRef: MutableRefObject<HTMLDivElement | null>;
  oldFrameRef: MutableRefObject<HTMLDivElement | null>;
  newFrameRef: MutableRefObject<HTMLDivElement | null>;
  labelRef: MutableRefObject<HTMLDivElement | null>;
  glowRef: MutableRefObject<HTMLDivElement | null>;
  particlesRef: MutableRefObject<HTMLDivElement | null>;
}

const PHASE_LABELS: [number, string][] = [
  [0.00, ""],
  [0.06, "Was wir daraus machen."],
  [0.28, ""],
  [0.34, "Transformation."],
  [0.50, ""],
  [0.76, "Das Ergebnis."],
  [0.96, ""],
];

// ── Helpers ──

function applyScatter(
  el: HTMLElement,
  vec: ScatterVector,
  t: number,
  opacity: number
) {
  const tx = vec.tx * t;
  const ty = vec.ty * t;
  const tz = vec.tz * t;
  const rx = vec.rx * t;
  const ry = vec.ry * t;
  const rz = vec.rz * t;
  const s = 1 + (vec.s - 1) * t;

  el.style.transform = `translate3d(${tx}vw, ${ty}vh, ${tz}px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${s})`;
  el.style.opacity = String(opacity);

  if (t > 0.01) {
    const shadowIntensity = Math.min(t * 0.5, 0.4);
    el.style.boxShadow = `0 ${8 * t}px ${32 * t}px rgba(0,0,0,${shadowIntensity})`;
    el.style.backfaceVisibility = "hidden";
  } else {
    el.style.boxShadow = "none";
    el.style.backfaceVisibility = "visible";
  }
}

function resetTile(el: HTMLElement) {
  el.style.transform = "none";
  el.style.opacity = "1";
  el.style.boxShadow = "none";
  el.style.backfaceVisibility = "visible";
}

function setFrameOverflow(frame: HTMLElement, overflow: string) {
  frame.style.overflow = overflow;
  const content = frame.querySelector(
    ":scope > div:last-child"
  ) as HTMLElement | null;
  if (content) content.style.overflow = overflow;
}

/**
 * Toggle transparent backgrounds via data attribute + CSS transition.
 * CSS transition on the elements ensures smooth 0.7s fade.
 */
function setFrameBackground(frame: HTMLElement, transparent: boolean) {
  if (transparent) {
    frame.dataset.bgHidden = "";
  } else {
    delete frame.dataset.bgHidden;
  }
}

function setFrameChrome(frame: HTMLElement, opacity: number) {
  const chrome = frame.querySelector(
    "[data-frame-chrome]"
  ) as HTMLElement | null;
  if (chrome) {
    chrome.style.opacity = String(opacity);
  }
  if (opacity < 1) {
    frame.style.borderColor = `rgba(180,180,180,${0.15 * opacity})`;
    frame.style.boxShadow =
      opacity > 0.01
        ? `0 8px 40px rgba(0,0,0,${0.5 * opacity})`
        : "none";
  } else {
    frame.style.borderColor = "";
    frame.style.boxShadow = "";
  }
}

function applyCamera(
  camera: HTMLElement,
  ox: number,
  oy: number,
  z: number
) {
  camera.style.perspectiveOrigin = `${ox}% ${oy}%`;
  const children = camera.children;
  for (let i = 0; i < children.length; i++) {
    const child = children[i] as HTMLElement;
    if (z !== 0) {
      child.style.transform = `translateZ(${z}px)`;
    } else {
      child.style.transform = "";
    }
  }
}

function lerpCamera(
  from: { ox: number; oy: number; z: number },
  to: { ox: number; oy: number; z: number },
  t: number
): { ox: number; oy: number; z: number } {
  return {
    ox: from.ox + (to.ox - from.ox) * t,
    oy: from.oy + (to.oy - from.oy) * t,
    z: from.z + (to.z - from.z) * t,
  };
}

export default function TransformationOrchestrator({
  progress,
  stickyRef,
  cameraRef,
  oldFrameRef,
  newFrameRef,
  labelRef,
  glowRef,
  particlesRef,
}: OrchestratorProps) {
  const rafId = useRef(0);
  const prevLabel = useRef("");

  const oldTileCache = useRef<Map<string, HTMLElement>>(new Map());
  const newTileCache = useRef<Map<string, HTMLElement>>(new Map());
  const cacheReady = useRef(false);

  useEffect(() => {
    function tick() {
      const p = progress.current;

      const oldFrame = oldFrameRef.current;
      const newFrame = newFrameRef.current;
      const camera = cameraRef.current;

      if (!oldFrame || !newFrame) {
        rafId.current = requestAnimationFrame(tick);
        return;
      }

      // ── Build tile cache on first frame ──
      if (!cacheReady.current) {
        for (const id of OLD_TILES) {
          const el = oldFrame.querySelector(
            `[data-tile="${id}"]`
          ) as HTMLElement | null;
          if (el) oldTileCache.current.set(id, el);
        }
        for (const id of NEW_TILES) {
          const el = newFrame.querySelector(
            `[data-tile="${id}"]`
          ) as HTMLElement | null;
          if (el) newTileCache.current.set(id, el);
        }
        cacheReady.current = true;
      }

      // ── Glow control ──
      if (glowRef.current) {
        let glowOpacity = 0;
        if (p > PHASES.scatter.start && p <= PHASES.scatter.end) {
          const t = mapRange(
            p,
            PHASES.scatter.start +
              (PHASES.scatter.end - PHASES.scatter.start) * 0.5,
            PHASES.scatter.end
          );
          glowOpacity = t * 0.15;
        } else if (
          p > PHASES.transition.start &&
          p <= PHASES.transition.end
        ) {
          glowOpacity = 0.18;
        } else if (
          p > PHASES.assemble.start &&
          p <= PHASES.assemble.end
        ) {
          const t = mapRange(p, PHASES.assemble.start, PHASES.assemble.end);
          glowOpacity = 0.18 * (1 - easeOut(t));
        }
        glowRef.current.style.opacity = String(glowOpacity);
      }

      // ── Particle control ──
      if (particlesRef.current) {
        const particleEls = particlesRef.current.children;
        for (
          let i = 0;
          i < Math.min(particleEls.length, PARTICLE_COUNT);
          i++
        ) {
          const el = particleEls[i] as HTMLElement;
          const seed = PARTICLES[i];
          let particleOpacity = 0;
          let particleT = 0;

          if (p > PHASES.scatter.start && p <= PHASES.assemble.end) {
            const fullRange = mapRange(
              p,
              PHASES.scatter.start,
              PHASES.assemble.end
            );
            const delayed = Math.max(
              0,
              (fullRange - seed.delay) / (1 - seed.delay)
            );

            if (delayed < 0.2) {
              particleOpacity = delayed / 0.2;
            } else if (delayed > 0.8) {
              particleOpacity = (1 - delayed) / 0.2;
            } else {
              particleOpacity = 1;
            }
            particleOpacity *= 0.7;
            particleT = delayed;
          }

          const px = seed.x + seed.dx * particleT;
          const py = seed.y + seed.dy * particleT;
          el.style.transform = `translate(${px}vw, ${py}vh)`;
          el.style.opacity = String(particleOpacity);
        }
      }

      // ── Frame chrome fade ──
      if (p > FRAME_ANIM.fadeOutStart && p <= FRAME_ANIM.fadeOutEnd) {
        const t = mapRange(p, FRAME_ANIM.fadeOutStart, FRAME_ANIM.fadeOutEnd);
        setFrameChrome(oldFrame, 1 - easeInOut(t));
      } else if (p > FRAME_ANIM.fadeOutEnd && p <= FRAME_ANIM.fadeInStart) {
        setFrameChrome(oldFrame, 0);
        setFrameChrome(newFrame, 0);
      } else if (p > FRAME_ANIM.fadeInStart && p <= FRAME_ANIM.fadeInEnd) {
        const t = mapRange(p, FRAME_ANIM.fadeInStart, FRAME_ANIM.fadeInEnd);
        setFrameChrome(newFrame, easeInOut(t));
      } else if (p <= FRAME_ANIM.fadeOutStart) {
        setFrameChrome(oldFrame, 1);
      } else {
        setFrameChrome(newFrame, 1);
      }

      // ── Camera movement ──
      if (camera) {
        let cam: { ox: number; oy: number; z: number } = { ...CAMERA.holdOld };
        if (p <= PHASES.holdOld.end) {
          cam = { ...CAMERA.holdOld };
        } else if (p <= PHASES.scatter.end) {
          const t = easeInOut(
            mapRange(p, PHASES.scatter.start, PHASES.scatter.end)
          );
          cam = lerpCamera(CAMERA.holdOld, CAMERA.scatter, t);
        } else if (p <= PHASES.transition.end) {
          const t = easeInOut(
            mapRange(p, PHASES.transition.start, PHASES.transition.end)
          );
          cam = lerpCamera(CAMERA.scatter, CAMERA.transition, t);
        } else if (p <= PHASES.assemble.end) {
          const t = easeOut(
            mapRange(p, PHASES.assemble.start, PHASES.assemble.end)
          );
          cam = lerpCamera(CAMERA.transition, CAMERA.assemble, t);
        } else {
          cam = { ...CAMERA.assemble };
        }
        applyCamera(camera, cam.ox, cam.oy, cam.z);
      }

      const sticky = stickyRef.current;

      // ── Phase 1: holdOld ──
      if (p <= PHASES.holdOld.end) {
        if (sticky) sticky.style.overflow = "hidden";
        oldFrame.style.display = "flex";
        oldFrame.style.opacity = "1";
        setFrameOverflow(oldFrame, "hidden");
        setFrameBackground(oldFrame, false);

        newFrame.style.display = "none";
        newFrame.style.opacity = "0";

        for (const id of OLD_TILES) {
          const el = oldTileCache.current.get(id);
          if (el) resetTile(el);
        }
      }

      // ── Phase 2: scatter ──
      // Backgrounds stay visible — tiles scatter on top of the frame bg
      else if (p <= PHASES.scatter.end) {
        if (sticky) sticky.style.overflow = "visible";
        const t = mapRange(p, PHASES.scatter.start, PHASES.scatter.end);

        oldFrame.style.display = "flex";
        oldFrame.style.opacity = "1";
        setFrameOverflow(oldFrame, "visible");
        setFrameBackground(oldFrame, true);

        newFrame.style.display = "none";
        newFrame.style.opacity = "0";

        for (const id of OLD_TILES) {
          const el = oldTileCache.current.get(id);
          if (!el) continue;

          const stagger = OLD_STAGGER[id] || 0;
          const tileT = Math.max(
            0,
            Math.min(1, (t - stagger) / (1 - stagger))
          );
          const tileTEased = easeInOut(tileT);

          const vec = OLD_SCATTER[id];
          const opacity = 1 - tileTEased * 0.45;
          applyScatter(el, vec, tileTEased, opacity);
        }
      }

      // ── Phase 3: transition (crossfade) ──
      else if (p <= PHASES.transition.end) {
        if (sticky) sticky.style.overflow = "visible";
        const t = mapRange(
          p,
          PHASES.transition.start,
          PHASES.transition.end
        );
        const eased = easeInOut(t);

        // Old: fully scattered, fading out
        oldFrame.style.display = "flex";
        oldFrame.style.opacity = String(1 - eased);
        setFrameOverflow(oldFrame, "visible");
        setFrameBackground(oldFrame, true);

        for (const id of OLD_TILES) {
          const el = oldTileCache.current.get(id);
          if (!el) continue;
          const driftT = 1 + eased * 0.15;
          applyScatter(el, OLD_SCATTER[id], driftT, 0.55 * (1 - eased));
        }

        // New: fully scattered, fading in
        newFrame.style.display = "flex";
        newFrame.style.opacity = String(eased);
        setFrameOverflow(newFrame, "visible");
        setFrameBackground(newFrame, true);

        for (const id of NEW_TILES) {
          const el = newTileCache.current.get(id);
          if (!el) continue;
          const tileOpacity = eased * 0.55;
          applyScatter(el, NEW_SCATTER[id], 1, tileOpacity);
        }
      }

      // ── Phase 4: assemble ──
      else if (p <= PHASES.assemble.end) {
        const t = mapRange(
          p,
          PHASES.assemble.start,
          PHASES.assemble.end
        );

        // Gradually restore overflow and backgrounds in last 15% of assembly
        // CSS transitions ensure the background fades in smoothly
        if (t < 0.85) {
          if (sticky) sticky.style.overflow = "visible";
          setFrameOverflow(newFrame, "visible");
          setFrameBackground(newFrame, true);
        } else {
          if (sticky) sticky.style.overflow = "hidden";
          setFrameOverflow(newFrame, "hidden");
          setFrameBackground(newFrame, false);
        }

        oldFrame.style.display = "none";
        oldFrame.style.opacity = "0";

        newFrame.style.display = "flex";
        newFrame.style.opacity = "1";

        for (const id of NEW_TILES) {
          const el = newTileCache.current.get(id);
          if (!el) continue;

          const stagger = NEW_STAGGER[id] || 0;
          const reverseStagger = 0.35 - stagger;
          const tileT = Math.max(
            0,
            Math.min(1, (t - reverseStagger) / (1 - reverseStagger))
          );
          const tileTEased = easeOutBack(Math.min(tileT, 1));

          const scatter = 1 - Math.min(tileTEased, 1);
          const opacity = 0.55 + Math.min(tileTEased, 1) * 0.45;
          applyScatter(el, NEW_SCATTER[id], scatter, opacity);
        }
      }

      // ── Phase 5: holdNew (stays permanently) ──
      else {
        if (sticky) sticky.style.overflow = "hidden";
        oldFrame.style.display = "none";

        newFrame.style.display = "flex";
        newFrame.style.opacity = "1";
        setFrameOverflow(newFrame, "hidden");
        setFrameBackground(newFrame, false);

        for (const id of NEW_TILES) {
          const el = newTileCache.current.get(id);
          if (el) resetTile(el);
        }
      }

      // ── Phase label ──
      if (labelRef.current) {
        let currentLabel = "";
        for (const [threshold, text] of PHASE_LABELS) {
          if (p >= threshold) currentLabel = text;
        }

        if (prevLabel.current !== currentLabel) {
          prevLabel.current = currentLabel;
          const el = labelRef.current;
          el.style.opacity = "0";
          setTimeout(() => {
            el.textContent = currentLabel;
            el.style.opacity = currentLabel ? "1" : "0";
          }, 200);
        }
      }

      rafId.current = requestAnimationFrame(tick);
    }

    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [
    progress,
    stickyRef,
    cameraRef,
    oldFrameRef,
    newFrameRef,
    labelRef,
    glowRef,
    particlesRef,
  ]);

  return null;
}
