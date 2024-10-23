import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRandomDark() {
  const randomHue = Math.floor(Math.random() * 360)
  return `hsl(${randomHue}deg, 50%, 10%)`
}

export function getInitials(fullName: string) {
  const names = fullName.trim().split(" ")
  const initials = names.reduce((acc, name, index) => {
    if (index == 0 || index == names.length - 1) {
      acc = `${acc}${name.charAt(0).toLocaleUpperCase()}`
    }
    return acc
  }, "")
  return initials
}

export function isValidReturnPath(path: string): boolean {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http"
  try {
    const url = new URL(path, baseUrl)

    if (!path.startsWith("/")) return false

    if (url.protocol !== `${protocol}:` || url.host !== baseUrl.split("://")[1])
      return false

    // Optional: Add whitelist of allowed paths
    const allowedPaths = ["/dashboard", "/notes"]
    return (
      path === "/" || allowedPaths.some((allowed) => path.startsWith(allowed))
    )
  } catch {
    return false
  }
}
