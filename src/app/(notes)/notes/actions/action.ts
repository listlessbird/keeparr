"use server"

import { validateRequest } from "@/lib/auth"

export async function createNewNoteAction() {
  const { user } = await validateRequest()

  if (!user) {
    throw new Response("Unauthorized", { status: 401 })
  }
}
