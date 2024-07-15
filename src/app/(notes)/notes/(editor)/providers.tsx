"use client"

import { useMemo } from "react"
import { usePathname } from "next/navigation"

import { NoteEditorProvider } from "@/app/(notes)/hooks/useEditorInstance"
import { EditorSyncContextProvider } from "@/app/(notes)/hooks/useEditorSyncState"

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const docId = useMemo(() => pathname?.split("/").pop(), [pathname])

  return (
    <NoteEditorProvider>
      <EditorSyncContextProvider docId={docId!}>
        <>{children}</>
      </EditorSyncContextProvider>
    </NoteEditorProvider>
  )
}
