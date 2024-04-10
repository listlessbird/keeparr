"use client"

import Link from "next/link"

import { Tree, TreeNode } from "@/components/tree"
import { NotesSidebar } from "@/app/(notes)/_components/sidebar"

import { useNotes } from "../providers"

export default function Sidebar() {
  const { notes } = useNotes()
  console.log({ notes })
  return (
    <aside className="w-full overflow-hidden">
      <NotesSidebar>
        <Tree>
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
        </Tree>
      </NotesSidebar>
    </aside>
  )
}
