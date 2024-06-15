"use server"

import { cookies } from "next/headers"

import * as NOTESAPITYPES from "@/types/notes"

export async function getNotes() {
  console.log("getNotes")

  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "notes/", {
    headers: {
      Cookie: `auth_session=${cookies().get("auth_session")?.value}`,
    },
    method: "GET",
  })
  if (!res.ok) {
    throw new Error(`Failed to fetch notes`)
  }

  const json: NOTESAPITYPES.ApiNoteByUser = await res.json()

  if (!json.success) {
    throw new Error("Failed to fetch notes. Please try again later.")
  }

  return json.data
}
