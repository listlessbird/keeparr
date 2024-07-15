"use client"

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import { AuthProvider } from "@/hooks/useAuth"
import { TooltipProvider } from "@/components/ui/tooltip"
import { IDBProvider, iDBPutNote, useIDB } from "@/app/(notes)/hooks/useIDB"
import { NotesStateProvider } from "@/app/(notes)/hooks/useNotes"

import { FileTreeProvider } from "./[noteId]/@sidebar/filetree"

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
          <IDBProvider>
            <NotesStateProvider>
              <FileTreeProvider>
                <TooltipProvider>{children}</TooltipProvider>
              </FileTreeProvider>
            </NotesStateProvider>
          </IDBProvider>
        </NotesLayoutStateProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}
