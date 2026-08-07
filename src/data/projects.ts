export interface Project {
  slug: string;
  title: string;
  category: string;
  teaser: string;
  span: string;
  tall: boolean;
  comingSoon?: boolean;
  year?: string;
  role?: string;
  tools?: string[];
  description?: string;
  challenge?: string;
  solution?: string;
}

export const projects: Project[] = [
  {
    slug: "rentbetahouse",
    title: "Rentbetahouse",
    category: "Fintech / PropTech",
    teaser: "Role-based rental platform with real-time listings and integrated payments.",
    span: "lg:col-span-8",
    tall: false,
    year: "2025",
    role: "Lead Developer",
    tools: ["Next.js", "Firebase", "Tailwind CSS"],
    description:
      "Engineering a scalable solution for rent financing and property management, bridging the gap between landlords and tenants.",
    challenge:
      "Developing a robust rent-financing engine that handles complex payment installments while maintaining real-time data integrity.",
    solution:
      "I integrated a high-performance Firebase backend with custom state management to ensure seamless financial tracking and automated notifications.",
  },
  {
    slug: "munno-ddala",
    title: "Munno Ddala SACCO",
    category: "System Architecture",
    teaser: "Full savings & credit cooperative system with member dashboards.",
    span: "lg:col-span-4",
    tall: false,
    year: "2026",
    role: "System Architect",
    tools: ["React", "Node.js", "PostgreSQL"],
    description:
      "A comprehensive digital management system for SACCO operations, focusing on security and role-based data visibility.",
    challenge:
      "Managing highly sensitive financial data across multiple user roles (Admins, Managers, Members) with zero room for synchronization errors.",
    solution:
      "Architected a role-based intelligence layer that strictly controls data access while providing real-time financial reporting for directors.",
  },
  {
    slug: "green-world-safaris",
    title: "Green World Safaris",
    category: "Travel & Tourism",
    teaser: "Immersive booking experience for East African safari packages.",
    span: "lg:col-span-4",
    tall: true,
    comingSoon: true,
  },
  {
    slug: "hanker-homes",
    title: "Hanker Homes Ltd",
    category: "Real Estate Design",
    teaser: "Premium property showcase with 3D render integrations.",
    span: "lg:col-span-4",
    tall: true,
    comingSoon: true,
  },
  {
    slug: "citie-photography",
    title: "Citie Photography",
    category: "Visual Storytelling",
    teaser: "Editorial photography studio site with gallery and booking flow.",
    span: "lg:col-span-4",
    tall: true,
    comingSoon: true,
  },
  {
    slug: "vivacity-aromatherapy",
    title: "Vivacity Aromatherapy",
    category: "E-Commerce",
    teaser: "Wellness brand store with curated product experience.",
    span: "lg:col-span-6",
    tall: false,
    comingSoon: true,
  },
  {
    slug: "inspirational-youth",
    title: "Inspirational Youth",
    category: "Social Initiative",
    teaser: "Community platform connecting mentors with young professionals.",
    span: "lg:col-span-6",
    tall: false,
    comingSoon: true,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
