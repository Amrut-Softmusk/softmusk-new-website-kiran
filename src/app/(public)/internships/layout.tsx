import { JsonLd } from "@/components/seo/JsonLd";
import { FaqSection } from "@/components/seo/FaqSection";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbs, internshipCourses } from "@/lib/schema";
import { INTERNSHIP_FAQS } from "@/lib/faqs";
import { INTERNSHIP_DURATION, INTERNSHIP_TRACKS } from "@/lib/programs";

export const metadata = pageMetadata({
  title: "IT Internships in Belagavi for Students",
  description: "6-month industry internships at Softmusk, Belagavi — live projects in React & IIoT, Next.js full-stack, Cloud & DevOps and UI/UX, with mentorship, offer letter and certificate.",
  path: "/internships",
  image: "/slide-intern.jpg",
  keywords: ["internship in Belagavi", "internship in Belgaum", "IT internship Karnataka", "engineering internship", "BCA MCA internship", "software internship with certificate", "full stack internship", "Cloud DevOps internship"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          internshipCourses(INTERNSHIP_TRACKS, INTERNSHIP_DURATION.iso),
          breadcrumbs([{ name: "Internships", path: "/internships" }]),
        ]}
      />
      {children}
      <FaqSection
        id="faq"
        faqs={INTERNSHIP_FAQS}
        title="Internship questions"
        intro="Everything students ask before applying to a Softmusk internship."
      />
    </>
  );
}
