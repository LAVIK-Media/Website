"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import {
  CONSENT_STORAGE_KEY,
  hasStatisticsConsent,
} from "@/lib/cookie-consent";

const UMAMI_SRC = "https://cloud.umami.is/script.js";
const UMAMI_WEBSITE_ID = "859b2f49-9b9a-4716-a813-1e3aad0d5e9d";

/**
 * Lädt Umami nur bei erteilter Statistik-Einwilligung (siehe CookieConsent / writeConsent).
 */
export default function UmamiAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const sync = () => setEnabled(hasStatisticsConsent());
    sync();

    const onConsentUpdated = () => sync();
    const onStorage = (e: StorageEvent) => {
      if (e.key === CONSENT_STORAGE_KEY) sync();
    };

    window.addEventListener("lavik-consent-updated", onConsentUpdated);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("lavik-consent-updated", onConsentUpdated);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  if (!enabled) return null;

  return (
    <Script
      id="umami-analytics"
      src={UMAMI_SRC}
      strategy="afterInteractive"
      data-website-id={UMAMI_WEBSITE_ID}
    />
  );
}
