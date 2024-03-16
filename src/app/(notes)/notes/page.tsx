"use client"

import { Dispatch, SetStateAction, useEffect, useState } from "react"

import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"

import { NotesMobileNav } from "../_components/mobile-nav"
import { NotePlayGround } from "../_components/note-playground"

export default function NotesPage() {
  const [isExpanded, setIsExpanded] = useState(true)

  const { isMobile } = useMediaQuery()

  useEffect(
    function collapseNavIfMobile() {
      if (isMobile) {
        setIsExpanded(false)
      } else {
        setIsExpanded(true)
      }
    },
    [isMobile],
  )

  return (
    <div
      className={cn(
        `grid overflow-x-hidden transition-all duration-300`,
        isExpanded && `grid-cols-[20%_1fr]`,
        !isExpanded && `grid-cols-[0_1fr]`,
        isMobile && isExpanded && `grid-cols-[100%_0]`,
      )}
    >
      <div className="w-full">
        <NavExpanded expander={setIsExpanded} expanded={isExpanded} />
      </div>
      <div>
        <header className="h-[39px] w-full max-w-[100vw] lg:h-[50px]">
          <NotesMobileNav expander={setIsExpanded} />
        </header>
        <div className="pt-[39px] lg:pt-[50px]">
          <NotePlayGround />
        </div>
      </div>
    </div>
  )
}
function NavExpanded({
  expander,
  expanded,
}: {
  expander: Dispatch<SetStateAction<boolean>>
  expanded: boolean
}) {
  const { isMobile } = useMediaQuery()

  return (
    <div className="relative z-[9999] min-h-dvh  w-full bg-[#d9d9d9]">
      {isMobile && expanded && (
        <div className="fixed right-2 top-2">
          <Button
            variant={"icon"}
            onClick={() => {
              expander((prev) => !prev)
            }}
          >
            Close
          </Button>
        </div>
      )}
    </div>
  )
}
