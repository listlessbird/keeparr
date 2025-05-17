"use client"

import { ComponentProps, PropsWithChildren } from "react"

import { SessionProvider } from "@/hooks/use-session"

export function DashboardProviders({
  children,
  user = {
    id: "anonymous-user-id",
    email: "anonymous@test.com",
    username: "anon",
    googleId: "anonymous-google-id",
    picture: "https://example.com/anonymous.png",
  },
}: PropsWithChildren<ComponentProps<typeof SessionProvider>["value"]>) {
  return <SessionProvider value={{ user }}>{children}</SessionProvider>
}
