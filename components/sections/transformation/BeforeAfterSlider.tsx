"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { animate, useInView } from "framer-motion";

interface BeforeAfterSliderProps {
  /** Alte Version (links beim Aufdecken) */
  beforeSrc: string;
  /** Neue Version (Basis-Layer) */
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  /** Alt-Text fürs Bild */
  alt: string;
  className?: string;
}

/**
 * Interaktiver Vorher/Nachher-Vergleich.
 * - Ziehen (Maus/Touch) oder Pfeiltasten zum Aufdecken
 * - Automatischer "Sweep", sobald der Slider ins Bild scrollt
 *
 * Aufbau: Das "neu"-Bild ist die volle Basis, das "alt"-Bild wird per
 * clip-path auf die linke Seite (0 … pos%) beschnitten. Schiebt man den
 * Trenner nach links, kommt das neue Design zum Vorschein.
 */
export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = "Vorher",
  afterLabel = "Nachher",
  alt,
  className = "",
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(60);
  const draggingRef = useRef(false);
  const animatedRef = useRef(false);
  const inView = useInView(containerRef, { amount: 0.4, once: true });

  // Automatischer Sweep beim ersten Sichtbarwerden
  useEffect(() => {
    if (!inView || animatedRef.current) return;
    animatedRef.current = true;
    const controls = animate(88, 50, {
      duration: 1.7,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.25,
      onUpdate: (v) => setPos(v),
    });
    return () => controls.stop();
  }, [inView]);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }, []);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    animatedRef.current = true; // Auto-Sweep nicht mehr stören
    updateFromClientX(e.clientX);
  };

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      updateFromClientX(e.clientX);
    };
    const onUp = () => {
      draggingRef.current = false;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [updateFromClientX]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setPos((p) => Math.max(0, p - 4));
      e.preventDefault();
    } else if (e.key === "ArrowRight") {
      setPos((p) => Math.min(100, p + 4));
      e.preventDefault();
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      className={`group relative aspect-video w-full cursor-ew-resize select-none overflow-hidden bg-[#060D0A] ${className}`}
    >
      {/* NEU (Basis) */}
      <img
        src={afterSrc}
        alt={`${alt} – ${afterLabel}`}
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-top"
      />

      {/* ALT (beschnitten auf linke Seite) */}
      <img
        src={beforeSrc}
        alt={`${alt} – ${beforeLabel}`}
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-top"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />

      {/* Labels */}
      <span
        className="pointer-events-none absolute left-3 top-3 rounded-full border border-white/10 bg-black/55 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/85 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: pos > 12 ? 1 : 0 }}
      >
        {beforeLabel}
      </span>
      <span
        className="pointer-events-none absolute right-3 top-3 rounded-full border border-[#1FBF8F]/30 bg-[#0A1411]/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#1FBF8F] backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: pos < 88 ? 1 : 0 }}
      >
        {afterLabel}
      </span>

      {/* Trenner + Griff */}
      <div
        role="slider"
        tabIndex={0}
        aria-label={`${alt}: Vorher-Nachher-Vergleich`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        onKeyDown={onKeyDown}
        className="absolute top-0 bottom-0 z-10 -ml-px w-0.5 bg-white/80 shadow-[0_0_12px_rgba(0,0,0,0.5)] outline-none"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/95 text-[#0A1411] shadow-lg transition-transform duration-200 group-hover:scale-110">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 7l-5 5 5 5" />
            <path d="M15 7l5 5-5 5" />
          </svg>
        </div>
      </div>
    </div>
  );
}
