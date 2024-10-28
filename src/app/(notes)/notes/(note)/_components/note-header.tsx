import { SidebarTrigger } from "@/keeparr-notes/(note)/_components/sidebar-trigger"

export function NoteHeader() {
  return (
    <div className="flex items-center justify-between border-b p-4">
      <div className="flex items-center justify-between">
        <SidebarTrigger />
      </div>
    </div>
  )
}
