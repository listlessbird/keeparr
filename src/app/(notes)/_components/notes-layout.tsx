"use client"

import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"

import { useNotesLayoutState } from "../notes/providers"

export function NotesLayout({ children }: { children: React.ReactNode }) {
  const { isMobile } = useMediaQuery()

  const { isExpanded } = useNotesLayoutState()

  return (
    <>
      <div className="flex min-h-screen flex-col bg-[#f0f0f5] text-black">
        <div
          className="flex flex-1 overflow-clip"
          // className={cn(
          //   `group/notes-wrapper notes-wrapper grid overflow-x-hidden transition-all duration-300 `,
          //   isMobile && "wrapper-small",
          //   isExpanded && `grid-cols-[20%_1fr]`,
          //   !isExpanded && `grid-cols-[0_1fr]`,
          //   isMobile && isExpanded && `grid-cols-[100%_0]`,
          // )}
        >
          {children}
        </div>
      </div>
    </>
  )
}
