import type { Block } from "@blocknote/core"

export class Note {
  id: string
  name: string
  content: Block[] = []

  constructor(id: string, name: string) {
    this.id = id
    this.name = name
    this.content = []
  }

  set contents(content: Block[]) {
    this.content = content
  }

  get contents() {
    return this.content
  }

  set docName(name: string) {
    this.name = name
  }

  getBlockLength() {
    return this.content.length
  }
}

export async function getMockedNotes() {
  const res = await fetch(process.env.NEXT_PUBLIC_MOCK_API_URL as string)
  const json = await res.json()
  console.log({ json })
  return json.map((note: Note) => {
    const n = new Note(note.id, note.name)
    n.contents = note.content
    n.children = []
    return n
  })
}
