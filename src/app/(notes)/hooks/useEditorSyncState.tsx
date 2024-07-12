"use client"

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import isEqual from "lodash-es/isEqual"

import { useNoteEditorInstance } from "@/app/(notes)/hooks/useEditorInstance"
import { iDbGetNoteById, useIDB } from "@/app/(notes)/hooks/useIDB"
import { useNotes } from "@/app/(notes)/hooks/useNotes"

type SyncType = "synced" | "unsynced" | "saving"
const SYNC_INTERVAL = 5 * 1000
const SAVE_INTERVAL = 10 * 1000

const EditorSyncContext = createContext<
  | {
      syncStatus: SyncType
      currentDocId: string
      setInSync: Dispatch<SetStateAction<SyncType>>
      manualSave: () => void
    }
  | undefined
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
  const { notes, saveNoteToIDB, setNote } = useNotes()
  const [syncStatus, setSyncStatus] = useState<SyncType>("synced")
  const lastSavedDocRef = useRef<any>(null)

  useEffect(() => {
    console.log("EditorSyncContextProvider: docId or syncStatus changed", {
      docId,
      syncStatus,
    })
  }, [docId, syncStatus])

  // check if the note is in sync
  useEffect(() => {
    console.log("Sync check effect running", {
      db: !!db,
      editorInstance: !!editorInstance,
      docId,
    })
    if (!db || !editorInstance) return

    const checkSyncState = async () => {
      console.log("Checking sync state for docId", docId)
      const note = await iDbGetNoteById(docId, db)
      if (!note) {
        console.log("Note not found in DB", docId)
        return
      }
      const inSync = isEqual(note.blocks, editorInstance.document)
      console.log("Sync check result", {
        inSync,
        noteBlocks: note.blocks,
        editorDocument: editorInstance.document,
      })
      setSyncStatus(inSync ? "synced" : "unsynced")
    }

    checkSyncState()
    const interval = setInterval(checkSyncState, SYNC_INTERVAL)
    return () => clearInterval(interval)
  }, [db, docId, editorInstance])

  // auto save
  useEffect(() => {
    console.log("Auto-save effect running", {
      editorInstance: !!editorInstance,
      docId,
    })
    if (!editorInstance) return

    const save = async () => {
      if (!docId) {
        console.log("No docId for auto-save")
        return
      }
      const note = notes.get(docId)
      if (!note) {
        console.log("Note not found for auto-save", docId)
        return
      }
      if (isEqual(lastSavedDocRef.current, editorInstance.document)) {
        console.log("No changes detected, skipping auto-save")
        return
      }
      console.log("Auto-saving note", docId)
      setSyncStatus("saving")
      note.noteBlocks = editorInstance.document
      saveNoteToIDB(note)
      lastSavedDocRef.current = editorInstance.document
      setSyncStatus("synced")
    }

    const interval = setInterval(save, SAVE_INTERVAL)
    return () => clearInterval(interval)
  }, [docId, editorInstance, notes, saveNoteToIDB])

  // manual save
  const manualSave = useCallback(async () => {
    console.log("Manual save triggered", {
      docId,
      editorInstance: !!editorInstance,
    })
    if (!docId || !editorInstance) return
    const note = notes.get(docId)
    if (!note) {
      console.log("Note not found for manual save", docId)
      return
    }
    setSyncStatus("saving")
    console.log("Saving editor document", editorInstance.document)
    note.noteBlocks = editorInstance.document
    await saveNoteToIDB(note)
    lastSavedDocRef.current = editorInstance.document
    setSyncStatus("synced")
  }, [docId, editorInstance, notes, saveNoteToIDB])

  const value = useMemo(() => {
    return {
      syncStatus,
      currentDocId: docId,
      setInSync: setSyncStatus,
      manualSave,
    }
  }, [docId, syncStatus, manualSave])

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
