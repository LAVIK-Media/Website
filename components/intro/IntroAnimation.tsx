"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { INTRO_CONFIG } from "./introConfig";
import { useFrameSequence } from "./useFrameSequence";
import { useCanvasRenderer } from "./useCanvasRenderer";
import { useIntroState } from "./useIntroState";
import { INTRO_COMPLETE_EVENT } from "@/lib/cookie-consent";

gsap.registerPlugin(ScrollTrigger);

function isMobile() {
  return typeof window !== "undefined" && window.innerWidth < 768;
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function hasPlayedThisSession() {
  try {
    return sessionStorage.getItem("intro-played") === "true";
  } catch {
    return false;
  }
}

function markPlayedThisSession() {
  try {
    sessionStorage.setItem("intro-played", "true");
  } catch {
    // noop
  }
}

export default function IntroAnimation({
  children,
}: {
  children: React.ReactNode;
}) {
  const [skipIntro, setSkipIntro] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isMobile() || prefersReducedMotion() || hasPlayedThisSession()) {
      setSkipIntro(true);
    }
  }, []);

  if (!mounted) {
    return <div style={{ opacity: 0 }}>{children}</div>;
  }

  if (skipIntro) {
    return <>{children}</>;
  }

  return <IntroAnimationInner>{children}</IntroAnimationInner>;
}

/** Smoothly interpolated progress for text animations */
function useSmoothedProgress(
  rawProgress: React.MutableRefObject<number>,
  active: boolean,
  smoothing = 0.08
) {
  const smoothed = useRef(0);
  const rafId = useRef(0);
  const [, forceRender] = useState(0);

  useEffect(() => {
    if (!active) return;

    let lastRender = 0;
    function tick() {
      smoothed.current += (rawProgress.current - smoothed.current) * smoothing;
      // Throttle React re-renders to ~30fps for text transform updates
      const now = performance.now();
      if (now - lastRender > 33) {
        forceRender((n) => n + 1);
        lastRender = now;
      }
      rafId.current = requestAnimationFrame(tick);
    }

    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [active, rawProgress, smoothing]);

  return smoothed;
}

function IntroAnimationInner({ children }: { children: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollSpacerRef = useRef<HTMLDivElement>(null);

  const { phase, phaseRef, setPhase } = useIntroState();
  const [fadingOut, setFadingOut] = useState(false);
  const [transitionFade, setTransitionFade] = useState(1); // 1=opaque, 0=transparent

  // Scroll progress for intro scrub (0-1)
  const introProgress = useRef(0);
  // Progress for transition auto-play (0-1)
  const transitionProgress = useRef(0);

  // Smoothed progress for text animations
  const smoothedIntro = useSmoothedProgress(
    introProgress,
    phase === "intro-scrub",
    0.06
  );

  // Load intro frames immediately
  const intro = useFrameSequence({
    basePath: INTRO_CONFIG.intro.basePath,
    frameCount: INTRO_CONFIG.intro.frameCount,
    extension: INTRO_CONFIG.intro.extension,
    preloadCount: INTRO_CONFIG.intro.preloadCount,
  });

  // Load scroll-transition frames (start after intro is ready)
  const scroll = useFrameSequence({
    basePath: INTRO_CONFIG.scroll.basePath,
    frameCount: INTRO_CONFIG.scroll.frameCount,
    extension: INTRO_CONFIG.scroll.extension,
    preloadCount: INTRO_CONFIG.scroll.preloadCount,
    defer: !intro.ready,
  });

  // Transition from loading → intro-scrub when frames ready
  useEffect(() => {
    if (intro.ready && phaseRef.current === "loading") {
      setPhase("intro-scrub");
    }
  }, [intro.ready, phaseRef, setPhase]);

  // Determine which frames to render and how
  const activeFrames =
    phase === "transition" ? scroll.frames : intro.frames;
  const activeScrubProgress =
    phase === "transition" ? transitionProgress : introProgress;

  // Canvas renderer — always in scrub mode (both phases are progress-driven)
  useCanvasRenderer({
    canvasRef,
    frames: activeFrames,
    fps: INTRO_CONFIG.intro.fps,
    mode: phase === "loading" || phase === "done" ? "paused" : "scrub",
    scrubProgress: activeScrubProgress,
  });

  // Setup ScrollTrigger for intro scrub
  useEffect(() => {
    if (phase !== "intro-scrub") return;

    const spacer = scrollSpacerRef.current;
    if (!spacer) return;

    const timer = setTimeout(() => {
      window.scrollTo(0, 0);

      const trigger = ScrollTrigger.create({
        trigger: spacer,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5, // Higher = smoother on trackpad
        onUpdate: (self) => {
          introProgress.current = self.progress;
        },
        onLeave: () => {
          startTransition();
        },
      });

      return () => trigger.kill();
    }, 50);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // Auto-play transition animation
  const startTransition = useCallback(() => {
    if (phaseRef.current !== "intro-scrub") return;

    // Lock scroll during auto-play transition
    document.body.style.overflow = "hidden";
    setPhase("transition");
    transitionProgress.current = 0;

    const duration = INTRO_CONFIG.transitionDuration;
    const start = performance.now();

    function animate(now: number) {
      const elapsed = now - start;
      const raw = Math.min(elapsed / duration, 1);
      // Ease-in-out for smooth acceleration and deceleration
      transitionProgress.current =
        raw < 0.5
          ? 4 * raw * raw * raw
          : 1 - Math.pow(-2 * raw + 2, 3) / 2;

      // Fade out overlay during last 30% of transition
      if (raw > 0.7) {
        const fadeProgress = (raw - 0.7) / 0.3; // 0→1
        setTransitionFade(1 - fadeProgress);
      }

      if (raw < 1) {
        requestAnimationFrame(animate);
      } else {
        transitionProgress.current = 1;
        markPlayedThisSession();
        document.body.style.overflow = "";
        window.scrollTo(0, 0);
        // Already faded out during animation, just finalize
        setTransitionFade(0);
        setTimeout(() => {
          window.scrollTo(0, 0);
          setPhase("done");
        }, 50);
      }
    }

    requestAnimationFrame(animate);
  }, [phaseRef, setPhase]);

  // When done, scroll to top after spacer is removed from DOM
  useEffect(() => {
    if (phase === "done") {
      window.dispatchEvent(new CustomEvent(INTRO_COMPLETE_EVENT));
      window.scrollTo(0, 0);
      requestAnimationFrame(() => window.scrollTo(0, 0));
      setTimeout(() => window.scrollTo(0, 0), 50);
    }
  }, [phase]);

  const showOverlay = phase !== "done";
  const showSpacer = phase === "intro-scrub";

  // Text animation values (driven by smoothed scroll progress)
  const p = smoothedIntro.current;
  // Clamp text zoom to first 80% of scroll
  const tp = Math.min(p / 0.8, 1);
  // Scale: subtle growth 1→1.25 (no text wrapping)
  const textScale = 1 + tp * 0.25;
  // Opacity: fully visible 0-85%, fades out 85-97% (disappears just before transition)
  const textOpacity = p < 0.85 ? 1 : Math.max(0, 1 - (p - 0.85) / 0.12);
  // Slight Y drift upward as we zoom
  const textY = -tp * 20;
  // Letter spacing increases subtly with zoom
  const textLetterSpacing = 0.15 + tp * 0.15;

  return (
    <>
      {/* Canvas overlay */}
      {showOverlay && (
        <div
          className="fixed inset-0 z-[100]"
          style={{
            background: "#050706",
            opacity: phase === "transition" ? transitionFade : fadingOut ? 0 : 1,
            transition: phase === "transition" ? "none" : `opacity ${INTRO_CONFIG.fadeOutDuration}ms ease-out`,
          }}
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ willChange: "transform" }}
          />

          {/* Loading indicator */}
          {phase === "loading" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-2 border-[#1FBF8F]/30 border-t-[#1FBF8F] rounded-full animate-spin" />
                <p className="text-sm text-[#6F8580] font-medium">
                  {Math.round(intro.progress * 100)}%
                </p>
              </div>
            </div>
          )}

          {/* Centered text overlay — visible during intro scrub */}
          {phase === "intro-scrub" && textOpacity > 0 && (
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{
                opacity: textOpacity,
                transform: `translateY(${textY}px) scale(${textScale})`,
                willChange: "transform, opacity",
              }}
            >
              <div className="text-center">
                <p
                  className="text-[13px] font-medium uppercase text-white/50 mb-3 font-body"
                  style={{
                    letterSpacing: `${textLetterSpacing + 0.1}em`,
                  }}
                >
                  Willkommen bei
                </p>
                <h2
                  className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white whitespace-nowrap"
                  style={{
                    letterSpacing: `${textLetterSpacing}em`,
                    textShadow:
                      "0 2px 40px rgba(0,0,0,0.6), 0 0px 80px rgba(0,0,0,0.4)",
                  }}
                >
                  LAVIK
                  <span className="gradient-text"> Media</span>
                </h2>
                <p
                  className="text-sm md:text-base text-white/40 mt-4 whitespace-nowrap"
                  style={{
                    letterSpacing: `${textLetterSpacing * 0.5}em`,
                    textShadow: "0 2px 20px rgba(0,0,0,0.5)",
                  }}
                >
                  Hochwertige Websites für Unternehmen in Kufstein & Tirol
                </p>
              </div>
            </div>
          )}

          {/* Scroll hint */}
          {phase === "intro-scrub" && p < 0.1 && (
            <div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
              style={{
                opacity: Math.max(0, 1 - p * 10),
                transition: "opacity 0.3s ease-out",
              }}
            >
              <div className="flex flex-col items-center gap-1">
                <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent animate-[float_2s_ease-in-out_infinite]" />
                <div className="w-1 h-1 rounded-full bg-white/30" />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Scroll spacer for intro scrub */}
      {showSpacer && (
        <div
          ref={scrollSpacerRef}
          style={{ height: `${INTRO_CONFIG.introScrollHeight}vh` }}
        />
      )}

      {/* Page content */}
      <div
        style={{
          opacity: phase === "done" ? 1 : 0,
          transition: "opacity 0.3s ease-out",
          pointerEvents: phase === "done" ? "auto" : "none",
        }}
      >
        {children}
      </div>
    </>
  );
}
