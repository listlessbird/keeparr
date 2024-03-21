"use client"

import dynamic from "next/dynamic"

const Playground = dynamic(
  () => import("../_components/note-playground").then((d) => d.NotePlayGround),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  },
)

export default function NotesPage() {
  return (
    <div>
      <div className="overflow-x-hidden py-[39px] lg:pt-[50px]">
        <Playground />
      </div>
    </div>
  )
}
