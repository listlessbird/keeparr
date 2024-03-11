import { cookies } from "next/headers"

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

  const json = await resp.json()
  //   console.log(json)
  return json
}
