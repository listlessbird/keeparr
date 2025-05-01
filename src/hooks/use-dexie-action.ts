"use client"

import { startTransition, useActionState } from "react"

/**
 * Execute any generic async action while reporting errors in the state:
 * Execute action inside try/catch, return null if successful (no error)
 * Return an `Error` inside catch
 */

// Refined execute type using conditional type
type ExecuteFn<R, P> = P extends null
  ? () => Promise<R>
  : (params: P) => Promise<R>

export function useDexieAction<R, P = null>(execute: ExecuteFn<R, P>) {
  const [state, action, pending] = useActionState<Error | null, P>(
    async (_, params) => {
      try {
        // Type assertions confirm the execute signature based on params === null
        if (params === null) {
          await (execute as () => Promise<R>)()
        } else {
          await (execute as (params: P) => Promise<R>)(params)
        }
        return null
      } catch (error) {
        return error instanceof Error ? error : new Error(JSON.stringify(error))
      }
    },
    null,
  )

  return [
    state,
    (payload: P) => startTransition(() => action(payload)),
    pending,
  ] as const
}
