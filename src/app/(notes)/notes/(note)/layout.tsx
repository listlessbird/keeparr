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
        <div className="flex-1 overflow-auto">
          {/* header here */}
          {children}
        </div>
      </SidebarProvider>
    </div>
  )
}
