import { usePathname } from "next/navigation"

import { useNotes } from "@/app/(notes)/hooks/useNotes"

export function useCurrentNote() {
  const pathname = usePathname()
  const { notes } = useNotes()

  const currentNoteId = pathname?.split("/").pop()

  if (currentNoteId && notes.has(currentNoteId)) {
    return notes.get(currentNoteId)
  }

  return null
}
