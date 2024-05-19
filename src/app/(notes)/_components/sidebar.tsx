"use client"

import { X } from "lucide-react"

import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { UserAvatar } from "@/app/_components/user-avatar"

import { useNotesLayoutState } from "../notes/providers"

export function NotesSidebar({ children }: { children: React.ReactNode }) {
  const { isMobile } = useMediaQuery()

  const { user } = useAuth()

  const { isExpanded, setIsExpanded } = useNotesLayoutState()

  return (
    <div
      // className="w-[250px]"
      className={isExpanded ? "w-[250px]" : "w-0"}
    >
      <div
        className={cn(
          `fixed inset-y-0 z-50 flex shrink flex-col bg-[#f0f0d5] text-black transition-all duration-300`,
          // isExpanded ? "w-full" : "invisible"
          isExpanded ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {isMobile && isExpanded && (
          <div className="fixed right-2 top-2">
            <Button
              variant={"icon"}
              onClick={() => {
                setTimeout(() => {
                  setIsExpanded((prev) => !prev)
                }, 100)
              }}
            >
              <X size={24} />
            </Button>
          </div>
        )}
        <div className="flex flex-col p-2">
          <div className="flex items-center gap-x-2">
            <UserAvatar />
            <div className="flex flex-col">
              <p className="line-clamp-1 text-lg font-bold">{user?.username}</p>
              <p className="line-clamp-1 text-xs text-gray-400">
                {user?.email}
              </p>
            </div>
          </div>
          <div className="mt-2 p-2">{children}</div>
        </div>
      </div>
    </div>
  )
}
