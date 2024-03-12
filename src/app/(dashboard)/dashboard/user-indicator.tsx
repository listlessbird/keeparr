"use client"

import { UIAvatar } from "@/components/ui-avatar"
import Typography from "@/components/ui/typography"
import { useAuth } from "@/hooks/useAuth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useMemo } from "react"
import { getInitials } from "@/lib/utils"
import { Avatar } from "@/components/ui/avatar"

export function UserIndicator({ indicatorColor }: { indicatorColor: string }) {
  const { user, logout } = useAuth()

  const userInitials = useMemo(
    () => getInitials(user?.username || ""),
    [user?.username],
  )

  return (
    <div className="absolute top-4 right-4">
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
            <div className="flex flex-col leading-none space-y-1">
              <Typography variant="p" className="text-base">
                {user?.username}
              </Typography>
              <Typography
                variant="p"
                className="text-xs text-muted-foreground truncate"
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
      <Typography variant={"h3"} className="text-center w-fit">
        Welcome to your dashboard {user?.username},
      </Typography>
      <Typography variant={"h4"} className="text-center w-fit">
        What would you like to do today?
      </Typography>
    </>
  )
}
