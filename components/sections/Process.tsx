import ScrollReveal from "@/components/ui/ScrollReveal";
import { MessageCircle, Layers, Code2, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Kennenlernen",
    desc: "Kurzes Erstgespräch, ganz ohne Verbindlichkeit: Wir lernen Ihr Unternehmen kennen, verstehen Ihre Ziele und klären den Rahmen des Projekts.",
    duration: "30 Min.",
  },
  {
    number: "02",
    icon: Layers,
    title: "Strategie & Konzept",
    desc: "Auf Basis Ihrer Ziele entwickeln wir ein klares Konzept – Seitenstruktur, inhaltliche Schwerpunkte, visuellen Ansatz und technische Anforderungen.",
    duration: "1–2 Wochen",
  },
  {
    number: "03",
    icon: Code2,
    title: "Design & Entwicklung",
    desc: "Professionelles Design, saubere Entwicklung und konsequente Qualitätssicherung. Sie erhalten regelmäßige Updates und können jederzeit Feedback geben.",
    duration: "2–5 Wochen",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Launch & Betreuung",
    desc: "Ihre Website geht live. Wir sorgen für einen reibungslosen Start und stehen Ihnen langfristig als verlässlicher Partner für Wartung und Weiterentwicklung zur Seite.",
    duration: "Laufend",
  },
];

export default function Process() {
  return (
    <section className="section-padding bg-[#050706] relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#0F7A5A]/[0.05] rounded-full blur-[120px] pointer-events-none"
      />

      <div className="container-custom relative z-10">
        <ScrollReveal blur={8} scaleFrom={0.99}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="section-label mx-auto mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1FBF8F]" />
              Ablauf
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-display font-bold tracking-tight text-[#F2F5F4] mb-4 leading-tight">
              So arbeiten wir zusammen
            </h2>
            <p className="text-[#9BAFA8] text-lg leading-relaxed">
              Strukturiert, transparent und effizient – vom ersten Gespräch bis
              zum fertigen Webauftritt.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-4 relative">
          {/* Connecting line on desktop */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#7A8F89]/20 to-transparent"
          />

          {steps.map((step, i) => (
            <ScrollReveal
              key={step.number}
              delay={i * 0.1}
              direction="up"
              blur={8}
              scaleFrom={0.97}
            >
              <div className="relative flex flex-col h-full">
                <div className="flex flex-col h-full p-6 rounded-2xl border border-[#1C2B26] bg-[#0F1F1A]/40 hover:bg-[#132822]/60 hover:border-[#0F7A5A]/25 transition-all duration-300 group">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="relative">
                      <div className="w-11 h-11 rounded-xl bg-[#0F7A5A]/[0.08] border border-[#0F7A5A]/15 flex items-center justify-center group-hover:bg-[#0F7A5A]/[0.14] transition-colors duration-300">
                        <step.icon className="w-5 h-5 text-[#1FBF8F]" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#050706] border border-[#1C2B26] flex items-center justify-center">
                        <span className="text-[9px] font-mono text-[#7A8F89]">
                          {step.number}
                        </span>
                      </div>
                    </div>
                    <div className="text-[10px] font-medium text-[#6F8580] uppercase tracking-widest border border-[#1C2B26] rounded-full px-2.5 py-1">
                      {step.duration}
                    </div>
                  </div>

                  <h3 className="text-base font-display font-semibold text-[#F2F5F4] mb-2.5">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#9BAFA8] leading-relaxed flex-1">
                    {step.desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.4} blur={6} scaleFrom={0.99}>
          <div className="mt-12 text-center">
            <p className="text-sm text-[#6F8580]">
              Bereit für Ihren neuen Webauftritt?{" "}
              <a
                href="/kontakt"
                className="text-[#1FBF8F] hover:text-[#2FD4A4] transition-colors font-medium"
              >
                Jetzt kostenloses Erstgespräch vereinbaren →
              </a>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
