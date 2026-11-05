import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: 32, height: 32, background: "#0A1631", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 18, height: 18, borderRadius: 99, border: "2px solid #2BD4E8", borderRightColor: "transparent" }} />
      </div>
    ),
    size,
  );
}
