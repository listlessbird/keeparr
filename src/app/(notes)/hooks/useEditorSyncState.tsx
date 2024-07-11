import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import isEqual from "lodash-es/isEqual"

import { useNoteEditorInstance } from "@/app/(notes)/hooks/useEditorInstance"
import { iDbGetNoteById, useIDB } from "@/app/(notes)/notes/[noteId]/indexeddb"

const EditorSyncContext = createContext<
  { inSync: boolean; currentDocId: string } | undefined
>(undefined)

export function EditorSyncContextProvider({
  children,
  docId,
}: {
  children: ReactNode
  docId: string
}) {
  const { db } = useIDB()
  const { editorInstance } = useNoteEditorInstance()

  const [inSync, setInSync] = useState(false)

  useEffect(() => {
    if (!db || !editorInstance) return

    const syncState = async () => {
      const note = await iDbGetNoteById(docId, db)
      if (!note) return

      console.log("IDB Blocks:", note.blocks)
      console.log("Editor Document:", editorInstance.document)
      console.log("Are equal:", isEqual(note.blocks, editorInstance.document))

      setInSync(isEqual(note.blocks, editorInstance.document))
    }

    const interval = setInterval(syncState, 5000)

    return () => clearInterval(interval)
  }, [editorInstance, docId, db])

  const value = useMemo(
    () => ({ inSync, currentDocId: docId }),
    [inSync, docId],
  )

  return (
    <EditorSyncContext.Provider value={value}>
      {children}
    </EditorSyncContext.Provider>
  )
}

export function useEditorSyncState() {
  const context = useContext(EditorSyncContext)
  if (context === undefined) {
    throw new Error("useSyncState must be used within a SyncProvider")
  }
  return context
}
