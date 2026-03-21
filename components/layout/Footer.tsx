import Link from "next/link";

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

  return (
    <footer className="relative border-t border-[#1C2B26] bg-[#050706]">
      {/* Glow top edge */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0F7A5A]/25 to-transparent" />

      <div className="container-custom py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-0.5 mb-4">
              <span className="text-xl font-display font-bold text-[#F2F5F4] tracking-tight">
                LAVIK
              </span>
              <span className="text-xl font-display font-light text-[#1FBF8F] tracking-tight">
                Media
              </span>
            </Link>
            <p className="text-sm text-[#6F8580] leading-relaxed max-w-xs mb-6">
              Hochwertige Websites für lokale Unternehmen in Tirol und Umgebung.
              Individuelles Design, saubere Technik, persönliche Betreuung.
            </p>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F1F1A] border border-[#1C2B26] text-[#9BAFA8] hover:text-[#F2F5F4] hover:border-[#0F7A5A]/40 text-sm font-medium transition-all duration-200"
            >
              Projekt anfragen
            </Link>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#2F5D4E] mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#6F8580] hover:text-[#9BAFA8] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-14 mb-8 h-px bg-gradient-to-r from-transparent via-[#1C2B26] to-transparent" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#2F5D4E]">
            © {currentYear} LAVIK Media. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/impressum"
              className="text-xs text-[#2F5D4E] hover:text-[#6F8580] transition-colors"
            >
              Impressum
            </Link>
            <Link
              href="/datenschutz"
              className="text-xs text-[#2F5D4E] hover:text-[#6F8580] transition-colors"
            >
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
