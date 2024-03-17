import React from "react"

import { NotesProvider } from "./providers"

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NotesProvider>
      <div className="h-full bg-[#f0f0f5] text-black">{children}</div>
    </NotesProvider>
  )
}
