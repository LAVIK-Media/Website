import ScrollReveal from "@/components/ui/ScrollReveal";
import GlassCard from "@/components/ui/GlassCard";
import { Sparkles, Link2, HeartHandshake, BarChart3 } from "lucide-react";

const differentiators = [
  {
    number: "01",
    icon: Sparkles,
    title: "Keine Templates. Alles individuell.",
    desc: "Jede Website wird von Grund auf für Ihr Unternehmen konzipiert und gestaltet. Kein Baukastendesign, das man anderswo schon gesehen hat.",
  },
  {
    number: "02",
    icon: Link2,
    title: "Design und Technik aus einer Hand.",
    desc: "Von der Idee über das Design bis zur Entwicklung und dem Launch – Sie haben einen Ansprechpartner, keine anonyme Agenturstruktur.",
  },
  {
    number: "03",
    icon: HeartHandshake,
    title: "Langfristig dabei – nicht nur beim Start.",
    desc: "Wir verschwinden nicht nach dem Launch. Updates, Anpassungen und Support sind Standard – keine Extra-Überraschungen.",
  },
  {
    number: "04",
    icon: BarChart3,
    title: "Sichtbarkeit und Performance von Anfang an.",
    desc: "Jede Website wird mit SEO-Grundlagen, schnellen Ladezeiten und korrekter Technik ausgeliefert – nicht als nachträgliches Add-on.",
  },
];

export default function WhyLavik() {
  return (
    <section className="section-padding bg-[#0A1411] relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0F7A5A]/[0.05] rounded-full blur-[100px] pointer-events-none"
      />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16 items-start">
          {/* Left — heading */}
          <div className="lg:sticky lg:top-32">
            <ScrollReveal direction="left" blur={10} scaleFrom={0.99}>
              <div className="section-label mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1FBF8F]" />
                Warum LAVIK Media
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-display font-bold tracking-tight text-[#F2F5F4] mb-5 leading-tight">
                Kein anonymes Agentur&shy;konstrukt.
              </h2>
              <p className="text-[#9BAFA8] text-lg leading-relaxed">
                Wir sind ein fokussiertes Studio mit klarer Positionierung – für
                Unternehmen, die mehr wollen als eine weitere Standard-Website.
              </p>

              <div className="mt-10 pt-10 border-t border-[#1C2B26]">
                <p className="text-sm text-[#6F8580] leading-relaxed max-w-sm">
                  &ldquo;Unsere Philosophie ist einfach: Hochwertige Arbeit,
                  klare Kommunikation, langfristige Zusammenarbeit.&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#7A8F89]/10 border border-[#7A8F89]/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-[#D9E2DF]">L</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#9BAFA8]">
                      LAVIK Media
                    </div>
                    <div className="text-xs text-[#6F8580]">
                      Kufstein, Tirol
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right — cards */}
          <div className="space-y-4">
            {differentiators.map((item, i) => (
              <ScrollReveal
                key={item.number}
                delay={i * 0.1}
                direction="right"
                blur={8}
                scaleFrom={0.97}
              >
                <GlassCard hover className="p-6 group cursor-default">
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0">
                      <div className="w-11 h-11 rounded-xl bg-[#0F7A5A]/[0.08] border border-[#0F7A5A]/15 flex items-center justify-center group-hover:bg-[#0F7A5A]/[0.14] transition-colors duration-300">
                        <item.icon className="w-5 h-5 text-[#1FBF8F]" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[11px] font-mono text-[#7A8F89]/60">
                          {item.number}
                        </span>
                        <h3 className="text-base font-display font-semibold text-[#F2F5F4]">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-sm text-[#9BAFA8] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
