import { JsonLd } from "@/components/seo/JsonLd";
import { FaqSection } from "@/components/seo/FaqSection";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbs, workshopSchema } from "@/lib/schema";
import { WORKSHOP_FAQS } from "@/lib/faqs";
import { WORKSHOP_TOPICS } from "@/lib/programs";

export const metadata = pageMetadata({
  title: "Campus Workshops & Technical Training for Colleges",
  description: "Hands-on technical workshops for engineering and degree colleges by Softmusk — Next.js, React, full-stack web, Cloud and UI/UX, delivered on campus across Karnataka.",
  path: "/workshops",
  image: "/step_learn.jpg",
  keywords: ["college workshops Karnataka", "technical workshop for engineering colleges", "IT training Belagavi", "Next.js workshop", "full stack workshop for students"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={[workshopSchema(WORKSHOP_TOPICS), breadcrumbs([{ name: "Workshops", path: "/workshops" }])]} />
      {children}
      <FaqSection id="faq" faqs={WORKSHOP_FAQS} title="Workshop questions" intro="For principals, placement officers and faculty planning a workshop." />
    </>
  );
}
