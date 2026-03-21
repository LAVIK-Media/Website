import type { Metadata } from "next";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ShimmerButton from "@/components/ui/ShimmerButton";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Projekte",
  description:
    "Ausgewählte Konzeptarbeiten und Designstudien von LAVIK Media. Webdesign für Gastronomie, Handwerk und lokale Dienstleister in Tirol.",
};

const projects = [
  {
    label: "Gastronomie",
    title: "Restaurant Bergzeit",
    subtitle: "Website Konzept & Designstudie",
    desc: "Moderner Webauftritt für ein gehobenes Restaurant im Tiroler Alpenraum. Fokus auf Atmosphäre, Speisekarte und nahtlosem Reservierungsflow. Das Design setzt auf warme Farbtöne, hochwertige Typografie und subtile Animation.",
    tags: ["Next.js", "Design", "Gastronomie", "Mobile-First"],
    gradient: "from-amber-600/15 via-orange-900/10 to-transparent",
    accentColor: "text-amber-400",
    borderColor: "border-amber-500/[0.15]",
    tagStyle: "text-amber-300/80 border-amber-500/20 bg-amber-500/10",
    type: "Konzeptarbeit",
  },
  {
    label: "Handwerk & Bau",
    title: "Inntal Bau GmbH",
    subtitle: "Website-Relaunch Konzept",
    desc: "Komplette Neugestaltung für ein regionales Bauunternehmen mit 20-jähriger Geschichte. Neue Positionierung, strukturierte Leistungsdarstellung, Projektgalerie und Kontaktformular – optimiert für mobile Nutzung auf Baustellen.",
    tags: ["Relaunch", "B2B", "SEO", "Galerie"],
    gradient: "from-[#0F7A5A]/[0.10] via-[#2F5D4E]/[0.06] to-transparent",
    accentColor: "text-[#4E7A6A]",
    borderColor: "border-[#1C2B26]",
    tagStyle: "text-[#9BAFA8]/80 border-[#1C2B26] bg-[#0F1F1A]/40",
    type: "Konzeptarbeit",
  },
  {
    label: "Lokale Dienstleister",
    title: "Handwerksbetrieb Landingpage",
    subtitle: "Conversion Landingpage Konzept",
    desc: "Zielgerichtete Landingpage für einen lokalen Handwerksbetrieb. Conversion-fokussiertes Design mit klaren Handlungsaufforderungen, Vertrauenselementen und integriertem Kontaktformular. SEO-Grundlagen und schnelle Ladezeiten inklusive.",
    tags: ["Landingpage", "Conversion", "Mobile", "SEO"],
    gradient: "from-[#2F5D4E]/[0.12] via-[#0F7A5A]/[0.06] to-transparent",
    accentColor: "text-[#4E7A6A]",
    borderColor: "border-[#1C2B26]",
    tagStyle: "text-[#4E7A6A]/90 border-[#2F5D4E]/30 bg-[#2F5D4E]/10",
    type: "Konzeptarbeit",
  },
];

export default function ProjektePage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-16 bg-[#050706] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-[#0F7A5A]/[0.05] via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 line-grid pointer-events-none opacity-50" />
        <div className="container-custom relative z-10">
          <ScrollReveal>
            <div className="max-w-3xl">
              <div className="section-label mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1FBF8F]" />
                Projekte
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-display font-bold tracking-tight text-[#F2F5F4] mb-5 leading-tight">
                Konzeptarbeiten &{" "}
                <span className="gradient-text">Designstudien</span>
              </h1>
              <p className="text-xl text-[#9BAFA8] leading-relaxed max-w-2xl">
                Ein Einblick in unsere Arbeitsweise und Umsetzungsqualität.
                Echte Kundenprojekte werden nach Freigabe ergänzt.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Projects */}
      <section className="pb-24 bg-[#050706]">
        <div className="container-custom">
          <div className="space-y-8">
            {projects.map((project, i) => (
              <ScrollReveal key={project.title} delay={i * 0.1}>
                <div
                  className={`rounded-2xl border ${project.borderColor} bg-[#0F1F1A]/30 overflow-hidden hover:bg-[#0F1F1A]/50 hover:border-[#0F7A5A]/20 transition-all duration-300`}
                >
                  {/* Visual preview */}
                  <div
                    className={`relative h-48 bg-gradient-to-r ${project.gradient} border-b border-[#1C2B26]/40 overflow-hidden`}
                  >
                    {/* Abstract mockup */}
                    <div className="absolute inset-6 rounded-xl border border-[#1C2B26]/50 bg-[#060D0A]/70 overflow-hidden">
                      <div className="h-8 border-b border-[#1C2B26]/40 bg-[#0F1F1A]/30 flex items-center px-3 gap-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-red-500/40" />
                          <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
                          <div className="w-2 h-2 rounded-full bg-green-500/40" />
                        </div>
                        <div className="flex-1 h-4 rounded bg-white/[0.05]" />
                      </div>
                      <div className="p-4 grid grid-cols-3 gap-3">
                        {[1, 2, 3, 4, 5, 6].map((j) => (
                          <div
                            key={j}
                            className="h-6 rounded bg-white/[0.05]"
                          />
                        ))}
                      </div>
                    </div>
                    {/* Concept badge */}
                    <div className="absolute top-4 right-4 text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#0F1F1A]/60 border border-[#1C2B26] text-[#6F8580]">
                      {project.type}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <span
                            className={`text-xs font-semibold uppercase tracking-wider ${project.accentColor}`}
                          >
                            {project.label}
                          </span>
                        </div>
                        <h2 className="text-xl font-display font-bold text-[#F2F5F4] mb-1">
                          {project.title}
                        </h2>
                        <p className="text-sm text-[#6F8580] mb-4">
                          {project.subtitle}
                        </p>
                        <p className="text-[#9BAFA8] leading-relaxed text-sm max-w-2xl mb-5">
                          {project.desc}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className={`text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full border ${project.tagStyle}`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <p className="mt-10 text-center text-xs text-[#6F8580]">
              Die gezeigten Arbeiten sind Konzept- und Designstudien. Echte
              Kundenprojekte werden nach Freigabe hinzugefügt.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0A1411] border-t border-[#1C2B26]">
        <div className="container-custom text-center">
          <ScrollReveal>
            <h2 className="text-2xl font-display font-bold text-[#F2F5F4] mb-4">
              Ihr Projekt soll das nächste sein?
            </h2>
            <p className="text-[#9BAFA8] mb-8 max-w-lg mx-auto">
              Starten Sie mit einem kostenlosen Gespräch – unverbindlich und
              direkt.
            </p>
            <ShimmerButton href="/kontakt" size="lg">
              Projekt anfragen
              <ArrowRight className="w-4 h-4" />
            </ShimmerButton>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
