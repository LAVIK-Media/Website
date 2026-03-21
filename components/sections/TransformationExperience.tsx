"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useAutoAnimation } from "./transformation/useAutoAnimation";
import BrowserFrame from "./transformation/BrowserFrame";
import OldWebsiteMockup from "./transformation/OldWebsiteMockup";
import NewWebsiteMockup from "./transformation/NewWebsiteMockup";
import TransformationOrchestrator from "./transformation/TransformationOrchestrator";
import { PARTICLES } from "./transformation/transformationConfig";

/**
 * Transformation — einmal pro Session: einrasten → ein Scroll startet die Auto-Animation.
 * Danach nur Endzustand; Reload der Seite setzt wieder eine Wiedergabe frei.
 */
export default function TransformationExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const oldFrameRef = useRef<HTMLDivElement>(null);
  const newFrameRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  const { progress } = useAutoAnimation(containerRef);

  return (
    <>
    <section
      ref={containerRef}
      className="relative bg-[#050706]"
      style={{ height: "105vh" }}
    >
      {/* CSS transitions for smooth background fading during scatter/assemble */}
      <style>{`
        [data-frame-chrome] ~ div,
        [data-frame-chrome] ~ div > div:first-child,
        [data-layout] {
          transition: background 0.35s ease, background-color 0.35s ease;
        }
        [data-bg-hidden] > div:last-child,
        [data-bg-hidden] > div:last-child > *,
        [data-bg-hidden] [data-layout] {
          background: transparent !important;
          background-color: transparent !important;
        }
      `}</style>

      <div
        ref={stickyRef}
        className="sticky top-0 flex h-[100vh] w-full items-center justify-center overflow-hidden"
        style={{ zIndex: 1 }}
      >
        {/* Background ambient glow */}
        <div
          ref={glowRef}
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: 0, transition: "none" }}
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: 900,
              height: 700,
              background: "radial-gradient(ellipse, #0F7A5A 0%, #1FBF8F 30%, transparent 70%)",
              filter: "blur(160px)",
              borderRadius: "50%",
            }}
          />
        </div>

        {/* Floating particles */}
        <div
          ref={particlesRef}
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 15 }}
        >
          {PARTICLES.map((seed, i) => (
            <div
              key={i}
              data-particle={i}
              className="absolute"
              style={{
                left: "50%",
                top: "50%",
                width: seed.size,
                height: seed.size,
                borderRadius: seed.size > 5 ? "2px" : "50%",
                background: seed.color,
                boxShadow: `0 0 ${seed.size * 2}px ${seed.color}`,
                opacity: 0,
                willChange: "transform, opacity",
              }}
            />
          ))}
        </div>

        {/* Phase label */}
        <div
          ref={labelRef}
          className="absolute top-8 left-0 right-0 z-20 text-center pointer-events-none text-sm font-medium text-[#6F8580] tracking-wide"
          style={{ transition: "opacity 0.3s ease", opacity: 0 }}
        />

        {/* Camera wrapper */}
        <div
          ref={cameraRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{
            perspective: "1500px",
            perspectiveOrigin: "50% 50%",
            transformStyle: "preserve-3d",
          }}
        >
          <BrowserFrame
            ref={oldFrameRef}
            url="http://www.konditorei-inntal.at"
            variant="old"
          >
            <OldWebsiteMockup />
          </BrowserFrame>

          <BrowserFrame
            ref={newFrameRef}
            url="www.konditorei-inntal.at"
            variant="new"
            style={{ display: "none", opacity: 0, position: "absolute" }}
          >
            <NewWebsiteMockup />
          </BrowserFrame>
        </div>

        <TransformationOrchestrator
          progress={progress}
          stickyRef={stickyRef}
          cameraRef={cameraRef}
          oldFrameRef={oldFrameRef}
          newFrameRef={newFrameRef}
          labelRef={labelRef}
          glowRef={glowRef}
          particlesRef={particlesRef}
        />
      </div>
    </section>

    {/* CTA banner */}
    <div className="relative flex flex-col items-center gap-6 py-16 bg-[#050706]">
      <p className="text-lg md:text-xl text-[#8FA89E] text-center max-w-lg px-6 leading-relaxed">
        Ihr Webauftritt verdient mehr — wir verwandeln veraltete Websites in
        moderne, überzeugende Erlebnisse.
      </p>
      <a
        href="/leistungen"
        className="group inline-flex items-center gap-3 rounded-2xl px-10 py-5 text-base font-bold text-white transition-all duration-300 hover:scale-105 hover:brightness-110"
        style={{
          background: "linear-gradient(135deg, #0F7A5A 0%, #1FBF8F 100%)",
          boxShadow: "0 0 60px rgba(15,122,90,0.4), 0 8px 32px rgba(15,122,90,0.3)",
        }}
      >
        Alle Leistungen ansehen
        <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
      </a>
    </div>
    </>
  );
}
