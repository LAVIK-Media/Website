import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Cookies",
  description:
    "Übersicht zu Cookies und lokalen Speichern auf lavik-media.com gemäß DSGVO und ePrivacy.",
};

export default function CookiesPage() {
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
            <h1 className="text-4xl font-display font-bold text-[#F2F5F4] mb-6 leading-tight">
              Cookie-Übersicht
            </h1>
            <p className="text-[#9BAFA8] text-sm leading-relaxed mb-10">
              Diese Übersicht ergänzt die{" "}
              <Link
                href="/datenschutz"
                className="text-[#1FBF8F] hover:text-[#2FD4A4] underline underline-offset-2"
              >
                Datenschutzerklärung
              </Link>
              . Sie können Ihre Einwilligung jederzeit über „Cookie-Einstellungen“
              im Footer oder am Banner ändern.
            </p>

            <div className="space-y-10 text-[#9BAFA8] text-sm leading-relaxed">
              <div>
                <h2 className="text-base font-display font-semibold text-[#F2F5F4] mb-3">
                  1. Unbedingt erforderliche Speicherung
                </h2>
                <p className="mb-4">
                  Diese Technologien sind für den Betrieb und die Sicherheit der
                  Website erforderlich (z. B. Speicherung Ihrer
                  Cookie-Entscheidung). Eine Einwilligung ist hierfür nicht
                  erforderlich (Art. 6 Abs. 1 lit. c / lit. f DSGVO i. V. m.
                  Erwägungsgrund 47 ePrivacy-RL in nationalem Recht).
                </p>
                <div className="overflow-x-auto rounded-xl border border-[#1C2B26]">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-[#1C2B26] bg-[#0F1F1A]/50">
                        <th className="p-3 font-semibold text-[#F2F5F4]">
                          Name / Schlüssel
                        </th>
                        <th className="p-3 font-semibold text-[#F2F5F4]">
                          Art
                        </th>
                        <th className="p-3 font-semibold text-[#F2F5F4]">
                          Zweck
                        </th>
                        <th className="p-3 font-semibold text-[#F2F5F4]">
                          Dauer
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1C2B26]/80">
                      <tr>
                        <td className="p-3 font-mono text-[11px] sm:text-xs">
                          lavik-cookie-consent-v1
                        </td>
                        <td className="p-3">localStorage</td>
                        <td className="p-3">
                          Speichert Ihre Cookie-Einstellungen (notwendig, um
                          erneute Abfragen zu vermeiden).
                        </td>
                        <td className="p-3">bis zu 12 Monate</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-[11px] sm:text-xs">
                          intro-played (Beispiel)
                        </td>
                        <td className="p-3">sessionStorage</td>
                        <td className="p-3">
                          Merkt sich, ob die Intro-Animation in dieser
                          Browsersitzung bereits gezeigt wurde (Komfortfunktion).
                        </td>
                        <td className="p-3">Session (Tab)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-[11px] sm:text-xs">
                          transformation-auto (falls genutzt)
                        </td>
                        <td className="p-3">sessionStorage</td>
                        <td className="p-3">
                          Steuert Demo-Animationen auf der Seite innerhalb der
                          Sitzung.
                        </td>
                        <td className="p-3">Session (Tab)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h2 className="text-base font-display font-semibold text-[#F2F5F4] mb-3">
                  2. Statistik (nur mit Einwilligung)
                </h2>
                <p>
                  Statistik-Cookies oder vergleichbare Technologien werden auf
                  dieser Website{" "}
                  <strong className="text-[#F2F5F4] font-medium">
                    erst nach Ihrer ausdrücklichen Einwilligung
                  </strong>{" "}
                  aktiviert. Derzeit werden keine Analyse-Skripte von Drittanbietern
                  eingebunden; die Einstellung ist für künftige Erweiterungen
                  vorgesehen.
                </p>
              </div>

              <div>
                <h2 className="text-base font-display font-semibold text-[#F2F5F4] mb-3">
                  3. Widerruf
                </h2>
                <p>
                  Sie können Ihre Einwilligung mit Wirkung für die Zukunft
                  widerrufen, indem Sie die Cookie-Einstellungen erneut öffnen
                  (Link im Footer oder erneutes Anzeigen des Hinweises nach
                  Löschen des lokalen Speichers).
                </p>
              </div>

              <p className="text-[#6F8580] text-xs">
                Stand: März 2026 · Angaben beziehen sich auf den Stand der
                eingesetzten Technik im Code; bitte bei Hosting- oder
                Tracking-Änderungen aktualisieren.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
