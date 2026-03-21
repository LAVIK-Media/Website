import ScrollReveal from "@/components/ui/ScrollReveal";
import { Code2, Layers, MapPin, User } from "lucide-react";

const trustItems = [
  {
    icon: User,
    title: "Persönliche Betreuung",
    desc: "Ein Ansprechpartner vom ersten Gespräch bis nach dem Launch.",
  },
  {
    icon: Layers,
    title: "Alles aus einer Hand",
    desc: "Design, Entwicklung und Support – ohne externe Schnittstellen.",
  },
  {
    icon: Code2,
    title: "Sauber entwickelt",
    desc: "Next.js, TypeScript und Tailwind – modern, schnell und wartbar.",
  },
  {
    icon: MapPin,
    title: "Lokal in Tirol",
    desc: "Regionale Nähe mit modernem, überregionalem Anspruch.",
  },
];

export default function TrustStrip() {
  return (
    <section className="relative py-14 border-y border-[#1C2B26]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050706] via-[#0A1411] to-[#050706]" />
      <div className="relative container-custom z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {trustItems.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.08} direction="up">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-2xl border border-[#1C2B26] bg-[#0F1F1A]/40 hover:bg-[#132822]/60 hover:border-[#0F7A5A]/25 transition-all duration-300 group">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#0F7A5A]/[0.08] border border-[#0F7A5A]/15 flex items-center justify-center group-hover:bg-[#0F7A5A]/[0.14] transition-colors duration-300">
                  <item.icon className="w-5 h-5 text-[#1FBF8F]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#F2F5F4]/85 font-display mb-0.5">
                    {item.title}
                  </div>
                  <div className="text-xs text-[#6F8580] leading-relaxed">
                    {item.desc}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
