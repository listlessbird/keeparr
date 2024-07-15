"use client"

import { FormEvent, useEffect, useReducer, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { FilePlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { NotesSidebar } from "@/app/(notes)/_components/sidebar"

import { constructFileItemsAction } from "./action"
import { useFileTree } from "./filetree"
import { SidebarFileTree } from "./sidebar-filetree"

export default function Sidebar() {
  const { setTree, tree, createFile } = useFileTree()

  const { data } = useQuery({
    queryKey: ["notes", "constructFileItems"],
    queryFn: () => constructFileItemsAction(),
  })

  const [c, setC] = useState(0)

  useEffect(() => {
    if (data) {
      setTree(data)
    }
  }, [data, setTree])

  return (
    <NotesSidebar>
      <div>
        <pre className="text-white">
          {JSON.stringify({ count: c }, null, 2)}
        </pre>
        <button onClick={() => setC((prev) => prev + 10)}>Increment</button>
      </div>
      <div className="flex gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => {
                createFile("New File")
              }}
              variant={"ghost"}
              className="p-2"
            >
              <FilePlus size={16} className="text-white" />
              <span className="sr-only">Create a new note</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>New note...</span>
          </TooltipContent>
        </Tooltip>
      </div>
      <SidebarFileTree tree={tree} />
    </NotesSidebar>
  )
}
