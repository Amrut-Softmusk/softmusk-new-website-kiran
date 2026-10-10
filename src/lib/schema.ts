import { SITE, absoluteUrl } from "./site";

const ORG_ID = `${SITE.url}/#organization`;
const SITE_ID = `${SITE.url}/#website`;

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: SITE.address.street,
  addressLocality: SITE.address.locality,
  addressRegion: SITE.address.region,
  postalCode: SITE.address.postalCode,
  addressCountry: SITE.address.country,
};

/** Organization + LocalBusiness + WebSite graph, rendered once in the root layout. */
export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": ORG_ID,
        name: SITE.legalName,
        alternateName: SITE.name,
        url: absoluteUrl("/"),
        logo: { "@type": "ImageObject", url: absoluteUrl("/logo.png") },
        image: absoluteUrl("/opengraph-image"),
        description: SITE.description,
        foundingDate: SITE.foundingYear,
        email: SITE.email,
        telephone: SITE.phone,
        address: postalAddress,
        hasMap: SITE.mapsUrl,
        areaServed: [
          { "@type": "City", name: "Belagavi" },
          { "@type": "State", name: "Karnataka" },
          { "@type": "Country", name: "India" },
        ],
        knowsAbout: [
          "Custom Software Development",
          "ERP Software",
          "Web Application Development",
          "Cloud & DevOps",
          "Industrial IoT",
          "Database Consultancy",
          "Digital Marketing",
          "IT Training and Internships",
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer service",
            telephone: SITE.phone,
            email: SITE.email,
            areaServed: "IN",
            availableLanguage: ["English"],
          },
        ],
        sameAs: Object.values(SITE.socials),
      },
      {
        "@type": "WebSite",
        "@id": SITE_ID,
        url: absoluteUrl("/"),
        name: SITE.name,
        alternateName: SITE.legalName,
        inLanguage: "en-IN",
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceSchema(s: { name: string; description: string; path: string; category: string; image: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    serviceType: s.category,
    description: s.description,
    url: absoluteUrl(s.path),
    image: s.image.startsWith("http") ? s.image : absoluteUrl(s.image),
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "India" },
  };
}

export function softwareSchema(p: { name: string; description: string; path: string; category: string; image: string; features: string[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: p.name,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: p.category,
    operatingSystem: "Windows, Web",
    description: p.description,
    url: absoluteUrl(p.path),
    image: p.image.startsWith("http") ? p.image : absoluteUrl(p.image),
    featureList: p.features,
    publisher: { "@id": ORG_ID },
  };
}

export function faqSchema(faqs: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
