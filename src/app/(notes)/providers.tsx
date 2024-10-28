"use client"

import { ComponentProps, PropsWithChildren } from "react"

import { SessionProvider } from "@/hooks/use-session"

export function NotesProviders({
  children,
  user,
}: PropsWithChildren<ComponentProps<typeof SessionProvider>["value"]>) {
  return <SessionProvider value={{ user }}>{children}</SessionProvider>
}
