import type { Metadata } from "next";
import { SITE } from "./site";

/** Per-page metadata with canonical URL and matching Open Graph / Twitter tags. */
export function pageMetadata({
  title,
  description,
  path,
  image,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
}): Metadata {
  // A page-level openGraph object replaces the root one, so fall back to the generated site card.
  const images = image ? [{ url: image, alt: title }] : [{ url: "/opengraph-image", width: 1200, height: 630, alt: SITE.title }];
  const fullTitle = `${title} | ${SITE.name}`;
  return {
    // Absolute: a nested layout with its own title would otherwise drop the root template.
    title: { absolute: fullTitle },
    description,
    keywords: keywords ? [...keywords, ...SITE.keywords.slice(0, 4)] : undefined,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE.legalName,
      locale: "en_IN",
      url: path,
      title: fullTitle,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: images.map((i) => i.url),
    },
  };
}
