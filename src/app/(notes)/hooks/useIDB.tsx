"use client"

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"
import { DBSchema, IDBPDatabase, openDB } from "idb"

import { NoteItem } from "@/lib/note"

export interface NotesIDB extends DBSchema {
  notes: {
    key: string
    value: NoteItem
    indexes: {
      "note-title": string
    }
  }
}

export async function initIndexedDb() {
  const db = await openDB<NotesIDB>("keeparr-notes-db", 1, {
    upgrade(db) {
      const store = db.createObjectStore("notes")

      store.createIndex("note-title", "name")
    },
  })

  return db
}

export async function iDbGetNoteById(id: string, db: IDBPDatabase<NotesIDB>) {
  return await db.get("notes", id)
}

export async function iDBPutNote(note: NoteItem, db: IDBPDatabase<NotesIDB>) {
  return await db.put("notes", note, note.id)
}

type IDBContextType = {
  db: IDBPDatabase<NotesIDB>
}

export const IDBContext = createContext<IDBContextType>({} as IDBContextType)

export function IDBProvider({ children }: { children: ReactNode }) {
  const [db, setDb] = useState<IDBPDatabase<NotesIDB> | null>(null)
  useEffect(() => {
    if (!window.indexedDB) return

    const init = async () => {
      const idb = await initIndexedDb()
      console.log("[IndexedDB] Database initialized")
      setDb(idb)
    }

    if (!db) {
      init()
    }

    return () => {
      db?.close()
    }
  }, [db])

  return (
    <IDBContext.Provider value={{ db: db! }}>{children}</IDBContext.Provider>
  )
}

export function useIDB() {
  const db = useContext(IDBContext)
  if (!db) {
    throw new Error("useIDB must be used within a IDBProvider")
  }

  return db
}
