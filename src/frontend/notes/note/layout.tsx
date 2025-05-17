"use client"

import { useParams } from "next/navigation"
import { localDb } from "@/db/local-db"
import { NoteHeader } from "@/frontend/notes/note/_components/note-header"
import { NoteSidebar } from "@/frontend/notes/note/_components/note-sidebar"
import { SidebarProvider } from "@/frontend/notes/note/_components/sidebar"
import { Outlet } from "react-router"

import { getRelativeTimeString } from "@/lib/utils"
import { useDexieAction } from "@/hooks/use-dexie-action"
import { useDexieQuery } from "@/hooks/use-dexie-query"

import "@/components/editor/novel-editor.css"

export default function NoteLayout() {
  const params = useParams()
  const noteId = params.id as string

  const {
    data: note,
    loading,
    error,
  } = useDexieQuery((db: typeof localDb) => db.notes.get(noteId), [noteId])

  const [updateTitleError, updateTitle] = useDexieAction(
    (params: { id: string; title: string }) =>
      localDb.notes.update(params.id, {
        title: params.title,
        updatedAt: new Date(),
      }),
  )

  const [starError, toggleStar] = useDexieAction(
    (params: { id: string; starred: boolean }) =>
      localDb.notes.update(params.id, {
        starred: !params.starred,
        updatedAt: new Date(),
      }),
  )
  console.log(params)
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
                onUpdateTitle={(id, newTitle) =>
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
              {!loading && !error && <Outlet />}
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  )
}
