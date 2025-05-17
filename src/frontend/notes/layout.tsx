import { NotesProviders } from "@/frontend/notes/providers"
import { Outlet } from "react-router"

export default function NotesLayout() {
  return (
    <NotesProviders>
      <Outlet />
    </NotesProviders>
  )
}
