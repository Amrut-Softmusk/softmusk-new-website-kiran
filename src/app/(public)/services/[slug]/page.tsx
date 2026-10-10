import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbs, serviceSchema } from "@/lib/schema";
import { servicesData } from "./data";
import ServiceDetailView from "./ServiceDetailView";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const service = servicesData[slug];
  if (!service) return {};
  return pageMetadata({
    title: `${service.title} Services in Belagavi`,
    description: `${service.tagline} ${service.category} by Softmusk Info Pvt. Ltd., Belagavi — for businesses across India.`,
    path: `/services/${slug}`,
    image: service.heroImage,
    keywords: [service.title, service.category, `${service.title} Belagavi`, ...service.offerings.map((o) => o.title)],
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = servicesData[slug];
  if (!service) notFound();
  const path = `/services/${slug}`;
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({ name: service.title, description: service.description, path, category: service.category, image: service.heroImage }),
          breadcrumbs([
            { name: "Services", path: "/services" },
            { name: service.title, path },
          ]),
        ]}
      />
      <ServiceDetailView slug={slug} />
    </>
  );
}
