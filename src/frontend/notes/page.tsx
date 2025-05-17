"use client"

import { useEffect, useRef, useState } from "react"
import { localDb, LocalNote } from "@/db/local-db"
import { UserButton } from "@/frontend/dashboard/user-indicator"
import {
  FilePlus,
  Folder,
  MoreHorizontal,
  Plus,
  Search,
  Star,
  Trash,
} from "lucide-react"
import { NavLink as Link } from "react-router"

import { NoteProps } from "@/types/note"
import { cn, getRelativeTimeString } from "@/lib/utils"
import { useDexieAction } from "@/hooks/use-dexie-action"
import { useDexieQuery } from "@/hooks/use-dexie-query"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { CreateNoteButton } from "./create-new-note-btn"

function NoteCard({
  note,
  onUpdateTitle,
  onToggleStar,
}: {
  note: NoteProps
  onUpdateTitle: (id: string, newTitle: string) => void
  onToggleStar: () => void
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editableTitle, setEditableTitle] = useState(note.title)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const saveTitle = async () => {
    if (editableTitle.trim() === "") {
      setEditableTitle(note.title)
      setIsEditing(false)
      return
    }

    if (editableTitle !== note.title) {
      try {
        await onUpdateTitle(note.id, editableTitle.trim())
      } catch (error) {
        console.error("Error updating note title:", error)
        // TODO: toast error
        setEditableTitle(note.title)
      }
    }
    setIsEditing(false)
  }

  const deleteNote = async () => {
    try {
      await localDb.notes.delete(note.id).then(() => {
        // TODO: toast success
      })
    } catch (error) {
      console.error("Error deleting note:", error)
      // TODO: toast error
    }
  }

  return (
    <Card className="flex h-full flex-col overflow-hidden outline-none transition-all hover:shadow-md hover:outline hover:outline-primary">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between">
          {isEditing ? (
            <Input
              ref={inputRef}
              value={editableTitle}
              onChange={(e) => {
                setEditableTitle(e.target.value)
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  saveTitle()
                } else if (e.key === "Escape") {
                  // revert to original title
                  setEditableTitle(note.title)
                  setIsEditing(false)
                }
              }}
              onBlur={() => {
                saveTitle()
              }}
              className="h-auto flex-1 border-0 border-b border-primary bg-transparent p-0 text-base font-medium shadow-none focus-visible:ring-0"
              aria-label="Edit note title"
              data-component-name="note-title-input"
            />
          ) : (
            <div
              onDoubleClick={(e) => {
                e.preventDefault()
                setIsEditing(true)
                setEditableTitle(note.title)
              }}
              className="flex-1 cursor-pointer"
              data-component-name="note-title"
              title="Double click to edit the note title"
            >
              <h3 className="line-clamp-1 font-medium">{note.title}</h3>
            </div>
          )}

          {/* <h3 className="line-clamp-1 font-medium">{note.title}</h3> */}
          <div className="flex items-center">
            {note.starred && (
              <Star className="mr-1 size-4 fill-amber-500 text-amber-500" />
            )}
            <div className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-8">
                    <MoreHorizontal className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="space-y-1">
                  <DropdownMenuItem
                    className="cursor-pointer bg-destructive/80 text-destructive-foreground hover:bg-destructive focus:bg-destructive"
                    onClick={deleteNote}
                  >
                    <Trash className="mr-2 size-4" /> Delete
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onToggleStar}>
                    <Star
                      className={cn(
                        "mr-2 size-4",
                        note.starred && "fill-amber-500 text-amber-500",
                      )}
                    />{" "}
                    {note.starred ? "Unstar" : "Star"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 px-4 py-2">
        <Link to={`/notes/${note.id}`}>
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {note.content && note.content.length > 0
              ? note.content
              : "Empty note"}
          </p>
        </Link>
      </CardContent>
      <CardFooter className="mt-auto flex items-center justify-between p-4 pt-2">
        <div className="flex gap-1">
          {note.tags?.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-muted px-2 py-0.5 text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="text-xs text-muted-foreground">{note.lastEdited}</span>
      </CardFooter>
    </Card>
  )
}

export default function Page() {
  const {
    data: notes,
    loading,
    error,
  } = useDexieQuery((db: typeof localDb) => db.notes.toArray(), [])

  const [_, action] = useDexieAction((params: { id: string; title: string }) =>
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

  const recentNotes: NoteProps[] =
    notes?.map((note: LocalNote) => ({
      id: note.id,
      title: note.title,
      lastEdited: getRelativeTimeString(note.updatedAt),
      content: note.content,
      starred: note.starred,
    })) || []

  if (loading) {
    return (
      <div className="flex h-screen flex-col">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-background px-6 py-3">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="icon" className="mr-2">
                <Folder className="size-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">Notes</h1>
          </div>
          <div className="relative mx-4 max-w-md flex-1">
            <Search
              className="absolute left-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              data-component-name="search-icon"
            />
            <Input
              type="search"
              placeholder="Search notes..."
              className="w-full pl-8"
            />
          </div>
          <div className="flex items-center">
            <UserButton />
          </div>
        </header>
        <div className="flex-1 p-6">
          <div className="flex h-full items-center justify-center">
            <p>Loading notes...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-screen flex-col">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-background px-6 py-3">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="icon" className="mr-2">
                <Folder className="size-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">Notes</h1>
          </div>
          <div className="relative mx-4 max-w-md flex-1">
            <Search className="absolute left-2 top-2.5 size-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search notes..."
              className="w-full pl-8"
            />
          </div>
          <div className="flex items-center">
            <UserButton />
          </div>
        </header>
        <div className="flex-1 p-6">
          <div className="flex h-full items-center justify-center">
            <p className="text-destructive">
              Error loading notes: {error.message}
            </p>
          </div>
        </div>
      </div>
    )
  }

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="mb-4 rounded-full bg-muted p-6">
        <FilePlus className="size-12 text-primary" />
      </div>
      <h3 className="mb-2 text-xl font-medium">No notes yet</h3>
      <p className="mb-6 max-w-sm text-muted-foreground">
        Create your first note to get started with organizing your thoughts and
        ideas.
      </p>
      <Button
        size="lg"
        className="rounded-full"
        onClick={() => {
          const button = document.querySelector("[data-create-note-button]")
          if (button instanceof HTMLElement) {
            button.click()
          }
        }}
      >
        <Plus className="mr-2 size-4" /> Create New Note
      </Button>
    </div>
  )

  return (
    <div className="flex h-screen flex-col">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-background px-6 py-3">
        <div className="flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="ghost" size="icon" className="mr-2">
              <Folder className="size-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold">Notes</h1>
        </div>
        <div className="relative mx-4 max-w-md flex-1">
          <Search className="absolute left-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search notes..."
            className="w-full pl-8"
          />
        </div>
        <div className="flex items-center">
          <UserButton />
        </div>
      </header>

      <div className="grid flex-1 grid-cols-12 overflow-hidden">
        <div className="col-span-12 overflow-y-auto p-6 md:col-span-10">
          <Tabs defaultValue="recent" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="starred">Starred</TabsTrigger>
            </TabsList>

            <TabsContent value="recent" className="space-y-6">
              {recentNotes.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {recentNotes.map((note) => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      onUpdateTitle={(id, newTitle) =>
                        action({ id, title: newTitle })
                      }
                      onToggleStar={() =>
                        toggleStar({
                          id: note.id,
                          starred: note.starred ?? false,
                        })
                      }
                    />
                  ))}
                </div>
              ) : (
                <EmptyState />
              )}
            </TabsContent>

            <TabsContent value="starred">
              {recentNotes.filter((note) => note.starred).length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {recentNotes
                    .filter((note) => note.starred)
                    .map((note) => (
                      <NoteCard
                        key={note.id}
                        note={note}
                        onUpdateTitle={(id, newTitle) =>
                          action({ id, title: newTitle })
                        }
                        onToggleStar={() =>
                          toggleStar({
                            id: note.id,
                            starred: note.starred ?? false,
                          })
                        }
                      />
                    ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-12 text-center">
                  <div className="mb-4 rounded-full bg-muted p-6">
                    <Star className="size-12 text-amber-500" />
                  </div>
                  <h3 className="mb-2 text-xl font-medium">No starred notes</h3>
                  <p className="mb-6 max-w-sm text-muted-foreground">
                    Star your important notes to find them quickly in this
                    section.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <CreateNoteButton data-create-note-button />
    </div>
  )
}
