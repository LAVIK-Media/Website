/**
 * Client-side cookie / storage consent for LAVIK Media.
 * Used by the banner, footer "Cookie-Einstellungen", and (later) analytics loaders.
 */

export const CONSENT_STORAGE_KEY = "lavik-cookie-consent-v1" as const;
export const CONSENT_VERSION = 1 as const;

export type CookieConsentState = {
  version: typeof CONSENT_VERSION;
  /** Always true once the user has confirmed any choice */
  necessary: true;
  /** Opt-in: statistics / analytics (no scripts loaded until true) */
  statistics: boolean;
  updatedAt: string;
};

export function parseConsent(raw: string | null): CookieConsentState | null {
  if (!raw) return null;
  try {
    const o = JSON.parse(raw) as Partial<CookieConsentState>;
    if (o.version !== CONSENT_VERSION || o.necessary !== true) return null;
    if (typeof o.statistics !== "boolean") return null;
    if (typeof o.updatedAt !== "string") return null;
    return o as CookieConsentState;
  } catch {
    return null;
  }
}

export function readConsent(): CookieConsentState | null {
  if (typeof window === "undefined") return null;
  return parseConsent(window.localStorage.getItem(CONSENT_STORAGE_KEY));
}

export function writeConsent(partial: {
  statistics: boolean;
}): CookieConsentState {
  const state: CookieConsentState = {
    version: CONSENT_VERSION,
    necessary: true,
    statistics: partial.statistics,
    updatedAt: new Date().toISOString(),
  };
  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new Event("lavik-consent-updated"));
  return state;
}

/** True only after explicit opt-in — use before loading analytics */
export function hasStatisticsConsent(): boolean {
  return readConsent()?.statistics === true;
}

export const OPEN_COOKIE_SETTINGS_EVENT = "lavik-open-cookie-settings";

/** Homepage intro scrub finished or skipped — cookie UI should not block scrolling before this. */
export const INTRO_COMPLETE_EVENT = "lavik-intro-complete";

export function openCookieSettings(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_COOKIE_SETTINGS_EVENT));
}
