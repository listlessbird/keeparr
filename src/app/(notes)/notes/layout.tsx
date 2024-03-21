import { NotesNav } from "../_components/nav"
import { NotesLayout as Wrapper } from "../_components/notes-layout"
import { NotesProvider } from "./providers"

export default function NotesLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode
  sidebar: React.ReactNode
}) {
  return (
    <NotesProvider>
      <Wrapper>
        {sidebar}
        <div>
          <NotesNav />
          {children}
        </div>
      </Wrapper>
    </NotesProvider>
  )
}
