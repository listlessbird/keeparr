import { SidebarTrigger } from "@/keeparr-notes/(note)/_components/sidebar-trigger"

import { useSidebar } from "@/app/(notes)/notes/(note)/_components/sidebar"

export function NoteHeader() {
  return (
    <div className="flex items-center justify-between border-b p-4">
      <div className="flex items-center justify-between">
        <SidebarTrigger className="-ml-1" />
      </div>
    </div>
  )
}
