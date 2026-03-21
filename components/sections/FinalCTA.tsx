import ScrollReveal from "@/components/ui/ScrollReveal";
import ShimmerButton from "@/components/ui/ShimmerButton";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="section-padding bg-[#050706] relative overflow-hidden">
      {/* Background — more prominent than other sections */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#0F7A5A]/[0.06] rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-[#2F5D4E]/[0.04] rounded-full blur-[80px]" />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 line-grid pointer-events-none opacity-15"
      />

      <div className="container-custom relative z-10">
        <ScrollReveal blur={14} scaleFrom={0.97} duration={0.8}>
          <div className="max-w-3xl mx-auto">
            {/* Main CTA card */}
            <div className="rounded-3xl border border-[#1C2B26] bg-[#0F1F1A]/40 backdrop-blur-xl p-10 sm:p-14 text-center relative overflow-hidden">
              {/* Inner glow */}
              <div
                aria-hidden="true"
                className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-48 bg-gradient-to-b from-[#0F7A5A]/[0.04] to-transparent pointer-events-none"
              />

              {/* Top border glow */}
              <div
                aria-hidden="true"
                className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-[#D9E2DF]/25 to-transparent pointer-events-none"
              />

              <div className="relative z-10">
                <div className="section-label mx-auto mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1FBF8F] animate-pulse" />
                  Bereit für Ihren neuen Webauftritt?
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-[#F2F5F4] mb-5 leading-tight">
                  Ihr Unternehmen verdient
                  <br className="hidden sm:block" />
                  <span className="gradient-text"> einen besseren Auftritt.</span>
                </h2>

                <p className="text-[#9BAFA8] text-lg leading-relaxed mb-10 max-w-xl mx-auto">
                  Starten Sie mit einem kostenlosen Erstgespräch. Keine
                  Verpflichtungen, keine versteckten Kosten – nur ein ehrliches
                  Gespräch über Ihr Projekt.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <ShimmerButton href="/kontakt" size="lg">
                    Kostenloses Erstgespräch
                    <ArrowRight className="w-4 h-4" />
                  </ShimmerButton>

                  <Link
                    href="/leistungen"
                    className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl border border-[#1C2B26] bg-[#0F1F1A]/40 text-[#9BAFA8] hover:text-[#F2F5F4] hover:border-[#0F7A5A]/30 hover:bg-[#132822]/60 transition-all duration-300 text-sm font-semibold"
                  >
                    Leistungen ansehen
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Mini trust note */}
                <div className="mt-8 pt-8 border-t border-[#1A2622]">
                  <p className="text-xs text-[#6F8580]">
                    Für lokale Unternehmen in Kufstein, Tirol und Umgebung ·
                    Individuelle Umsetzung · Keine Standardlösungen
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
