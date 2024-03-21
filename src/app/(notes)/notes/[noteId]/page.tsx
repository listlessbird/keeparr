"use client"

import dynamic from "next/dynamic"

import { useNotes } from "../providers"

const Playground = dynamic(
  () =>
    import("@/app/(notes)/_components/note-playground").then(
      (d) => d.NotePlayGround,
    ),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  },
)

export default function Note({
  params: { noteId },
}: {
  params: { noteId: string }
}) {
  const { notes } = useNotes()

  return (
    <div>
      <div className="overflow-x-hidden py-[39px] lg:pt-[50px]">
        <Playground />
      </div>
    </div>
  )
}
