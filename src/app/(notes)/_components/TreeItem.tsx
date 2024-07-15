import React, { useEffect, useRef, useTransition } from "react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { ClickToEdit } from "@/components/click-to-edit"
import { FileTreeItemAttr } from "@/app/(notes)/notes/(editor)/@sidebar/filetree"

type TreeItemProps = {
  node: Omit<FileTreeItemAttr, "children"> & { fresh?: boolean }
  Icon: React.ComponentType<{ className?: string }>
  onCreated?: (
    item: Omit<FileTreeItemAttr, "children"> & { fresh?: boolean },
    domNode: HTMLDivElement,
  ) => void
  onRename?: (newName: string) => void
}

export function TreeItem({
  Icon,
  node,
  onCreated,
  onRename,
  ...props
}: TreeItemProps & React.HTMLAttributes<HTMLDivElement>) {
  const itemRef = useRef<HTMLDivElement>(null)

  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    const refItem = itemRef.current

    if (node.fresh && refItem) {
      refItem.contentEditable = "true"
      refItem.style.width = "auto"
      refItem.focus()
    }
  }, [itemRef, onCreated, node.fresh])

  return (
    <div
      className={cn(
        "flex max-w-[150px] items-center justify-center space-x-2",
        props.className,
      )}
    >
      <Icon className="size-5 text-blue-500" />
      <ClickToEdit
        initialValue={node.name}
        onEditEnd={(val) => {
          console.log(`Val changed to ${val}`)
          onRename?.(val)
        }}
        renderReader={(value, startEditing) => (
          <div
            onBlur={(e) => {
              if (e.currentTarget.textContent) {
                node.name = e.currentTarget.textContent
              }

              if (onCreated) {
                onCreated({ ...node, fresh: false }, e.currentTarget)
              }
            }}
            onFocus={(e) => {
              if (node.fresh) {
                console.log("Focused and node is fresh")
                const range = document.createRange()
                const selection = getSelection()

                range.selectNodeContents(e.currentTarget)
                selection?.removeAllRanges()
                selection?.addRange(range)
              }
            }}
            ref={itemRef}
            className="min-w-0 flex-1"
            onClick={() => {
              startTransition(() => {
                router.push(`/notes/${node.id}`)
              })
            }}
          >
            <span
              className="block font-medium text-gray-700 dark:text-gray-300 lg:truncate"
              onDoubleClick={startEditing}
            >
              {value}
            </span>
          </div>
        )}
      />
    </div>
  )
}
