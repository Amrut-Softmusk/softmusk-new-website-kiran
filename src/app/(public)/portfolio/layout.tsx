import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbs } from "@/lib/schema";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Portfolio — Software, ERP & Web Projects",
  description: "Selected work by Softmusk: enterprise software, ERP and billing systems, web platforms and IIoT solutions delivered for clients in India and abroad.",
  path: "/portfolio",
  keywords: ["software portfolio","ERP projects","web development portfolio Belagavi"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbs([{ name: "Portfolio", path: "/portfolio" }])} />
      {children}
    </>
  );
}
