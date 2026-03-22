"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CONSENT_STORAGE_KEY,
  INTRO_COMPLETE_EVENT,
  OPEN_COOKIE_SETTINGS_EVENT,
  parseConsent,
  writeConsent,
} from "@/lib/cookie-consent";

function loadFromStorage() {
  if (typeof window === "undefined") return null;
  return parseConsent(window.localStorage.getItem(CONSENT_STORAGE_KEY));
}

export default function CookieConsent() {
  const pathname = usePathname();
  /** On `/` we wait for intro scroll / finish; other routes show cookie UI immediately. */
  const [homeIntroDone, setHomeIntroDone] = useState(false);
  const introFinished = pathname !== "/" || homeIntroDone;
  /** Footer „Cookie-Einstellungen“ während des Intros: Dialog trotzdem anzeigen */
  const [settingsForced, setSettingsForced] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [statistics, setStatistics] = useState(false);

  const syncFromStorage = useCallback(() => {
    const existing = loadFromStorage();
    if (existing) {
      setStatistics(existing.statistics);
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    queueMicrotask(() => {
      setMounted(true);
      syncFromStorage();
    });
  }, [syncFromStorage]);

  useEffect(() => {
    if (pathname === "/") {
      queueMicrotask(() => setHomeIntroDone(false));
    }
  }, [pathname]);

  useEffect(() => {
    const onIntroDone = () => setHomeIntroDone(true);
    window.addEventListener(INTRO_COMPLETE_EVENT, onIntroDone);
    return () => window.removeEventListener(INTRO_COMPLETE_EVENT, onIntroDone);
  }, []);

  const showOverlay = visible && (introFinished || settingsForced);

  useEffect(() => {
    if (!showOverlay) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [showOverlay]);

  useEffect(() => {
    const onOpen = () => {
      const existing = loadFromStorage();
      setStatistics(existing?.statistics ?? false);
      setSettingsForced(true);
      setVisible(true);
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key === CONSENT_STORAGE_KEY) syncFromStorage();
    };
    const onConsentUpdated = () => syncFromStorage();

    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, onOpen);
    window.addEventListener("storage", onStorage);
    window.addEventListener("lavik-consent-updated", onConsentUpdated);
    return () => {
      window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, onOpen);
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("lavik-consent-updated", onConsentUpdated);
    };
  }, [syncFromStorage]);

  const closeModal = () => {
    setSettingsForced(false);
    setVisible(false);
  };

  const acceptNecessaryOnly = () => {
    writeConsent({ statistics: false });
    closeModal();
  };

  const saveSelection = () => {
    writeConsent({ statistics: statistics });
    closeModal();
  };

  if (!mounted || !showOverlay) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center p-4 sm:p-6 pointer-events-none"
      aria-hidden={false}
    >
      <div
        className="absolute inset-0 bg-[#050706]/80 backdrop-blur-sm pointer-events-auto"
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-consent-title"
        aria-describedby="cookie-consent-desc"
        className="relative w-full max-w-lg pointer-events-auto rounded-2xl border border-[#1C2B26] bg-[#0A1411] shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
      >
        <div className="p-6 sm:p-8">
          <h2
            id="cookie-consent-title"
            className="text-lg font-display font-semibold text-[#F2F5F4] mb-2"
          >
            Cookies &amp; Datenschutz
          </h2>
          <p
            id="cookie-consent-desc"
            className="text-sm text-[#9BAFA8] leading-relaxed mb-6"
          >
            Wir verwenden nur technisch notwendige Speicherung, damit diese
            Website funktioniert, sowie optional Statistik-Cookies, sofern Sie
            einwilligen. Es werden keine nicht notwendigen Skripte geladen,
            bevor Sie zustimmen. Details finden Sie in der{" "}
            <Link
              href="/datenschutz"
              className="text-[#1FBF8F] hover:text-[#2FD4A4] underline underline-offset-2"
            >
              Datenschutzerklärung
            </Link>{" "}
            und der{" "}
            <Link
              href="/cookies"
              className="text-[#1FBF8F] hover:text-[#2FD4A4] underline underline-offset-2"
            >
              Cookie-Übersicht
            </Link>
            .
          </p>

          <div className="rounded-xl border border-[#1C2B26] bg-[#0F1F1A]/40 p-4 mb-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#6F8580] mb-3">
              Einstellungen
            </p>
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={true}
                disabled
                className="mt-1 h-4 w-4 rounded border-[#1C2B26] bg-[#0F1F1A] text-[#0F7A5A] opacity-70"
              />
              <span className="text-sm text-[#9BAFA8]">
                <span className="text-[#F2F5F4] font-medium">
                  Unbedingt erforderlich
                </span>
                <br />
                <span className="text-[#6F8580] text-xs leading-relaxed">
                  z. B. Speicherung Ihrer Cookie-Entscheidung (lokal im
                  Browser), sichere Bereitstellung der Seite. Kann nicht
                  abgewählt werden.
                </span>
              </span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer group mt-4">
              <input
                type="checkbox"
                checked={statistics}
                onChange={(e) => setStatistics(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-[#1C2B26] bg-[#0F1F1A] text-[#0F7A5A] focus:ring-[#0F7A5A]/40"
              />
              <span className="text-sm text-[#9BAFA8]">
                <span className="text-[#F2F5F4] font-medium">
                  Statistik (optional)
                </span>
                <br />
                <span className="text-[#6F8580] text-xs leading-relaxed">
                  Hilft uns zu verstehen, wie die Website genutzt wird. Wird
                  erst nach Ihrer Einwilligung aktiviert (derzeit werden keine
                  Analyse-Skripte eingebunden).
                </span>
              </span>
            </label>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
            <button
              type="button"
              onClick={acceptNecessaryOnly}
              className="order-3 sm:order-1 px-5 py-3 rounded-xl border border-[#1C2B26] bg-transparent text-sm font-medium text-[#9BAFA8] hover:border-[#0F7A5A]/40 hover:text-[#F2F5F4] transition-colors"
            >
              Nur die Notwendigen
            </button>
            <button
              type="button"
              onClick={saveSelection}
              className="order-2 px-5 py-3 rounded-xl border border-[#0F7A5A]/50 bg-[#0F7A5A]/15 text-sm font-medium text-[#F2F5F4] hover:bg-[#0F7A5A]/25 transition-colors"
            >
              Auswahl speichern
            </button>
            <button
              type="button"
              onClick={() => {
                setStatistics(true);
                writeConsent({ statistics: true });
                closeModal();
              }}
              className="order-1 sm:order-3 px-5 py-3 rounded-xl bg-[#0F7A5A] text-sm font-semibold text-[#F2F5F4] hover:bg-[#159A73] transition-colors"
            >
              Alle akzeptieren
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
