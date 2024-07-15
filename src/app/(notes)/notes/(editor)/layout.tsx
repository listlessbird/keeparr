import { NotesNav } from "@/app/(notes)/_components/nav"
import { NotesLayout as Wrapper } from "@/app/(notes)/_components/notes-layout"

import { Providers } from "./providers"

export default function NotesLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode
  sidebar: React.ReactNode
}) {
  return (
    <Providers>
      <Wrapper>
        {sidebar}
        <div className="flex grow flex-col">
          <NotesNav />
          {children}
        </div>
      </Wrapper>
    </Providers>
  )
}
