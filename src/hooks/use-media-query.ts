import { useEffect, useState } from "react"

export function useMediaQuery() {
  const [device, setDevice] = useState<"mobile" | "desktop" | "tablet" | null>(
    null,
  )

  const [dimensions, setDimensions] = useState<{
    width: number
    height: number
  } | null>(null)

  useEffect(function detectWindowDimension() {
    function check() {
      if (window.matchMedia("(max-width: 640px)").matches) {
        setDevice("mobile")
      } else if (
        window.matchMedia("(min-width: 641px) and (max-width: 1024px)").matches
      ) {
        setDevice("tablet")
      } else {
        setDevice("desktop")
      }

      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    check()

    window.addEventListener("resize", check)

    return () => {
      window.removeEventListener("resize", check)
    }
  }, [])

  return {
    device,
    width: dimensions?.width,
    height: dimensions?.height,
    isMobile: device === "mobile",
    isTablet: device === "tablet",
    isDesktop: device === "desktop",
  }
}
