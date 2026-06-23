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

/**
 * Media-Quellen für das Hero.
 *
 * Erwartet im R2-Bucket (Root):
 *   - hero.mp4         (H.264, ~5 MB, 1080p, ohne Audio, faststart)
 *   - hero-poster.jpg  (~300 KB, Erstbild ohne Wartezeit)
 *
 * Production-Empfehlung: NEXT_PUBLIC_MEDIA_BASE_URL auf die Custom Domain
 * setzen (z. B. https://cdn.lavik-media.com) — bringt vollen CDN-Edge-Cache
 * und kein Rate-Limit. Ohne Env-Var wird die r2.dev-Subdomain als Fallback
 * verwendet (funktioniert, aber rate-limited).
 */
const MEDIA_BASE = (process.env.NEXT_PUBLIC_MEDIA_BASE_URL ?? "").replace(
  /\/+$/,
  ""
);

const FALLBACK_R2_BASE =
  "https://pub-63f8284b4d2e4e3eb41bbfdaf0287946.r2.dev";

const BASE = MEDIA_BASE || FALLBACK_R2_BASE;

const HERO_VIDEO_MP4 = `${BASE}/hero.mp4`;
const HERO_POSTER = `${BASE}/hero-poster.jpg`;

export default function HeroCinematic() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  /**
   * Touch / schmales Viewport: kein Video laden, kein Parallax.
   * Auf Mobile reicht das Poster komplett — spart > 10 MB Bandbreite.
   */
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const update = () => {
      const coarse =
        typeof window !== "undefined" &&
        window.matchMedia("(pointer: coarse)").matches;
      const narrow = window.innerWidth < 1024;
      const saveData =
        typeof navigator !== "undefined" &&
        "connection" in navigator &&
        // @ts-expect-error - NetworkInformation API ist nicht überall typisiert
        (navigator.connection?.saveData === true ||
          // @ts-expect-error
          navigator.connection?.effectiveType === "2g" ||
          // @ts-expect-error
          navigator.connection?.effectiveType === "slow-2g");
      setIsMobile(coarse || narrow || saveData);
    };
    update();
    window.addEventListener("resize", update);
    const mq =
      typeof window !== "undefined"
        ? window.matchMedia("(pointer: coarse)")
        : null;
    mq?.addEventListener("change", update);
    return () => {
      window.removeEventListener("resize", update);
      mq?.removeEventListener("change", update);
    };
  }, []);

  /** Video nur auf Desktop, ohne Reduced-Motion-Präferenz und solange kein Fehler */
  const showVideo = !reducedMotion && !videoFailed && !isMobile;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !showVideo) return;
    v.play().catch(() => {});
  }, [showVideo]);

  const animate = (delay: number, y = 40) =>
    reducedMotion
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.78, delay, ease: easeOutExpo },
        };

  const mediaFilter = isMobile
    ? "saturate(0.55) brightness(0.54) contrast(1.05)"
    : "saturate(0.58) brightness(0.52) contrast(1.08)";

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#060a09]"
    >
      {/* Cinematic background: poster + optional video, oder Fallback */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/*
         * Poster IMMER sofort anzeigen. Vorteil: Null Wartezeit, das Bild ist
         * da, sobald HTML geparsed ist. Wenn das Video lädt, deckt es das
         * Poster ab — pixelperfekt selber Ausschnitt.
         */}
        <div
          className="absolute inset-0 h-full w-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${HERO_POSTER})`,
            filter: mediaFilter,
          }}
          aria-hidden="true"
        />

        {showVideo ? (
          <motion.div
            className="absolute inset-0 h-[115%] w-full -top-[7%]"
            style={reducedMotion ? undefined : { y: videoY, scale: videoScale }}
          >
            <video
              ref={videoRef}
              className="absolute left-1/2 top-1/2 h-full min-h-full w-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover object-center"
              style={{ filter: mediaFilter }}
              poster={HERO_POSTER}
              muted
              loop
              playsInline
              autoPlay
              preload="metadata"
              disablePictureInPicture
              onError={() => setVideoFailed(true)}
            >
              <source src={HERO_VIDEO_MP4} type="video/mp4" />
            </video>
          </motion.div>
        ) : null}

        {/* Falls Poster UND Video fehlen (Reduced-Motion + R2 down): kühler Verlauf */}
        {reducedMotion ? (
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

        {/* Einheitlicher Grade: kühles Grün + Lesbarkeit */}
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
