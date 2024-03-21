"use client"

import { useMemo } from "react"

import { getInitials, getRandomDark } from "@/lib/utils"
import { useAuth } from "@/hooks/useAuth"
import { Avatar } from "@/components/ui/avatar"
import { UIAvatar } from "@/components/ui-avatar"

const UserIndicatorColor = getRandomDark()

export function UserAvatar() {
  const { user } = useAuth()
  const userInitials = useMemo(
    () => getInitials(user?.username || ""),
    [user?.username],
  )
  return (
    <div>
      <Avatar asChild>
        <UIAvatar
          alt={user?.username || ""}
          text={userInitials}
          className="text-white"
          size={48}
          indicatorColor={UserIndicatorColor}
        />
      </Avatar>
    </div>
  )
}
