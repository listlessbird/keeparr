/*
TODO: 
  - Add expand all and collapse all buttons
  - Add search functionality
  - Add drag and drop functionality
  - Add keyboard navigation
  - Add right click context menu
  - Add double click to edit
*/

import React from "react"

import { cn } from "@/lib/utils"

interface TreeItem<T extends TreeItem<T>> {
  id: string
  name: string
  children: T[]
}

function Tree({ children }: { children: React.ReactNode }) {
  return (
    <ul className="tree ml-[calc(var(--radius)-var(--spacing))] pl-0">
      {children}
    </ul>
  )
}

interface TreeNodeType<T extends TreeItem<T>>
  extends React.ComponentPropsWithoutRef<"li"> {
  item: T
  renderSubTree?: (item: T) => React.ReactNode
}

function TreeNode<T extends TreeItem<T>>({
  item,
  renderSubTree,
  ...props
}: TreeNodeType<T>) {
  // const hasChildren = item.children.length > 0

  return (
    <li
      {...props}
      className={cn(
        `relative flex w-full border-l-2 border-solid
          border-[var(--tree-border-color)] pl-[calc(2*var(--spacing)-var(--radius))] last:border-transparent`,
        props.className,
      )}
    >
      {renderSubTree ? (
        <details open>
          <summary className="cursor-pointer rounded-[10px] p-2 hover:bg-zinc-200">
            {item.name}
          </summary>
          <ul className="ml-2">
            {/* {item.children.map((child) => (
              <TreeNode item={child} />
            ))} */}
            {renderSubTree(item)}
          </ul>
        </details>
      ) : (
        <div className="cursor-pointer rounded-[10px] p-2 hover:bg-zinc-200">
          {props.children && props.children}
        </div>
      )}
    </li>
  )
}

export { Tree, TreeNode }
