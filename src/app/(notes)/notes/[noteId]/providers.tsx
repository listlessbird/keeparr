"use client"

import { IDBProvider } from "./indexeddb"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <IDBProvider>
      <>{children}</>
    </IDBProvider>
  )
}
