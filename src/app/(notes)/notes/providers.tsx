"use client"

import { AuthProvider } from "@/hooks/useAuth"

export function NotesProvider({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}
