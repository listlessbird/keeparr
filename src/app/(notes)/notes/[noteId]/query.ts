import { useQuery, useSuspenseQuery } from "@tanstack/react-query"

// import { getNoteById } from "./action"

import * as NOTESAPITYPES from "@/types/notes"

async function getNoteById(noteId: string) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "notes/" + noteId, {
    credentials: "include",
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

export function useGetNoteById(noteId: string) {
  return useQuery({
    queryKey: ["notes", "getNote", noteId],
    queryFn: () => getNoteById(noteId),
  })
}
