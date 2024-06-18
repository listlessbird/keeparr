import type { Block } from "@blocknote/core"

import { ApiNoteFields } from "@/types/notes"

export class Note {
  id: string
  name: string
  meta: Pick<
    ApiNoteFields,
    "createdAt" | "updatedAt" | "directoryId" | "s3_key"
  >
  blocks: Block[] = []

  constructor(
    id: string,
    name: string,
    meta: Pick<
      ApiNoteFields,
      "createdAt" | "updatedAt" | "directoryId" | "s3_key"
    >,
    blocks: Block[] = [],
  ) {
    this.id = id
    this.name = name
    this.meta = meta
    this.blocks = blocks || []
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

  get noteBlocks() {
    return this.blocks
  }

  set noteBlocks(blocks: Block[]) {
    this.blocks = blocks
  }

  getBlockLength() {
    return this.blocks.length
  }

  setUpdated() {
    this.meta.updatedAt = new Date()
  }
}

export type NoteItem = InstanceType<typeof Note>
