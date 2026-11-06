import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { servicesData } from "./(public)/services/[slug]/data";
import { productsData } from "./(public)/products/[slug]/data";

// Slugs that only alias another page (canonical points elsewhere) stay out of the sitemap.
const ALIASES = new Set(["medimusk"]);

// Own images only; remote stock photos don't belong in our image sitemap.
const ownImages = (...srcs: (string | undefined)[]) =>
  srcs.filter((s): s is string => !!s && s.startsWith("/")).map((s) => absoluteUrl(s));

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const page = (
    path: string,
    priority: number,
    changeFrequency: "weekly" | "monthly" | "yearly" = "monthly",
    images: string[] = [],
  ): MetadataRoute.Sitemap[number] => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
    ...(images.length ? { images } : {}),
  });

  return [
    page("/", 1, "weekly", ownImages("/logo.png")),
    page("/services", 0.9),
    page("/products", 0.9, "monthly", ownImages(...Object.values(productsData).map((p) => p.heroImage))),
    page("/contact", 0.9),
    page("/internships", 0.8, "weekly", ownImages("/slide-intern.jpg")),
    page("/internship-registration", 0.7),
    page("/workshops", 0.7, "monthly", ownImages("/step_learn.jpg")),
    page("/portfolio", 0.7),
    page("/careers", 0.6, "weekly"),
    ...Object.entries(servicesData).map(([slug, s]) => page(`/services/${slug}`, 0.8, "monthly", ownImages(s.heroImage))),
    ...Object.entries(productsData)
      .filter(([slug]) => !ALIASES.has(slug))
      .map(([slug, p]) => page(`/products/${slug}`, 0.8, "monthly", ownImages(p.heroImage))),
    page("/privacy", 0.3, "yearly"),
  ];
}
