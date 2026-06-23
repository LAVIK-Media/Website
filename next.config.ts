import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/team-private/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, noimageindex, noarchive" },
          {
            key: "Cache-Control",
            value: "private, no-store, no-cache, must-revalidate",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          // HSTS — Browser auf HTTPS festnageln. preload nur einschalten,
          // wenn die Domain auch in hstspreload.org eingetragen werden soll.
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains",
          },
          // Cross-Origin-Opener-Policy isoliert den Browsing-Context — schützt
          // vor cross-origin window.opener Attacks (Tabnabbing, Spectre).
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Origin-Agent-Cluster",
            value: "?1",
          },
          // Verbietet, dass Browser oder andere Apps die Seite z. B. als
          // Speech/Brokered-API-Quelle nutzen, ohne explizite Freigabe.
          {
            key: "X-Permitted-Cross-Domain-Policies",
            value: "none",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
