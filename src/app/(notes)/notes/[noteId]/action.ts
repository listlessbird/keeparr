"use server"

import { cookies } from "next/headers"

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
