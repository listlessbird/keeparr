"use client"

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react"
import useSwr from "swr"

import { Note } from "@/lib/note"
import { AuthProvider } from "@/hooks/useAuth"

const NotesLayoutContext = createContext<{
  isExpanded: boolean
  setIsExpanded: Dispatch<SetStateAction<boolean>>
}>({ isExpanded: true, setIsExpanded: () => {} })

export function useNotesLayoutState() {
  const ctx = useContext(NotesLayoutContext)

  if (!ctx) {
    throw new Error(
      "useNotesLayoutState must be used within a NotesLayoutProvider",
    )
  }

  return ctx
}

function NotesLayoutStateProvider({ children }: { children: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(true)

  const value = useMemo(() => ({ isExpanded, setIsExpanded }), [isExpanded])

  return (
    <NotesLayoutContext.Provider value={value}>
      {children}
    </NotesLayoutContext.Provider>
  )
}

export function NotesProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <NotesLayoutStateProvider>
        <NotesStateProvider>{children}</NotesStateProvider>
      </NotesLayoutStateProvider>
    </AuthProvider>
  )
}

// TODO: Maybe change this to use a global store instead of context

interface NotesContextType {
  notes: Map<string, Note>
}

const NotesContext = createContext<NotesContextType>({} as NotesContextType)

export function useNotes() {
  const ctx = useContext(NotesContext)

  if (!ctx) {
    throw new Error("useNotes must be used within a NotesProvider")
  }

  return ctx
}

type NotesResponse = { [key: string]: Note }

enum NotesActionTypes {
  ADD_NOTE = "ADD_NOTE",
  SET_NOTES = "SET_NOTES",
}

type NoteAddPayload = { id: string; note: Note }

type NotesActions =
  | { type: NotesActionTypes.ADD_NOTE; payload: NoteAddPayload }
  | { type: NotesActionTypes.SET_NOTES; payload: NotesResponse }

type NotesState = {
  notes: Map<string, Note>
}

const initialNotesState: NotesState = {
  notes: new Map<string, Note>(),
}

function notesReducer<S extends NotesState, A extends NotesActions>(
  state: S,
  action: A,
): S {
  switch (action.type) {
    case "ADD_NOTE":
      return {
        ...state,
        notes: state.notes.set(action.payload.id, action.payload.note),
      }

    case "SET_NOTES": {
      return { ...state, notes: new Map(Object.entries(action.payload)) }
    }

    default:
      return state
  }
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function NotesStateProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [state, dispatch] = useReducer(notesReducer, initialNotesState)
  const { data } = useSwr<NotesResponse>("/api/v1/notes", fetcher)
  useEffect(() => {
    if (data) {
      dispatch({ type: NotesActionTypes.SET_NOTES, payload: data })
      console.log({ state })
    }
  }, [data])

  return (
    <NotesContext.Provider value={{ notes: state.notes }}>
      {children}
    </NotesContext.Provider>
  )
}
