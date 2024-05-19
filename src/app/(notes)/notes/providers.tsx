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

import { Note } from "@/lib/note"
import { AuthProvider } from "@/hooks/useAuth"

import { FileTreeProvider } from "./@sidebar/filetree"

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
            <FileTreeProvider>{children}</FileTreeProvider>
          </NotesStateProvider>
        </NotesLayoutStateProvider>
      </AuthProvider>
    </QueryClientProvider>
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

export type NotesResponse = {
  [key: string]: {
    id: string
    name: string
    blocks: any[]
  }
}

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

export function NotesStateProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [state, dispatch] = useReducer(notesReducer, initialNotesState)
  const { data } = useQuery<NotesResponse>({
    queryKey: ["notes", "all"],
    queryFn: async () => {
      const res = await fetch("/api/v1/notes").then((res) => res.json())
      return res
    },
  })
  useEffect(() => {
    if (data) {
      dispatch({ type: NotesActionTypes.SET_NOTES, payload: data })
      // console.log({ state })
    }
  }, [data])

  return (
    <NotesContext.Provider value={{ notes: state.notes }}>
      {children}
    </NotesContext.Provider>
  )
}
