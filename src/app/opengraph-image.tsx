import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE } from "@/lib/site";

export const alt = SITE.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #020617 0%, #0b1a3a 55%, #0f3c8c 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 20,
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoSrc} width={68} height={71} alt="" />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: -1 }}>{SITE.name}</div>
            <div style={{ fontSize: 22, color: "#7dd3fc", letterSpacing: 4, textTransform: "uppercase" }}>
              {SITE.legalName}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, maxWidth: 1000 }}>
            IT &amp; Software Company in Belagavi
          </div>
          <div style={{ fontSize: 28, color: "#cbd5e1", maxWidth: 1000 }}>
            Custom Software · ERP · Web Apps · Cloud &amp; DevOps · IIoT · Internships
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24, color: "#94a3b8" }}>
          <div style={{ display: "flex" }}>www.softmusk.com</div>
          <div style={{ display: "flex", gap: 32 }}>
            <span>{SITE.phoneDisplay}</span>
            <span>{SITE.email}</span>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 10,
            background: "linear-gradient(90deg, #0ABFFF, #1D7CE0)",
          }}
        />
      </div>
    ),
    size,
  );
}
