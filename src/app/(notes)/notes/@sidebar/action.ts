"use server"

import { NotesResponse } from "../providers"

export async function constructFileItemsAction() {
  const res = await fetch("http://localhost:3001/notes")

  if (!res.ok) {
    throw new Error("Failed to fetch notes")
  }

  const json = (await res.json()) as NotesResponse

  let notes = new Map(Object.entries(json))

  const notesList = Array.from(notes).map(([key, value]) => {
    return {
      ...value,
    }
  })

  console.log({ notesList })

  return notesList
}
