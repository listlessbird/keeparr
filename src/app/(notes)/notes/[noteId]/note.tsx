"use client"

import { useEffect } from "react"
import dynamic from "next/dynamic"
import { useBlockNoteEditor } from "@blocknote/react"

import { useNotes } from "../providers"
import { useIDB } from "./indexeddb"
import { LOADING_BLOCKS } from "./loading-blocks"
import { useGetNoteById } from "./query"

const Playground = dynamic(
  () =>
    import("@/app/(notes)/_components/note-playground").then(
      (d) => d.NotePlayGround,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="grid size-full place-content-center text-xl dark:bg-[#1f1f1f] dark:text-white">
        Loading the editor...
      </div>
    ),
  },
)

export function Note({ noteId }: { noteId: string }) {
  const { data, isSuccess, isLoading } = useGetNoteById(noteId)

  return (
    <>
      {!isLoading && <Playground initialContent={data?.blocks} />}
      {isLoading && <Playground initialContent={LOADING_BLOCKS} />}
    </>
  )
}
