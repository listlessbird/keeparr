export interface NoteProps {
  id: string
  title: string
  lastEdited: string
  content?: string
  starred?: boolean
  tags?: string[]
}

interface LocalNote {
  id: string
  title: string
  //   stringified json
  content: string
  createdAt: Date
  updatedAt: Date

  // TODO: Add tags
  // TODO: Add starred
  starred: boolean
}

interface LocalDirectory {
  id: string
  name: string
  notes: LocalNote[]
}

export type { LocalNote, LocalDirectory }
