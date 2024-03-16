import React from "react"

import { MaxWidthWrapper } from "@/components/max-width-wrapper"

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-dvh bg-[#f0f0f5] text-black">{children}</div>
}
