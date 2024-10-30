"use server"

import { redirect } from "next/navigation"
import { createNoteInDb } from "@/db/note-fns"

import { validateRequest } from "@/lib/auth"
import { defaultEditorContent } from "@/lib/content"
import { uploadNoteContent } from "@/lib/s3"

export async function createNewNoteAction() {
  const { user } = await validateRequest()

  if (!user) {
    throw new Response("Unauthorized", { status: 401 })
  }

  const [note] = await createNoteInDb({ userId: user.id })

  if (note && note.s3Key) {
    try {
      await uploadNoteContent(note.s3Key, { content: defaultEditorContent })
    } catch (error) {
      console.error(
        "Error uploading note content while creating new note:",
        error,
      )
      throw new Error("Failed to upload note content while creating new note")
    }
  }
  redirect(`/notes/${note.id}`)
}
