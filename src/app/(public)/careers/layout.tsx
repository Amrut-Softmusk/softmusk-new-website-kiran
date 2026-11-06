import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbs, jobPostings } from "@/lib/schema";
import { JOBS_POSTED, ROLES } from "./roles";

export const metadata = pageMetadata({
  title: "Careers — Software & IT Jobs in Belagavi",
  description: "Join Softmusk Info Pvt. Ltd. in Belagavi. Explore openings in software development, Cloud & DevOps, IoT and digital marketing, and grow with an engineering-first team.",
  path: "/careers",
  keywords: ["software jobs Belagavi", "IT jobs Belgaum", "developer jobs Karnataka", "full stack developer jobs Belagavi", "fresher software jobs Belagavi"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={[...jobPostings(ROLES, JOBS_POSTED), breadcrumbs([{ name: "Careers", path: "/careers" }])]} />
      {children}
    </>
  );
}
