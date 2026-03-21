"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";
import CookieSettingsLink from "@/components/consent/CookieSettingsLink";

const footerLinks = {
  Leistungen: [
    { href: "/leistungen#webdesign", label: "Webdesign" },
    { href: "/leistungen#entwicklung", label: "Webentwicklung" },
    { href: "/leistungen#relaunch", label: "Website-Relaunch" },
    { href: "/leistungen#landingpages", label: "Landingpages" },
    { href: "/leistungen#seo", label: "SEO-Basis" },
    { href: "/leistungen#wartung", label: "Wartung & Hosting" },
  ],
  Unternehmen: [
    { href: "/ueber-uns", label: "Über uns" },
    { href: "/projekte", label: "Projekte" },
    { href: "/kontakt", label: "Kontakt" },
  ],
  Rechtliches: [
    { href: "/impressum", label: "Impressum" },
    { href: "/datenschutz", label: "Datenschutz" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const reduced = useReducedMotion();

  const colMotion = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 22 } as const,
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-40px" as const },
          transition: {
            delay,
            duration: 0.68,
            ease: easeOutExpo,
          },
        };

  return (
    <footer className="relative border-t border-[#1C2B26] bg-[#050706]">
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0F7A5A]/25 to-transparent" />

      <div className="container-custom py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          <motion.div className="lg:col-span-2" {...colMotion(0)}>
            <Link href="/" className="mb-4 inline-flex items-center gap-0.5">
              <span className="text-xl font-display font-bold tracking-tight text-[#F2F5F4]">
                LAVIK
              </span>
              <span className="text-xl font-display font-light tracking-tight text-[#1FBF8F]">
                Media
              </span>
            </Link>
            <p className="mb-6 max-w-xs text-sm leading-relaxed text-[#6F8580]">
              Hochwertige Websites für lokale Unternehmen in Kufstein, Tirol und
              Umgebung.
              Individuelles Design, saubere Technik, persönliche Betreuung.
            </p>
            <motion.div
              whileHover={reduced ? {} : { scale: 1.02 }}
              whileTap={reduced ? {} : { scale: 0.98 }}
            >
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 rounded-xl border border-[#1C2B26] bg-[#0F1F1A] px-5 py-2.5 text-sm font-medium text-[#9BAFA8] transition-colors duration-200 hover:border-[#0F7A5A]/40 hover:text-[#F2F5F4]"
              >
                Projekt anfragen
              </Link>
            </motion.div>
          </motion.div>

          {Object.entries(footerLinks).map(([category, links], idx) => (
            <motion.div key={category} {...colMotion(0.08 + idx * 0.07)}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#2F5D4E]">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#6F8580] transition-colors duration-200 hover:text-[#9BAFA8]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mb-8 mt-14 h-px origin-left bg-gradient-to-r from-transparent via-[#1C2B26] to-transparent"
          initial={reduced ? false : { scaleX: 0, opacity: 0 }}
          whileInView={reduced ? undefined : { scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: easeOutExpo }}
        />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-[#2F5D4E]">
            © {currentYear} LAVIK Media. Alle Rechte vorbehalten.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link
              href="/impressum"
              className="text-xs text-[#2F5D4E] transition-colors hover:text-[#6F8580]"
            >
              Impressum
            </Link>
            <Link
              href="/datenschutz"
              className="text-xs text-[#2F5D4E] transition-colors hover:text-[#6F8580]"
            >
              Datenschutz
            </Link>
            <Link
              href="/cookies"
              className="text-xs text-[#2F5D4E] transition-colors hover:text-[#6F8580]"
            >
              Cookies
            </Link>
            <CookieSettingsLink className="text-xs text-[#2F5D4E] transition-colors hover:text-[#6F8580] cursor-pointer bg-transparent border-0 p-0 font-inherit" />
          </div>
        </div>
      </div>
    </footer>
  );
}
