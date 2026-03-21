"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronRight, CheckCircle2 } from "lucide-react";
import SparklesEffect from "@/components/ui/SparklesEffect";
import ShimmerButton from "@/components/ui/ShimmerButton";

function BrowserMockup() {
  return (
    <div className="relative">
      {/* Glow behind mockup */}
      <div className="absolute -inset-8 bg-[#0F7A5A]/[0.09] blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -inset-4 bg-[#2F5D4E]/[0.07] blur-2xl rounded-full pointer-events-none" />

      {/* Browser frame */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="relative rounded-2xl border border-[#1C2B26] bg-[#0F1F1A]/60 backdrop-blur-xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.7),0_0_0_1px_rgba(15,122,90,0.08)]"
      >
        {/* Browser toolbar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#1C2B26] bg-[#0F1F1A]/50">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
          </div>
          <div className="flex-1 h-6 rounded-md bg-[#132822] flex items-center px-3 gap-2">
            <div className="w-2 h-2 rounded-full bg-[#1FBF8F]/40" />
            <span className="text-[10px] text-[#4E7A6A]/70 font-mono">
              www.ihr-unternehmen.at
            </span>
          </div>
        </div>

        {/* Website preview content */}
        <div className="bg-[#060D0A]">
          {/* Navbar stripe */}
          <div className="flex items-center h-9 bg-[#0A1411] px-4 gap-4 border-b border-[#1C2B26]/60">
            <div className="w-16 h-2.5 rounded-sm bg-[#D9E2DF]/30" />
            <div className="flex-1" />
            {[60, 48, 56].map((w, i) => (
              <div
                key={i}
                className="h-2 rounded-sm bg-[#2F5D4E]/50"
                style={{ width: w }}
              />
            ))}
            <div className="w-20 h-6 rounded-md bg-[#0F7A5A]/50 flex items-center justify-center">
              <div className="w-10 h-1.5 rounded-sm bg-[#D9E2DF]/50" />
            </div>
          </div>

          {/* Hero area */}
          <div className="relative h-28 bg-gradient-to-br from-[#0F1F1A]/60 to-[#0A1411]/40 flex flex-col items-center justify-center gap-2 overflow-hidden px-6">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#060D0A]/60" />
            <div className="relative">
              <div className="w-44 h-3.5 rounded-sm bg-[#D9E2DF]/30 mx-auto mb-1.5" />
              <div className="w-32 h-2.5 rounded-sm bg-[#9BAFA8]/20 mx-auto mb-3" />
              <div className="flex gap-2 justify-center">
                <div className="w-20 h-[22px] rounded-md bg-[#0F7A5A]/60" />
                <div className="w-20 h-[22px] rounded-md bg-[#132822] border border-[#1C2B26]" />
              </div>
            </div>
          </div>

          {/* Cards row */}
          <div className="flex gap-2 p-3">
            {["#0F7A5A", "#2F5D4E", "#4E7A6A"].map((color, i) => (
              <div
                key={i}
                className="flex-1 h-[72px] rounded-xl bg-[#0F1F1A]/60 border border-[#1C2B26] p-2.5 flex flex-col gap-1.5"
              >
                <div
                  className="w-7 h-7 rounded-lg"
                  style={{ background: `${color}30` }}
                />
                <div className="w-full h-1.5 rounded-sm bg-[#D9E2DF]/15" />
                <div className="w-3/4 h-1.5 rounded-sm bg-[#9BAFA8]/10" />
              </div>
            ))}
          </div>

          {/* Text blocks */}
          <div className="px-3 pb-3 space-y-1.5">
            <div className="w-3/4 h-2 rounded-sm bg-[#D9E2DF]/15" />
            <div className="w-full h-2 rounded-sm bg-[#9BAFA8]/08" />
            <div className="w-5/6 h-2 rounded-sm bg-[#9BAFA8]/08" />
          </div>
        </div>
      </motion.div>

      {/* Floating badge — performance */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute -bottom-6 -right-6 rounded-xl border border-[#1C2B26] bg-[#0A1411]/95 backdrop-blur-xl px-4 py-3 shadow-lg"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#1FBF8F]/15 border border-[#0F7A5A]/30 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4 text-[#1FBF8F]" />
          </div>
          <div>
            <div className="text-[10px] text-[#6F8580] font-medium uppercase tracking-wider">
              Performance
            </div>
            <div className="text-base font-bold text-[#F2F5F4] font-display">
              100
              <span className="text-xs font-normal text-[#1FBF8F] ml-1">
                / 100
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating badge — design */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.5 }}
        className="absolute -top-4 -left-6 rounded-xl border border-[#1C2B26] bg-[#0A1411]/95 backdrop-blur-xl px-3 py-2.5 shadow-lg"
      >
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full bg-[#1FBF8F]" />
            <div className="w-3 h-3 rounded-full bg-[#4E7A6A]" />
            <div className="w-3 h-3 rounded-full bg-[#D9E2DF]/60" />
          </div>
          <span className="text-[11px] font-medium text-[#9BAFA8]">
            Individuelles Design
          </span>
        </div>
      </motion.div>
    </div>
  );
}

const trustPoints = [
  "Individuelle Gestaltung",
  "Transparente Zusammenarbeit",
  "Langfristige Betreuung",
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#050706]">
      {/* Background gradient orbs */}
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#0F7A5A]/[0.04] rounded-full blur-[130px]" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#0F7A5A]/[0.025] rounded-full blur-[110px]" />
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#0A1411]/80 rounded-full blur-[80px]" />
      </div>

      {/* Grid overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 line-grid pointer-events-none opacity-20"
      />

      {/* Sparkles */}
      <SparklesEffect className="absolute inset-0 z-[1]" />

      {/* Content */}
      <div className="relative z-10 container-custom w-full pt-28 pb-20 lg:pt-36 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT — text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="inline-flex items-center gap-2 mb-7"
            >
              <div className="section-label">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1FBF8F] animate-pulse" />
                Webdesign · Entwicklung · Betreuung
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="text-[2.75rem] sm:text-5xl lg:text-[3.6rem] xl:text-[4rem] font-display font-bold leading-[1.06] tracking-tight text-[#F2F5F4] mb-5"
            >
              Webauftritte,
              <br />
              die{" "}
              <span className="gradient-text">überzeugen.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.16 }}
              className="text-lg text-[#9BAFA8] leading-relaxed mb-9 max-w-[500px]"
            >
              LAVIK Media entwickelt hochwertige Websites für Unternehmen in
              Kufstein, Tirol und Umgebung – individuell gestaltet, technisch
              sauber, mit persönlicher Betreuung nach dem Launch.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.24 }}
              className="flex flex-col sm:flex-row gap-3.5 mb-10"
            >
              <ShimmerButton href="/kontakt" size="lg">
                Projekt anfragen
                <ArrowRight className="w-4 h-4" />
              </ShimmerButton>

              <Link
                href="/leistungen"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl border border-[#1C2B26] bg-[#0F1F1A]/50 text-[#9BAFA8] hover:text-[#F2F5F4] hover:border-[#0F7A5A]/30 hover:bg-[#132822]/60 transition-all duration-300 text-sm font-semibold"
              >
                Unsere Leistungen
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Trust points */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.55 }}
              className="flex flex-wrap gap-x-6 gap-y-2"
            >
              {trustPoints.map((point) => (
                <span
                  key={point}
                  className="flex items-center gap-1.5 text-sm text-[#6F8580]"
                >
                  <span className="w-1 h-1 rounded-full bg-[#1FBF8F]/60" />
                  {point}
                </span>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — browser mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="hidden lg:block"
          >
            <BrowserMockup />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1"
        >
          <div className="w-px h-8 bg-gradient-to-b from-[#1FBF8F]/20 to-transparent" />
          <div className="w-1 h-1 rounded-full bg-[#1FBF8F]/20" />
        </motion.div>
      </motion.div>
    </section>
  );
}
