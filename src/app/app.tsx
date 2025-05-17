import DashboardLayout from "@/frontend/dashboard/layout"
import Dashboard from "@/frontend/dashboard/page"
import NotesLayout from "@/frontend/notes/layout"
import Note from "@/frontend/notes/note/[id]/page"
import NotesDashboard from "@/frontend/notes/page"
import { BrowserRouter, NavLink, Route, Routes } from "react-router"

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
