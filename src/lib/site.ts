// Single source of truth for business details (NAP), used by pages, metadata and JSON-LD.

export const SITE = {
  name: "Softmusk",
  legalName: "Softmusk Info Pvt. Ltd.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.softmusk.com").replace(/\/$/, ""),
  title: "Softmusk Info Pvt. Ltd. | IT & Software Company in Belagavi",
  description:
    "Softmusk Info Pvt. Ltd. is an IT & software company in Belagavi, Karnataka — custom software, ERP, web apps, Cloud & DevOps, IIoT solutions, IT training and internships.",
  foundingYear: "2006",
  email: "service@softmusk.com",
  phone: "+918971020906",
  phoneDisplay: "+91 89710 20906",
  whatsapp: "https://wa.me/918971020906",
  address: {
    street: "3rd Floor, Adishakti Apartment, Opposite Fire Brigade Station, Khanapur Road, Shastri Nagar",
    locality: "Belagavi",
    region: "Karnataka",
    postalCode: "590001",
    country: "IN",
    countryName: "India",
  },
  mapsEmbed:
    "https://www.google.com/maps?q=Softmusk+Info+Pvt+Ltd,+Khanapur+Road,+Shastri+Nagar,+Belagavi+590001&output=embed",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Softmusk+Info+Pvt+Ltd+Khanapur+Road+Shastri+Nagar+Belagavi",
  socials: {
    facebook: "https://www.facebook.com/softmuskinfo/",
    linkedin: "https://in.linkedin.com/company/softmusk",
  },
  keywords: [
    "Softmusk",
    "Softmusk Info Pvt Ltd",
    "software company in Belagavi",
    "IT company in Belagavi",
    "software company in Belgaum",
    "IT company in Belgaum",
    "software development Belgaum",
    "web development company Belagavi",
    "ERP software Karnataka",
    "custom software development India",
    "Cloud and DevOps services",
    "IIoT solutions",
    "pharmacy billing software",
    "jewellery ERP software",
    "restaurant billing software",
    "IT internship in Belagavi",
    "engineering internship Karnataka",
    "college workshops Belagavi",
  ],
} as const;

export const FULL_ADDRESS = `${SITE.address.street}, ${SITE.address.locality}, ${SITE.address.region} ${SITE.address.postalCode}`;

export const absoluteUrl = (path = "/") => `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;

export const SUPPORT_FAQS = [
  {
    q: "What does Softmusk do?",
    a: "Softmusk Info Pvt. Ltd. is an IT and software company in Belagavi, Karnataka. We build custom software, ERP and billing systems, web applications, Cloud & DevOps and IIoT solutions, and run IT training, internships and campus workshops.",
  },
  {
    q: "What type of technical support does Softmusk provide?",
    a: "Support can include assistance related to software applications, databases, deployments, cloud infrastructure and other technology solutions delivered by Softmusk.",
  },
  {
    q: "How can I contact the Softmusk team?",
    a: `You can call us at ${SITE.phoneDisplay}, message us on WhatsApp, email ${SITE.email}, or send an enquiry through the form on this page.`,
  },
  {
    q: "Can I request support for an existing project?",
    a: "Yes. Share the project details and the issue or requirement with our team so we can understand the situation and discuss the available support options.",
  },
  {
    q: "Does Softmusk provide Cloud and DevOps support?",
    a: "Yes. Softmusk provides Cloud and DevOps services including application deployment, CI/CD automation, Docker, Kubernetes and related infrastructure solutions.",
  },
  {
    q: "Where is Softmusk located?",
    a: `Our office is at ${FULL_ADDRESS}. We work with clients across India and abroad.`,
  },
] as const;
