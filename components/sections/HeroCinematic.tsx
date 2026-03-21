"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import SparklesEffect from "@/components/ui/SparklesEffect";
import ShimmerButton from "@/components/ui/ShimmerButton";

const HeroShader = dynamic(() => import("@/components/ui/HeroShader"), {
  ssr: false,
});

const ease = [0.21, 0.47, 0.32, 0.98] as const;

export default function HeroCinematic() {
  const reducedMotion = useReducedMotion();

  const animate = (delay: number, y = 40) =>
    reducedMotion
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease },
        };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#030504]">
      {/* WebGL shader background */}
      <HeroShader className="absolute inset-0 z-0" />

      {/* Noise texture */}
      <div
        className="absolute inset-0 z-[1] noise-overlay pointer-events-none"
        aria-hidden="true"
      />

      {/* Grid overlay — very subtle */}
      <div
        className="absolute inset-0 z-[2] line-grid pointer-events-none opacity-[0.03]"
        aria-hidden="true"
      />

      {/* Sparkles */}
      <SparklesEffect className="absolute inset-0 z-[3]" />

      {/* Content */}
      <div className="relative z-10 container-custom w-full pt-32 pb-24 lg:pt-40 lg:pb-32 flex flex-col items-center text-center">
        {/* Section label */}
        <motion.div {...animate(0, 20)} className="mb-8">
          <div className="section-label">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1FBF8F] animate-pulse" />
            Webdesign · Entwicklung · Betreuung
          </div>
        </motion.div>

        {/* Headline */}
        <div className="relative mb-6 max-w-5xl">
          <motion.h1
            {...animate(0.1)}
            className="relative hero-display font-display font-bold text-[#F2F5F4] z-10"
          >
            Webauftritte, die
            <br />
            <span className="gradient-text">überzeugen.</span>
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          {...animate(0.28, 24)}
          className="text-lg md:text-xl text-[#9BAFA8] leading-relaxed mb-12 max-w-xl"
        >
          Hochwertige Websites für Unternehmen in Tirol – individuell gestaltet,
          technisch sauber, mit persönlicher Betreuung.
        </motion.p>

        {/* CTA */}
        <motion.div {...animate(0.45, 20)}>
          <ShimmerButton href="/kontakt" size="lg">
            Projekt anfragen
            <ArrowRight className="w-4 h-4" />
          </ShimmerButton>
        </motion.div>
      </div>

      {/* Bottom edge gradient — smooth transition to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050706] to-transparent z-[4] pointer-events-none"
        aria-hidden="true"
      />

      {/* Scroll indicator */}
      <motion.div
        initial={reducedMotion ? {} : { opacity: 0 }}
        animate={reducedMotion ? {} : { opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        aria-hidden="true"
      >
        <motion.div
          animate={reducedMotion ? {} : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1"
        >
          <div className="w-px h-8 bg-gradient-to-b from-[#1FBF8F]/30 to-transparent" />
          <div className="w-1 h-1 rounded-full bg-[#1FBF8F]/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
