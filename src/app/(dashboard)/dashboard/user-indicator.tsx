"use client"

import { useMemo } from "react"

import { getInitials } from "@/lib/utils"
import { useAuth } from "@/hooks/useAuth"
import { Avatar } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Typography from "@/components/ui/typography"
import { UIAvatar } from "@/components/ui-avatar"

export function UserIndicator({ indicatorColor }: { indicatorColor: string }) {
  const { user, logout } = useAuth()

  const userInitials = useMemo(
    () => getInitials(user?.username || ""),
    [user?.username],
  )

  return (
    <div className="absolute right-4 top-4">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar asChild>
            <UIAvatar
              alt={user?.username || ""}
              text={userInitials}
              className="text-white"
              size={48}
              indicatorColor={indicatorColor}
            />
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <div className="flex items-center justify-start p-2">
            <div className="flex flex-col space-y-1 leading-none">
              <Typography variant="p" className="text-base">
                {user?.username}
              </Typography>
              <Typography
                variant="p"
                className="truncate text-xs text-muted-foreground"
              >
                {user?.email}
              </Typography>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer focus:bg-red-900"
            onSelect={(e) => {
              e.preventDefault()
              logout()
            }}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export function WelcomeMessage() {
  const { user } = useAuth()

  return (
    <>
      <Typography variant={"h3"} className="w-fit text-center">
        Welcome to your dashboard {user?.username},
      </Typography>
      <Typography variant={"h4"} className="w-fit text-center">
        What would you like to do today?
      </Typography>
    </>
  )
}
