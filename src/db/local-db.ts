import Dexie from "dexie"

import { LocalDirectory, LocalNote } from "@/types/note"

class LocalDb extends Dexie {
  notes!: Dexie.Table<LocalNote, string>
  directories!: Dexie.Table<LocalDirectory, string>

  constructor() {
    super("local-db")
    this.version(1).stores({
      notes: "id, title, content, createdAt, updatedAt",
      directories: "++id, name, notes",
    })
    this.version(2).stores({
      notes: "id, title, content, createdAt, updatedAt, starred",
    })
  }
}

const localDb = new LocalDb()

export type { LocalNote, LocalDirectory }
export { localDb }
