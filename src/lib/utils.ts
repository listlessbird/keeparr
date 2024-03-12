import { type ClassValue, clsx } from "clsx"
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
