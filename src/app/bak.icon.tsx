import { ImageResponse } from "next/og"
import { Logo } from "@/app/_components/logo"

// Route segment config
export const runtime = "edge"

// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = "image/png"

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          display: "flex",
          backgroundColor: "violet",
          padding: "8px",
          borderRadius: "100vmax",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        K
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    },
  )
}
