"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "Was kostet eine professionelle Website?",
    a: "Der Preis hängt vom Umfang Ihres Projekts ab – von der fokussierten Landingpage bis zum vollständigen Unternehmensauftritt mit mehreren Seiten und individuellen Funktionen. Wir erstellen nach einem kostenlosen Erstgespräch ein transparentes, auf Ihr Projekt zugeschnittenes Angebot.",
  },
  {
    q: "Wie lange dauert die Erstellung einer Website?",
    a: "Ein typisches Projekt dauert je nach Umfang zwischen 3 und 8 Wochen. Wir arbeiten strukturiert und kommunizieren transparent über Zeitplan und Fortschritt – so bleiben Sie immer auf dem Laufenden.",
  },
  {
    q: "Was benötige ich als Kunde, um zu starten?",
    a: "Im ersten Schritt brauchen Sie nichts außer Ihren Vorstellungen und Zielen. Wir führen Sie durch den gesamten Prozess – von Struktur und Inhalten bis hin zu Texten, Bildern und technischen Anforderungen.",
  },
  {
    q: "Bleibt die Website nach dem Launch wartbar?",
    a: "Ja, absolut. Wir bieten Wartungs- und Hosting-Pakete an, damit Ihre Website dauerhaft aktuell, sicher und performant bleibt. Auf Wunsch können Sie kleinere Änderungen auch selbst vornehmen – wir richten das entsprechend ein.",
  },
  {
    q: "Arbeitet LAVIK Media auch mit Unternehmen außerhalb von Tirol?",
    a: "Unser Hauptfokus liegt auf Unternehmen in Tirol und dem angrenzenden Alpenraum. Wir arbeiten aber problemlos auch remote mit Kunden aus ganz Österreich, Südtirol und Deutschland zusammen.",
  },
  {
    q: "Was unterscheidet LAVIK Media von anderen Webdesign-Agenturen?",
    a: "Kein Baukastendesign, kein anonymes Agenturgebilde. Sie arbeiten direkt mit uns zusammen – von der ersten Idee bis nach dem Launch. Individuelle Gestaltung, saubere Technik und langfristige Betreuung sind bei uns Standard, nicht Aufpreis.",
  },
];

function FAQItem({
  item,
  index,
}: {
  item: (typeof faqs)[number];
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <ScrollReveal delay={index * 0.07}>
      <div
        className={cn(
          "border rounded-xl overflow-hidden transition-all duration-300",
          open
            ? "bg-[#132822]/40 border-[#0F7A5A]/15"
            : "bg-[#0F1F1A]/30 border-[#1C2B26] hover:bg-[#0F1F1A]/50 hover:border-[#1C2B26]"
        )}
      >
        <button
          className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
        >
          <span className="text-sm sm:text-base font-semibold font-display text-[#F2F5F4]/85">
            {item.q}
          </span>
          <ChevronDown
            className={cn(
              "w-4 h-4 text-[#6F8580] flex-shrink-0 transition-transform duration-300",
              open && "rotate-180 text-[#1FBF8F]"
            )}
          />
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            >
              <div className="px-6 pb-5">
                <div className="h-px bg-[#1A2622] mb-4" />
                <p className="text-sm text-[#9BAFA8] leading-relaxed">{item.a}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ScrollReveal>
  );
}

export default function FAQ() {
  return (
    <section className="section-padding bg-[#0A1411] relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/4 w-[500px] h-[400px] bg-[#0F7A5A]/[0.05] rounded-full blur-[100px] pointer-events-none"
      />

      <div className="container-custom relative z-10">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="section-label mx-auto mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1FBF8F]" />
              FAQ
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-display font-bold tracking-tight text-[#F2F5F4] mb-4 leading-tight">
              Häufige Fragen
            </h2>
            <p className="text-[#9BAFA8] text-lg leading-relaxed">
              Die wichtigsten Antworten – damit Sie wissen, was Sie erwartet.
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-2xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={faq.q} item={faq} index={i} />
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <p className="mt-10 text-center text-sm text-[#6F8580]">
            Noch eine Frage?{" "}
            <a
              href="/kontakt"
              className="text-[#1FBF8F] hover:text-[#2FD4A4] transition-colors font-medium"
            >
              Schreiben Sie uns direkt →
            </a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
