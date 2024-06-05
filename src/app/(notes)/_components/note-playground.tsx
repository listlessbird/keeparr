"use client"

import { BlockNoteView, useCreateBlockNote, type Theme } from "@blocknote/react"

import "@blocknote/core/fonts/inter.css"
import "@blocknote/react/style.css"

import { Block, BlockSchemaFromSpecs, BlockSpecs } from "@blocknote/core"
import { useTheme } from "next-themes"

// const playGroundTheme = {
//   colors: {
//     editor: {
//       background: "#f0f0f5",
//       text: "#000",
//     },
//   },
// } satisfies Theme

type NotesPlayGroundProps = {
  initialContent?: Block[]
}
export function NotePlayGround({ initialContent }: NotesPlayGroundProps) {
  const editor = useCreateBlockNote({ initialContent })
  const { theme } = useTheme()
  console.log({ theme })
  return (
    <div className="flex-auto dark:bg-[#1f1f1f]">
      <BlockNoteView
        editor={editor}
        theme={theme as Theme}
        className="max-w-screen relative h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] overflow-y-auto p-2 md:p-4"
      />
    </div>
  )
}
