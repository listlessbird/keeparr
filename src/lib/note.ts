import type { Block } from "@blocknote/core"

export class Note {
  id: string
  name: string
  blocks: Block[] = []

  constructor(id: string, name: string) {
    this.id = id
    this.name = name
    this.blocks = []
  }

  set contents(content: Block[]) {
    this.blocks = content
  }

  get contents() {
    return this.blocks
  }

  set docName(name: string) {
    this.name = name
  }

  getBlockLength() {
    return this.blocks.length
  }
}

// export async function getMockedNotes() {
//   const res = await fetch("/api/v1/notes")
//   const json = await res.json()
//   console.log({ json })
//   return json.map((note: Note) => {
//     const n = new Note(note.id, note.name)
//     n.contents = note.content
//     n.children = []
//     return n
//   })
// }