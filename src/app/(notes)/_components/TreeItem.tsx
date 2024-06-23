import React, { useEffect, useRef } from "react"

import { FileTreeItemAttr } from "@/app/(notes)/notes/[noteId]/@sidebar/filetree"

type TreeItemProps = {
  node: Omit<FileTreeItemAttr, "children"> & { fresh?: boolean }
  Icon: React.ComponentType<{ className?: string }>
  onCreated?: (
    item: Omit<FileTreeItemAttr, "children"> & { fresh?: boolean },
    domNode: HTMLDivElement,
  ) => void
}

export function TreeItem({ Icon, node, onCreated }: TreeItemProps) {
  const itemRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const refItem = itemRef.current

    if (node.fresh && refItem) {
      refItem.contentEditable = "true"
      refItem.style.width = "auto"
      refItem.focus()
    }
  }, [itemRef, onCreated, node.fresh])

  return (
    <div className="flex items-center space-x-2">
      <Icon className="size-5 text-blue-500" />
      <div
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
        onDoubleClick={(e) => {
          e.preventDefault()
          e.currentTarget.contentEditable = "true"
          e.currentTarget.focus()

          const range = document.createRange()
          const selection = getSelection()

          range.selectNodeContents(e.currentTarget)
          selection?.removeAllRanges()
          selection?.addRange(range)
        }}
        onBlur={(e) => {
          e.currentTarget.contentEditable = "false"

          if (e.currentTarget.textContent) {
            node.name = e.currentTarget.textContent
          }

          if (onCreated) {
            onCreated({ ...node, fresh: false }, e.currentTarget)
          }
        }}
        ref={itemRef}
      >
        <span className="truncate font-medium text-gray-700 dark:text-gray-300">
          {node.name}
        </span>
      </div>
    </div>
  )
}
