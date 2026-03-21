import type { Metadata } from "next";
import ScrollReveal from "@/components/ui/ScrollReveal";
import GlassCard from "@/components/ui/GlassCard";
import ShimmerButton from "@/components/ui/ShimmerButton";
import { MapPin, Target, Heart, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "LAVIK Media – wer wir sind, was uns antreibt und warum wir lokale Unternehmen in Tirol mit hochwertigen Webauftritten unterstützen.",
};

const values = [
  {
    icon: Target,
    title: "Präzision",
    desc: "Wir arbeiten mit Sorgfalt. Jedes Detail zählt – vom ersten Konzept bis zur finalen Zeile Code.",
  },
  {
    icon: Heart,
    title: "Vertrauen",
    desc: "Ehrliche Kommunikation, transparente Prozesse und verlässliche Ergebnisse – keine Überraschungen.",
  },
  {
    icon: MapPin,
    title: "Lokalität",
    desc: "Wir kennen den regionalen Markt und verstehen, was lokale Unternehmen wirklich brauchen.",
  },
];

const facts = [
  "Gegründet in Tirol",
  "Fokus auf lokale KMUs",
  "Next.js & modernem Stack",
  "Persönliche Betreuung",
  "Langfristige Partnerschaften",
  "Transparent und direkt",
];

export default function UeberUnsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-16 bg-[#050706] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-[#0F7A5A]/[0.07] via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 line-grid pointer-events-none opacity-20" />
        <div className="container-custom relative z-10">
          <ScrollReveal>
            <div className="max-w-3xl">
              <div className="section-label mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1FBF8F]" />
                Über uns
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-display font-bold tracking-tight text-[#F2F5F4] mb-5 leading-tight">
                Wir sind{" "}
                <span className="gradient-text">LAVIK Media</span>
              </h1>
              <p className="text-xl text-[#9BAFA8] leading-relaxed max-w-2xl">
                Ein fokussiertes Studio aus Tirol – für Unternehmen, die online
                so auftreten wollen, wie sie es verdienen.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Story */}
      <section className="pb-16 bg-[#050706]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <ScrollReveal direction="left">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#F2F5F4] mb-5 leading-tight">
                Warum LAVIK Media entstanden ist
              </h2>
              <div className="space-y-4 text-[#9BAFA8] text-base leading-relaxed">
                <p>
                  Viele lokale Unternehmen in Tirol leisten hervorragende Arbeit
                  in ihrer Branche – werden aber online nicht so wahrgenommen,
                  wie sie es verdienen. Veraltete Websites, schlechte
                  Darstellung auf Smartphones oder einfach eine digitale
                  Präsenz, die keinen Eindruck hinterlässt.
                </p>
                <p>
                  LAVIK Media wurde gegründet, um das zu ändern. Wir entwickeln
                  Webauftritte, die das Niveau und die Qualität eines
                  Unternehmens auch online sichtbar machen – mit modernem
                  Design, sauberer Technik und der persönlichen Betreuung, die
                  man von einem lokalen Partner erwarten kann.
                </p>
                <p>
                  Unser Ansatz ist einfach: Hochwertige Arbeit, klare
                  Kommunikation und eine Zusammenarbeit, die über den Launch
                  hinausgeht.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.1}>
              <GlassCard className="p-8">
                <h3 className="text-base font-display font-semibold text-[#F2F5F4] mb-5">
                  Was uns ausmacht
                </h3>
                <div className="space-y-3">
                  {facts.map((fact) => (
                    <div
                      key={fact}
                      className="flex items-center gap-3 text-sm text-[#9BAFA8]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#1FBF8F] flex-shrink-0" />
                      {fact}
                    </div>
                  ))}
                </div>
              </GlassCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-[#0A1411] border-y border-[#1C2B26]">
        <div className="container-custom">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#F2F5F4] text-center mb-10">
              Unsere Werte
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 0.1}>
                <GlassCard hover className="p-7 text-center h-full">
                  <div className="w-12 h-12 rounded-xl bg-[#0F7A5A]/[0.08] border border-[#0F7A5A]/15 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-5 h-5 text-[#1FBF8F]" />
                  </div>
                  <h3 className="text-base font-display font-semibold text-[#F2F5F4] mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-[#9BAFA8] leading-relaxed">
                    {value.desc}
                  </p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#050706]">
        <div className="container-custom text-center">
          <ScrollReveal>
            <h2 className="text-2xl font-display font-bold text-[#F2F5F4] mb-4">
              Lassen Sie uns kennenlernen
            </h2>
            <p className="text-[#9BAFA8] mb-8 max-w-md mx-auto">
              Ein kurzes Gespräch reicht oft, um zu sehen, ob wir zusammenpassen.
            </p>
            <ShimmerButton href="/kontakt" size="lg">
              Erstkontakt aufnehmen
              <ArrowRight className="w-4 h-4" />
            </ShimmerButton>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
