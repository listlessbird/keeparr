"use client"

import { useMemo } from "react"
import { usePathname } from "next/navigation"

import { NoteEditorProvider } from "@/app/(notes)/hooks/useEditorInstance"
import { EditorSyncContextProvider } from "@/app/(notes)/hooks/useEditorSyncState"

import { IDBProvider } from "./indexeddb"

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const docId = useMemo(() => pathname?.split("/").pop(), [pathname])

  return (
    <IDBProvider>
      <NoteEditorProvider>
        <EditorSyncContextProvider docId={docId!}>
          <>{children}</>
        </EditorSyncContextProvider>
      </NoteEditorProvider>
    </IDBProvider>
  )
}
