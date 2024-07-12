"use client"

import { BlockNoteView, useCreateBlockNote, type Theme } from "@blocknote/react"

import "@blocknote/core/fonts/inter.css"
import "@blocknote/react/style.css"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { Block } from "@blocknote/core"
import { useTheme } from "next-themes"

import { useNoteEditorInstance } from "@/app/(notes)/hooks/useEditorInstance"
import { useEditorSyncState } from "@/app/(notes)/hooks/useEditorSyncState"
import { useNotes } from "@/app/(notes)/hooks/useNotes"

type NotesPlayGroundProps = {
  initialContent?: Block[]
}

const SAVE_INTERVAL = 10 * 1000

export function NotePlayGround({ initialContent }: NotesPlayGroundProps) {
  const editor = useCreateBlockNote({ initialContent })
  const { theme } = useTheme()
  const pathname = usePathname()
  const { setEditorInstance } = useNoteEditorInstance()
  const { syncStatus } = useEditorSyncState()
  const currentDocId = useMemo(() => pathname?.split("/").pop(), [pathname])

  const { notes, saveNoteToIDB, setNote } = useNotes()

  const noteRef = useRef(notes.get(currentDocId!))

  useEffect(() => {
    setEditorInstance(editor)
  }, [editor, setEditorInstance])

  // // auto save
  // const updateNote = useCallback(() => {
  //   if (!currentDocId || !noteRef.current) return

  //   // setter for Note.blocks
  //   noteRef.current.noteBlocks = editor.document
  //   saveNoteToIDB(noteRef.current)
  //   setInSync(true)
  // }, [currentDocId, editor.document, saveNoteToIDB, setInSync])

  // useEffect(() => {
  //   const interval = setInterval(updateNote, SAVE_INTERVAL)
  //   return () => clearInterval(interval)
  // }, [updateNote])

  const handleContentChange = useCallback(() => {
    if (!noteRef.current) return
    noteRef.current.noteBlocks = editor.document
    setNote(noteRef.current)
  }, [editor.document, setNote])

  useEffect(() => {
    noteRef.current = notes.get(currentDocId!)
  }, [currentDocId, notes])

  return (
    <div className="flex-auto dark:bg-[#1f1f1f]">
      <BlockNoteView
        editor={editor}
        theme={theme as Theme}
        className="max-w-screen relative h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] overflow-y-auto p-2 md:p-4"
        onChange={handleContentChange}
      />
      {syncStatus === "saving" && (
        <div className="absolute bottom-4 right-4 text-sm text-gray-500">
          Saving...
        </div>
      )}
    </div>
  )
}
