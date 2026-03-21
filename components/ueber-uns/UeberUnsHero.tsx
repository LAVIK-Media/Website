"use client";

import { motion, useReducedMotion } from "framer-motion";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

export default function UeberUnsHero() {
  const reduced = useReducedMotion();

  const item = (delay: number, y = 22) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.72, delay, ease },
        };

  return (
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_50%_at_50%_-10%,rgba(15,122,90,0.14),transparent_60%)]"
        aria-hidden
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-1/4 top-1/4 h-64 w-64 rounded-full bg-[#0F7A5A]/[0.07] blur-3xl"
        animate={
          reduced
            ? {}
            : {
                scale: [1, 1.08, 1],
                opacity: [0.5, 0.75, 0.5],
              }
        }
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-custom relative z-10">
        <div className="mx-auto max-w-4xl">
          <motion.div {...item(0, 16)} className="section-label mb-6 w-fit">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-[#1FBF8F]"
              animate={
                reduced
                  ? {}
                  : {
                      scale: [1, 1.15, 1],
                      opacity: [0.85, 1, 0.85],
                    }
              }
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            />
            Über uns
          </motion.div>

          <motion.h1
            {...item(0.08, 28)}
            className="font-display text-[clamp(2rem,5.5vw,3.5rem)] font-bold leading-[1.08] tracking-tight text-[#F2F5F4] md:text-[clamp(2.25rem,5vw,3.75rem)]"
          >
            Klein. Fokussiert.{" "}
            <span className="gradient-text gradient-text-animated">
              Mit Anspruch.
            </span>
          </motion.h1>

          <motion.p
            {...item(0.2, 20)}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-[#9BAFA8] md:text-xl"
          >
            Wir bauen Webauftritte, die{" "}
            <span className="text-[#C8D9D3]">halten</span> – technisch, optisch
            und im Umgang. Persönlich statt Agentur-Blabla.
          </motion.p>
        </div>
      </div>

      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={reduced ? {} : { opacity: 1 }}
        transition={{ delay: 0.95, duration: 0.6 }}
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 md:bottom-8"
        aria-hidden
      >
        <motion.div
          animate={reduced ? {} : { y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1"
        >
          <div className="h-9 w-px bg-gradient-to-b from-[#1FBF8F]/30 to-transparent" />
          <div className="h-1 w-1 rounded-full bg-[#1FBF8F]/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
