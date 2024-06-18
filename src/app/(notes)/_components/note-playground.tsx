"use client"

import { BlockNoteView, useCreateBlockNote, type Theme } from "@blocknote/react"

import "@blocknote/core/fonts/inter.css"
import "@blocknote/react/style.css"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Block } from "@blocknote/core"
import { useTheme } from "next-themes"

import { iDBPutNote, useIDB } from "../notes/[noteId]/indexeddb"
import { useNotes } from "../notes/providers"

type NotesPlayGroundProps = {
  initialContent?: Block[]
}
export function NotePlayGround({ initialContent }: NotesPlayGroundProps) {
  const editor = useCreateBlockNote({ initialContent })
  const { theme } = useTheme()
  const [blocks, setBlocks] = useState<Block[]>(initialContent || [])
  const { db } = useIDB()
  const pathname = usePathname()

  const currentDocId = pathname.split("/").pop()

  const { notes } = useNotes()

  useEffect(() => {
    if (currentDocId) {
      const note = notes.get(currentDocId)
      if (note) {
        note.noteBlocks = blocks
        note.setUpdated()
        notes.set(currentDocId, note)
        if (db) {
          iDBPutNote(note, db).then(() => {
            console.log(`Note ${currentDocId} updated`)
          })
        }
      }
    }
  }, [notes, currentDocId, blocks, db])

  useEffect(() => {
    console.log(blocks)
  }, [blocks])

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
