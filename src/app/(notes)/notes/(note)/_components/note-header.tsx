"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Clock,
  MoreHorizontal,
  Share,
  Star,
  Tags,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/app/(notes)/notes/(note)/_components/sidebar-trigger"

export function NoteHeader({
  title,
  lastEdited,
  noteId,
  onUpdateTitle,
}: {
  title: string
  lastEdited: string
  noteId: string
  onUpdateTitle: (id: string, newTitle: string) => void
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editableTitle, setEditableTitle] = useState(title)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  useEffect(() => {
    setEditableTitle(title)
  }, [title])

  const saveTitle = () => {
    if (editableTitle.trim() === "") {
      setEditableTitle(title)
      setIsEditing(false)
      return
    }

    if (editableTitle !== title) {
      try {
        onUpdateTitle(noteId, editableTitle.trim())
      } catch (error) {
        console.error("Error updating note title:", error)
        setEditableTitle(title)
      }
    }
    setIsEditing(false)
  }

  return (
    <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-background px-4 py-2">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="size-8" />
        <Link href="/notes">
          <Button variant="ghost" size="icon" className="size-8">
            <ArrowLeft className="size-4" />
          </Button>
        </Link>
        <div className="ml-2 hidden md:block">
          <p className="text-xs font-medium text-muted-foreground">
            Last edited: {lastEdited}
          </p>
        </div>
      </div>

      <div className="flex-1 text-center">
        {isEditing ? (
          <Input
            ref={inputRef}
            value={editableTitle}
            onChange={(e) => setEditableTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                saveTitle()
              } else if (e.key === "Escape") {
                setEditableTitle(title)
                setIsEditing(false)
              }
            }}
            onBlur={saveTitle}
            className="mx-auto max-w-md border-0 border-b border-primary bg-transparent p-0 text-center text-lg font-semibold shadow-none focus-visible:ring-0"
            aria-label="Edit note title"
          />
        ) : (
          <div className="mx-auto flex w-fit items-center justify-center rounded-md bg-primary/10 px-8 py-1">
            <h2
              className="text-md cursor-pointer truncate font-semibold"
              onDoubleClick={() => setIsEditing(true)}
              title="Double click to edit title"
            >
              {title}
            </h2>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-1 px-2 text-xs md:text-sm"
        >
          <Tags className="size-4" />
          <span className="hidden md:inline">Tags</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-1 px-2 text-xs md:text-sm"
        >
          <Clock className="size-4" />
          <span className="hidden md:inline">History</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-1 px-2 text-xs md:text-sm"
        >
          <Star className="size-4" />
          <span className="hidden md:inline">Star</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-1 px-2 text-xs md:text-sm"
        >
          <Share className="size-4" />
          <span className="hidden md:inline">Share</span>
        </Button>
        <Button variant="ghost" size="icon" className="size-8">
          <MoreHorizontal className="size-4" />
        </Button>
      </div>
    </div>
  )
}
