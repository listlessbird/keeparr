"use client"

import { useCallback, useEffect, useState } from "react"
import { Menu, Save } from "lucide-react"

import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import { Iconify } from "@/components/iconify"
import { useCurrentNote } from "@/app/(notes)/hooks/useCurrentNote"
import { useEditorSyncState } from "@/app/(notes)/hooks/useEditorSyncState"
import { useNotes } from "@/app/(notes)/hooks/useNotes"
import { useNotesLayoutState } from "@/app/(notes)/notes/providers"

export function NotesNav({}: {}) {
  const { isMobile } = useMediaQuery()

  const { syncStatus, manualSave } = useEditorSyncState()

  const currentNote = useCurrentNote()

  const { saveNoteToIDB } = useNotes()

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

  // const handleSaveNote = useCallback(() => {
  //   if (!currentNote) {
  //     console.error("No current note")
  //     return
  //   }

  //   console.debug("Saving note to IDB", currentNote.blocks)

  //   saveNoteToIDB(currentNote)
  //   setInSync(true)
  // }, [saveNoteToIDB, currentNote, setInSync])

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
          {/* <Button
            variant={"icon"}
            size={"icon"}
            className={cn("relative", {
              "after:absolute after:inset-[7px_10px_auto_auto] after:block after:size-2 after:rounded-full after:bg-yellow-400":
                syncStatus === "unsynced",
              "after:bg-green-400": syncStatus === "synced",
              "after:animate-pulse": syncStatus === "saving",
            })}
            disabled={syncStatus === "synced" || syncStatus === "saving"}
            onClick={manualSave}
          >
            <Save
              size={24}
              // className={cn(
              //   "relative size-6 cursor-pointer bg-transparent hover:bg-transparent dark:text-white/10",
              // )}
            />
          </Button> */}
          <SyncButton syncStatus={syncStatus} manualSave={manualSave} />
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

function SyncButton({
  syncStatus,
  manualSave,
}: {
  syncStatus: "unsynced" | "synced" | "saving"
  manualSave: () => void
}) {
  const [animateSync, setAnimateSync] = useState(false)

  useEffect(() => {
    if (syncStatus === "saving") {
      setAnimateSync(true)
    } else {
      setAnimateSync(false)
    }
  }, [syncStatus])

  return (
    <Button
      variant="icon"
      size="icon"
      className={cn("relative", {
        "after:absolute after:inset-[7px_10px_auto_auto] after:block after:size-2 after:rounded-full":
          true,
        "after:bg-yellow-400": syncStatus === "unsynced",
        "after:bg-green-400": syncStatus === "synced",
        "after:bg-blue-400": syncStatus === "saving",
        "after:animate-pulse": animateSync,
      })}
      disabled={syncStatus === "synced" || syncStatus === "saving"}
      onClick={manualSave}
    >
      <Save
        size={24}
        className={cn("transition-colors", {
          "text-yellow-500": syncStatus === "unsynced",
          "text-green-500": syncStatus === "synced",
          "text-blue-500": syncStatus === "saving",
        })}
      />
    </Button>
  )
}
