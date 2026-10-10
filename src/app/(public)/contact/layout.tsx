import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbs, faqSchema } from "@/lib/schema";
import { SUPPORT_FAQS } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact Us — Software Company in Belagavi",
  description: "Call +91 89710 20906, WhatsApp or email service@softmusk.com. Softmusk Info Pvt. Ltd., Khanapur Road, Shastri Nagar, Belagavi 590001.",
  path: "/contact",
  keywords: ["contact Softmusk","software company Belagavi contact","IT company near me Belagavi"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={[faqSchema(SUPPORT_FAQS), breadcrumbs([{ name: "Contact", path: "/contact" }])]} />
      {children}
    </>
  );
}
