import type { Metadata } from "next";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum von LAVIK Media – Angaben gemäß § 5 ECG.",
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
                  Angaben gemäß § 5 ECG
                </h2>
                <p>LAVIK Media</p>
                <p>Musterstraße 1</p>
                <p>6020 Innsbruck</p>
                <p>Tirol, Österreich</p>
              </div>

              <div>
                <h2 className="text-base font-display font-semibold text-[#F2F5F4] mb-3">
                  Kontakt
                </h2>
                <p>
                  E-Mail:{" "}
                  <a
                    href="mailto:hallo@lavik-media.at"
                    className="text-[#1FBF8F] hover:text-[#2FD4A4] transition-colors"
                  >
                    hallo@lavik-media.at
                  </a>
                </p>
                <p>Telefon: +43 (0) 512 XXX XXX</p>
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
                  Bilder, Grafiken etc.) unterliegen dem österreichischen
                  Urheberrecht. Eine Vervielfältigung oder Verwendung dieser
                  Materialien ist ohne ausdrückliche Zustimmung nicht
                  gestattet.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
