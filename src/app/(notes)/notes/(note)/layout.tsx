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
    <div className="flex h-screen flex-col">
      <SidebarProvider>
        <div className="flex flex-1 overflow-hidden">
          <NoteSidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <NoteHeader />
            <div className="flex-1 overflow-y-auto px-4 py-2 md:px-6 md:py-4">
              {children}
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  )
}
