import { NoteHeader } from "@/app/(notes)/notes/(note)/_components/note-header"
import { NoteSidebar } from "@/app/(notes)/notes/(note)/_components/note-sidebar"
import { SidebarProvider } from "@/app/(notes)/notes/(note)/_components/sidebar"

export default function NoteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <SidebarProvider>
        <NoteSidebar />
        <div className="flex flex-1 flex-col overflow-auto">
          <NoteHeader />
          <div className="flex-1">{children}</div>
        </div>
      </SidebarProvider>
    </div>
  )
}
