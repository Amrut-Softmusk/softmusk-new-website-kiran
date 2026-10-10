import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Campus Workshops & Technical Training for Colleges",
  description: "Hands-on technical workshops for engineering and degree colleges by Softmusk — AI, full-stack web, Cloud, IoT and more, delivered on campus across Karnataka.",
  path: "/workshops",
  image: "/step_learn.jpg",
  keywords: ["college workshops Karnataka","technical workshop for engineering colleges","IT training Belagavi"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
