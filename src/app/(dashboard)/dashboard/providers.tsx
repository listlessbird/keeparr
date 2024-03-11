"use client"

import { AuthProvider } from "@/hooks/useAuth"

export function DashboardProviders({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthProvider>{children}</AuthProvider>
}
