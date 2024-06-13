"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

import Typography from "@/components/ui/typography"
import { DashboardActionButton } from "@/app/_components/DashboardActionButton"

export function NotesRoot() {
  // dummy for now
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Note 1",
      content: "This is the content of note 1",
    },
  ])

  if (notes.length)
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
}
