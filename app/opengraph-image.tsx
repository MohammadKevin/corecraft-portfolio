import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const runtime = "nodejs";
export const alt = `${profile.fullName} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0B0C0E",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          color: "#FFFFFF",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "9999px",
              background: "#FFFFFF",
              boxShadow: "0 0 10px rgba(255,255,255,0.7)",
            }}
          />
          <span
            style={{
              fontFamily: "monospace",
              fontSize: "18px",
              letterSpacing: "0.2em",
              color: "#9CA3AF",
            }}
          >
            AVAILABLE FOR NEW PROJECTS
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <span
            style={{
              fontSize: "68px",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            {profile.firstName} {profile.lastName}
          </span>
          <span
            style={{
              fontSize: "28px",
              color: "#E5E7EB",
              fontWeight: 600,
            }}
          >
            {profile.role}
          </span>
          <span
            style={{
              fontSize: "20px",
              color: "#9CA3AF",
              maxWidth: "800px",
              lineHeight: 1.5,
            }}
          >
            {profile.subtitle}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: "24px",
            fontFamily: "monospace",
            fontSize: "16px",
            color: "#6B7280",
          }}
        >
          <span>MALANG, INDONESIA</span>
          <span>CORECRAFT.MY.ID</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
