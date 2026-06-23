import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MouseGlow from "@/components/ui/MouseGlow";
import CookieConsent from "@/components/consent/CookieConsent";
import UmamiAnalytics from "@/components/consent/UmamiAnalytics";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const SITE_URL = "https://lavik-media.com";

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "LAVIK Media",
  url: SITE_URL,
  description:
    "Webdesign und Entwicklung mit Substanz – individuell, technisch sauber, persönlich betreut.",
  email: "jakob@lavik-media.com",
  telephone: "+4915792523149",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kufstein",
    addressRegion: "Tirol",
    addressCountry: "AT",
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "LAVIK Media – Webdesign & Entwicklung mit Substanz",
    template: "%s | LAVIK Media",
  },
  description:
    "Wir gestalten und entwickeln Websites, die zu Ihrem Unternehmen passen – individuell, technisch sauber und nach dem Launch persönlich betreut. Aus Tirol für Kund:innen im gesamten DACH-Raum.",
  keywords: [
    "Webdesign",
    "Webentwicklung",
    "Website erstellen lassen",
    "Webdesign Tirol",
    "Webdesign Kufstein",
    "Next.js Agentur",
    "individuelle Website",
    "Webagentur DACH",
  ],
  authors: [{ name: "LAVIK Media" }],
  creator: "LAVIK Media",
  openGraph: {
    type: "website",
    locale: "de_AT",
    url: SITE_URL,
    siteName: "LAVIK Media",
    title: "LAVIK Media – Webdesign & Entwicklung mit Substanz",
    description:
      "Individuelle Webauftritte: durchdachtes Design, saubere Technik, persönliche Betreuung nach dem Launch.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LAVIK Media – Webdesign und Entwicklung",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LAVIK Media – Webdesign & Entwicklung mit Substanz",
    description:
      "Individuelle Webauftritte: durchdachtes Design, saubere Technik, persönliche Betreuung nach dem Launch.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${inter.variable} ${syne.variable}`}>
      <body className="bg-[#06060c] text-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
        <MouseGlow />
        <UmamiAnalytics />
        <CookieConsent />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
