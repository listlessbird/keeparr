import { Sidebar } from "@/app/(notes)/notes/(note)/_components/sidebar"

export function NoteSidebar() {
  return (
    <Sidebar className="border-r">
      <div className="flex flex-col gap-4 p-4">Notes</div>
    </Sidebar>
  )
}
