import { ApiResponse } from "@/types"
import { Block } from "@blocknote/core"

export type ApiNotesDirectoryCreated = {
  dirId: string
  name: string
  path: string
}

export type ApiNoteFields = {
  id: string
  userId: string
  title: string
  createdAt: Date
  updatedAt: Date
  directoryId: string
  s3_key: string
}

export type ApiNoteByUser = Record<ApiNoteFields["id"], ApiNoteFields>

export type ApiNoteById = {
  id: string
  name: string
  blocks: Block[]
}

export type ApiNotesDirectoryResponse = ApiResponse<ApiNotesDirectoryCreated>
export type ApiNotesByUserResponse = ApiResponse<ApiNoteByUser>
export type ApiNoteByIdResponse = ApiResponse<ApiNoteById>
