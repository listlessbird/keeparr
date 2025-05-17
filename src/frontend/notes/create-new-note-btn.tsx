"use client"

import { ComponentPropsWithoutRef } from "react"
import { localDb, LocalNote } from "@/db/local-db"
import { Plus } from "lucide-react"
import { useNavigate } from "react-router"

import { useDexieAction } from "@/hooks/use-dexie-action"
import { Button } from "@/components/ui/button"

type CreateNoteButtonProps = ComponentPropsWithoutRef<typeof Button>

export function CreateNoteButton(props: CreateNoteButtonProps) {
  const navigate = useNavigate()
  const [error, action, pending] = useDexieAction(() => {
    console.log("Creating new note")
    const note = {
      id: crypto.randomUUID().slice(0, 8),
      title: "Untitled Note",
      content: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      starred: false,
    } satisfies LocalNote

    return localDb.notes
      .add(note)
      .then(() => {
        navigate(`/notes/${note.id}`)
      })
      .catch((err) => {
        console.error("Failed to create note:", err)
        // TODO: toast error
      })
  })

  return (
    <Button
      size="lg"
      className="fixed bottom-6 right-6 rounded-full text-white shadow-lg"
      onClick={() => action(null)}
      {...props}
    >
      <Plus className="mr-2 size-4" /> New Note
    </Button>
  )
}
