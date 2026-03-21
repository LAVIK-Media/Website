import type { Metadata } from "next";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung von LAVIK Media gemäß DSGVO.",
};

export default function DatenschutzPage() {
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
              Datenschutzerklärung
            </h1>

            <div className="space-y-8 text-[#9BAFA8] text-sm leading-relaxed">
              <div>
                <h2 className="text-base font-display font-semibold text-[#F2F5F4] mb-3">
                  1. Datenschutz auf einen Blick
                </h2>
                <p>
                  Die folgenden Hinweise geben einen einfachen Überblick
                  darüber, was mit Ihren personenbezogenen Daten passiert, wenn
                  Sie diese Website besuchen. Personenbezogene Daten sind alle
                  Daten, mit denen Sie persönlich identifiziert werden können.
                </p>
              </div>

              <div>
                <h2 className="text-base font-display font-semibold text-[#F2F5F4] mb-3">
                  2. Verantwortliche Stelle
                </h2>
                <p>LAVIK Media, Musterstraße 1, 6020 Innsbruck, Tirol.</p>
                <p className="mt-2">
                  E-Mail:{" "}
                  <a
                    href="mailto:hallo@lavik-media.at"
                    className="text-[#1FBF8F] hover:text-[#2FD4A4] transition-colors"
                  >
                    hallo@lavik-media.at
                  </a>
                </p>
              </div>

              <div>
                <h2 className="text-base font-display font-semibold text-[#F2F5F4] mb-3">
                  3. Datenerfassung auf dieser Website
                </h2>
                <h3 className="text-sm font-semibold text-[#F2F5F4]/80 mb-2">
                  Server-Logfiles
                </h3>
                <p>
                  Der Provider der Seiten erhebt und speichert automatisch
                  Informationen in Server-Logfiles, die Ihr Browser automatisch
                  übermittelt. Diese Daten sind nicht bestimmten Personen
                  zuordenbar und werden nicht mit Daten aus anderen Quellen
                  zusammengeführt.
                </p>

                <h3 className="text-sm font-semibold text-[#F2F5F4]/80 mt-4 mb-2">
                  Kontaktformular
                </h3>
                <p>
                  Wenn Sie uns per Kontaktformular Anfragen zukommen lassen,
                  werden Ihre Angaben zur Bearbeitung der Anfrage und für
                  eventuelle Anschlussfragen bei uns gespeichert. Diese Daten
                  geben wir nicht ohne Ihre Einwilligung weiter.
                </p>
              </div>

              <div>
                <h2 className="text-base font-display font-semibold text-[#F2F5F4] mb-3">
                  4. Ihre Rechte
                </h2>
                <p>
                  Sie haben jederzeit das Recht auf unentgeltliche Auskunft
                  über Ihre gespeicherten personenbezogenen Daten, deren
                  Herkunft und Empfänger sowie den Zweck der Datenverarbeitung.
                  Sie haben außerdem ein Recht auf Berichtigung, Sperrung oder
                  Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum
                  Thema Datenschutz können Sie sich jederzeit unter der im
                  Impressum angegebenen Adresse an uns wenden.
                </p>
              </div>

              <div>
                <h2 className="text-base font-display font-semibold text-[#F2F5F4] mb-3">
                  5. Cookies
                </h2>
                <p>
                  Diese Website verwendet keine Tracking-Cookies. Technisch
                  notwendige Cookies können für die Grundfunktionalität der
                  Website eingesetzt werden. Eine Einwilligung ist für
                  technisch notwendige Cookies nicht erforderlich.
                </p>
              </div>

              <div className="text-[#6F8580] text-xs">
                <p>Stand: März 2025 · Diese Datenschutzerklärung ist ein Mustertext und muss vor dem Livegang durch eine rechtlich geprüfte Version ersetzt werden.</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
