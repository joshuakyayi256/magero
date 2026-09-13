import { ImageResponse } from "next/og";
import { getProject } from "@/data/projects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateImageMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  return [
    {
      id: "og",
      alt: project ? `${project.title} — case study` : "Case study",
      size,
      contentType,
    },
  ];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  const title = project?.title ?? "Case Study";
  const category = project?.category ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#0a0a0a",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <span style={{ fontSize: 20, letterSpacing: 8, textTransform: "uppercase", opacity: 0.45, display: "flex" }}>
          {category}
        </span>
        <div style={{ fontSize: 88, fontWeight: 900, letterSpacing: -3, lineHeight: 0.95, maxWidth: 1000, display: "flex" }}>
          {title}
        </div>
        <span style={{ fontSize: 20, letterSpacing: 4, textTransform: "uppercase", opacity: 0.4, display: "flex" }}>
          Magero Kyayi Joshua — Case Study
        </span>
      </div>
    ),
    { ...size }
  );
}
