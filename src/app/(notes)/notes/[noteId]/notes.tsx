"use client"

import dynamic from "next/dynamic"

const Playground = dynamic(
  () =>
    import("../../_components/note-playground").then((d) => d.NotePlayGround),
  {
    ssr: true,
    loading: () => <div>Loading...</div>,
  },
)

export default function NotesPage() {
  return <Playground />
}
