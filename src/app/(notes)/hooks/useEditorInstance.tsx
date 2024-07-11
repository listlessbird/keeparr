import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react"
import { BlockNoteEditor } from "@blocknote/core"

export const NoteEditor = createContext<
  | {
      editorInstance: BlockNoteEditor | null
      setEditorInstance: Dispatch<BlockNoteEditor | null>
    }
  | undefined
>(undefined)

export function NoteEditorProvider({ children }: { children: ReactNode }) {
  const [editorInstance, setEditorInstance] = useState<BlockNoteEditor | null>(
    null,
  )

  const value = useMemo(
    () => ({
      editorInstance,
      setEditorInstance,
    }),
    [editorInstance],
  )

  return <NoteEditor.Provider value={value}>{children}</NoteEditor.Provider>
}

export function useNoteEditorInstance() {
  const ctx = useContext(NoteEditor)

  if (!ctx) {
    throw new Error(
      "useNoteEditorInstance must be used within a NoteEditorProvider",
    )
  }

  return ctx
}
