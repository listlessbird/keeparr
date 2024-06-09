"use client"

import { Suspense, useEffect, useMemo, useState } from "react"
import dynamic from "next/dynamic"

import { LOADING_BLOCKS } from "./loading-blocks"
import { useGetNoteById } from "./query"

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

function Note({ noteId }: { noteId: string }) {
  const { data } = useGetNoteById(noteId)

  return (
    <>
      {/* <div className="overflow-x-hidden py-[39px] lg:pt-[50px]"> */}
      {/* {loading && <Playground initialContent={initialContent} />} */}
      {/* {!loading && <Playground initialContent={initialContent} />} */}
      {/* </div> */}
      {/* {data ? (
        <Playground initialContent={data.blocks} />
      ) : (
        <Playground initialContent={LOADING_BLOCKS} />
      )} */}
      <Playground initialContent={data?.blocks} />
    </>
  )
}

export default function Page({
  params: { noteId },
}: {
  params: { noteId: string }
}) {
  return (
    <Suspense fallback={<Playground initialContent={LOADING_BLOCKS} />}>
      <Note noteId={noteId} />
    </Suspense>
  )
}
