export type MapValue<T> = T extends Map<any, infer V> ? V : never

export type ApiResponse<T extends Record<string, any> = Record<string, any>> =
  | {
      success: true
      data: T
    }
  | {
      success: false
      error: string
    }

export type ApiFailure = {
  success: false
  error: string
}
