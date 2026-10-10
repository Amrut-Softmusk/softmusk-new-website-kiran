import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "IT Internships in Belagavi for Students",
  description: "Industry internships at Softmusk, Belagavi — live projects in full-stack, Cloud & DevOps, IoT and data, with mentorship and certification.",
  path: "/internships",
  image: "/slide-intern.jpg",
  keywords: ["internship in Belagavi","IT internship Karnataka","engineering internship","BCA MCA internship","software internship with certificate"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
