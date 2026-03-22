import type { MetadataRoute } from "next";

const BASE = "https://lavik-media.com";

const PATHS = [
  "/",
  "/leistungen",
  "/projekte",
  "/ueber-uns",
  "/kontakt",
  "/datenschutz",
  "/impressum",
  "/cookies",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return PATHS.map((path) => ({
    url: path === "/" ? BASE : `${BASE}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "/" ? 1 : 0.8,
  }));
}
