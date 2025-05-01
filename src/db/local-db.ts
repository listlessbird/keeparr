import Dexie, { type EntityTable } from "dexie"

interface LocalNote {
  id: string
  title: string
  //   stringified json
  content: string
  createdAt: Date
  updatedAt: Date
}

interface LocalDirectory {
  id: string
  name: string
  notes: LocalNote[]
}

const localDb = new Dexie("local-db") as Dexie & {
  notes: EntityTable<LocalNote, string>
  directories: EntityTable<LocalDirectory>
}

localDb.version(1).stores({
  notes: "id, title, content, createdAt, updatedAt",
  directories: "++id, name, notes",
})

export type { LocalNote, LocalDirectory }
export { localDb }
