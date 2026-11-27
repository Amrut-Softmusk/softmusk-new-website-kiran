import { SITE, absoluteUrl } from "./site";
import type { Faq } from "./faqs";

const ORG_ID = `${SITE.url}/#organization`;
const SITE_ID = `${SITE.url}/#website`;

// Kept in sync with services/[slug]/data.ts and products/[slug]/data.ts (no JSX deps, safe to import anywhere).
const SERVICE_LINKS = [
  { name: "Software Development", path: "/services/software-development" },
  { name: "Web & App Development", path: "/services/web-app-development" },
  { name: "Smart Industry (IIoT)", path: "/services/smart-industry" },
  { name: "Cloud Automation & DevOps", path: "/services/cloud-automation" },
  { name: "Database Consultancy", path: "/services/database-consultancy" },
  { name: "Digital Marketing & SEO", path: "/services/digital-marketing" },
];
const PRODUCT_LINKS = [
  { name: "GoldMusk ERP", path: "/products/goldmusk" },
  { name: "MediMusk Retail (SoftBill)", path: "/products/medimusk-retail" },
  { name: "SoftBill Wholesale", path: "/products/softbill-wholesale" },
  { name: "SoftBill Restaurant", path: "/products/softbill-restaurant" },
  { name: "Softmusk ID ERP", path: "/products/student-id-erp" },
];

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
        alternateName: [SITE.name, "SoftMusk", "Softmusk Info", "Softmusk Belagavi"],
        url: absoluteUrl("/"),
        logo: { "@type": "ImageObject", url: absoluteUrl("/softmusk-logo-full.png"), width: 720, height: 226 },
        image: absoluteUrl("/opengraph-image"),
        description: `${SITE.about} ${SITE.description}`,
        slogan: SITE.slogan,
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
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Softmusk services and products",
          itemListElement: [
            ...SERVICE_LINKS.map((s) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: s.name, url: absoluteUrl(s.path) },
            })),
            ...PRODUCT_LINKS.map((p) => ({
              "@type": "Offer",
              itemOffered: { "@type": "SoftwareApplication", name: p.name, url: absoluteUrl(p.path), applicationCategory: "BusinessApplication" },
            })),
          ],
        },
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

export function faqSchema(faqs: readonly Faq[]) {
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

const officePlace = {
  "@type": "Place",
  name: SITE.legalName,
  address: postalAddress,
};

/** One Course per internship track; the programme runs on site at the Belagavi office. */
export function internshipCourses(tracks: readonly { title: string; description: string }[], duration: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Softmusk internship tracks",
    itemListElement: tracks.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Course",
        name: `${t.title} Internship`,
        description: t.description,
        url: absoluteUrl("/internships"),
        provider: { "@id": ORG_ID },
        timeRequired: duration,
        educationalCredentialAwarded: "Internship certificate",
        inLanguage: "en",
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "Onsite",
          location: officePlace,
          courseWorkload: duration,
        },
      },
    })),
  };
}

/** Campus workshops are booked per college, so they're a Service rather than dated Events. */
export function workshopSchema(topics: readonly string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Technical workshops for colleges",
    serviceType: "Campus technical training",
    description:
      "Hands-on technical workshops on campus for engineering and degree colleges, led by Softmusk engineers. Students build and deploy a real project.",
    url: absoluteUrl("/workshops"),
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "State", name: "Karnataka" },
    audience: { "@type": "EducationalAudience", educationalRole: "student" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Workshop topics",
      itemListElement: topics.map((t) => ({ "@type": "Offer", itemOffered: { "@type": "Course", name: t, provider: { "@id": ORG_ID } } })),
    },
  };
}

export type JobRole = {
  id: string;
  title: string;
  department: string;
  type: string;
  experience: string;
  location: string;
  overview: string;
  requirements: readonly string[];
};

/** JobPosting per open role. Remote roles are marked TELECOMMUTE as well as listing the office. */
export function jobPostings(roles: readonly JobRole[], posted: { datePosted: string; validThrough: string }) {
  return roles.map((r) => {
    const remote = /remote/i.test(r.location);
    const global = /global/i.test(r.location);
    const description = `<p>${r.overview}</p><p><strong>Experience:</strong> ${r.experience}</p><ul>${r.requirements
      .map((q) => `<li>${q}</li>`)
      .join("")}</ul>`;
    return {
      "@context": "https://schema.org",
      "@type": "JobPosting",
      title: r.title,
      description,
      identifier: { "@type": "PropertyValue", name: SITE.legalName, value: r.id },
      datePosted: posted.datePosted,
      validThrough: posted.validThrough,
      employmentType: /part/i.test(r.type) ? "PART_TIME" : /intern/i.test(r.type) ? "INTERN" : "FULL_TIME",
      industry: "Information Technology",
      occupationalCategory: r.department,
      directApply: true,
      url: absoluteUrl(`/careers#${r.id}`),
      hiringOrganization: {
        "@type": "Organization",
        "@id": ORG_ID,
        name: SITE.legalName,
        sameAs: absoluteUrl("/"),
        logo: absoluteUrl("/softmusk-logo-full.png"),
      },
      jobLocation: { "@type": "Place", address: postalAddress },
      ...(remote
        ? {
            jobLocationType: "TELECOMMUTE",
            ...(global ? {} : { applicantLocationRequirements: { "@type": "Country", name: "India" } }),
          }
        : {}),
    };
  });
}
