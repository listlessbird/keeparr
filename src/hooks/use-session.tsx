"use client"

import { createContext, PropsWithChildren, useContext } from "react"
import { User } from "@/db/schema"

type SessionContext = {
  user?: User
}

const sessionContext = createContext<SessionContext | null>(null)

export function SessionProvider({
  children,
  value,
}: PropsWithChildren<{ value: SessionContext }>) {
  return (
    <sessionContext.Provider value={value}>{children}</sessionContext.Provider>
  )
}

export function useSession() {
  const session = useContext(sessionContext)
  if (!session) {
    throw new Error("useSession must be used within SessionProvider")
  }
  return session
}
