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
                  Kinkstraße 4
                  <br />
                  6330 Kufstein, Österreich
                </p>
                <p className="mt-3">
                  E-Mail:{" "}
                  <a
                    href="mailto:kontakt@lavik-media.com"
                    className="text-[#1FBF8F] hover:text-[#2FD4A4] transition-colors"
                  >
                    kontakt@lavik-media.com
                  </a>
                </p>
                <p className="mt-3 text-xs text-[#6F8580]">
                  Weitere Pflichtangaben (z. B. Vertretungsberechtigung, UID)
                  finden Sie im{" "}
                  <Link
                    href="/impressum"
                    className="text-[#1FBF8F] hover:text-[#2FD4A4] underline underline-offset-2"
                  >
                    Impressum
                  </Link>
                  .
                </p>
              </div>

              <div>
                <h2 className="text-base font-display font-semibold text-[#F2F5F4] mb-3">
                  2. Hosting und technische Bereitstellung
                </h2>
                <p>
                  Die Website wird über{" "}
                  <strong className="text-[#F2F5F4] font-medium">
                    Cloudflare, Inc.
                  </strong>{" "}
                  (101 Townsend St, San Francisco, CA 94107, USA) bereitgestellt
                  — insbesondere als{" "}
                  <strong className="text-[#F2F5F4] font-medium">
                    Cloudflare Workers
                  </strong>{" "}
                  (Anwendungslogik),{" "}
                  <strong className="text-[#F2F5F4] font-medium">CDN</strong>{" "}
                  und Auslieferung statischer Inhalte (
                  <strong className="text-[#F2F5F4] font-medium">Assets</strong>
                  ). Beim Aufruf werden dabei technisch notwendige Daten
                  verarbeitet, z. B. IP-Adresse (gekürzt oder verkürzt
                  gespeichert je nach Konfiguration), Zeitstempel, angeforderte
                  Ressource, User-Agent und ggf. Fehlerprotokolle — zur
                  Bereitstellung, Sicherheit (z. B. Missbrauchsbekämpfung) und
                  Stabilität des Dienstes.
                </p>
                <p className="mt-3">
                  <strong className="text-[#F2F5F4] font-medium">
                    Rechtsgrundlage:
                  </strong>{" "}
                  Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an sicherem,
                  schnellem Betrieb der Website). Soweit Cloudflare für uns als{" "}
                  <strong className="text-[#F2F5F4] font-medium">
                    Auftragsverarbeiter
                  </strong>{" "}
                  tätig ist, besteht ein Vertrag zur Auftragsverarbeitung gemäß
                  Art. 28 DSGVO (Data Processing Agreement, DPA).
                </p>
                <p className="mt-3">
                  <strong className="text-[#F2F5F4] font-medium">
                    Drittlandübermittlung:
                  </strong>{" "}
                  Cloudflare hat Sitz in den USA. Die Übermittlung erfolgt auf
                  Grundlage der Angemessenheitsbeschlüsse der EU-Kommission
                  (z. B. EU-US Data Privacy Framework, soweit anwendbar) bzw.
                  der in der DPA vereinbarten{" "}
                  <strong className="text-[#F2F5F4] font-medium">
                    Standardvertragsklauseln
                  </strong>{" "}
                  und ergänzenden Maßnahmen. Details:{" "}
                  <a
                    href="https://www.cloudflare.com/cloudflare_customer_SCCs-German.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1FBF8F] hover:text-[#2FD4A4] underline underline-offset-2"
                  >
                    Cloudflare — Auftragsverarbeitung / SCC
                  </a>
                  .
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
                  Bestimmte Komfortfunktionen (z. B. Intro-Animation) können
                  kurzfristig Informationen in{" "}
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
                  6. Kontaktformular
                </h2>
                <p>
                  Wenn Sie unser Kontaktformular nutzen, verarbeiten wir die von
                  Ihnen im Formular eingegebenen personenbezogenen Daten.
                </p>
                <ul className="list-disc pl-5 mt-3 space-y-2">
                  <li>
                    <strong className="text-[#F2F5F4] font-medium">
                      Erhobene Daten (Pflichtfelder):
                    </strong>{" "}
                    Name, E-Mail-Adresse, Nachricht.
                  </li>
                  <li>
                    <strong className="text-[#F2F5F4] font-medium">
                      Zweck:
                    </strong>{" "}
                    Bearbeitung Ihrer Kontaktanfrage.
                  </li>
                  <li>
                    <strong className="text-[#F2F5F4] font-medium">
                      Rechtsgrundlage:
                    </strong>{" "}
                    Art. 6 Abs. 1 lit. b DSGVO (Durchführung vorvertraglicher
                    Maßnahmen auf Ihre Anfrage hin bzw. Vertragsanbahnung).
                  </li>
                  <li>
                    <strong className="text-[#F2F5F4] font-medium">
                      Speicherdauer:
                    </strong>{" "}
                    bis die Anfrage abschließend bearbeitet ist, sofern keine
                    längeren gesetzlichen Aufbewahrungspflichten entgegenstehen
                    (z. B. bei anschließender Geschäftsbeziehung und
                    geschäftsrechtlichen Aufbewahrungsfristen).
                  </li>
                </ul>
                <p className="mt-3">
                  <strong className="text-[#F2F5F4] font-medium">
                    Freiwillige Angaben:
                  </strong>{" "}
                  Zusätzliche Felder (z. B. Unternehmen, Telefon, Branche,
                  Art des Anliegens), sofern ausgefüllt, verarbeiten wir
                  ebenfalls ausschließlich zur Bearbeitung Ihrer Anfrage —
                  Rechtsgrundlage weiterhin Art. 6 Abs. 1 lit. b DSGVO.
                </p>
                <p className="mt-3">
                  Die Übermittlung erfolgt verschlüsselt per HTTPS an unseren
                  Server (Hosting siehe Ziffer 2).
                </p>
                <p className="mt-3">
                  <strong className="text-[#F2F5F4] font-medium">
                    Dienstleister (E-Mail-Versand):
                  </strong>{" "}
                  Zum Versand der Anfrage per E-Mail setzen wir{" "}
                  <strong className="text-[#F2F5F4] font-medium">
                    Resend Inc.
                  </strong>{" "}
                  (
                  <a
                    href="https://resend.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1FBF8F] hover:text-[#2FD4A4] underline underline-offset-2"
                  >
                    resend.com
                  </a>
                  , Sitz u. a. USA) als{" "}
                  <strong className="text-[#F2F5F4] font-medium">
                    Auftragsverarbeiter
                  </strong>{" "}
                  gemäß Art. 28 DSGVO ein. Mit Resend besteht ein Vertrag zur
                  Auftragsverarbeitung; Daten können in Drittländer übermittelt
                  werden — gestützt auf geeignete Garantien (z. B. EU-US Data
                  Privacy Framework / Standardvertragsklauseln), wie in der
                  jeweils aktuellen Dokumentation von Resend beschrieben.
                </p>
              </div>

              <div>
                <h2 className="text-base font-display font-semibold text-[#F2F5F4] mb-3">
                  7. Kontakt per E-Mail
                </h2>
                <p>
                  Kontaktieren Sie uns direkt per E-Mail, verarbeiten wir die
                  von Ihnen mitgeteilten Daten (mindestens Ihre E-Mail-Adresse
                  sowie Inhalt und Metadaten der Nachricht) zur Bearbeitung der
                  Anfrage.
                </p>
                <p className="mt-3">
                  <strong className="text-[#F2F5F4] font-medium">
                    Rechtsgrundlage:
                  </strong>{" "}
                  Art. 6 Abs. 1 lit. b DSGVO, soweit es um Anfragen im
                  Zusammenhang mit Vertragsanbahnung oder -durchführung geht;
                  andernfalls Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse
                  an der Beantwortung von Anfragen). Die Daten werden gelöscht,
                  sobald der Zweck entfällt und keine Aufbewahrungspflichten
                  entgegenstehen.
                </p>
              </div>

              <div>
                <h2 className="text-base font-display font-semibold text-[#F2F5F4] mb-3">
                  8. Empfänger und Auftragsverarbeiter
                </h2>
                <p>
                  Eine Weitergabe an Dritte erfolgt nur, wenn sie zur
                  Vertragserfüllung oder Betreibung dieser Website erforderlich
                  ist, wir gesetzlich dazu verpflichtet sind oder Sie
                  eingewilligt haben. Hosting (Cloudflare) und E-Mail-Übermittlung
                  (Resend) erfolgen im Rahmen der Auftragsverarbeitung gemäß Art.
                  28 DSGVO. Eine Weitergabe zu Werbezwecken ohne Ihre Einwilligung
                  findet nicht statt.
                </p>
              </div>

              <div>
                <h2 className="text-base font-display font-semibold text-[#F2F5F4] mb-3">
                  9. Drittlandübermittlungen
                </h2>
                <p>
                  Soweit Anbieter mit Sitz außerhalb des Europäischen
                  Wirtschaftsraums (EWR) eingesetzt werden (insbesondere{" "}
                  <strong className="text-[#F2F5F4] font-medium">
                    Cloudflare
                  </strong>{" "}
                  und{" "}
                  <strong className="text-[#F2F5F4] font-medium">Resend</strong>{" "}
                  in den USA), stellen wir sicher, dass ein angemessenes
                  Datenschutzniveau besteht — etwa durch einen
                  Angemessenheitsbeschluss der EU-Kommission (z. B. EU-US Data
                  Privacy Framework) und/oder{" "}
                  <strong className="text-[#F2F5F4] font-medium">
                    Standardvertragsklauseln
                  </strong>{" "}
                  der EU-Kommission in Verbindung mit ergänzenden technischen
                  und organisatorischen Maßnahmen, sofern erforderlich.
                </p>
              </div>

              <div>
                <h2 className="text-base font-display font-semibold text-[#F2F5F4] mb-3">
                  10. Ihre Rechte
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
                <p className="mt-3">
                  Zur Ausübung Ihrer Rechte wenden Sie sich an die unter Ziffer 1
                  genannte E-Mail-Adresse.
                </p>
              </div>

              <div>
                <h2 className="text-base font-display font-semibold text-[#F2F5F4] mb-3">
                  11. Pflicht zur Bereitstellung
                </h2>
                <p>
                  Sie sind weder vertraglich noch gesetzlich verpflichtet, Daten
                  bereitzustellen; ohne die für eine Kontaktaufnahme nötigen
                  Angaben können wir Anfragen jedoch nicht bearbeiten.
                </p>
              </div>

              <div>
                <h2 className="text-base font-display font-semibold text-[#F2F5F4] mb-3">
                  12. Automatisierte Entscheidungen
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
                  Dieser Text beschreibt die aktuelle technische und organisatorische
                  Umsetzung (Stand siehe unten) und ersetzt keine individuelle
                  Rechtsberatung. Bei Änderungen der Verarbeitung (z. B. neues
                  Tracking, Newsletter) ist die Erklärung anzupassen; eine
                  Prüfung durch eine Fachperson wird empfohlen.
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
