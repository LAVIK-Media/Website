import ScrollReveal from "@/components/ui/ScrollReveal";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    label: "Schüler-Wettbewerb",
    title: "Fit4Business",
    subtitle: "Vom Wix-Baukasten zum Auftritt",
    desc: "Eigenes Anmeldeformular mit Backend und Sanity-CMS-Zugang für das FH-Kufstein-Team. Live unter f4b.school.",
    tags: ["Relaunch", "Custom Build"],
    image: "/projekte/f4b-neu.jpg",
    badge: "Vorher / Nachher",
  },
  {
    label: "Garten- & Landschaftsbau",
    title: "Garten Demo",
    subtitle: "Konzept für Handwerksbetriebe",
    desc: "Editorial-Typografie, großzügiges Hero und direkter Lead-Pfad – Vertrauen und Handwerkskunst ohne überladene Effekte.",
    tags: ["Demo", "Lead-Generierung"],
    image: "/projekte/garten-1.jpg",
    badge: "Demo",
  },
  {
    label: "KFZ & Automotive",
    title: "JF Concept",
    subtitle: "Markenauftritt von Grund auf",
    desc: "Car Service, Folierung, Quad-Verleih und Vermietung in einem kompromisslos modernen Auftritt – dunkel, kantig, mit Orange-Akzent.",
    tags: ["Web Design", "Branding"],
    image: "/projekte/concept-1.jpg",
    badge: "Demo",
  },
];

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <Link
      href="/projekte"
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#1C2B26] bg-[#0F1F1A]/30 transition-all duration-300 hover:border-[#0F7A5A]/25"
    >
      {/* Screenshot-Vorschau */}
      <div className="relative aspect-video overflow-hidden bg-[#060D0A]">
        <img
          src={project.image}
          alt={`${project.title} – neues Design`}
          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050706]/70 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-30" />
        {project.badge && (
          <div className="absolute right-3 top-3 rounded-full border border-[#1FBF8F]/30 bg-[#0A1411]/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#1FBF8F] backdrop-blur-sm">
            {project.badge}
          </div>
        )}
      </div>

      {/* Inhalt */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-1.5 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#4E7A6A]" />
          <span className="text-xs font-medium uppercase tracking-wider text-[#6F8580]">
            {project.label}
          </span>
        </div>
        <h3 className="font-display text-base font-semibold text-[#F2F5F4]">
          {project.title}
        </h3>
        <p className="mt-0.5 text-xs text-[#6F8580]">{project.subtitle}</p>

        <p className="mb-5 mt-3 flex-1 text-sm leading-relaxed text-[#9BAFA8]">
          {project.desc}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#2F5D4E]/30 bg-[#2F5D4E]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#4E7A6A]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default function Portfolio() {
  return (
    <section className="section-padding relative overflow-hidden bg-[#0A1411]">
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-[#0F7A5A]/[0.04] blur-[120px]"
      />

      <div className="container-custom relative z-10">
        {/* Header */}
        <ScrollReveal blur={10} scaleFrom={0.99}>
          <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <div className="section-label mb-5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1FBF8F]" />
                Projekte
              </div>
              <h2 className="mb-4 font-display text-3xl font-bold leading-tight tracking-tight text-[#F2F5F4] sm:text-4xl lg:text-[2.75rem]">
                Vorher / Nachher –
                <br className="hidden sm:block" /> echte Relaunches
              </h2>
              <p className="max-w-lg text-base leading-relaxed text-[#9BAFA8]">
                Ein Blick auf Webseiten, die wir von Grund auf neu gedacht
                haben. Ziehen Sie auf der Projektseite den Regler.
              </p>
            </div>
            <Link
              href="/projekte"
              className="group inline-flex flex-shrink-0 items-center gap-2 text-sm font-medium text-[#1FBF8F] transition-colors hover:text-[#2FD4A4]"
            >
              Alle Projekte
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Cards grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ScrollReveal
              key={project.title}
              delay={i * 0.1}
              direction="up"
              blur={8}
              scaleFrom={0.97}
            >
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
