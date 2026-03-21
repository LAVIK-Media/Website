import ScrollReveal from "@/components/ui/ScrollReveal";
import GlassCard from "@/components/ui/GlassCard";
import { Search, Shield, CheckCircle2 } from "lucide-react";

const seoPoints = [
  "Saubere HTML-Semantik und Struktur",
  "Optimierte Metadaten und Open Graph",
  "Schnelle Ladezeiten (Core Web Vitals)",
  "Lokale SEO-Grundlagen (Google Business etc.)",
  "Sitemap und robots.txt korrekt eingerichtet",
  "Mobile-First Entwicklung",
];

const maintenancePoints = [
  "Zuverlässiges Hosting mit SSL-Zertifikat",
  "Regelmäßige Software-Updates",
  "Automatische Backups",
  "Schnelle Reaktionszeiten bei Problemen",
  "Inhaltsänderungen auf Anfrage",
  "Monatliche Performance-Berichte",
];

export default function SeoMaintenance() {
  return (
    <section className="section-padding bg-[#050706] relative overflow-hidden">
      {/* Background */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0F7A5A]/[0.04] rounded-full blur-[120px] pointer-events-none"
      />

      <div className="container-custom relative z-10">
        {/* Header */}
        <ScrollReveal blur={8} scaleFrom={0.99}>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="section-label mx-auto mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1FBF8F]" />
              Langfristiger Wert
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-display font-bold tracking-tight text-[#F2F5F4] mb-4 leading-tight">
              Eine Website, die{" "}
              <span className="text-[#1FBF8F]">dauerhaft funktioniert</span>
            </h2>
            <p className="text-[#9BAFA8] text-lg leading-relaxed">
              Wir denken über den Launch hinaus. Sichtbarkeit, Sicherheit und
              Stabilität sind kein Zusatzangebot – sie sind Standard.
            </p>
          </div>
        </ScrollReveal>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* SEO Card */}
          <ScrollReveal delay={0.1} direction="left">
            <GlassCard
              className="p-8 h-full relative overflow-hidden"
            >
              <div
                aria-hidden="true"
                className="absolute top-0 right-0 w-48 h-48 bg-[#0F7A5A]/[0.05] rounded-full blur-3xl pointer-events-none"
              />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#0F7A5A]/[0.15] border border-[#0F7A5A]/25 flex items-center justify-center">
                    <Search className="w-5 h-5 text-[#1FBF8F]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-semibold text-[#F2F5F4]">
                      SEO-Grundlagen
                    </h3>
                    <p className="text-xs text-[#6F8580]">
                      Von Anfang an mitgedacht
                    </p>
                  </div>
                </div>

                <p className="text-sm text-[#9BAFA8] leading-relaxed mb-7">
                  Jede Website wird mit den wichtigsten technischen SEO-Grundlagen
                  ausgeliefert. Keine zusätzliche Beratung, kein Extra-Budget –
                  saubere Grundlage ist Teil unseres Standards.
                </p>

                <ul className="space-y-3">
                  {seoPoints.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-3 text-sm text-[#9BAFA8]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#1FBF8F] flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </GlassCard>
          </ScrollReveal>

          {/* Maintenance Card */}
          <ScrollReveal delay={0.2} direction="right" blur={8} scaleFrom={0.98}>
            <GlassCard
              className="p-8 h-full relative overflow-hidden"
            >
              <div
                aria-hidden="true"
                className="absolute top-0 right-0 w-48 h-48 bg-[#2F5D4E]/[0.05] rounded-full blur-3xl pointer-events-none"
              />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#2F5D4E]/[0.15] border border-[#2F5D4E]/25 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-[#4E7A6A]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-semibold text-[#F2F5F4]">
                      Wartung & Hosting
                    </h3>
                    <p className="text-xs text-[#6F8580]">
                      Langfristige Partnerschaft
                    </p>
                  </div>
                </div>

                <p className="text-sm text-[#9BAFA8] leading-relaxed mb-7">
                  Nach dem Launch begleiten wir Sie weiter. Hosting, regelmäßige
                  Wartung und schneller Support – damit Sie sich auf Ihr
                  Kerngeschäft konzentrieren können.
                </p>

                <ul className="space-y-3">
                  {maintenancePoints.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-3 text-sm text-[#9BAFA8]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#4E7A6A] flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
