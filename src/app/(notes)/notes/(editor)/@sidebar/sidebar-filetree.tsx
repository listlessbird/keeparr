import { useMemo, useState } from "react"
import { usePathname } from "next/navigation"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { File, Folder } from "lucide-react"

import { cn } from "@/lib/utils"
import { TreeView } from "@/components/tree"
import { TreeItem } from "@/app/(notes)/_components/TreeItem"
import { DefaultNoteBlock } from "@/app/(notes)/blocks"
import {
  FileTree,
  useFileTree,
} from "@/app/(notes)/notes/(editor)/@sidebar/filetree"
import { createNoteAction, updateNoteAction } from "@/app/(notes)/notes/action"

export function SidebarFileTree({ tree }: { tree: FileTree }) {
  const [selected, select] = useState<string | null>(null)

  const { mutateFile } = useFileTree()
  const pathname = usePathname()
  const currentFile = useMemo(() => pathname.split("/").pop(), [pathname])
  const nodes = Object.values(tree)

  return (
    <TreeView.Root
      className="size-full overflow-x-clip"
      value={selected}
      onSelectChange={select}
    >
      <ScrollArea className="h-[800px] rounded-md border p-4 lg:h-[85vh]">
        <div className="space-y-2">
          {nodes.map((node) => (
            <TreeView.Node
              node={node}
              key={node.id}
              className={cn("text-gray-700 dark:text-gray-300", {
                "bg-gray-100 dark:bg-gray-800": currentFile === node.id,
              })}
            >
              <TreeItem
                node={node}
                Icon={node.type === "folder" ? Folder : File}
                onCreated={async (node) => {
                  const formData = new FormData()
                  formData.append("name", node.name)
                  formData.append("blocks", JSON.stringify(DefaultNoteBlock))

                  try {
                    const result = await createNoteAction(formData)
                    if ("error" in result) {
                      console.error("Failed to create note:", result.error)
                    } else {
                      console.log("Note created:", result.success)
                      mutateFile({
                        ...node,
                        children: [],
                      })
                    }
                  } catch (error) {
                    console.error("Error creating note:", error)
                  }
                }}
                onRename={async (newName) => {
                  const fd = new FormData()
                  fd.append("name", newName)
                  try {
                    const result = await updateNoteAction(node.id, fd)
                    if ("error" in result) {
                      console.error("Failed to rename note:", result.error)
                    } else {
                      console.log("Note renamed:", result.success)
                      mutateFile({
                        ...node,
                        name: newName,
                        children: [],
                      })
                    }
                  } catch (error) {
                    console.error("Error renaming note:", error)
                  }
                }}
              />
            </TreeView.Node>
          ))}
        </div>
      </ScrollArea>
    </TreeView.Root>
  )
}
