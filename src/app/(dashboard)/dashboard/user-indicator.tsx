"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"

export function UserIndicator() {
  const { user, logout } = useAuth()

  return (
    <div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <Button onClick={() => logout()}>Logout</Button>
    </div>
  )
}
