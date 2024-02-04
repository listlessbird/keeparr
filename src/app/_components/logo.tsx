import { BookmarkIcon } from "lucide-react"
import type { ComponentProps } from "react"

export function Logo({ ...props }: ComponentProps<typeof BookmarkIcon>) {
  return (
    <BookmarkIcon
      className="h-6 w-6 text-blue-600 dark:text-blue-300"
      {...props}
    />
  )
}
