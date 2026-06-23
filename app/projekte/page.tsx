import type { Metadata } from "next";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ShimmerButton from "@/components/ui/ShimmerButton";
import BeforeAfterSlider from "@/components/sections/transformation/BeforeAfterSlider";
import { ArrowRight, Check, ExternalLink, MoveHorizontal } from "lucide-react";

export const metadata: Metadata = {
  title: "Projekte",
  description:
    "Echte Vorher/Nachher-Relaunches und Demo-Konzepte von LAVIK Media. Ziehen Sie den Regler und sehen Sie, wie aus veralteten Webseiten moderne Markenauftritte werden.",
};

type BeforeAfterProject = {
  label: string;
  title: string;
  subtitle: string;
  desc: string;
  tags: string[];
  features: string[];
  before: string;
  after: string;
  /** Live-URL (optional). Wenn gesetzt, wird ein „Live ansehen“-Link angezeigt. */
  href?: string;
  /** Anzeigetext für die Browser-Leiste */
  domain: string;
};

type ShowcaseProject = {
  label: string;
  title: string;
  subtitle: string;
  desc: string;
  tags: string[];
  features: string[];
  shots: { src: string; caption: string }[];
  href?: string;
  domain: string;
};

const beforeAfter: BeforeAfterProject[] = [
  {
    label: "Schüler-Wettbewerb · FH Kufstein",
    title: "Fit4Business",
    subtitle: "Vom Wix-Baukasten zum eigenen Auftritt",
    desc: "Die alte Wix-Seite war unruhig und generisch. Der neue Auftritt übersetzt die verspielte Energie der Zielgruppe in ein durchdachtes, klar strukturiertes Design – mit eigenem Charakter, Video-Einbindung und klarer Handlungsaufforderung.",
    tags: ["Relaunch", "Conversion", "Custom Build"],
    features: [
      "Mehrstufiges Anmeldeformular mit Validierung und automatischem Mailversand an die FH Kufstein",
      "Eigenes Backend: Bewerbungen werden persistent gespeichert und nicht nur per E-Mail verschickt",
      "Sanity-CMS-Zugang für das F4B-Team zum Sichten, Filtern und Verwalten aller Einreichungen",
      "Eigene Markenidentität, klare Inhaltshierarchie und mobile-first Performance",
    ],
    before: "/projekte/f4b-alt.jpg",
    after: "/projekte/f4b-neu.jpg",
    href: "https://f4b.school/",
    domain: "f4b.school",
  },
];

const showcase: ShowcaseProject[] = [
  {
    label: "Garten- & Landschaftsbau",
    title: "Garten Demo",
    subtitle: "Konzept-Webseite für Garten- und Landschaftsbauer",
    desc: "Eine ruhige, hochwertige Vorlage für Handwerksbetriebe: großes Hero-Bild, klare Typografie und ein direkter Weg zum Erstgespräch. Der Auftritt vermittelt Vertrauen und Handwerkskunst – ohne überladene Effekte.",
    tags: ["Demo", "Web Design", "Lead-Generierung"],
    features: [
      "Großzügiges Hero mit echtem Atmosphäre-Bild statt Stockfoto-Optik",
      "Klare Service-Struktur: Über uns, Leistungen, Projekte, Bewertungen, Kontakt",
      "Direkter Konversions-Pfad „Kostenloses Erstgespräch“ als Lead-Generator",
      "Editorial-Typografie für seriöse Wirkung – ideal für gehobene Handwerksbetriebe",
    ],
    shots: [{ src: "/projekte/garten-1.jpg", caption: "Hero – „Ihr Garten. Mit Leidenschaft gestaltet.“" }],
    href: undefined,
    domain: "garten-demo.lavik.at",
  },
  {
    label: "KFZ & Automotive",
    title: "JF Concept",
    subtitle: "Markenauftritt von Grund auf",
    desc: "Car Service, Folierung, Quad-Verleih und Vermietung unter einem Dach – und einem Auftritt. Wir haben für JF Concept ein kompromisslos modernes Design entwickelt: dunkel, kantig, mit Orange-Akzent und klarer Leistungsstruktur.",
    tags: ["Web Design", "Branding", "Next.js"],
    features: [
      "Cinematischer Hero mit Glow-Effekt und plakativer Typo für sofortigen Markeneindruck",
      "Vier Geschäftsbereiche (Aufbereitung, Folierung, Quad-Verleih, Vermietung) in einem klaren Raster",
      "Galerie-Sektion für Referenzbilder direkt aus der Werkstatt",
      "Anfrage-Formular mit Mailversand – schnelle Lead-Erfassung ohne Umwege",
    ],
    shots: [
      { src: "/projekte/concept-1.jpg", caption: "Hero – „Jetzt den Unterschied spüren“" },
      { src: "/projekte/concept-2.jpg", caption: "Leistungen – „Vier Bereiche. Ein Anspruch.“" },
    ],
    href: undefined,
    domain: "jf-concept.at",
  },
];

/** Schlanke Browser-Leiste über den Screenshots */
function ChromeBar({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-[#1C2B26] bg-[#0A1411] px-4 py-2.5">
      <div className="flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/45" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/45" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500/45" />
      </div>
      <div className="flex-1 truncate rounded-md border border-[#1C2B26] bg-[#132822] px-3 py-1 font-mono text-[10px] text-[#4E7A6A]">
        {title}
      </div>
    </div>
  );
}

/** „Live ansehen“-Pill-Link – öffnet in neuem Tab */
function LiveLink({ href, label = "Live ansehen" }: { href: string; label?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/live inline-flex items-center gap-2 rounded-full border border-[#1FBF8F]/30 bg-[#1FBF8F]/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#1FBF8F] transition-all duration-300 hover:border-[#1FBF8F]/60 hover:bg-[#1FBF8F]/[0.12]"
    >
      {label}
      <ExternalLink className="h-3.5 w-3.5 transition-transform duration-300 group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5" />
    </a>
  );
}

/** Feature-Liste mit grünen Häkchen */
function FeatureList({ items }: { items: string[] }) {
  if (!items?.length) return null;
  return (
    <ul className="mb-6 space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-[#9BAFA8]">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-[#1FBF8F]/25 bg-[#1FBF8F]/[0.07]">
            <Check className="h-3 w-3 text-[#1FBF8F]" strokeWidth={3} />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Tags-Liste */
function TagList({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-[#2F5D4E]/30 bg-[#2F5D4E]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#4E7A6A]"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

export default function ProjektePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#050706] pb-16 pt-36">
        <div className="bg-gradient-radial pointer-events-none absolute inset-0 from-[#0F7A5A]/[0.05] via-transparent to-transparent" />
        <div className="line-grid pointer-events-none absolute inset-0 opacity-50" />
        <div className="container-custom relative z-10">
          <ScrollReveal>
            <div className="max-w-3xl">
              <div className="section-label mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1FBF8F]" />
                Projekte
              </div>
              <h1 className="mb-5 font-display text-4xl font-bold leading-tight tracking-tight text-[#F2F5F4] sm:text-5xl lg:text-[3.5rem]">
                Vorher. Nachher.{" "}
                <span className="gradient-text">Der Unterschied.</span>
              </h1>
              <p className="max-w-2xl text-xl leading-relaxed text-[#9BAFA8]">
                Ziehen Sie den Regler und sehen Sie selbst, was wir aus
                bestehenden Webseiten gemacht haben – vom veralteten Baukasten
                zum modernen Markenauftritt.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Vorher / Nachher – Layout wie Showcase: Text oben, großes Bild darunter */}
      <section className="bg-[#050706] pb-8">
        <div className="container-custom">
          <div className="space-y-24">
            {beforeAfter.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 0.05} blur={8}>
                <div className="mb-8 flex flex-wrap items-start justify-between gap-6">
                  <div className="max-w-2xl">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#4E7A6A]">
                        {p.label}
                      </span>
                    </div>
                    <h2 className="mb-1 font-display text-3xl font-bold text-[#F2F5F4]">
                      {p.title}
                    </h2>
                    <p className="mb-4 text-sm text-[#6F8580]">{p.subtitle}</p>
                    <p className="mb-5 leading-relaxed text-[#9BAFA8]">{p.desc}</p>
                    <FeatureList items={p.features} />
                    <TagList tags={p.tags} />
                  </div>
                  {p.href && (
                    <div className="shrink-0">
                      <LiveLink href={p.href} />
                    </div>
                  )}
                </div>

                <div className="overflow-hidden rounded-2xl border border-[#1C2B26] shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
                  <ChromeBar title={p.domain} />
                  <BeforeAfterSlider
                    beforeSrc={p.before}
                    afterSrc={p.after}
                    alt={p.title}
                  />
                </div>

                <div className="mt-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#6F8580]">
                  <MoveHorizontal className="h-4 w-4 text-[#1FBF8F]" />
                  Regler ziehen zum Vergleichen
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase (Demos & neue Markenauftritte) */}
      <section className="bg-[#050706] pb-24 pt-20">
        <div className="container-custom">
          <ScrollReveal>
            <div className="mb-12 max-w-2xl">
              <div className="section-label mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1FBF8F]" />
                Demos & Konzepte
              </div>
              <h2 className="mb-4 font-display text-3xl font-bold leading-tight text-[#F2F5F4] sm:text-4xl">
                So sieht ein moderner Auftritt aus.
              </h2>
              <p className="text-lg leading-relaxed text-[#9BAFA8]">
                Eigens entwickelte Demo-Webseiten und reale Markenauftritte – als
                konkrete Inspiration, wie wir Branchen neu denken.
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-24">
            {showcase.map((p, idx) => (
              <ScrollReveal key={p.title} delay={idx * 0.05} blur={8}>
                <div className="mb-8 flex flex-wrap items-start justify-between gap-6">
                  <div className="max-w-2xl">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#4E7A6A]">
                        {p.label}
                      </span>
                    </div>
                    <h3 className="mb-1 font-display text-2xl font-bold text-[#F2F5F4]">
                      {p.title}
                    </h3>
                    <p className="mb-4 text-sm text-[#6F8580]">{p.subtitle}</p>
                    <p className="mb-5 leading-relaxed text-[#9BAFA8]">
                      {p.desc}
                    </p>
                    <FeatureList items={p.features} />
                    <TagList tags={p.tags} />
                  </div>
                  {p.href && (
                    <div className="shrink-0">
                      <LiveLink href={p.href} />
                    </div>
                  )}
                </div>

                <div
                  className={`grid gap-6 ${
                    p.shots.length > 1 ? "lg:grid-cols-2" : "lg:grid-cols-1"
                  }`}
                >
                  {p.shots.map((shot) => {
                    const figure = (
                      <figure className="group h-full overflow-hidden rounded-2xl border border-[#1C2B26] shadow-[0_24px_60px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-[#1FBF8F]/30 hover:shadow-[0_24px_60px_rgba(31,191,143,0.15)]">
                        <ChromeBar title={p.domain} />
                        <div className="aspect-video overflow-hidden bg-[#060D0A]">
                          <img
                            src={shot.src}
                            alt={`${p.title} – ${shot.caption}`}
                            className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                          />
                        </div>
                        <figcaption className="border-t border-[#1C2B26] bg-[#0A1411] px-4 py-2.5 text-xs text-[#6F8580]">
                          {shot.caption}
                        </figcaption>
                      </figure>
                    );
                    return (
                      <div key={shot.src}>
                        {p.href ? (
                          <a
                            href={p.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1FBF8F]/40 rounded-2xl"
                            aria-label={`${p.title} – Live ansehen`}
                          >
                            {figure}
                          </a>
                        ) : (
                          figure
                        )}
                      </div>
                    );
                  })}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#1C2B26] bg-[#0A1411] py-16">
        <div className="container-custom text-center">
          <ScrollReveal>
            <h2 className="mb-4 font-display text-2xl font-bold text-[#F2F5F4]">
              Ihr Projekt soll das nächste sein?
            </h2>
            <p className="mx-auto mb-8 max-w-lg text-[#9BAFA8]">
              Starten Sie mit einem kostenlosen Gespräch – unverbindlich und
              direkt.
            </p>
            <ShimmerButton href="/kontakt" size="lg">
              Projekt anfragen
              <ArrowRight className="h-4 w-4" />
            </ShimmerButton>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
