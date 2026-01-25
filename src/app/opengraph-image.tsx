import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "HyperSystems - Only What You Need";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0A0A0A",
          position: "relative",
        }}
      >
        {/* Background gradient accents */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 30% 30%, rgba(6, 182, 212, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          {/* Logo placeholder - using text since we can't load external images easily */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  color: "#0A0A0A",
                }}
              >
                H
              </span>
            </div>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "72px",
              fontWeight: "bold",
              background: "linear-gradient(90deg, #06B6D4 0%, #3B82F6 50%, #06B6D4 100%)",
              backgroundClip: "text",
              color: "transparent",
              margin: 0,
              padding: 0,
              lineHeight: 1.1,
            }}
          >
            HyperSystems
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontSize: "32px",
              color: "#FAFAFA",
              marginTop: "16px",
              opacity: 0.9,
            }}
          >
            Only What You Need
          </p>

          {/* Description */}
          <p
            style={{
              fontSize: "20px",
              color: "#A3A3A3",
              marginTop: "24px",
              maxWidth: "600px",
              textAlign: "center",
              lineHeight: 1.5,
            }}
          >
            A modular plugin suite for Hytale servers
          </p>
        </div>

        {/* Bottom border accent */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #06B6D4 0%, #3B82F6 50%, #06B6D4 100%)",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
