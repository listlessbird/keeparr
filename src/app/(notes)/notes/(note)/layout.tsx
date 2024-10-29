import { NoteHeader } from "@/app/(notes)/notes/(note)/_components/note-header"
import { NoteSidebar } from "@/app/(notes)/notes/(note)/_components/note-sidebar"
import { SidebarProvider } from "@/app/(notes)/notes/(note)/_components/sidebar"

import "@/components/editor/novel-editor.css"

export default function NoteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      <SidebarProvider>
        <NoteSidebar />
        <div className="sticky top-0 z-10 flex min-w-0 flex-1 flex-col">
          <NoteHeader />
          <div className="flex-1 overflow-y-auto">{children}</div>
        </div>
      </SidebarProvider>
    </div>
  )
}
