import { Dispatch, SetStateAction } from "react"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useAuth } from "@/hooks/useAuth"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { UIAvatar } from "@/components/ui-avatar"
import { UserAvatar } from "@/app/_components/user-avatar"

export function NotesSidebar({
  expander,
  expanded,
}: {
  expander: Dispatch<SetStateAction<boolean>>
  expanded: boolean
}) {
  const { isMobile } = useMediaQuery()

  const { user } = useAuth()

  return (
    <div
      className={cn(
        `relative z-[9999] size-full min-h-screen overflow-hidden bg-[#d9d9d9] shadow-md`,
        expanded ? "w-full" : "invisible",
      )}
    >
      {isMobile && expanded && (
        <div className="fixed right-2 top-2">
          <Button
            variant={"icon"}
            onClick={() => {
              expander((prev) => !prev)
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
      </div>
    </div>
  )
}
