"use client"

import { BlockNoteView, useCreateBlockNote, type Theme } from "@blocknote/react"

import "@blocknote/core/fonts/inter.css"
import "@blocknote/react/style.css"

import { Block, BlockSchemaFromSpecs, BlockSpecs } from "@blocknote/core"

const playGroundTheme = {
  colors: {
    editor: {
      background: "#f0f0f5",
      text: "#000",
    },
  },
} satisfies Theme

type NotesPlayGroundProps = {
  initialContent?: Block[]
}
export function NotePlayGround({ initialContent }: NotesPlayGroundProps) {
  const editor = useCreateBlockNote({ initialContent })

  return (
    <div className="grid min-h-full grid-cols-[minmax(0,30px)_1fr_minmax(0,30px)]">
      <div className="col-start-2 min-h-full">
        <BlockNoteView
          editor={editor}
          theme={playGroundTheme}
          className="relative z-[9999]"
        />
      </div>
    </div>
  )
}
