import { cookies } from "next/headers"

import { ApiSessionResponse } from "@/types/auth"

export async function getSession(SessionCookies = "") {
  const resp = await fetch("http://localhost:3001/auth", {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: SessionCookies ? SessionCookies : cookies().toString(),
    },
  })

  if (!resp.ok) {
    return { user: null, session: null }
  }

  const json: ApiSessionResponse = await resp.json()
  return json
}
