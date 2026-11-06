// Question-and-answer copy shown on pages and mirrored into FAQPage JSON-LD and /llms.txt.
// Answers are short, self-contained statements so search engines and AI assistants can quote them directly.
import { FULL_ADDRESS, SITE } from "./site";

export type Faq = { q: string; a: string };

export const HOME_FAQS: Faq[] = [
  {
    q: "What is Softmusk?",
    a: `${SITE.legalName} is an IT and software company in Belagavi (Belgaum), Karnataka, India. It builds custom software, ERP and billing systems, web and mobile apps, Cloud & DevOps and Industrial IoT solutions, and runs IT internships and campus workshops.`,
  },
  {
    q: "Where is Softmusk located?",
    a: `Softmusk's office is at ${FULL_ADDRESS}, India. The team works with clients across India and abroad.`,
  },
  {
    q: "What software services does Softmusk offer?",
    a: "Custom software development, web and mobile app development, Smart Industry (IIoT) solutions, Cloud automation and DevOps, database consultancy, and digital marketing including SEO.",
  },
  {
    q: "What software products does Softmusk make?",
    a: "GoldMusk ERP for jewellers, MediMusk Retail (SoftBill) for pharmacies and chemists, SoftBill Wholesale for pharma distributors, SoftBill Restaurant POS, and Softmusk ID ERP for student and corporate ID cards.",
  },
  {
    q: "Does Softmusk offer internships for students?",
    a: "Yes. Softmusk runs a 6-month internship programme in Belagavi with live projects in React & IIoT, Next.js full-stack, Cloud & DevOps, and UI/UX design, guided by senior engineers. Interns receive an offer letter and a certificate.",
  },
  {
    q: "How do I contact Softmusk?",
    a: `Call or WhatsApp ${SITE.phoneDisplay}, email ${SITE.email}, or send an enquiry from the contact page at ${SITE.url}/contact.`,
  },
];

export const SERVICES_FAQS: Faq[] = [
  {
    q: "Which IT services does Softmusk provide in Belagavi?",
    a: "Software development, web and app development, Smart Industry (IIoT), Cloud automation and DevOps, database consultancy, and digital marketing. Each service is delivered by Softmusk's in-house team in Belagavi, Karnataka.",
  },
  {
    q: "Does Softmusk work with clients outside Belagavi?",
    a: "Yes. Softmusk works with businesses across India and abroad. Projects are run remotely with regular reviews, and on-site visits where needed.",
  },
  {
    q: "What technologies does Softmusk use?",
    a: "Next.js, React and TypeScript for web apps; PostgreSQL and other relational databases; Docker, Kubernetes, CI/CD pipelines and AWS for cloud; and MQTT, OPC-UA and Modbus for industrial IoT.",
  },
  {
    q: "Can Softmusk build custom ERP or billing software?",
    a: "Yes. Softmusk builds custom ERP, billing, inventory and hospital management systems, and also sells ready-made ERP and POS products for jewellers, pharmacies, distributors and restaurants.",
  },
  {
    q: "How do I start a project with Softmusk?",
    a: `Share your requirements through the contact page, email ${SITE.email}, or call ${SITE.phoneDisplay}. The team reviews the scope and replies with next steps.`,
  },
];

export const PRODUCTS_FAQS: Faq[] = [
  {
    q: "What is GoldMusk ERP?",
    a: "GoldMusk ERP is an offline-first POS and ERP for Indian jewellers. It offers offline billing that keeps working when the internet drops, automated CGST/SGST/IGST and hallmarking compliance, digital karigar ledgers with melting-loss tracking, live gold rates and barcode tag printing.",
  },
  {
    q: "Which billing software does Softmusk offer for pharmacies?",
    a: "MediMusk Retail (SoftBill) is billing software for chemist shops, retail pharmacies and hospital dispensaries, with barcode billing, FIFO batch and expiry management and Schedule H compliance. SoftBill Wholesale is for pharma distributors and C&F agents, with batch tracking, credit terms and accounting integration.",
  },
  {
    q: "Does Softmusk have restaurant billing software?",
    a: "Yes. SoftBill Restaurant is a POS for restaurants, bars, lounges and food chains, with table floor maps, multi-printer KOT/BOT routing, recipe-based inventory deduction and daily cash shift balancing.",
  },
  {
    q: "What is Softmusk ID ERP?",
    a: "Softmusk ID ERP is ID card management software for schools, colleges, universities and companies. It covers student or staff data collection, webcam photo capture, card design and batch printing.",
  },
  {
    q: "How can I get a demo of a Softmusk product?",
    a: `Open the product's page and use the demo request form, or call ${SITE.phoneDisplay}. The team will arrange a walkthrough.`,
  },
];

export const INTERNSHIP_FAQS: Faq[] = [
  {
    q: "Does Softmusk offer internships in Belagavi?",
    a: `Yes. Softmusk runs a 6-month industry internship at its office in Belagavi, Karnataka, where interns work on production code with senior engineers.`,
  },
  {
    q: "Which internship domains are available?",
    a: "React & IIoT hardware, Next.js full-stack development with PostgreSQL, Cloud & DevOps with Docker, CI/CD and AWS, and UI/UX product design with Figma and Tailwind CSS.",
  },
  {
    q: "Do interns get a certificate?",
    a: "Yes. Selected interns receive an offer letter at the start and a certificate on completing the programme.",
  },
  {
    q: "Who can apply for a Softmusk internship?",
    a: "Engineering, BCA, MCA and other computer science students and recent graduates who want hands-on experience on real software projects.",
  },
  {
    q: "How do I apply for an internship at Softmusk?",
    a: `Fill in the form at ${SITE.url}/internship-registration and choose your domain. The team contacts you with the next batch and schedule.`,
  },
];

export const WORKSHOP_FAQS: Faq[] = [
  {
    q: "Does Softmusk conduct workshops in colleges?",
    a: "Yes. Softmusk runs hands-on technical workshops on campus for engineering and degree colleges across Karnataka, led by engineers who build production software.",
  },
  {
    q: "Which topics do Softmusk workshops cover?",
    a: "Next.js and React, full-stack web development, Cloud deployment on AWS and Vercel, and UI/UX with Tailwind CSS and Framer Motion.",
  },
  {
    q: "What do students get from a workshop?",
    a: "Students build and deploy a working project they can add to their resume, and get the workshop slides and a portfolio user manual to keep.",
  },
  {
    q: "How can a college book a workshop?",
    a: `Use the request form on the workshops page, email ${SITE.email}, or call ${SITE.phoneDisplay} to plan dates and topics.`,
  },
];
