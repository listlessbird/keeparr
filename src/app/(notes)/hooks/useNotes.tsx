// TODO: Maybe change this to use a global store instead of context

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react"

import { ApiNoteByUser } from "@/types/notes"
import { Note, NoteItem } from "@/lib/note"
import { iDBPutNote, useIDB } from "@/app/(notes)/hooks/useIDB"
import { useGetNotes } from "@/app/(notes)/notes/query"

interface NotesContextType {
  notes: Map<string, NoteItem>
  setNote: (note: NoteItem) => void
  saveNoteToIDB: (note: NoteItem) => void
}

const NotesContext = createContext<NotesContextType>({} as NotesContextType)

export function useNotes() {
  const ctx = useContext(NotesContext)

  if (!ctx) {
    throw new Error("useNotes must be used within a NotesProvider")
  }

  return ctx
}

enum NotesActionTypes {
  ADD_NOTE = "ADD_NOTE",
  SET_NOTES = "SET_NOTES",
  UPDATE_NOTE = "UPDATE_NOTE",
}

type NoteAddPayload = { id: string; note: NoteItem }

type NotesActions =
  | { type: NotesActionTypes.ADD_NOTE; payload: NoteAddPayload }
  | { type: NotesActionTypes.SET_NOTES; payload: Map<string, NoteItem> }
  | { type: NotesActionTypes.UPDATE_NOTE; payload: NoteAddPayload }

type NotesState = {
  notes: Map<string, NoteItem>
}

const initialNotesState: NotesState = {
  notes: new Map<string, NoteItem>(),
}

function notesReducer<S extends NotesState, A extends NotesActions>(
  state: S,
  action: A,
): S {
  switch (action.type) {
    case "ADD_NOTE":
    case "UPDATE_NOTE":
      return {
        ...state,
        notes: state.notes.set(action.payload.id, action.payload.note),
      }

    case "SET_NOTES": {
      return { ...state, notes: action.payload }
    }

    default:
      return state
  }
}

const constructNotes = (allNotes: ApiNoteByUser) => {
  const notes = new Map<string, NoteItem>()

  for (const [id, note] of Object.entries(allNotes)) {
    const n = new Note(note.id, note.title, {
      createdAt: new Date(note.createdAt),
      updatedAt: new Date(note.updatedAt),
      directoryId: note.directoryId,
      s3_key: note.s3_key,
    })

    notes.set(id, n)
  }

  return notes
}

export function NotesStateProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [state, dispatch] = useReducer(notesReducer, initialNotesState)
  const { data } = useGetNotes()

  const { db } = useIDB()

  useEffect(() => {
    if (data) {
      const notes = constructNotes(data)
      dispatch({ type: NotesActionTypes.SET_NOTES, payload: notes })
    }
  }, [data])

  const saveNoteToIDB = useCallback(
    async (note: NoteItem) => {
      if (!db) {
        console.error("IDB not available")
        return
      }

      note.setUpdated()

      dispatch({
        type: NotesActionTypes.UPDATE_NOTE,
        payload: { id: note.id, note },
      })

      await iDBPutNote(note, db)
        .then(() => console.log(`[IndexedDB] Note ${note.id} updated`))
        .catch((error) =>
          console.error(`[IndexedDB] Failed to update note ${note.id}:`, error),
        )
    },
    [db],
  )

  const setNote = useCallback((note: NoteItem) => {
    dispatch({
      type: NotesActionTypes.UPDATE_NOTE,
      payload: { id: note.id, note },
    })
  }, [])

  const values = useMemo(
    () => ({
      notes: state.notes,
      saveNoteToIDB,
      setNote,
    }),
    [state.notes, saveNoteToIDB, setNote],
  )

  return (
    <NotesContext.Provider value={values}>{children}</NotesContext.Provider>
  )
}
