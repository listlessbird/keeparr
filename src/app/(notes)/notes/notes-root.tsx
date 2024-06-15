"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { FileText, Plus } from "lucide-react"

import { NoteItem } from "@/lib/note"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Typography from "@/components/ui/typography"
import { DashboardActionButton } from "@/app/_components/DashboardActionButton"

import { useNotes } from "./providers"

export function NotesRoot() {
  const { isMobile } = useMediaQuery()
  const { user } = useAuth()
  const { notes: allNotes } = useNotes()

  const [notes, setNotes] = useState<MapValue<typeof allNotes>[]>([])

  useEffect(() => {
    const notesList = Array.from(allNotes, ([, note]) => note)

    notesList.sort((a, b) => {
      return (
        new Date(b.meta.updatedAt).getTime() -
        new Date(a.meta.updatedAt).getTime()
      )
    })

    const maxNotes = isMobile ? 3 : 6
    setNotes(notesList.slice(0, maxNotes))
  }, [isMobile, allNotes])

  if (!allNotes.size)
    return (
      <div className="flex h-dvh items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <DashboardActionButton
            Icon={<Plus size={48} stroke="white" />}
            href="/notes/create"
            text={"Create something..."}
            className="bg-nero-950 transition-colors hover:bg-nero-600 active:bg-nero-700"
          />
          <Typography variant="p" className="text-center">
            Nothing Here Yet...? <br />
            Create One?
          </Typography>
        </div>
      </div>
    )

  return (
    <div className="container mx-auto pt-5 lg:pt-[5.25rem]">
      <div className="flex flex-col">
        <div>
          <div className="px-4">
            <Typography variant="h1" className="text-pretty">
              Welcome back{" "}
              <span className="text-primary">{user?.username}</span>! Dive back
              into your recent work🎉
            </Typography>
          </div>
          <div className="my-16">
            {notes.map((note) => (
              <DashBoardNoteItem key={note.id} Note={note} />
            ))}
          </div>

          <Separator />
          <div className="my-16">
            <div>
              <Typography variant="h2" className="text-pretty">
                Or,
              </Typography>
            </div>
            <div className="my-2">
              <DashboardActionButton
                Icon={<Plus size={48} stroke="white" />}
                href="/notes/create"
                text={"Create something..."}
                className="bg-nero-950 transition-colors hover:bg-nero-600 active:bg-nero-700"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function DashBoardNoteItem({ Note }: { Note: NoteItem }) {
  return (
    <Button variant={"ghost"} className="h-auto flex-col" asChild>
      <Link href={`/notes/${Note.id}`}>
        <div className="flex grow-0 flex-col items-center">
          <FileText size={100} />
          <div className="max-w-[131px]">
            <div className="ml-2 truncate ">{Note.name}</div>
          </div>
        </div>
      </Link>
    </Button>
  )
}
