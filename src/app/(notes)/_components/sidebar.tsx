"use client"

import { motion } from "framer-motion"
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
    <motion.div
      className={cn(
        `ease-[cubic-bezier(0.165,0.84,0.44,1)] z-50 flex w-64 shrink-0 flex-col overflow-auto border-r border-gray-200 bg-gray-100 transition-transform duration-300 dark:border-gray-800 dark:bg-gray-900`,
        // isExpanded ? "w-full" : "invisible"
        isExpanded ? "translate-x-0" : "-translate-x-full",
        // isExpanded && isMobile && "fixed left-0 top-0 h-full",
      )}
      initial={{ width: isExpanded ? "250px" : "0px" }}
      animate={{
        // width: isExpanded ? "250px" : "0px",
        width: isExpanded && isMobile ? "100%" : isExpanded ? "250px" : "0px",
        visibility: isExpanded ? "visible" : "hidden",
      }}
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
      <motion.div
        className="flex flex-col p-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="flex items-center gap-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <UserAvatar />
          <div className="flex flex-col">
            <p className="line-clamp-1 text-lg font-bold">{user?.username}</p>
            <p className="line-clamp-1 text-xs text-gray-400">{user?.email}</p>
          </div>
        </motion.div>
        <motion.div
          className="mt-2 p-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
