import type { Metadata } from "next";
import type { ReactNode } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import GlassCard from "@/components/ui/GlassCard";
import ShimmerButton from "@/components/ui/ShimmerButton";
import UeberUnsHero from "@/components/ueber-uns/UeberUnsHero";
import UeberUnsTeam from "@/components/ueber-uns/UeberUnsTeam";
import UeberUnsFaq from "@/components/ueber-uns/UeberUnsFaq";
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  Sparkles,
  Users,
  Zap,
  Eye,
  HeartHandshake,
  ShieldCheck,
  Gem,
  Lightbulb,
  Ban,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "LAVIK Media: ein kleines Team aus Kufstein – Jakob Vrabitsch, Linus Lang, Richard Kienpointner. Moderne Websites mit Substanz.",
};

/** Bilder optional: Dateien nach `public/team/` legen und `imageSrc` setzen. */
const team = [
  {
    name: "Jakob Vrabitsch",
    role: "Lead Web-Entwicklung · Co-Lead",
    line: "Technische Architektur, sauberer Code, klare Umsetzung.",
    initials: "JV",
    imageSrc: null as string | null,
    imageAlt: "Jakob Vrabitsch, Web-Entwicklung",
  },
  {
    name: "Linus Lang",
    role: "Finance & Sales · Co-Lead",
    line: "Zahlen, Angebote und partnerschaftlicher Vertrieb.",
    initials: "LL",
    imageSrc: null as string | null,
    imageAlt: "Linus Lang, Finance und Sales",
  },
  {
    name: "Richard Kienpointner",
    role: "Sales & Kundenzufriedenheit",
    line: "Direkter Draht – Richard hat keinen Filter, nur ehrliche Worte.",
    initials: "RK",
    imageSrc: null as string | null,
    imageAlt: "Richard Kienpointner, Sales und Kundenzufriedenheit",
  },
];

const trustPoints = [
  {
    icon: Sparkles,
    title: "Digital-native",
    text: "Wir sind jung und online aufgewachsen – wir kennen Erwartungen und Nutzung heute.",
  },
  {
    icon: Eye,
    title: "Moderne Wahrnehmung",
    text: "Wir wissen, wie Menschen Seiten wahrnehmen, Vertrauen entsteht – und wo es bricht.",
  },
  {
    icon: Zap,
    title: "Direkt & schnell",
    text: "Kurze Wege, klare Kommunikation, keine endlosen Schleifen.",
  },
  {
    icon: Users,
    title: "Kleines Team, volle Aufmerksamkeit",
    text: "Kein Massenbetrieb – jedes Projekt bekommt echte Sorgfalt.",
  },
];

const processSteps = [
  { step: "01", title: "Erstkontakt", desc: "Kurzes Gespräch oder Call – Ziele, Rahmen, ob es passt." },
  { step: "02", title: "Verstehen", desc: "Wir hören zu: Geschäft, Zielgruppe, was online wirklich zählen soll." },
  { step: "03", title: "Konzept & Design", desc: "Klare Richtung, dann Gestaltung – abgestimmt, nicht überrumpelt." },
  { step: "04", title: "Umsetzung", desc: "Schnelle, saubere Entwicklung, Launch und Übergabe – ohne Drama." },
];

const values = [
  {
    icon: HeartHandshake,
    title: "Ehrlichkeit",
    desc: "Was geht, was nicht – transparent und ohne Verkaufsgequatsche.",
  },
  {
    icon: ShieldCheck,
    title: "Zuverlässigkeit",
    desc: "Termine, Rückmeldungen, Ergebnisse – darauf kann man sich verlassen.",
  },
  {
    icon: Gem,
    title: "Qualität",
    desc: "Lieber weniger Projekte, dafür mit Anspruch – statt schnell billig abarbeiten.",
  },
];

const donts = [
  "Keine Low-Effort-Umsetzungen",
  "Keine austauschbaren Standard-Templates",
  "Kein „fertig geliefert und nie wieder gesehen“",
];

const faqs = [
  {
    q: "Warum LAVIK Media?",
    a: "Wir kombinieren moderne Webentwicklung mit echter Nähe zum Kunden – kein Massenbetrieb, sondern klare Prozesse und ein Team, das mitdenkt.",
  },
  {
    q: "Wie läuft ein typisches Projekt ab?",
    a: "Kurzer Erstkontakt, dann Verstehen und Konzept, Design und Umsetzung – transparent besprochen, ohne Überraschungen am Ende.",
  },
  {
    q: "Seid ihr nur für große Unternehmen?",
    a: "Nein. Wichtig ist, dass Qualität und Zusammenarbeit passen – ob KMU oder wachsende Marke.",
  },
  {
    q: "Wo sitzt ihr?",
    a: "Unser Team ist in und um Kufstein verwurzelt (FH Kufstein) – remote und persönlich, je nach Projekt.",
  },
];

function SectionTitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`font-display text-xl font-bold tracking-tight text-[#F2F5F4] sm:text-2xl md:text-[1.65rem] ${className}`}
    >
      {children}
    </h2>
  );
}

export default function UeberUnsPage() {
  return (
    <div className="bg-[#050706]">
      <UeberUnsHero />

      {/* Story-Block — breiter Fließtext wie Relace */}
      <section className="pb-20 md:pb-28">
        <div className="container-custom">
          <ScrollReveal blur={12} scaleFrom={0.98} duration={0.75}>
            <div className="mx-auto max-w-3xl space-y-6 text-[0.98rem] leading-[1.75] text-[#9BAFA8] md:text-[1.05rem]">
              <p>
                Viele liefern ab und sind weg. Wir arbeiten{" "}
                <strong className="font-medium text-[#C8D9D3]">nah am Kunden</strong>
                , direkt und mit Liebe zum Detail. Studierende der{" "}
                <strong className="font-medium text-[#C8D9D3]">FH Kufstein</strong>{" "}
                – das heißt für Sie: strukturiertes Arbeiten und
                zeitgemäße Umsetzung, ohne Uni-Werbung.
              </p>
              <p>
                Jung heißt: nah an Trends und digitaler Wahrnehmung. Unser
                Anspruch ist ein Ergebnis, auf das Kund:innen und wir stolz
                sind – nicht die schnellste Template-Lösung.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <ShimmerButton href="/kontakt" size="lg">
                  Projekt anfragen
                  <ArrowRight className="h-4 w-4" />
                </ShimmerButton>
                <a
                  href="/leistungen"
                  className="text-sm font-medium text-[#1FBF8F]/90 underline-offset-4 transition hover:text-[#1FBF8F] hover:underline"
                >
                  Leistungen ansehen
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Meet the team — Bilderleiste, Relace „Meet the team“ */}
      <section className="py-20 md:py-28">
        <div className="container-custom">
          <ScrollReveal blur={8} scaleFrom={0.99}>
            <h2 className="mb-4 font-display text-2xl font-bold tracking-tight text-[#F2F5F4] sm:text-3xl md:text-[2rem]">
              Lernt das{" "}
              <span className="gradient-text gradient-text-animated">Team</span>{" "}
              kennen
            </h2>
            <p className="mb-12 max-w-2xl text-sm leading-relaxed text-[#6F8580] md:text-base">
              Drei Namen, klare Rollen – Web, Finance & Vertrieb,
              Kundenzufriedenheit. Hier entstehen später eure Fotos.
            </p>
          </ScrollReveal>
          <UeberUnsTeam members={team} />
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container-custom">
          <ScrollReveal blur={6} scaleFrom={0.99}>
            <SectionTitle className="mb-8 text-center md:mb-10">
              Warum uns vertrauen?
            </SectionTitle>
          </ScrollReveal>
          <div className="mx-auto grid max-w-4xl gap-x-10 gap-y-8 sm:grid-cols-2">
            {trustPoints.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.06} blur={8} scaleFrom={0.97}>
                <div className="flex gap-3.5">
                  <item.icon
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#1FBF8F]/70"
                    strokeWidth={1.5}
                  />
                  <div>
                    <h3 className="mb-1 font-display text-sm font-semibold text-[#E8EFEC]">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#9BAFA8]">
                      {item.text}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container-custom">
          <div className="mx-auto grid max-w-5xl items-start gap-10 lg:grid-cols-2 lg:gap-14">
            <ScrollReveal direction="left" blur={8} scaleFrom={0.98}>
              <SectionTitle className="mb-5">Was wir tun</SectionTitle>
              <ul className="space-y-2.5 text-sm leading-relaxed text-[#9BAFA8] md:text-[0.95rem]">
                <li className="flex gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1FBF8F]/75" />
                  Moderne Websites – technisch sauber, optisch hochwertig
                </li>
                <li className="flex gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1FBF8F]/75" />
                  Edles Design – keine Template-Optik
                </li>
                <li className="flex gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1FBF8F]/75" />
                  Online-Präsenz, die zur Marke passt
                </li>
              </ul>
              <p className="mt-6 text-xs font-medium uppercase tracking-wide text-[#6F8580]">
                Wirkung
              </p>
              <ul className="mt-2 space-y-1.5 text-sm text-[#9BAFA8]">
                <li>Erster Eindruck & Vertrauen</li>
                <li>Moderne Kund:innen anziehen</li>
                <li>Stärkeres Employer Branding</li>
              </ul>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.06}>
              <GlassCard className="border-white/[0.06] p-6 md:p-7">
                <div className="mb-3 flex items-center gap-2 text-[#F2F5F4]">
                  <Lightbulb className="h-4 w-4 text-[#1FBF8F]" />
                  <h3 className="font-display text-base font-semibold">
                    Schwache Website – echte Kosten
                  </h3>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-[#9BAFA8]">
                  Nicht nur Optik – es geht um Chancen:
                </p>
                <ul className="space-y-2 text-sm text-[#C8D9D3]">
                  <li>Kund:innen springen ab</li>
                  <li>Kein Vertrauen</li>
                  <li>Bewerber:innen gehen woanders hin</li>
                  <li>Image leidet</li>
                </ul>
                <p className="mt-6 text-sm text-[#C8D9D3]">
                  Genau daran arbeiten wir.
                </p>
              </GlassCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container-custom">
          <div className="mx-auto grid max-w-4xl gap-12 md:grid-cols-2 md:gap-16">
            <ScrollReveal blur={6} scaleFrom={0.99}>
              <SectionTitle className="mb-4">Für wen wir uns eignen</SectionTitle>
              <ul className="space-y-2.5 text-sm leading-relaxed text-[#9BAFA8]">
                {[
                  "Veraltete oder schwache Online-Präsenz",
                  "Investition in die digitale Zukunft",
                  "Qualität statt billigster Preis",
                ].map((line) => (
                  <li key={line} className="flex gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1FBF8F]" />
                    {line}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <SectionTitle className="mb-4 text-[#7a8f89]">
                Weniger passend
              </SectionTitle>
              <ul className="space-y-2.5 text-sm leading-relaxed text-[#6F8580]">
                {[
                  "Nur die billigste DIY-Lösung",
                  "Qualität wird nicht priorisiert",
                ].map((line) => (
                  <li key={line} className="flex gap-2.5">
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#4E7A6A]/70" />
                    {line}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container-custom">
          <ScrollReveal blur={6} scaleFrom={0.99}>
            <SectionTitle className="mb-8 text-center md:mb-10">
              Ablauf
            </SectionTitle>
          </ScrollReveal>
          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((s, i) => (
              <ScrollReveal key={s.step} delay={i * 0.06} blur={8} scaleFrom={0.97}>
                <div className="flex h-full gap-3">
                  <span
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#1FBF8F]/35"
                    aria-hidden
                  />
                  <div>
                    <span className="font-mono text-[0.65rem] text-[#1FBF8F]/60">
                      {s.step}
                    </span>
                    <h3 className="mt-1 font-display text-sm font-semibold text-[#F2F5F4]">
                      {s.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#9BAFA8]">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container-custom">
          <ScrollReveal blur={6} scaleFrom={0.99}>
            <SectionTitle className="mb-8 text-center md:mb-10">
              Unsere Werte
            </SectionTitle>
          </ScrollReveal>
          <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-3">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.07} blur={8} scaleFrom={0.96}>
                <GlassCard hover className="h-full p-6 text-center">
                  <v.icon className="mx-auto mb-3 h-6 w-6 text-[#1FBF8F]/85" />
                  <h3 className="mb-1.5 font-display text-base font-semibold text-[#F2F5F4]">
                    {v.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-[#9BAFA8]">
                    {v.desc}
                  </p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — Relace-ähnlich */}
      <section className="py-20 md:py-24">
        <div className="container-custom">
          <ScrollReveal blur={8} scaleFrom={0.99}>
            <h2 className="mb-2 text-center font-display text-xl font-bold text-[#F2F5F4] sm:text-2xl md:text-[1.65rem]">
              Häufige{" "}
              <span className="gradient-text gradient-text-animated">Fragen</span>
            </h2>
            <p className="mx-auto mb-10 max-w-lg text-center text-sm text-[#6F8580]">
              Kurz und ehrlich – so arbeiten wir.
            </p>
          </ScrollReveal>
          <UeberUnsFaq items={faqs} />
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-custom">
          <ScrollReveal>
            <div className="mx-auto max-w-xl rounded-2xl bg-[#0a1210]/35 px-6 py-7 text-center ring-1 ring-white/[0.05]">
              <Ban className="mx-auto mb-3 h-6 w-6 text-[#6F8580]" />
              <h2 className="mb-4 font-display text-lg font-semibold text-[#C8D9D3]">
                Was wir nicht machen
              </h2>
              <ul className="space-y-2 text-sm text-[#9BAFA8]">
                {donts.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-24 pt-12 md:pb-28 md:pt-16">
        <div className="container-custom text-center">
          <ScrollReveal blur={8} scaleFrom={0.98}>
            <h2 className="mb-2 font-display text-xl font-bold text-[#F2F5F4] sm:text-2xl">
              Lass uns etwas Gutes bauen
            </h2>
            <p className="mx-auto mb-7 max-w-md text-sm leading-relaxed text-[#9BAFA8]">
              Kurz sprechen, ohne Druck – ob es passt, merkt man schnell.
            </p>
            <ShimmerButton href="/kontakt" size="lg">
              Kontakt aufnehmen
              <ArrowRight className="h-4 w-4" />
            </ShimmerButton>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
