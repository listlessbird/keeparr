"use client"

import { useEffect } from "react"
import { Menu } from "lucide-react"

import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import { Iconify } from "@/components/iconify"

import { useNotesLayoutState } from "../notes/providers"

export function NotesNav({}: {}) {
  const { isMobile } = useMediaQuery()

  const { isExpanded, setIsExpanded } = useNotesLayoutState()

  useEffect(
    function collapseNavIfMobile() {
      if (isMobile) {
        setIsExpanded(false)
      } else {
        setIsExpanded(true)
      }
    },
    [isMobile, setIsExpanded],
  )

  return (
    <header
      className=" flex-[0_0_auto] border-b border-[#140c0c] bg-[#f0f0f5]"
      data-expanded={isExpanded}
    >
      <nav className="flex w-full justify-between bg-[#f0f0f5] p-2 shadow-sm md:p-4">
        <Button
          // asChild
          onClick={() => {
            setIsExpanded((prev) => !prev)
          }}
          variant={"icon"}
          size={"icon"}
          className="size-6 cursor-pointer bg-transparent hover:bg-transparent"
        >
          <Menu size={24} className="fill-[#888888]" />
        </Button>
        <div className="flex items-center justify-center gap-2">
          <Iconify
            icon="codicon:open-preview"
            className="size-6 fill-[#888888]"
          />
        </div>
      </nav>
    </header>
  )
}
