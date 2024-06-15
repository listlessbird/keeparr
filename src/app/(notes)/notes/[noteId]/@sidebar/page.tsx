"use client"

import { FormEvent, useEffect, useReducer, useState } from "react"
import Link from "next/link"
import { useMutation, useQuery } from "@tanstack/react-query"
import { FilePlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { TreeView } from "@/components/tree"
import { NotesSidebar } from "@/app/(notes)/_components/sidebar"

import { useNotes } from "../../providers"
import { constructFileItemsAction } from "./action"
import {
  FileTree,
  FileTreeProvider,
  SidebarFileTree,
  useFileTree,
} from "./filetree"

export default function Sidebar() {
  const { setTree, tree, createFile } = useFileTree()

  // console.log({ notes: Object.fromEntries(notes) })

  const { data } = useQuery({
    queryKey: ["notes", "constructFileItems"],
    queryFn: () => constructFileItemsAction(),
  })

  // console.log({ actionData: data })

  useEffect(() => {
    if (data) {
      // const transformedData = toFileTreeState(data)
      setTree(data)
    }
  }, [data, setTree])

  console.log({ tree })

  return (
    <NotesSidebar>
      <div className="flex gap-2">
        <Button
          onClick={() => {
            createFile("New File")
          }}
          variant={"ghost"}
          className="p-2"
        >
          <FilePlus size={16} className="text-white" />
          <span className="sr-only">New File</span>
        </Button>
      </div>
      <SidebarFileTree tree={tree} />
    </NotesSidebar>
  )
}
