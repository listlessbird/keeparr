"use client"

import { useEffect, useMemo, useState } from "react"
import dynamic from "next/dynamic"
import { Block } from "@blocknote/core"

import { useNotes } from "../providers"
import { LOADING_BLOCKS } from "./loading-blocks"

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
  const [initialContent, setInitialContent] = useState<Block[] | any[]>(
    LOADING_BLOCKS,
  )

  const [loading, setLoading] = useState(true)

  console.log({ notes })

  useEffect(() => {
    console.log("effect runs")
    const note = notes.get(noteId)
    if (note && "blocks" in note) {
      setInitialContent(note.blocks)
      setLoading(false)
    }
  }, [noteId, notes])

  return (
    <div>
      <div className="overflow-x-hidden py-[39px] lg:pt-[50px]">
        {loading && <Playground initialContent={initialContent} />}
        {!loading && <Playground initialContent={initialContent} />}
      </div>
    </div>
  )
}
