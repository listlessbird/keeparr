"use client"

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
          {notes?.map((item) => {
            item["children"] = []
            return (
              <TreeNode
                key={item.id}
                item={item}
                renderSubTree={(item) => (
                  <TreeNode item={item}>{item.name}</TreeNode>
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
