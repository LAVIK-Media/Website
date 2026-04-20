import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum von LAVIK Media – Angaben gemäß § 5 TMG.",
};

export default function ImpressumPage() {
  return (
    <section className="pt-36 pb-24 bg-[#050706] relative overflow-hidden">
      <div className="absolute inset-0 line-grid pointer-events-none opacity-30" />
      <div className="container-custom relative z-10">
        <ScrollReveal>
          <div className="max-w-2xl">
            <div className="section-label mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1FBF8F]" />
              Rechtliches
            </div>
            <h1 className="text-4xl font-display font-bold text-[#F2F5F4] mb-10 leading-tight">
              Impressum
            </h1>

            <div className="space-y-8 text-[#9BAFA8] text-sm leading-relaxed">
              <div>
                <h2 className="text-base font-display font-semibold text-[#F2F5F4] mb-3">
                  Angaben gemäß § 5 TMG
                </h2>
                <p className="text-[#F2F5F4] font-medium">LAVIK Media</p>
                <p className="mt-2">
                  Vertretungsberechtigt: Jakob Vrabtisch
                </p>
                <p>Anschrift: Kinkstraße 4, 6330 Kufstein, Österreich</p>
              </div>

              <div>
                <h2 className="text-base font-display font-semibold text-[#F2F5F4] mb-3">
                  Kontakt
                </h2>
                <p>
                  E-Mail:{" "}
                  <a
                    href="mailto:jakob@lavik-media.com"
                    className="text-[#1FBF8F] hover:text-[#2FD4A4] transition-colors"
                  >
                    jakob@lavik-media.com
                  </a>
                </p>
                <p>Telefon: +49 211 87973998680</p>
              </div>

              <div>
                <h2 className="text-base font-display font-semibold text-[#F2F5F4] mb-3">
                  Unternehmensgegenstand
                </h2>
                <p>
                  Webdesign, Webentwicklung, digitale Kommunikation und
                  verwandte Dienstleistungen.
                </p>
              </div>

              <div>
                <h2 className="text-base font-display font-semibold text-[#F2F5F4] mb-3">
                  Streitbeilegung / Online-Streitbeilegung
                </h2>
                <p>
                  Die Europäische Kommission stellt eine Plattform zur
                  Online-Streitbeilegung (OS) bereit:{" "}
                  <a
                    href="https://ec.europa.eu/consumers/odr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1FBF8F] hover:text-[#2FD4A4]"
                  >
                    https://ec.europa.eu/consumers/odr
                  </a>
                </p>
                <p className="mt-3">
                  Wir sind nicht verpflichtet und nicht bereit, an
                  Streitbeilegungsverfahren vor einer
                  Verbraucherschlichtungsstelle teilzunehmen – sofern nicht
                  gesetzlich zwingend anders geregelt.
                </p>
              </div>

              <div>
                <h2 className="text-base font-display font-semibold text-[#F2F5F4] mb-3">
                  Haftungsausschluss
                </h2>
                <p>
                  Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir
                  keine Haftung für die Inhalte externer Links. Für den Inhalt
                  der verlinkten Seiten sind ausschließlich deren Betreiber
                  verantwortlich.
                </p>
              </div>

              <div>
                <h2 className="text-base font-display font-semibold text-[#F2F5F4] mb-3">
                  Urheberrecht
                </h2>
                <p>
                  Alle auf dieser Website veröffentlichten Inhalte (Texte,
                  Bilder, Grafiken etc.) unterliegen dem Urheberrecht. Eine
                  Vervielfältigung oder Verwendung dieser Materialien ist ohne
                  ausdrückliche Zustimmung nicht gestattet.
                </p>
              </div>

              <div className="rounded-xl border border-[#1C2B26] bg-[#0F1F1A]/30 p-4 text-xs text-[#6F8580]">
                <p>
                  Die{" "}
                  <Link
                    href="/datenschutz"
                    className="text-[#1FBF8F] hover:text-[#2FD4A4] underline underline-offset-2"
                  >
                    Datenschutzerklärung
                  </Link>{" "}
                  ist mit den Impressumsdaten konsistent zu halten.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
