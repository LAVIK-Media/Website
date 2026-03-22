import type { MetadataRoute } from "next";

const BASE = "https://lavik-media.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "Googlebot",
        allow: "/",
      },
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
