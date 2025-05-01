"use client"

import { useRouter } from "next/navigation"
import { localDb, LocalNote } from "@/db/local-db"
import { Plus } from "lucide-react"

import { useDexieAction } from "@/hooks/use-dexie-action"
import { Button } from "@/components/ui/button"

export function CreateNoteButton() {
  const router = useRouter()
  const [error, action, pending] = useDexieAction(() => {
    console.log("Creating new note")
    const note = {
      id: crypto.randomUUID().slice(0, 8),
      title: "Untitled Note",
      content: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    } satisfies LocalNote

    return localDb.notes.add(note).then(() => {
      router.push(`/notes/${note.id}`)
    })
  })

  return (
    <Button
      size="lg"
      className="fixed bottom-6 right-6 rounded-full text-white shadow-lg"
      onClick={() => action(null)}
    >
      <Plus className="mr-2 size-4" /> New Note
    </Button>
  )
}
