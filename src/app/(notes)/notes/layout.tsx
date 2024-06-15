import { Chelsea_Market } from "next/font/google"

import { cn } from "@/lib/utils"

import { NotesProvider } from "./providers"

const chelseaMarket = Chelsea_Market({
  display: "fallback",
  weight: "400",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <NotesProvider>
      <div className={cn(chelseaMarket.className, "bg-shark-950")}>
        {children}
      </div>
    </NotesProvider>
  )
}
