import { useQuery, useSuspenseQuery } from "@tanstack/react-query"

import * as NOTESAPITYPES from "@/types/notes"

import { getNotes as getNotes_server } from "./action"

async function getNotes() {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "notes/", {
    credentials: "include",
  })
  if (!res.ok) {
    throw new Error(`Failed to fetch the notes`)
  }

  const json: NOTESAPITYPES.ApiNotesByUserResponse = await res.json()

  if (!json.success) {
    throw new Error(json.error)
  }

  return json.data
}

export function useGetNotes() {
  return useQuery({
    queryKey: ["notes", "getNotes"],
    queryFn: () => getNotes_server(),
  })
}
