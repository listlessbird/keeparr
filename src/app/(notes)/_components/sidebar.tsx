"use client"

import { Dispatch, SetStateAction, useState } from "react"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Tree } from "@/components/tree"
import { UserAvatar } from "@/app/_components/user-avatar"

import { useNotesLayoutState } from "../notes/providers"

export function NotesSidebar({ children }: { children: React.ReactNode }) {
  const { isMobile } = useMediaQuery()

  const { user } = useAuth()

  const { isExpanded, setIsExpanded } = useNotesLayoutState()

  return (
    <div
      className={cn(
        `notes-sidebar-wrapper relative z-[9999] size-full min-h-screen overflow-hidden bg-[#d9d9d9] shadow-md`,
        isExpanded ? "w-full" : "invisible",
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
            <p className="line-clamp-1 text-xs text-gray-400">{user?.email}</p>
          </div>
        </div>
        <div className="mt-2 self-start p-2">{children}</div>
      </div>
    </div>
  )
}