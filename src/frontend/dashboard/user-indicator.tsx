"use client"

import { useSession } from "@/hooks/use-session"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Typography from "@/components/ui/typography"

export function UserButton() {
  const { user } = useSession()
  return (
    <div className="absolute right-4 top-4">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar asChild>
            <AvatarImage src={user?.picture} alt={user?.username} />
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
            onSelect={async (e) => {
              e.preventDefault()
              // await logOut()
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
  const { user } = useSession()

  return (
    <div className="space-y-2">
      <Typography variant={"h3"} className="text-3xl font-bold text-primary">
        Welcome, {user?.username}
      </Typography>
      <Typography variant={"p"} className="text-lg text-muted-foreground">
        What would you like to do today?
      </Typography>
    </div>
  )
}
