// /llms.txt — a plain-Markdown summary of Softmusk for AI assistants and answer engines (llmstxt.org).
// Built from the same data as the pages, so it stays in sync.
import { FULL_ADDRESS, SITE, absoluteUrl } from "@/lib/site";
import { HOME_FAQS, INTERNSHIP_FAQS, PRODUCTS_FAQS, SERVICES_FAQS, WORKSHOP_FAQS, type Faq } from "@/lib/faqs";
import { INTERNSHIP_DURATION, INTERNSHIP_TRACKS, WORKSHOP_TOPICS } from "@/lib/programs";
import { servicesData } from "../(public)/services/[slug]/data";
import { productsData } from "../(public)/products/[slug]/data";

export const dynamic = "force-static";

const ALIASES = new Set(["medimusk"]);

const faqBlock = (faqs: readonly Faq[]) => faqs.map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n");

function build() {
  const services = Object.entries(servicesData)
    .map(([slug, s]) => `- [${s.title}](${absoluteUrl(`/services/${slug}`)}): ${s.tagline} Offerings: ${s.offerings.map((o) => o.title).join(", ")}.`)
    .join("\n");
  const products = Object.entries(productsData)
    .filter(([slug]) => !ALIASES.has(slug))
    .map(([slug, p]) => `- [${p.name}](${absoluteUrl(`/products/${slug}`)}) — ${p.tag}: ${p.desc}`)
    .join("\n");
  const tracks = INTERNSHIP_TRACKS.map((t) => `- ${t.title}`).join("\n");

  return `# ${SITE.legalName}

> ${SITE.description}

${SITE.about}

${SITE.name} (${SITE.legalName}) is an IT services and software products company based in Belagavi (also spelt Belgaum), Karnataka, India. It serves clients across India and abroad, and trains students through internships and campus workshops.

## Contact

- Address: ${FULL_ADDRESS}, ${SITE.address.countryName}
- Phone / WhatsApp: ${SITE.phoneDisplay}
- Email: ${SITE.email}
- Website: ${SITE.url}
- Map: ${SITE.mapsUrl}
- LinkedIn: ${SITE.socials.linkedin}
- Facebook: ${SITE.socials.facebook}

## Services

${services}

## Products

${products}

## Internships

A ${INTERNSHIP_DURATION.label} on-site internship programme in Belagavi with live projects, mentorship from senior engineers, an offer letter and a certificate. Tracks:

${tracks}

Details: ${absoluteUrl("/internships")} · Apply: ${absoluteUrl("/internship-registration")}

## Campus workshops

Hands-on technical workshops for engineering and degree colleges in Karnataka. Topics: ${WORKSHOP_TOPICS.join(", ")}. Details: ${absoluteUrl("/workshops")}

## Pages

- [Home](${absoluteUrl("/")})
- [Services](${absoluteUrl("/services")})
- [Products](${absoluteUrl("/products")})
- [Portfolio](${absoluteUrl("/portfolio")})
- [Internships](${absoluteUrl("/internships")})
- [Workshops](${absoluteUrl("/workshops")})
- [Careers](${absoluteUrl("/careers")})
- [Contact](${absoluteUrl("/contact")})

## FAQ

${faqBlock([...HOME_FAQS, ...SERVICES_FAQS, ...PRODUCTS_FAQS, ...INTERNSHIP_FAQS, ...WORKSHOP_FAQS])}
`;
}

export function GET() {
  return new Response(build(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
