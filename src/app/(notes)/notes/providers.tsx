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
  notes: Note[]
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
}

type NotesActions =
  | { type: NotesActionTypes.ADD_NOTE; payload: Note }
  | { type: NotesActionTypes.SET_NOTES; payload: Note[] }

type NotesState = {
  notes: Note[]
}

const initialNotesState: NotesState = {
  notes: [],
}

function notesReducer<S extends NotesState, A extends NotesActions>(
  state: S,
  action: A,
): S {
  switch (action.type) {
    case "ADD_NOTE":
      return { ...state, notes: [...state.notes, action.payload] }

    case "SET_NOTES":
      return { ...state, notes: action.payload }

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
  const { data } = useSwr<Note[]>(
    process.env.NEXT_PUBLIC_MOCK_API_URL as string,
    fetcher,
  )
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
