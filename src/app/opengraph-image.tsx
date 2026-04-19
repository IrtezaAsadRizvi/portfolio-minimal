import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt =
  "Irteza Asad Rizvi — Senior Full-Stack & AI Automation Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0A0A",
          padding: "72px 80px",
          color: "#E0DDD8",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            fontSize: 18,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#A8A49E",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              background: "#C9A84C",
              boxShadow: "0 0 18px rgba(201, 168, 76, 0.6)",
            }}
          />
          <div>Irtezaasadrizvi.github.io</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ width: 48, height: 3, background: "#C9A84C" }} />
          <div
            style={{
              fontSize: 80,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#F0ECE4",
              fontWeight: 500,
            }}
          >
            Irteza Asad Rizvi
          </div>
          <div
            style={{
              fontSize: 36,
              lineHeight: 1.2,
              color: "#A8A49E",
              maxWidth: 900,
            }}
          >
            Senior Full-Stack &amp; AI Automation Engineer
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 20,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#A8A49E",
          }}
        >
          <div style={{ display: "flex", gap: 36 }}>
            <span>Next.js</span>
            <span style={{ color: "#3A3832" }}>·</span>
            <span>Node.js</span>
            <span style={{ color: "#3A3832" }}>·</span>
            <span>MERN</span>
            <span style={{ color: "#3A3832" }}>·</span>
            <span>LLM Agents</span>
            <span style={{ color: "#3A3832" }}>·</span>
            <span>MCP</span>
          </div>
          <div style={{ color: "#C9A84C" }}>Toronto · Remote</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
