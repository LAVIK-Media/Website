import type { Metadata } from "next";
import ScrollReveal from "@/components/ui/ScrollReveal";
import GlassCard from "@/components/ui/GlassCard";
import ShimmerButton from "@/components/ui/ShimmerButton";
import {
  Palette,
  Code2,
  RefreshCw,
  Target,
  Search,
  Shield,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Leistungen",
  description:
    "Webdesign, Webentwicklung, SEO und Hosting für lokale Unternehmen in Tirol. Alle Leistungen von LAVIK Media im Überblick.",
};

const services = [
  {
    id: "webdesign",
    icon: Palette,
    title: "Webdesign",
    subtitle: "Individuelle Gestaltung, die überzeugt",
    desc: "Ein professionelles Design ist mehr als Ästhetik – es kommuniziert Ihre Werte, baut Vertrauen auf und leitet Besucher zu einer Handlung. Wir gestalten jede Website von Grund auf: keine Templates, kein Kompromiss.",
    features: [
      "Individuelles Designkonzept",
      "Mobile-First Ansatz",
      "Konsistente visuelle Identität",
      "Klare Nutzerführung und UX",
      "Prototypen und Designabnahme",
    ],
    color: "primary",
  },
  {
    id: "entwicklung",
    icon: Code2,
    title: "Webentwicklung",
    subtitle: "Saubere Technik für dauerhaften Erfolg",
    desc: "Moderne Websites brauchen modernes Fundament. Wir entwickeln mit Next.js, TypeScript und Tailwind CSS – schnell, sicher, wartbar und auf echten Geräten getestet.",
    features: [
      "Next.js & React Entwicklung",
      "TypeScript für stabile Codebase",
      "Optimierte Ladezeiten",
      "Barrierefreie Umsetzung",
      "Cross-Browser & Device Tests",
    ],
    color: "secondary",
  },
  {
    id: "relaunch",
    icon: RefreshCw,
    title: "Website-Relaunch",
    subtitle: "Modernisierung mit Strategie",
    desc: "Ihre bestehende Website ist veraltet, nicht mobiloptimiert oder verliert Anfragen? Wir analysieren den Status quo und entwickeln einen gezielten Relaunch – optisch und technisch.",
    features: [
      "Bestandsanalyse & Strategie",
      "Komplette Neugestaltung",
      "SEO-Weiterleitungen & Migration",
      "Inhaltliche Überarbeitung",
      "Nahtloser Übergang ohne Downtime",
    ],
    color: "secondary",
  },
  {
    id: "landingpages",
    icon: Target,
    title: "Landingpages",
    subtitle: "Fokussiert auf Conversion",
    desc: "Eine Landingpage hat ein Ziel: Besucher zu einer konkreten Handlung zu bewegen. Wir konzipieren und entwickeln zielgerichtete Seiten, die funktionieren.",
    features: [
      "Klares Conversion-Konzept",
      "A/B-Test-fähige Struktur",
      "Schnelle Ladezeiten",
      "Formularintegration",
      "Analytics-ready",
    ],
    color: "primary",
  },
  {
    id: "seo",
    icon: Search,
    title: "SEO-Grundlagen",
    subtitle: "Gefunden werden, wo es zählt",
    desc: "Technisches SEO und lokale Sichtbarkeit sind kein Luxus – sie sind die Grundlage dafür, dass Ihre Website von potenziellen Kunden gefunden wird. Wir bauen das von Anfang an mit ein.",
    features: [
      "Technische SEO-Optimierung",
      "Lokale SEO-Grundlagen",
      "Metadaten & Open Graph",
      "Seitengeschwindigkeit (Core Web Vitals)",
      "Google Search Console Setup",
    ],
    color: "metal",
  },
  {
    id: "wartung",
    icon: Shield,
    title: "Wartung & Hosting",
    subtitle: "Zuverlässig nach dem Launch",
    desc: "Wir verschwinden nicht nach dem Launch. Mit unseren Wartungspaketen bleibt Ihre Website sicher, aktuell und performant – dauerhaft und verlässlich.",
    features: [
      "Zuverlässiges Hosting mit SSL",
      "Regelmäßige Updates",
      "Automatische Backups",
      "Inhaltsänderungen auf Anfrage",
      "Schneller Support",
    ],
    color: "primary",
  },
];

const colorMap: Record<string, { bg: string; border: string; icon: string }> = {
  primary: {
    bg: "bg-[#0F7A5A]/[0.08]",
    border: "border-[#0F7A5A]/15",
    icon: "text-[#1FBF8F]",
  },
  secondary: {
    bg: "bg-[#2F5D4E]/[0.08]",
    border: "border-[#2F5D4E]/15",
    icon: "text-[#4E7A6A]",
  },
  metal: {
    bg: "bg-[#7A8F89]/[0.10]",
    border: "border-[#7A8F89]/15",
    icon: "text-[#D9E2DF]",
  },
};

export default function LeistungenPage() {
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
                Leistungen
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-display font-bold tracking-tight text-[#F2F5F4] mb-5 leading-tight">
                Was wir für Sie{" "}
                <span className="gradient-text">umsetzen</span>
              </h1>
              <p className="text-xl text-[#9BAFA8] leading-relaxed max-w-2xl">
                Von der Gestaltung bis zur langfristigen Betreuung – alle
                Leistungen aus einer Hand, für lokale Unternehmen mit Anspruch.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Services detail */}
      <section className="pb-24 bg-[#050706]">
        <div className="container-custom">
          <div className="space-y-8">
            {services.map((service, i) => {
              const c = colorMap[service.color];
              return (
                <ScrollReveal key={service.id} delay={i * 0.06}>
                  <GlassCard
                    hover
                    className="p-8 lg:p-10"
                    id={service.id}
                  >
                    <div className="grid lg:grid-cols-[280px_1fr] gap-8 lg:gap-12">
                      {/* Left */}
                      <div>
                        <div
                          className={`w-14 h-14 rounded-2xl ${c.bg} border ${c.border} flex items-center justify-center mb-5`}
                        >
                          <service.icon className={`w-6 h-6 ${c.icon}`} />
                        </div>
                        <h2 className="text-2xl font-display font-bold text-[#F2F5F4] mb-2">
                          {service.title}
                        </h2>
                        <p className={`text-sm font-medium ${c.icon}`}>
                          {service.subtitle}
                        </p>
                      </div>
                      {/* Right */}
                      <div>
                        <p className="text-[#9BAFA8] leading-relaxed mb-7 text-base">
                          {service.desc}
                        </p>
                        <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                          {service.features.map((feat) => (
                            <li
                              key={feat}
                              className="flex items-center gap-2.5 text-sm text-[#9BAFA8]"
                            >
                              <CheckCircle2
                                className={`w-4 h-4 ${c.icon} flex-shrink-0`}
                              />
                              {feat}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </GlassCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0A1411] border-t border-[#1C2B26]">
        <div className="container-custom text-center">
          <ScrollReveal>
            <h2 className="text-2xl font-display font-bold text-[#F2F5F4] mb-4">
              Bereit für Ihr Projekt?
            </h2>
            <p className="text-[#9BAFA8] mb-8 max-w-lg mx-auto">
              Sprechen Sie uns an – kostenloses Erstgespräch, keine
              Verpflichtungen.
            </p>
            <ShimmerButton href="/kontakt" size="lg">
              Jetzt anfragen
              <ArrowRight className="w-4 h-4" />
            </ShimmerButton>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
