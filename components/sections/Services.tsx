import ScrollReveal from "@/components/ui/ScrollReveal";
import GlassCard from "@/components/ui/GlassCard";
import {
  Palette,
  Code2,
  RefreshCw,
  Target,
  Search,
  Shield,
} from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "Webdesign",
    desc: "Individuelle Designs, die Ihr Unternehmen professionell und modern repräsentieren. Kein Template, kein Kompromiss.",
    tag: "Gestaltung",
    color: "primary",
  },
  {
    icon: Code2,
    title: "Webentwicklung",
    desc: "Sauberer, performanter Code – entwickelt für Geschwindigkeit, Sicherheit und einfache Pflege.",
    tag: "Technik",
    color: "secondary",
  },
  {
    icon: RefreshCw,
    title: "Website-Relaunch",
    desc: "Veralteter Webauftritt? Wir transformieren Ihre bestehende Seite in ein modernes, überzeugendes Aushängeschild.",
    tag: "Neugestaltung",
    color: "primary",
  },
  {
    icon: Target,
    title: "Landingpages",
    desc: "Zielgerichtete Seiten mit klarer Botschaft – konzipiert, um Besucher in konkrete Anfragen zu verwandeln.",
    tag: "Conversion",
    color: "metal",
  },
  {
    icon: Search,
    title: "SEO-Basis",
    desc: "Technisch solide Grundlage für bessere Auffindbarkeit in Google – von Beginn an direkt mitgedacht.",
    tag: "Sichtbarkeit",
    color: "muted",
  },
  {
    icon: Shield,
    title: "Wartung & Hosting",
    desc: "Zuverlässiges Hosting und laufende Wartung – damit Ihre Website dauerhaft aktuell, sicher und performant bleibt.",
    tag: "Langfristig",
    color: "secondary",
  },
];

const colorMap: Record<string, { bg: string; border: string; icon: string; tag: string }> = {
  primary: {
    bg: "bg-[#0F7A5A]/[0.08]",
    border: "border-[#0F7A5A]/15",
    icon: "text-[#1FBF8F]",
    tag: "bg-[#0F7A5A]/[0.07] text-[#1FBF8F]/75 border-[#0F7A5A]/15",
  },
  secondary: {
    bg: "bg-[#2F5D4E]/[0.10]",
    border: "border-[#2F5D4E]/18",
    icon: "text-[#4E7A6A]",
    tag: "bg-[#2F5D4E]/[0.08] text-[#9BAFA8]/75 border-[#2F5D4E]/18",
  },
  metal: {
    bg: "bg-[#7A8F89]/[0.1]",
    border: "border-[#7A8F89]/20",
    icon: "text-[#D9E2DF]",
    tag: "bg-[#7A8F89]/[0.08] text-[#D9E2DF]/70 border-[#7A8F89]/20",
  },
  muted: {
    bg: "bg-[#4E7A6A]/[0.1]",
    border: "border-[#4E7A6A]/20",
    icon: "text-[#9BAFA8]",
    tag: "bg-[#4E7A6A]/[0.08] text-[#9BAFA8]/70 border-[#4E7A6A]/20",
  },
};

export default function Services() {
  return (
    <section
      id="leistungen"
      className="section-padding bg-[#050706] relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-[#0F7A5A]/[0.04] rounded-full blur-[120px] pointer-events-none"
      />

      <div className="container-custom relative z-10">
        <ScrollReveal blur={8} scaleFrom={0.99}>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="section-label mx-auto mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1FBF8F]" />
              Leistungen
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-display font-bold tracking-tight text-[#F2F5F4] mb-4 leading-tight">
              Was wir für Sie umsetzen
            </h2>
            <p className="text-[#9BAFA8] text-lg leading-relaxed">
              Von der ersten Skizze bis zur fertigen Website – alles, was Ihr
              Unternehmen online braucht.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => {
            const c = colorMap[service.color];
            return (
              <ScrollReveal
                key={service.title}
                delay={i * 0.07}
                direction="up"
                blur={8}
                scaleFrom={0.97}
              >
                <GlassCard
                  hover
                  className="p-7 h-full flex flex-col group cursor-default"
                >
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center`}
                    >
                      <service.icon className={`w-5 h-5 ${c.icon}`} />
                    </div>
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full border ${c.tag}`}
                    >
                      {service.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-display font-semibold text-[#F2F5F4] mb-2.5">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#9BAFA8] leading-relaxed flex-1">
                    {service.desc}
                  </p>
                </GlassCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
