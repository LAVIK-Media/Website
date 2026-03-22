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
  description: "Webdesign & Entwicklung für Unternehmen in Kufstein, Tirol",
  email: "jakob@lavik-media.com",
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
    default:
      "LAVIK Media – Hochwertige Websites für Unternehmen in Kufstein, Tirol",
    template: "%s | LAVIK Media",
  },
  description:
    "LAVIK Media gestaltet und entwickelt professionelle, moderne Websites für lokale Unternehmen in Kufstein, Tirol und Umgebung. Individuelles Webdesign, saubere Entwicklung, langfristige Betreuung.",
  keywords: [
    "Webdesign Tirol",
    "Webdesign Kufstein",
    "Webentwicklung Kufstein",
    "Website erstellen lassen",
    "professionelle Website",
    "lokale Webdesign Agentur",
    "Next.js Agentur Tirol",
  ],
  authors: [{ name: "LAVIK Media" }],
  creator: "LAVIK Media",
  openGraph: {
    type: "website",
    locale: "de_AT",
    url: SITE_URL,
    siteName: "LAVIK Media",
    title:
      "LAVIK Media – Hochwertige Websites für Unternehmen in Kufstein, Tirol",
    description:
      "Professionelle Webauftritte für lokale Unternehmen. Individuelles Design, saubere Technik, persönliche Betreuung.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LAVIK Media – Webdesign & Entwicklung, Kufstein Tirol",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "LAVIK Media – Hochwertige Websites für Unternehmen in Kufstein, Tirol",
    description:
      "Professionelle Webauftritte für lokale Unternehmen. Individuelles Design, saubere Technik, persönliche Betreuung.",
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
