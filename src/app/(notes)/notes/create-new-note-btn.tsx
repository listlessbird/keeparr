import { createNewNoteAction } from "@/keeparr-notes/actions/action"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"

export function CreateNoteButton() {
  return (
    <Button
      size="lg"
      className="fixed bottom-6 right-6 rounded-full text-white shadow-lg"
      onClick={async () => {
        await createNewNoteAction()
      }}
    >
      <Plus className="mr-2 size-4" /> New Note
    </Button>
  )
}
