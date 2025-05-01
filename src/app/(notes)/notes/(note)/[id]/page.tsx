"use client"

import { use, useEffect } from "react"
import { localDb, type LocalNote } from "@/db/local-db"
import { type EditorInstance } from "novel"
import { useDebouncedCallback } from "use-debounce"

import { useDexieQuery } from "@/hooks/use-dexie-query"
import NovelEditor from "@/components/editor/editor"

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id: noteId }: { id: string } = use(params)

  const {
    data: note,
    loading,
    error,
  } = useDexieQuery((db: typeof localDb) => db.notes.get(noteId), [noteId])

  const handleUpdate = useDebouncedCallback(async (editor: EditorInstance) => {
    if (!note) return
    const jsonContent = editor.getJSON()
    await localDb.notes.update(note.id, {
      content: JSON.stringify(jsonContent),
      updatedAt: new Date(),
    })
  }, 500)

  useEffect(() => {
    if (note) {
      document.title = note.title
    }
  }, [note])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error loading note: {error.message}</div>
  if (!note) return <div>Note not found</div>

  let initialContent = null
  try {
    if (note.content) {
      initialContent = JSON.parse(note.content)
    }
  } catch (e) {
    console.error("Failed to parse note content:", e)
    // Handle potentially invalid JSON, maybe show an error or default content
  }

  return (
    <div className="flex min-h-full w-full flex-col items-center gap-4 p-4 sm:px-5">
      <NovelEditor initialContent={initialContent} onUpdate={handleUpdate} />
    </div>
  )
}
