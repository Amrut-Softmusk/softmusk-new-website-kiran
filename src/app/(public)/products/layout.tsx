import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Business Software Products — ERP, POS & Billing",
  description: "GoldMusk jewellery ERP, MediMusk pharmacy billing, SoftBill wholesale & restaurant POS and student ID ERP — business software by Softmusk, Belagavi.",
  path: "/products",
  image: "/goldmusk-dashboard.png",
  keywords: ["jewellery ERP software","pharmacy billing software","medical store software","wholesale billing software","restaurant POS software","GST billing software India"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
