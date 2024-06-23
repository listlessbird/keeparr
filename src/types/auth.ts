import { ApiFailure, ApiResponse } from "@/types"

export interface ApiSessionType {
  id: string
  userId: string
  fresh: boolean
  expiresAt: Date
}

export interface UserType {
  email: string
  username: string
  id: string
}

export type ApiSessionResponse = ApiResponse<ApiSessionType & UserType>
