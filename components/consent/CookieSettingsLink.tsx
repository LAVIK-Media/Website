"use client";

import { openCookieSettings } from "@/lib/cookie-consent";

type Props = {
  className?: string;
  children?: React.ReactNode;
};

export default function CookieSettingsLink({
  className,
  children = "Cookie-Einstellungen",
}: Props) {
  return (
    <button
      type="button"
      onClick={() => openCookieSettings()}
      className={className}
    >
      {children}
    </button>
  );
}
