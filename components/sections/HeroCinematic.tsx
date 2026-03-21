"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import ShimmerButton from "@/components/ui/ShimmerButton";
import { easeOutExpo } from "@/lib/motion";

/** Default: R2 (Cloudflare). Override with NEXT_PUBLIC_HERO_VIDEO_URL. Local fallbacks optional. */
const HERO_VIDEO_R2 =
  "https://pub-63f8284b4d2e4e3eb41bbfdaf0287946.r2.dev/aerial-view-of-austrian-mountain-range-in-vorarlbe-2025-12-17-23-40-55-utc.mp4";

const HERO_VIDEO_SOURCES = [
  process.env.NEXT_PUBLIC_HERO_VIDEO_URL,
  HERO_VIDEO_R2,
  "/Video/hero.mp4",
  "/videos/hero-alpine.mp4",
  "https://videos.pexels.com/video-files/10976054/10976054-hd_1920_1080_25fps.mp4",
  "https://videos.pexels.com/video-files/10976054/10976054-hd_1280_720_25fps.mp4",
].filter(Boolean) as string[];

export default function HeroCinematic() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [srcIndex, setSrcIndex] = useState(0);

  const showVideo =
    !reducedMotion && !videoFailed && HERO_VIDEO_SOURCES.length > 0;
  const currentSrc = HERO_VIDEO_SOURCES[srcIndex] ?? "";

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || reducedMotion || !showVideo) return;
    v.play().catch(() => {});
  }, [reducedMotion, currentSrc, showVideo]);

  const animate = (delay: number, y = 40) =>
    reducedMotion
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.78, delay, ease: easeOutExpo },
        };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#060a09]"
    >
      {/* Cinematic background: video or cold abstract fallback */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {showVideo ? (
          <motion.div
            className="absolute inset-0 h-[115%] w-full -top-[7%]"
            style={{ y: videoY, scale: videoScale }}
          >
            <video
              key={currentSrc}
              ref={videoRef}
              className="absolute left-1/2 top-1/2 h-full min-h-full w-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover object-center"
              style={{
                filter: "saturate(0.58) brightness(0.52) contrast(1.08)",
              }}
              src={currentSrc}
              muted
              loop
              playsInline
              autoPlay
              preload="metadata"
              onError={() => {
                if (srcIndex < HERO_VIDEO_SOURCES.length - 1) {
                  setSrcIndex((i) => i + 1);
                } else {
                  setVideoFailed(true);
                }
              }}
            />
          </motion.div>
        ) : null}

        {/* Abstract alpine fallback — no photo look, cold & minimal */}
        {!showVideo ? (
          <div
            className="absolute inset-0"
            aria-hidden="true"
            style={{
              background: `
                radial-gradient(ellipse 120% 80% at 50% 0%, #1a2822 0%, transparent 55%),
                radial-gradient(ellipse 90% 50% at 70% 100%, #0a1210 0%, transparent 50%),
                linear-gradient(180deg, #141f1c 0%, #0a100e 38%, #050706 100%)
              `,
            }}
          />
        ) : null}

        {/* Einheitlicher Grade: kühles Grün + Lesbarkeit, weniger Layer */}
        <div
          className="absolute inset-0 bg-[#1a2e24]/[0.14] mix-blend-soft-light"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#1f3d2b]/[0.08] via-transparent to-black/65"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/28 to-black/20"
          aria-hidden="true"
        />
      </div>

      <div
        className="absolute inset-0 z-[1] noise-overlay pointer-events-none opacity-[0.14]"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 container-custom flex w-full flex-col items-center px-4 pt-28 pb-20 text-center sm:px-6 lg:pt-36 lg:pb-28">
        <motion.div {...animate(0, 20)} className="mb-8">
          <div className="hero-glass-label">
            <span
              className="h-1 w-1 shrink-0 rounded-full bg-[#5a7d6a]"
              aria-hidden="true"
            />
            Design · Entwicklung · Betreuung
          </div>
        </motion.div>

        <div className="relative mb-6 w-full max-w-5xl">
          <motion.h1
            {...animate(0.08)}
            className="relative z-10 hero-display font-display font-bold px-2 hero-headline-alpine"
          >
            Digitale Auftritte, die{" "}
            <span className="hero-headline-alpine-accent">überzeugen.</span>
          </motion.h1>
        </div>

        <motion.p
          {...animate(0.22, 24)}
          className="mb-12 max-w-lg text-base md:text-lg leading-relaxed text-[#9ba8a3]"
        >
          Individuelles Design. Technisch sauber. Persönlich betreut.
        </motion.p>

        <motion.div {...animate(0.38, 20)}>
          <ShimmerButton href="/kontakt" size="lg" variant="quiet">
            Projekt starten
            <ArrowRight className="h-4 w-4 opacity-90" />
          </ShimmerButton>
        </motion.div>
      </div>

      {/* Transition to next section */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[4] h-28 bg-gradient-to-t from-[#050706] to-transparent"
        aria-hidden="true"
      />

      <motion.div
        initial={reducedMotion ? {} : { opacity: 0 }}
        animate={reducedMotion ? {} : { opacity: 1 }}
        transition={{ delay: 0.85 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
        aria-hidden="true"
      >
        <motion.div
          animate={reducedMotion ? {} : { y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1"
        >
          <div className="h-8 w-px bg-gradient-to-b from-[#5a7d6a]/25 to-transparent" />
          <div className="h-1 w-1 rounded-full bg-[#5a7d6a]/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
