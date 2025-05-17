import NotesLayout from "@/frontend/notes/layout"
import Note from "@/frontend/notes/note/[id]/page"
import NoteLayout from "@/frontend/notes/note/layout"
import NotesDashboard from "@/frontend/notes/page"
import { BrowserRouter, NavLink, Route, Routes } from "react-router"

import DashboardLayout from "@/app/(dashboard)/dashboard/layout"
import Dashboard from "@/app/(dashboard)/dashboard/page"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />
        <Route path="notes">
          <Route element={<NotesLayout />}>
            <Route index element={<NotesDashboard />} />
          </Route>
          <Route path=":id" element={<Note />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
