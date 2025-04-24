import Link from "next/link"
import {
  ArrowLeft,
  Clock,
  MoreHorizontal,
  Share,
  Star,
  Tags,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { useSidebar } from "@/app/(notes)/notes/(note)/_components/sidebar"
import { SidebarTrigger } from "@/app/(notes)/notes/(note)/_components/sidebar-trigger"

export function NoteHeader() {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-background px-4 py-2">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="h-8 w-8" />
        <Link href="/notes">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="ml-2 hidden md:block">
          <p className="text-xs font-medium text-muted-foreground">
            Last edited: 5 minutes ago
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-1 px-2 text-xs md:text-sm"
        >
          <Tags className="h-4 w-4" />
          <span className="hidden md:inline">Tags</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-1 px-2 text-xs md:text-sm"
        >
          <Clock className="h-4 w-4" />
          <span className="hidden md:inline">History</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-1 px-2 text-xs md:text-sm"
        >
          <Star className="h-4 w-4" />
          <span className="hidden md:inline">Star</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-1 px-2 text-xs md:text-sm"
        >
          <Share className="h-4 w-4" />
          <span className="hidden md:inline">Share</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
