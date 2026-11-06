import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbs } from "@/lib/schema";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Apply for an Internship",
  description: "Register for a Softmusk internship in Belagavi. Pick your domain, share your details and our team will get back to you with the next batch and schedule.",
  path: "/internship-registration",
  image: "/step_register.jpg",
  keywords: ["internship registration","apply internship Belagavi"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbs([{ name: "Apply for an Internship", path: "/internship-registration" }])} />
      {children}
    </>
  );
}
