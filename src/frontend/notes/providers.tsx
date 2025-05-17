"use client"

import { ComponentProps, PropsWithChildren } from "react"

import { localUser } from "@/lib/local-user"
import { SessionProvider } from "@/hooks/use-session"

export function NotesProviders({
  children,
  user = localUser,
}: PropsWithChildren<ComponentProps<typeof SessionProvider>["value"]>) {
  return <SessionProvider value={{ user }}>{children}</SessionProvider>
}
