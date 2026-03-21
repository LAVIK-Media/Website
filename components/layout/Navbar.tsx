"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/leistungen", label: "Leistungen" },
  { href: "/projekte", label: "Projekte" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[#050706]/90 backdrop-blur-2xl border-b border-[#1C2B26]"
            : "bg-transparent"
        )}
      >
        <div className="container-custom">
          <nav className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-0.5 flex-shrink-0">
              <span className="text-xl font-display font-bold text-[#F2F5F4] tracking-tight">
                LAVIK
              </span>
              <span className="text-xl font-display font-light text-[#1FBF8F] tracking-tight">
                Media
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors duration-200 relative",
                    pathname === link.href
                      ? "text-[#F2F5F4]"
                      : "text-[#6F8580] hover:text-[#9BAFA8]"
                  )}
                >
                  {link.label}
                  {pathname === link.href && (
                    <span className="absolute -bottom-1 left-0 right-0 h-px bg-[#1FBF8F]/50 rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center">
              <Link
                href="/kontakt"
                className="px-5 py-2.5 rounded-xl bg-[#0F7A5A] hover:bg-[#159A73] text-[#F2F5F4] text-sm font-semibold transition-all duration-200 hover:shadow-[0_0_24px_rgba(15,122,90,0.45)]"
              >
                Projekt anfragen
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 -mr-2 text-[#9BAFA8] hover:text-[#F2F5F4] transition-colors rounded-lg"
              aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-[#0A1411] border-l border-[#1C2B26] flex flex-col"
            >
              <div className="flex items-center justify-between px-6 h-16 border-b border-[#1C2B26]">
                <span className="text-lg font-display font-bold text-[#F2F5F4]">
                  LAVIK
                  <span className="text-[#1FBF8F] font-light">Media</span>
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 -mr-2 text-[#6F8580] hover:text-[#F2F5F4] transition-colors"
                  aria-label="Menü schließen"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 px-6 py-8 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "block py-3 px-3 rounded-lg text-base font-medium transition-colors duration-200",
                        pathname === link.href
                          ? "text-[#F2F5F4] bg-[#0F7A5A]/10"
                          : "text-[#6F8580] hover:text-[#9BAFA8] hover:bg-[#0F1F1A]"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="px-6 pb-8">
                <Link
                  href="/kontakt"
                  className="block w-full py-3.5 rounded-xl bg-[#0F7A5A] hover:bg-[#159A73] text-[#F2F5F4] text-sm font-semibold text-center transition-all duration-200"
                >
                  Projekt anfragen
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
