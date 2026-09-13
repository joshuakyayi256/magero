import type { Metadata } from "next";
import { getProject } from "@/data/projects";
import { siteConfig } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  const description = project.description ?? project.teaser;

  return {
    title: project.title,
    description,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    // Coming-soon case studies are placeholder pages with little content —
    // keep them out of Google's index until the real write-up ships.
    robots: project.comingSoon
      ? { index: false, follow: true }
      : { index: true, follow: true },
    openGraph: {
      url: `${siteConfig.url}/projects/${project.slug}`,
      title: `${project.title} | ${siteConfig.name}`,
      description,
      type: "article",
    },
  };
}

export default function ProjectSlugLayout({ children }: { children: React.ReactNode }) {
  return children;
}
