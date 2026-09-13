import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Selected Works",
  description:
    "Case studies from fintech, edtech, and system-architecture projects built for East African institutions by Magero Kyayi Joshua.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    url: `${siteConfig.url}/projects`,
    title: `Selected Works | ${siteConfig.name}`,
    description:
      "Case studies from fintech, edtech, and system-architecture projects built for East African institutions.",
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
