import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div style={{ width: 40, height: 1, background: "rgba(255,255,255,0.3)" }} />
          <span style={{ fontSize: 20, letterSpacing: 8, textTransform: "uppercase", opacity: 0.5 }}>
            Kampala, Uganda
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 84, fontWeight: 900, letterSpacing: -3, lineHeight: 0.95, display: "flex" }}>
            Magero Kyayi.
          </div>
          <div style={{ fontSize: 30, opacity: 0.6, maxWidth: 900, display: "flex" }}>
            Founder, Digital Infrastructure for East African Institutions
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 18,
            letterSpacing: 4,
            textTransform: "uppercase",
            opacity: 0.4,
          }}
        >
          Soma · Synsify
        </div>
      </div>
    ),
    { ...size }
  );
}
