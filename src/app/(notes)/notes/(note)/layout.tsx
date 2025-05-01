"use client"

import { useParams } from "next/navigation"
import { localDb } from "@/db/local-db"

import { useDexieAction } from "@/hooks/use-dexie-action"
import { useDexieQuery } from "@/hooks/use-dexie-query"
import { NoteHeader } from "@/app/(notes)/notes/(note)/_components/note-header"
import { NoteSidebar } from "@/app/(notes)/notes/(note)/_components/note-sidebar"
import { SidebarProvider } from "@/app/(notes)/notes/(note)/_components/sidebar"

import "@/components/editor/novel-editor.css"

export default function NoteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const params = useParams()
  const noteId = params.id as string

  const { data: note, loading } = useDexieQuery(
    (db: typeof localDb) => db.notes.get(noteId),
    [noteId],
  )

  const [_, updateTitle] = useDexieAction(
    (params: { id: string; title: string }) =>
      localDb.notes.update(params.id, {
        title: params.title,
        updatedAt: new Date(),
      }),
  )

  const lastEdited = note?.updatedAt
    ? `Edited ${new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
      }).format(note.updatedAt)}`
    : "Not edited yet"

  return (
    <div className="flex h-screen flex-col">
      <SidebarProvider>
        <div className="flex flex-1 overflow-hidden">
          <NoteSidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            {!loading && note && (
              <NoteHeader
                title={note.title}
                lastEdited={lastEdited}
                noteId={noteId}
                onUpdateTitle={(id, newTitle) =>
                  updateTitle({ id, title: newTitle })
                }
              />
            )}
            <div className="flex-1 overflow-y-auto px-4 py-2 md:px-6 md:py-4">
              {children}
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  )
}
