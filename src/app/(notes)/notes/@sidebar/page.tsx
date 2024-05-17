"use client"

import { FormEvent, useState } from "react"
import Link from "next/link"

import { TreeView } from "@/components/tree"
import { NotesSidebar } from "@/app/(notes)/_components/sidebar"

import { useNotes } from "../providers"
import { data } from "./data"

export default function Sidebar() {
  const { notes } = useNotes()
  const [selected, select] = useState<string | null>(null)
  console.log({ notes })

  return (
    <aside className="w-full overflow-hidden">
      <NotesSidebar>
        <TreeView.Root
          className="size-full border-[1.5px] border-slate-200"
          value={selected}
          onSelectChange={select}
        >
          {data.map((node) => (
            <TreeView.Node node={node} key={node.id} />
          ))}
        </TreeView.Root>
        {/* <Tree>
          {Array.from(notes).map((noteItem) => {
            const [id, item] = noteItem
            item["children"] = []
            console.log({ item })
            return (
              <TreeNode
                key={item.id}
                item={item}
                renderSubTree={(item) => (
                  <Link href={`/notes/${item.id}`} passHref>
                    <TreeNode item={item}>{item.name}</TreeNode>
                  </Link>
                )}
              >
                <div className="p-2">{item.name}</div>
              </TreeNode>
            )
          })}
        </Tree> */}
      </NotesSidebar>
    </aside>
  )
}
