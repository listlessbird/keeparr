import Dexie from "dexie"

interface LocalNote {
  id: string
  title: string
  //   stringified json
  content: string
  createdAt: Date
  updatedAt: Date

  // TODO: Add tags
  // TODO: Add starred
}

interface LocalDirectory {
  id: string
  name: string
  notes: LocalNote[]
}

class LocalDb extends Dexie {
  notes!: Dexie.Table<LocalNote, string>
  directories!: Dexie.Table<LocalDirectory, string>

  constructor() {
    super("local-db")
    this.version(1).stores({
      notes: "id, title, content, createdAt, updatedAt",
      directories: "++id, name, notes",
    })
  }
}

const localDb = new LocalDb()

export type { LocalNote, LocalDirectory }
export { localDb }
