import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "IT Services in Belagavi — Software, Web, Cloud & IIoT",
  description: "Custom software, web & mobile apps, Cloud & DevOps, Industrial IoT, database consultancy and digital marketing from Softmusk, Belagavi.",
  path: "/services",
  image: "/service_software_hd.jpg",
  keywords: ["software development services","web app development Belagavi","cloud automation","IIoT solutions","database consultancy","digital marketing Belagavi"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
