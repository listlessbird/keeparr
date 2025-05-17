"use client"

import { useEffect } from "react"
import { localDb, type LocalNote } from "@/db/local-db"
import { NoteHeader } from "@/frontend/notes/note/_components/note-header"
import { NoteSidebar } from "@/frontend/notes/note/_components/note-sidebar"
import { SidebarProvider } from "@/frontend/notes/note/_components/sidebar"
import { type EditorInstance } from "novel"
import { useParams } from "react-router"
import { useDebouncedCallback } from "use-debounce"

import { getRelativeTimeString } from "@/lib/utils"
import { useDexieAction } from "@/hooks/use-dexie-action"
import { useDexieQuery } from "@/hooks/use-dexie-query"
import NovelEditor from "@/components/editor/editor"

export default function Page() {
  const params = useParams()
  const noteId = params.id as string

  const {
    data: note,
    loading,
    error,
  } = useDexieQuery((db: typeof localDb) => db.notes.get(noteId), [noteId])

  const [updateTitleError, updateTitle] = useDexieAction(
    async (params: { id: string; title: string }) =>
      await localDb.notes.update(params.id, {
        title: params.title,
        updatedAt: new Date(),
      }),
  )

  const [starError, toggleStar] = useDexieAction(
    async (params: { id: string; starred: boolean }) =>
      await localDb.notes.update(params.id, {
        starred: !params.starred,
        updatedAt: new Date(),
      }),
  )

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

  let initialContent = null
  try {
    if (note?.content) {
      initialContent = JSON.parse(note.content)
    }
  } catch (e) {
    console.error("Failed to parse note content:", e)
  }

  return (
    <div className="flex h-screen flex-col">
      <SidebarProvider>
        <div className="flex flex-1 overflow-hidden">
          <NoteSidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            {!loading && note && !error && (
              <NoteHeader
                note={{
                  id: note.id,
                  title: note.title,
                  lastEdited: getRelativeTimeString(note.updatedAt),
                  content: note.content,
                  starred: note.starred,
                }}
                onUpdateTitle={(id: string, newTitle: string) =>
                  updateTitle({ id, title: newTitle })
                }
                onToggleStar={() =>
                  toggleStar({ id: note.id, starred: note.starred })
                }
              />
            )}
            <div className="flex-1 overflow-y-auto px-4 py-2 md:px-6 md:py-4">
              {loading && <p>Loading note...</p>}
              {error && (
                <p className="text-destructive">
                  <pre>{JSON.stringify(params, null, 2)}</pre>
                  Error loading note: {error.message}
                </p>
              )}
              {updateTitleError && (
                <p className="text-destructive">
                  Error updating title: {updateTitleError.message}
                </p>
              )}
              {starError && (
                <p className="text-destructive">
                  Error toggling star: {starError.message}
                </p>
              )}
              {!loading && !error && note && (
                <div className="flex min-h-full w-full flex-col items-center gap-4 p-4 sm:px-5">
                  <NovelEditor
                    initialContent={initialContent}
                    onUpdate={handleUpdate}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  )
}
