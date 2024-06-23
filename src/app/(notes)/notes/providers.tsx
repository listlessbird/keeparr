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
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import { ApiNoteByUser } from "@/types/notes"
import { Note, NoteItem } from "@/lib/note"
import { AuthProvider } from "@/hooks/useAuth"
import { TooltipProvider } from "@/components/ui/tooltip"

import { FileTreeProvider } from "./[noteId]/@sidebar/filetree"
import { useGetNotes } from "./query"

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return makeQueryClient()
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

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
  const client = getQueryClient()

  return (
    <QueryClientProvider client={client}>
      <ReactQueryDevtools initialIsOpen={false} />
      <AuthProvider>
        <NotesLayoutStateProvider>
          <NotesStateProvider>
            <FileTreeProvider>
              <TooltipProvider>{children}</TooltipProvider>
            </FileTreeProvider>
          </NotesStateProvider>
        </NotesLayoutStateProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

// TODO: Maybe change this to use a global store instead of context

interface NotesContextType {
  notes: Map<string, NoteItem>
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

type NoteAddPayload = { id: string; note: NoteItem }

type NotesActions =
  | { type: NotesActionTypes.ADD_NOTE; payload: NoteAddPayload }
  | { type: NotesActionTypes.SET_NOTES; payload: Map<string, NoteItem> }

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

  useEffect(() => {
    if (data) {
      const notes = constructNotes(data)
      dispatch({ type: NotesActionTypes.SET_NOTES, payload: notes })
    }
  }, [data])

  return (
    <NotesContext.Provider value={{ notes: state.notes }}>
      {children}
    </NotesContext.Provider>
  )
}
