"use server"

import { redirect } from "next/navigation"

import { getCurrentSession } from "@/lib/auth"
import { deleteSessionTokenCookie, invalidateSession } from "@/lib/session"

export async function logOut() {
  const { session } = await getCurrentSession()

  if (!session) {
    throw new Error("Unauthorized")
  }

  await invalidateSession(session.id)
  deleteSessionTokenCookie()

  return redirect("/login")
}
