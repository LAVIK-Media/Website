import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Datenschutz",
  description:
    "Datenschutzerklärung von LAVIK Media gemäß DSGVO und österreichischem DSG.",
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
            <h1 className="text-4xl font-display font-bold text-[#F2F5F4] mb-4 leading-tight">
              Datenschutzerklärung
            </h1>
            <p className="text-[#6F8580] text-sm mb-10">
              Informationspflichten gemäß Art. 13 und 14 DSGVO
            </p>

            <div className="space-y-10 text-[#9BAFA8] text-sm leading-relaxed">
              <div>
                <h2 className="text-base font-display font-semibold text-[#F2F5F4] mb-3">
                  1. Verantwortlicher
                </h2>
                <p>
                  Verantwortlich für die Datenverarbeitung auf dieser Website
                  ist:
                </p>
                <p className="mt-3 text-[#F2F5F4]">
                  LAVIK Media
                  <br />
                  Musterstraße 1
                  <br />
                  6330 Kufstein, Österreich
                </p>
                <p className="mt-3">
                  E-Mail:{" "}
                  <a
                    href="mailto:service@lavik-media.com"
                    className="text-[#1FBF8F] hover:text-[#2FD4A4] transition-colors"
                  >
                    service@lavik-media.com
                  </a>
                </p>
                <p className="mt-3 text-xs text-[#6F8580]">
                  Bitte ersetzen Sie „Musterstraße 1“ und ergänzen Sie die
                  Rechtsform (z. B. Einzelunternehmen, GmbH), UID und
                  Firmenbuchdaten im{" "}
                  <Link
                    href="/impressum"
                    className="text-[#1FBF8F] hover:text-[#2FD4A4] underline underline-offset-2"
                  >
                    Impressum
                  </Link>{" "}
                  vollständig – die Verarbeitung muss mit den dortigen Angaben
                  übereinstimmen.
                </p>
              </div>

              <div>
                <h2 className="text-base font-display font-semibold text-[#F2F5F4] mb-3">
                  2. Hosting und technische Bereitstellung
                </h2>
                <p>
                  Diese Website wird auf Servern eines Hosting-Anbieters
                  betrieben. Beim Aufruf der Seite werden durch den Host
                  automatisch Server-Logfiles verarbeitet, insbesondere IP-Adresse
                  (kurzzeitig), Datum und Uhrzeit des Abrufs, angeforderte Datei,
                  Referrer-URL, Browserkennung und Betriebssystem. Die
                  Verarbeitung erfolgt zur Gewährleistung der Sicherheit (z. B.
                  Missbrauchsbekämpfung) und Stabilität der Website sowie zur
                  Fehleranalyse.
                </p>
                <p className="mt-3">
                  <strong className="text-[#F2F5F4] font-medium">
                    Rechtsgrundlage:
                  </strong>{" "}
                  Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer
                  sicheren und funktionsfähigen Webpräsenz). Soweit der Host als
                  Auftragsverarbeiter eingesetzt ist, besteht ein Vertrag zur
                  Auftragsverarbeitung gemäß Art. 28 DSGVO.
                </p>
                <p className="mt-3 text-xs text-[#6F8580]">
                  <strong className="text-[#6F8580]">Hinweis:</strong> Tragen Sie
                  hier den konkreten Anbieter ein (z. B. Vercel Inc., All-Inkl.,
                  Hetzner) inkl. Sitz und ggf. EU-US Data Privacy Framework /
                  Standardvertragsklauseln, falls Daten in Drittländer fließen.
                </p>
              </div>

              <div>
                <h2 className="text-base font-display font-semibold text-[#F2F5F4] mb-3">
                  3. Schriftarten (Next.js / keine Google-CDN-Ladung im Browser)
                </h2>
                <p>
                  Die verwendeten Schriftarten (Inter, Syne) werden über{" "}
                  <code className="text-[11px] px-1 py-0.5 rounded bg-[#0F1F1A] border border-[#1C2B26]">
                    next/font/google
                  </code>{" "}
                  eingebunden: Die Font-Dateien werden beim Build auf dem Server
                  optimiert und selbst gehostet ausgeliefert. Es findet{" "}
                  <strong className="text-[#F2F5F4] font-medium">
                    keine Laufzeit-Verbindung Ihres Browsers zu Google Fonts
                  </strong>{" "}
                  zum Laden der Schriften statt (keine IP-Übermittlung an Google
                  aus diesem Grund).
                </p>
              </div>

              <div>
                <h2 className="text-base font-display font-semibold text-[#F2F5F4] mb-3">
                  4. Cookies, localStorage und Einwilligung
                </h2>
                <p>
                  Wir setzen ein Cookie-/Einwilligungsbanner ein. In Ihrem
                  Browser wird Ihre Entscheidung (z. B. „nur die Notwendigen“ oder
                  inkl. Statistik) in{" "}
                  <code className="text-[11px] px-1 py-0.5 rounded bg-[#0F1F1A] border border-[#1C2B26]">
                    localStorage
                  </code>{" "}
                  unter einem festen Schlüssel gespeichert, damit der Hinweis
                  nicht bei jedem Besuch erneut erscheint.
                </p>
                <p className="mt-3">
                  <strong className="text-[#F2F5F4] font-medium">
                    Statistik:
                  </strong>{" "}
                  Nicht notwendige Analyse-Tools werden erst geladen, wenn Sie
                  der Kategorie „Statistik“ zustimmen (Opt-in). Derzeit sind im
                  Code keine Drittanbieter-Tracking-Skripte eingebunden; die
                  Einstellung ist vorbereitet.
                </p>
                <p className="mt-3">
                  <Link
                    href="/cookies"
                    className="text-[#1FBF8F] hover:text-[#2FD4A4] underline underline-offset-2"
                  >
                    Zur Cookie-Übersicht
                  </Link>
                </p>
              </div>

              <div>
                <h2 className="text-base font-display font-semibold text-[#F2F5F4] mb-3">
                  5. Session-Speicher (sessionStorage)
                </h2>
                <p>
                  Bestimmte Komfortfunktionen (z. B. Intro-Animation,
                  Demo-Bereiche) können kurzfristig Informationen in{" "}
                  <code className="text-[11px] px-1 py-0.5 rounded bg-[#0F1F1A] border border-[#1C2B26]">
                    sessionStorage
                  </code>{" "}
                  ablegen, die nur für die aktuelle Browsersitzung gelten. Eine
                  dauerhafte Identifikation erfolgt dadurch nicht.
                </p>
                <p className="mt-3">
                  <strong className="text-[#F2F5F4] font-medium">
                    Rechtsgrundlage:
                  </strong>{" "}
                  Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer
                  benutzerfreundlichen Darstellung), soweit nicht durch
                  Einwilligung abgedeckt. Sie können die Daten löschen, indem Sie
                  den Browser-Cache / Websitedaten für diese Domain entfernen.
                </p>
              </div>

              <div>
                <h2 className="text-base font-display font-semibold text-[#F2F5F4] mb-3">
                  6. Kontaktformular und E-Mail-Kommunikation
                </h2>
                <p>
                  Wenn Sie das Kontaktformular nutzen, verarbeiten wir die von
                  Ihnen eingegebenen Daten (z. B. Name, E-Mail, Nachricht,
                  optionale Angaben) zur Bearbeitung Ihrer Anfrage.
                </p>
                <p className="mt-3">
                  <strong className="text-[#F2F5F4] font-medium">
                    Rechtsgrundlage:
                  </strong>{" "}
                  Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen auf Ihre
                  Anfrage hin) bzw. Art. 6 Abs. 1 lit. f DSGVO (Beantwortung
                  allgemeiner Anfragen). Soweit eine ausdrückliche Einwilligung
                  erforderlich ist (z. B. Newsletter – hier nicht angeboten),
                  erfolgt die Verarbeitung auf Grundlage von Art. 6 Abs. 1 lit. a
                  DSGVO.
                </p>
                <p className="mt-3">
                  <strong className="text-[#F2F5F4] font-medium">
                    Speicherdauer:
                  </strong>{" "}
                  Daten aus Kontaktanfragen werden gelöscht, sobald der Zweck
                  entfällt und keine gesetzlichen Aufbewahrungsfristen
                  entgegenstehen (typischerweise nach Abschluss der
                  Kommunikation, längstens jedoch nach den für Geschäftsbriefe
                  geltenden Fristen, sofern relevant).
                </p>
                <p className="mt-3 text-xs text-[#6F8580]">
                  <strong className="text-[#6F8580]">Technik:</strong> Die
                  Übermittlung erfolgt verschlüsselt (HTTPS) an unseren Server;
                  die Zustellung der Anfrage per E-Mail kann über einen
                  Auftragsverarbeiter (z. B. Resend) erfolgen. Bitte ergänzen
                  Sie den Auftragsverarbeitungsvertrag mit dem jeweiligen
                  Anbieter in Ihrer Dokumentation.
                </p>
              </div>

              <div>
                <h2 className="text-base font-display font-semibold text-[#F2F5F4] mb-3">
                  7. Empfänger und Auftragsverarbeiter
                </h2>
                <p>
                  Daten werden nur an Dritte weitergegeben, wenn dies gesetzlich
                  erlaubt ist (z. B. Hosting, IT-Dienstleister als
                  Auftragsverarbeiter mit AV-Vertrag). Eine Weitergabe zu
                  Werbezwecken findet ohne Ihre Einwilligung nicht statt.
                </p>
              </div>

              <div>
                <h2 className="text-base font-display font-semibold text-[#F2F5F4] mb-3">
                  8. Drittlandübermittlungen
                </h2>
                <p>
                  Soweit Tools mit Sitz außerhalb des EWR eingesetzt werden
                  (künftig z. B. US-Analytics), erfolgt dies nur unter den
                  Voraussetzungen der Kapitel V DSGVO (Angemessenheitsbeschluss,
                  geeignete Garantien, Ausnahmen). Aktuell sind keine solchen
                  Dienste im Code aktiv.
                </p>
              </div>

              <div>
                <h2 className="text-base font-display font-semibold text-[#F2F5F4] mb-3">
                  9. Ihre Rechte
                </h2>
                <p>Sie haben insbesondere das Recht auf:</p>
                <ul className="list-disc pl-5 mt-3 space-y-1">
                  <li>Auskunft (Art. 15 DSGVO)</li>
                  <li>Berichtigung (Art. 16 DSGVO)</li>
                  <li>Löschung (Art. 17 DSGVO)</li>
                  <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                  <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
                  <li>
                    Widerspruch gegen die Verarbeitung (Art. 21 DSGVO), soweit
                    auf Art. 6 Abs. 1 lit. f DSGVO gestützt
                  </li>
                  <li>
                    Widerruf einer erteilten Einwilligung mit Wirkung für die
                    Zukunft (Art. 7 Abs. 3 DSGVO)
                  </li>
                  <li>
                    Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO), in
                    Österreich: Österreichische Datenschutzbehörde, Barichgasse
                    40–42, 1030 Wien,{" "}
                    <a
                      href="https://www.dsb.gv.at"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1FBF8F] hover:text-[#2FD4A4]"
                    >
                      www.dsb.gv.at
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-base font-display font-semibold text-[#F2F5F4] mb-3">
                  10. Pflicht zur Bereitstellung
                </h2>
                <p>
                  Sie sind weder vertraglich noch gesetzlich verpflichtet, Daten
                  bereitzustellen; ohne die für eine Kontaktaufnahme nötigen
                  Angaben können wir Anfragen jedoch nicht bearbeiten.
                </p>
              </div>

              <div>
                <h2 className="text-base font-display font-semibold text-[#F2F5F4] mb-3">
                  11. Automatisierte Entscheidungen
                </h2>
                <p>
                  Es findet kein ausschließlich automatisierter Entscheidungsprozess
                  einschließlich Profiling im Sinne von Art. 22 DSGVO statt.
                </p>
              </div>

              <div className="rounded-xl border border-[#1C2B26] bg-[#0F1F1A]/30 p-4 text-xs text-[#6F8580]">
                <p>
                  <strong className="text-[#9BAFA8]">
                    Rechtlicher Hinweis:
                  </strong>{" "}
                  Dieser Text beschreibt die aktuelle technische Umsetzung im
                  Code (Stand siehe unten) und ersetzt keine individuelle
                  Rechtsberatung. Lassen Sie die finale Fassung durch eine
                  Fachperson prüfen, sobald Sie personenbezogene Daten in
                  produktiven Prozessen verarbeiten, Newsletter einsetzen oder
                  Tracking aktivieren.
                </p>
              </div>

              <p className="text-[#6F8580] text-xs">
                Stand: März 2026
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
