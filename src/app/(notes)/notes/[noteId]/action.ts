"use server"

import { cookies } from "next/headers"
import { z } from "zod"

import * as NOTESAPITYPES from "@/types/notes"

export async function getNoteById(noteId: string) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "notes/" + noteId, {
    headers: {
      Cookie: `auth_session=${cookies().get("auth_session")?.value}`,
    },
    method: "GET",
  })
  if (!res.ok) {
    throw new Error(`Failed to fetch note with id: ${noteId}`)
  }

  if (res.status === 404) {
    throw new Error(`Note with id: ${noteId} not found`)
  }

  const json: NOTESAPITYPES.ApiNoteByIdResponse = await res.json()

  if (!json.success) {
    throw new Error(json.error)
  }

  return json.data
}

const createNoteSchema = z.object({
  name: z.string().min(1).max(26),
  blocks: z.array(z.record(z.any())),
})

export async function createNoteAction(formData: FormData) {
  const rawData = {
    name: formData.get("name"),
    blocks: JSON.parse(formData.get("blocks") as string),
  }

  const validationResult = createNoteSchema.safeParse(rawData)

  if (!validationResult.success) {
    return { error: validationResult.error.errors }
  }

  const { name, blocks } = validationResult.data

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}notes`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: `auth_session=${cookies().get("auth_session")?.value}`,
      },
      method: "POST",
      body: JSON.stringify({ name, blocks }),
    })

    if (!res.ok) {
      throw new Error("Failed to create note")
    }

    const json: NOTESAPITYPES.ApiNoteByIdResponse = await res.json()

    if (!json.success) {
      return { error: json.error }
    }

    return { success: json.data }
  } catch (error) {
    return { error: "An unexpected error occurred" }
  }
}
