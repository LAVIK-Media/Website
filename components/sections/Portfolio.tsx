import ScrollReveal from "@/components/ui/ScrollReveal";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    label: "Gastronomie",
    title: "Restaurant Bergzeit",
    subtitle: "Konzept & Designstudie",
    desc: "Moderner Webauftritt für ein gehobenes Restaurant im Tiroler Alpenraum. Fokus auf Atmosphäre, Speisekarte und nahtlosem Reservierungsflow.",
    tags: ["Next.js", "Design", "Gastro"],
    gradient: "from-amber-600/15 to-orange-600/10",
    accent: "border-amber-500/20",
    tagColor: "text-amber-300/80 border-amber-500/20 bg-amber-500/10",
    dot: "bg-amber-400",
    concept: true,
  },
  {
    label: "Handwerk & Bau",
    title: "Inntal Bau GmbH",
    subtitle: "Relaunch Konzept",
    desc: "Komplette Neugestaltung für ein regionales Bauunternehmen. Neue Positionierung, moderne Leistungsdarstellung und mobiler Fokus für Baustellenbesuche.",
    tags: ["Relaunch", "B2B", "SEO"],
    gradient: "from-[#0F7A5A]/[0.10] to-[#2F5D4E]/[0.06]",
    accent: "border-[#1C2B26]",
    tagColor: "text-[#9BAFA8]/80 border-[#1C2B26] bg-[#0F1F1A]/40",
    dot: "bg-[#7A8F89]",
    concept: true,
  },
  {
    label: "Lokale Dienstleister",
    title: "Handwerksbetrieb Landingpage",
    subtitle: "Conversion Konzept",
    desc: "Zielgerichtete Landingpage für einen lokalen Handwerksbetrieb. Conversion-fokussiert, mobiloptimiert und mit SEO-Basis direkt integriert.",
    tags: ["Landingpage", "Conversion", "Mobile"],
    gradient: "from-[#2F5D4E]/[0.12] to-[#0F7A5A]/[0.06]",
    accent: "border-[#1C2B26]",
    tagColor: "text-[#4E7A6A]/90 border-[#2F5D4E]/30 bg-[#2F5D4E]/10",
    dot: "bg-[#4E7A6A]",
    concept: true,
  },
];

function ProjectCard({
  project,
}: {
  project: (typeof projects)[number];
}) {
  return (
    <div className="group relative flex flex-col h-full rounded-2xl border border-[#1C2B26] bg-[#0F1F1A]/30 overflow-hidden hover:border-[#0F7A5A]/25 transition-all duration-300 cursor-default">
      {/* Visual preview area */}
      <div
        className={`relative h-52 bg-gradient-to-br ${project.gradient} overflow-hidden`}
      >
        {/* Abstract website mockup */}
        <div className="absolute inset-4 rounded-xl border border-[#1C2B26]/50 bg-[#060D0A]/80 overflow-hidden">
          {/* Navbar */}
          <div className="h-8 border-b border-[#1C2B26]/40 bg-[#0F1F1A]/30 flex items-center px-3 gap-3">
            <div className="w-12 h-2 rounded-sm bg-white/25" />
            <div className="flex-1" />
            {[40, 32, 36].map((w, i) => (
              <div
                key={i}
                className="h-1.5 rounded-sm bg-white/[0.1]"
                style={{ width: w }}
              />
            ))}
          </div>
          {/* Hero */}
          <div className="h-20 flex flex-col items-center justify-center gap-1.5 bg-gradient-to-b from-white/[0.02] to-transparent">
            <div className="w-32 h-2.5 rounded-sm bg-white/25" />
            <div className="w-24 h-2 rounded-sm bg-white/12" />
          </div>
          {/* Cards */}
          <div className="flex gap-2 px-3 pb-3">
            {[1, 2, 3].map((j) => (
              <div
                key={j}
                className="flex-1 h-10 rounded-lg bg-white/[0.04] border border-[#1C2B26]/40"
              />
            ))}
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050706]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Concept badge */}
        {project.concept && (
          <div className="absolute top-3 right-3 text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#0F1F1A]/60 border border-[#1C2B26] text-[#6F8580]">
            Konzept
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${project.dot}`} />
              <span className="text-xs font-medium text-[#6F8580] uppercase tracking-wider">
                {project.label}
              </span>
            </div>
            <h3 className="text-base font-display font-semibold text-[#F2F5F4]">
              {project.title}
            </h3>
            <p className="text-xs text-[#6F8580] mt-0.5">{project.subtitle}</p>
          </div>
        </div>

        <p className="text-sm text-[#9BAFA8] leading-relaxed mb-5 flex-1">
          {project.desc}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={`text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full border ${project.tagColor}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  return (
    <section className="section-padding bg-[#0A1411] relative overflow-hidden">
      {/* Background */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0F7A5A]/[0.04] rounded-full blur-[120px] pointer-events-none"
      />

      <div className="container-custom relative z-10">
        {/* Header */}
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12">
            <div>
              <div className="section-label mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1FBF8F]" />
                Projekte
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-display font-bold tracking-tight text-[#F2F5F4] mb-4 leading-tight">
                Konzeptarbeiten &
                <br className="hidden sm:block" /> Designstudien
              </h2>
              <p className="text-[#9BAFA8] text-base leading-relaxed max-w-lg">
                Ein Einblick in unseren Ansatz und unsere Umsetzungsqualität –
                anhand ausgewählter Konzeptprojekte.
              </p>
            </div>
            <Link
              href="/projekte"
              className="flex-shrink-0 inline-flex items-center gap-2 text-sm font-medium text-[#1FBF8F] hover:text-[#2FD4A4] transition-colors group"
            >
              Alle Projekte
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ScrollReveal key={project.title} delay={i * 0.1} direction="up">
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>

        {/* Hint note */}
        <ScrollReveal delay={0.3}>
          <p className="mt-8 text-center text-xs text-[#6F8580]">
            Die gezeigten Arbeiten sind Konzept- und Designstudien. Reale
            Kundenprojekte werden nach Freigabe ergänzt.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
