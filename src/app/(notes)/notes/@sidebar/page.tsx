"use client"

import { FormEvent, useEffect, useReducer, useState } from "react"
import Link from "next/link"
import { useMutation, useQuery } from "@tanstack/react-query"

import { TreeView } from "@/components/tree"
import { NotesSidebar } from "@/app/(notes)/_components/sidebar"

import { useNotes } from "../providers"
import { constructFileItemsAction } from "./action"
import {
  FileTree,
  FileTreeProvider,
  SidebarFileTree,
  useFileTree,
} from "./filetree"

function toFileTreeState<
  T extends { id: string; name: string; [key: string]: any },
>(data: T[]): FileTree {
  console.log("from toFileTreeState", data)

  if (!data) return {}

  const items = data.reduce((acc, item) => {
    if (item?.type === "folder") {
      return {
        ...acc,
        [item.id]: {
          id: item.id,
          name: item.name,
          type: item.type,
          children: item.children.map((child: any) => child.id) || [],
        },
      }
    }

    return {
      ...acc,
      [item.id]: {
        id: item.id,
        name: item.name,
        type: "file",
        children: [],
      },
    }
  }, {} as FileTree)

  console.log("transformed items", items)
  return items
}

export default function Sidebar() {
  const { notes } = useNotes()
  const { setTree, tree } = useFileTree()

  // console.log({ notes: Object.fromEntries(notes) })

  const { data } = useQuery({
    queryKey: ["notes", "constructFileItems"],
    queryFn: () => constructFileItemsAction(),
  })

  // console.log({ actionData: data })

  useEffect(() => {
    if (data) {
      const transformedData = toFileTreeState(data)
      setTree(transformedData)
    }
  }, [data, setTree, tree])

  return (
    <NotesSidebar>
      <SidebarFileTree tree={tree} />
    </NotesSidebar>
  )
}
