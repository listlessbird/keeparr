"use client"

import React, { useEffect, useState } from "react"
import dynamic from "next/dynamic"

import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"

import { NotesMobileNav } from "../_components/mobile-nav"
// import { NotePlayGround } from "../_components/note-playground"
import { NotesSidebar } from "../_components/sidebar"

const Playground = dynamic(
  () => import("../_components/note-playground").then((d) => d.NotePlayGround),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  },
)

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
        <NotesSidebar expander={setIsExpanded} expanded={isExpanded} />
      </div>
      <div>
        <header className="h-[39px] w-full max-w-[100vw] lg:h-[50px]">
          <NotesMobileNav expander={setIsExpanded} />
        </header>
        <div className="py-[39px] lg:pt-[50px]">
          <Playground />
        </div>
      </div>
    </div>
  )
}
