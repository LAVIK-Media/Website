import type { Metadata } from "next";
import ScrollReveal from "@/components/ui/ScrollReveal";
import GlassCard from "@/components/ui/GlassCard";
import ShimmerButton from "@/components/ui/ShimmerButton";
import {
  CheckCircle2,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Gem,
  Building2,
  Code2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Leistungen & Pakete",
  description:
    "Transparente Pakete von 899 € bis Business+ – Webdesign & Entwicklung für Tirol. Custom-Projekte auf Anfrage. LAVIK Media.",
};

type Tier = {
  id: string;
  name: string;
  /** Festpreis in EUR oder null bei Custom */
  priceEur: number | null;
  priceNote?: string;
  tagline: string;
  features: string[];
  accent: "sky" | "emerald" | "violet" | "rose" | "zinc";
  icon: typeof Sparkles;
  badge: string;
};

const tiers: Tier[] = [
  {
    id: "starter",
    name: "Starter",
    priceEur: 899,
    tagline: "Für kleine lokale Businesses, die einfach online sein wollen.",
    features: [
      "Onepager (bis 5 Sections)",
      "Modernes Design (kein Template-Müll)",
      "Mobile optimiert",
      "DSGVO-Basic-Setup",
      "Kontaktformular",
      "Schnelle Ladezeiten",
    ],
    accent: "sky",
    icon: Sparkles,
    badge: "Lead Magnet",
  },
  {
    id: "growth",
    name: "Growth",
    priceEur: 1490,
    tagline: "Für Unternehmen, die Kunden gewinnen wollen.",
    features: [
      "3–5 Seiten (Start, Leistungen, Über uns, Kontakt …)",
      "Struktur + conversion-orientiertes Layout",
      "Basic SEO-Setup",
      "Individuelles Design (kein 0815-Look)",
      "Performance optimiert",
    ],
    accent: "emerald",
    icon: TrendingUp,
    badge: "Beliebtestes Paket",
  },
  {
    id: "pro",
    name: "Pro",
    priceEur: 2990,
    tagline: "Für Unternehmen, die ernsthaft skalieren wollen.",
    features: [
      "5–10 Seiten",
      "High-End UI/UX (Animationen, Effekte)",
      "Conversion-Fokus (Call-to-Actions, Funnels)",
      "Erweiterte SEO-Grundlagen",
      "Branding-Feinschliff",
      "Ladezeiten + Core Web Vitals optimiert",
    ],
    accent: "violet",
    icon: Gem,
    badge: "High-End",
  },
  {
    id: "business",
    name: "Business+",
    priceEur: 5490,
    tagline: "Für starke Unternehmen und Premium-Auftritte.",
    features: [
      "Alles aus Pro",
      "Individuelle Features (z. B. Buchungssysteme, leichte Dashboards)",
      "Backend-Anbindung (CMS oder einfache Tools)",
      "Content-Struktur + Beratung",
      "Tracking-Setup (Analytics u. a.)",
    ],
    accent: "rose",
    icon: Building2,
    badge: "Premium",
  },
  {
    id: "custom",
    name: "Custom / Scale",
    priceEur: null,
    priceNote: "Auf Anfrage",
    tagline: "Für komplexe Projekte und individuelle Systeme.",
    features: [
      "Web-App / komplexe Backend-Systeme",
      "Individuelle Logik",
      "API-Integrationen",
      "Automationen",
      "Skalierbare Architektur",
    ],
    accent: "zinc",
    icon: Code2,
    badge: "Individuell",
  },
];

const upsells = [
  {
    title: "SEO-Setup komplett",
    range: "+300 € – 800 €",
  },
  {
    title: "Texte (Copywriting)",
    range: "+200 € – 1.000 €",
  },
  {
    title: "Wartung / Hosting (monatlich)",
    range: "29 € – 99 € / Monat",
  },
  {
    title: "Schnellere Lieferung (Express)",
    range: "+20 – 30 %",
  },
  {
    title: "Mehrsprachigkeit",
    range: "+300 € – 1.000 €",
  },
  {
    title: "Content-Upload (Bilder, Texte einpflegen)",
    range: "+150 € – 500 €",
  },
];

const accentStyles: Record<
  Tier["accent"],
  { ring: string; iconBg: string; icon: string; badge: string; price: string }
> = {
  sky: {
    ring: "ring-sky-500/25 hover:ring-sky-500/35",
    iconBg: "bg-sky-500/10 border-sky-500/20",
    icon: "text-sky-400",
    badge: "text-sky-300/90 border-sky-500/25 bg-sky-500/10",
    price: "text-sky-300",
  },
  emerald: {
    ring: "ring-[#1FBF8F]/25 hover:ring-[#1FBF8F]/40",
    iconBg: "bg-[#0F7A5A]/15 border-[#0F7A5A]/25",
    icon: "text-[#1FBF8F]",
    badge: "text-[#1FBF8F]/90 border-[#0F7A5A]/30 bg-[#0F7A5A]/10",
    price: "text-[#1FBF8F]",
  },
  violet: {
    ring: "ring-violet-500/25 hover:ring-violet-500/35",
    iconBg: "bg-violet-500/10 border-violet-500/20",
    icon: "text-violet-300",
    badge: "text-violet-300/90 border-violet-500/25 bg-violet-500/10",
    price: "text-violet-300",
  },
  rose: {
    ring: "ring-rose-500/25 hover:ring-rose-500/35",
    iconBg: "bg-rose-500/10 border-rose-500/20",
    icon: "text-rose-300",
    badge: "text-rose-300/90 border-rose-500/25 bg-rose-500/10",
    price: "text-rose-300",
  },
  zinc: {
    ring: "ring-white/10 hover:ring-white/15",
    iconBg: "bg-white/[0.06] border-white/10",
    icon: "text-[#9BAFA8]",
    badge: "text-[#9BAFA8] border-white/10 bg-white/[0.04]",
    price: "text-[#C8D9D3]",
  },
};

function formatEur(amount: number) {
  return new Intl.NumberFormat("de-AT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function PriceDisplay({
  priceEur,
  priceNote,
  accent,
}: {
  priceEur: number | null;
  priceNote?: string;
  accent: Tier["accent"];
}) {
  const a = accentStyles[accent];
  if (priceEur === null) {
    return (
      <div className="mt-4">
        <span
          className={`font-display text-2xl font-bold tracking-tight sm:text-3xl ${a.price}`}
        >
          {priceNote ?? "Auf Anfrage"}
        </span>
      </div>
    );
  }
  return (
    <div className="mt-4">
      <span className="font-display text-3xl font-bold tracking-tight text-[#F2F5F4] sm:text-4xl">
        {formatEur(priceEur)}
      </span>
    </div>
  );
}

function CustomTierWideCard({ tier }: { tier: Tier }) {
  const a = accentStyles[tier.accent];
  const Icon = tier.icon;
  return (
    <GlassCard
      hover
      id={tier.id}
      className={`w-full ring-1 transition-[box-shadow,ring-color] duration-300 ${a.ring} bg-[#080c0b]/80 p-6 sm:p-8 lg:p-10`}
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12 xl:gap-16">
        <div className="min-w-0 shrink-0 lg:max-w-md">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${a.iconBg}`}
            >
              <Icon className={`h-6 w-6 ${a.icon}`} strokeWidth={1.5} />
            </div>
            <span
              className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${a.badge}`}
            >
              {tier.badge}
            </span>
          </div>
          <h2 className="font-display text-2xl font-bold text-[#F2F5F4] sm:text-3xl">
            {tier.name}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#9BAFA8] sm:text-base">
            {tier.tagline}
          </p>
          <PriceDisplay
            priceEur={tier.priceEur}
            priceNote={tier.priceNote}
            accent={tier.accent}
          />
        </div>
        <div className="min-w-0 flex-1 border-t border-[#1C2B26]/80 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-[#6F8580]">
            Leistungsumfang
          </p>
          <ul className="grid gap-2.5 sm:grid-cols-2 sm:gap-x-8 lg:gap-y-3">
            {tier.features.map((f) => (
              <li
                key={f}
                className="flex gap-2.5 text-sm leading-relaxed text-[#C8D9D3]"
              >
                <CheckCircle2
                  className={`mt-0.5 h-4 w-4 shrink-0 ${a.icon}`}
                />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </GlassCard>
  );
}

const standardTiers = tiers.filter((t) => t.id !== "custom");
const customTier = tiers.find((t) => t.id === "custom")!;

export default function LeistungenPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#050706] pb-16 pt-32 md:pb-20 md:pt-36">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-20%,rgba(15,122,90,0.11),transparent_60%)]"
          aria-hidden
        />
        <div className="container-custom relative z-10">
          <ScrollReveal blur={8} scaleFrom={0.99}>
            <div className="max-w-3xl">
              <div className="section-label mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1FBF8F]" />
                Leistungen
              </div>
              <h1 className="mb-5 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.1] tracking-tight text-[#F2F5F4]">
                Pakete mit{" "}
                <span className="gradient-text">festen Preisen</span>
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-[#9BAFA8]">
                Transparent von Starter bis Business+ – und individuelle
                Großprojekte ohne Online-Preis, dafür mit klarem Gespräch.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-[#050706] pb-12 md:pb-16">
        <div className="container-custom">
          <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {standardTiers.map((tier, i) => {
                const a = accentStyles[tier.accent];
                const Icon = tier.icon;
                return (
                  <ScrollReveal
                    key={tier.id}
                    delay={i * 0.05}
                    blur={8}
                    scaleFrom={0.98}
                  >
                    <GlassCard
                      hover
                      id={tier.id}
                      className={`flex h-full flex-col p-6 sm:p-8 ring-1 transition-[box-shadow,ring-color] duration-300 ${a.ring}`}
                    >
                      <div className="mb-4 flex items-start justify-between gap-3">
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${a.iconBg}`}
                        >
                          <Icon
                            className={`h-6 w-6 ${a.icon}`}
                            strokeWidth={1.5}
                          />
                        </div>
                        <span
                          className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${a.badge}`}
                        >
                          {tier.badge}
                        </span>
                      </div>
                      <h2 className="font-display text-xl font-bold text-[#F2F5F4] sm:text-2xl">
                        {tier.name}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-[#9BAFA8]">
                        {tier.tagline}
                      </p>
                      <PriceDisplay
                        priceEur={tier.priceEur}
                        priceNote={tier.priceNote}
                        accent={tier.accent}
                      />
                      <ul className="mt-6 flex flex-col gap-2.5 border-t border-[#1C2B26]/80 pt-6">
                        {tier.features.map((f) => (
                          <li
                            key={f}
                            className="flex gap-2.5 text-sm leading-relaxed text-[#C8D9D3]"
                          >
                            <CheckCircle2
                              className={`mt-0.5 h-4 w-4 shrink-0 ${a.icon}`}
                            />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </GlassCard>
                  </ScrollReveal>
                );
              })}
            </div>

            <ScrollReveal delay={0.2} blur={10} scaleFrom={0.98}>
              <CustomTierWideCard tier={customTier} />
            </ScrollReveal>
          </div>
          <ScrollReveal blur={6} className="mt-8">
            <p className="text-center text-sm text-[#6F8580]">
              Alle Preise verstehen sich als Richtwerte; finale Leistung und
              Umfang stimmen wir im Erstgespräch mit Ihnen ab.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-[#050706] py-16 md:py-20">
        <div className="container-custom">
          <ScrollReveal blur={8} scaleFrom={0.99}>
            <div className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
              <h2 className="font-display text-2xl font-bold text-[#F2F5F4] sm:text-3xl">
                Optionale{" "}
                <span className="gradient-text">Upsells & Add-ons</span>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#9BAFA8] md:text-base">
                Erweitern Sie jedes Paket – hier liegt oft der Mehrwert für
                Sichtbarkeit, Inhalte und Betrieb.
              </p>
            </div>
          </ScrollReveal>

          <div className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-2">
            {upsells.map((u, i) => (
              <ScrollReveal key={u.title} delay={i * 0.04} blur={6}>
                <div className="flex items-center justify-between gap-4 rounded-xl border border-[#1C2B26]/90 bg-[#0a1210]/50 px-4 py-3.5">
                  <span className="text-sm font-medium text-[#E8EFEC]">
                    {u.title}
                  </span>
                  <span className="shrink-0 font-mono text-xs text-[#1FBF8F]/85">
                    {u.range}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.15} blur={6} className="mt-10">
            <div className="mx-auto max-w-2xl rounded-2xl border border-[#1C2B26]/80 bg-[#0F1F1A]/35 px-5 py-4 text-center">
              <p className="text-sm text-[#9BAFA8]">
                Express-Lieferung, Mehrsprachigkeit und Content-Pflege geben wir
                immer transparent im Angebot aus – keine versteckten Posten.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-[#0A1411] py-16 md:py-20">
        <div className="container-custom text-center">
          <ScrollReveal blur={8} scaleFrom={0.98}>
            <h2 className="mb-3 font-display text-xl font-bold text-[#F2F5F4] sm:text-2xl">
              Welches Paket passt zu Ihnen?
            </h2>
            <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-[#9BAFA8]">
              Kurz telefonieren oder schreiben – wir empfehlen ehrlich Starter,
              Growth, Pro, Business+ oder einen Custom-Scope.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <ShimmerButton href="/kontakt" size="lg">
                Jetzt anfragen
                <ArrowRight className="h-4 w-4" />
              </ShimmerButton>
              <a
                href="/kontakt"
                className="text-sm font-medium text-[#6F8580] underline-offset-4 transition hover:text-[#9BAFA8] hover:underline"
              >
                Custom-Projekt besprechen
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
