"use client"

import { BlockNoteView, useCreateBlockNote, type Theme } from "@blocknote/react"

import "@blocknote/core/fonts/inter.css"
import "@blocknote/react/style.css"

import { useCallback, useEffect, useMemo, useState } from "react"
import { usePathname } from "next/navigation"
import { Block } from "@blocknote/core"
import { useTheme } from "next-themes"

import { useNoteEditorInstance } from "@/app/(notes)/hooks/useEditorInstance"

import { iDBPutNote, useIDB } from "../notes/[noteId]/indexeddb"
import { useNotes } from "../notes/providers"

type NotesPlayGroundProps = {
  initialContent?: Block[]
}

const SAVE_INTERVAL = 10 * 1000

export function NotePlayGround({ initialContent }: NotesPlayGroundProps) {
  const editor = useCreateBlockNote({ initialContent })
  const { theme } = useTheme()
  const [blocks, setBlocks] = useState<Block[]>(initialContent || [])
  const { db } = useIDB()
  const pathname = usePathname()
  const { setEditorInstance } = useNoteEditorInstance()

  const currentDocId = useMemo(() => pathname?.split("/").pop(), [pathname])

  const { notes } = useNotes()

  useEffect(() => {
    setEditorInstance(editor)
  }, [editor, setEditorInstance])

  const updateNote = useCallback(() => {
    if (!currentDocId || !db) return

    const note = notes.get(currentDocId)
    if (!note) return

    note.noteBlocks = blocks
    note.setUpdated()
    notes.set(currentDocId, note)

    iDBPutNote(note, db)
      .then(() => console.log(`[IndexedDB] Note ${currentDocId} updated`))
      .catch((error) =>
        console.error(
          `[IndexedDB] Failed to update note ${currentDocId}:`,
          error,
        ),
      )
  }, [currentDocId, db, notes, blocks])

  useEffect(() => {
    const interval = setInterval(updateNote, SAVE_INTERVAL)
    return () => clearInterval(interval)
  }, [updateNote])

  return (
    <div className="flex-auto dark:bg-[#1f1f1f]">
      <BlockNoteView
        editor={editor}
        theme={theme as Theme}
        className="max-w-screen relative h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] overflow-y-auto p-2 md:p-4"
        onChange={() => setBlocks(editor.document)}
      />
    </div>
  )
}
