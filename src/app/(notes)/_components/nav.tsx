"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { Menu, Save } from "lucide-react"

import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import { Iconify } from "@/components/iconify"
import { useNoteEditorInstance } from "@/app/(notes)/hooks/useEditorInstance"
import { useEditorSyncState } from "@/app/(notes)/hooks/useEditorSyncState"
import { useNotesLayoutState } from "@/app/(notes)/notes/providers"

export function NotesNav({}: {}) {
  const { isMobile } = useMediaQuery()

  const { inSync } = useEditorSyncState()

  useEffect(() => {
    console.log({ inSync })
  }, [inSync])

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
      className=" max-h-[90px] flex-[0_0_auto] border-b border-[#140c0c] bg-[#f0f0f5] dark:bg-[#303134]"
      data-expanded={isExpanded}
    >
      <nav className="flex w-full items-center justify-between p-2 shadow-sm md:p-4">
        <Button
          // asChild
          onClick={() => {
            setIsExpanded((prev) => !prev)
          }}
          variant={"icon"}
          size={"icon"}
          className="size-6 cursor-pointer bg-transparent hover:bg-transparent dark:text-white"
        >
          <Menu size={24} className="fill-[#888888]" />
        </Button>
        <div className="flex items-center justify-center gap-2 dark:text-white">
          <Button
            variant={"icon"}
            size={"icon"}
            className={cn("relative", {
              "after:absolute after:inset-[7px_10px_auto_auto] after:block after:size-2 after:rounded-full dark:text-white/50 after:dark:bg-white/80":
                !inSync,
            })}
          >
            <Save
              size={24}
              className={cn(
                "relative size-6 cursor-pointer bg-transparent hover:bg-transparent dark:text-white",
                {
                  " dark:text-white/50": !inSync,
                },
              )}
            />
          </Button>
          <Button variant={"icon"} size={"icon"}>
            <Iconify
              icon="codicon:open-preview"
              className="size-6 fill-[#888888]"
            />
          </Button>
        </div>
      </nav>
    </header>
  )
}
