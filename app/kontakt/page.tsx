import type { Metadata } from "next";
import Contact from "@/components/sections/Contact";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Nehmen Sie Kontakt mit LAVIK Media auf. Kostenloses Erstgespräch für Ihr Webprojekt in Kufstein und Tirol.",
};

export default function KontaktPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-8 bg-[#050706] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-[#0F7A5A]/[0.07] via-transparent to-transparent pointer-events-none" />
        <div className="container-custom relative z-10">
          <ScrollReveal>
            <div className="max-w-2xl">
              <div className="section-label mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1FBF8F]" />
                Kontakt
              </div>
              <h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-[#F2F5F4] mb-4 leading-tight">
                Projekt anfragen
              </h1>
              <p className="text-xl text-[#9BAFA8] leading-relaxed">
                Füllen Sie das Formular aus oder schreiben Sie uns direkt –
                wir melden uns innerhalb von 24 Stunden.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact form (reuse homepage section) */}
      <Contact />
    </>
  );
}
