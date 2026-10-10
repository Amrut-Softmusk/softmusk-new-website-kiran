import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbs, softwareSchema } from "@/lib/schema";
import { productsData } from "./data";
import ProductDetailView from "./ProductDetailView";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

// Old URLs that show the same product as another slug; they canonicalise to it.
const CANONICAL_SLUG: Record<string, string> = { medimusk: "medimusk-retail" };

export function generateStaticParams() {
  return Object.keys(productsData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const product = productsData[slug];
  if (!product) return {};
  return pageMetadata({
    title: `${product.name} — ${product.tag}`,
    description: product.tagline + " " + product.desc.split(". ")[0] + ".",
    path: `/products/${CANONICAL_SLUG[slug] ?? slug}`,
    image: product.heroImage,
    keywords: [product.name, product.tag, ...product.highlights],
  });
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = productsData[slug];
  if (!product) notFound();
  const path = `/products/${CANONICAL_SLUG[slug] ?? slug}`;
  return (
    <>
      <JsonLd
        data={[
          softwareSchema({
            name: product.name,
            description: product.desc,
            path,
            category: product.tag,
            image: product.heroImage,
            features: product.features.map((f) => f.title),
          }),
          breadcrumbs([
            { name: "Products", path: "/products" },
            { name: product.name, path },
          ]),
        ]}
      />
      <ProductDetailView slug={slug} />
    </>
  );
}
