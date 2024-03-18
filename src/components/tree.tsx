import React from "react"

import { cn } from "@/lib/utils"

interface TreeItem {
  id: string
  name: string
  children: TreeItem[]
}

const tree: TreeItem[] = [
  {
    id: "1",
    name: "root",
    children: [
      {
        id: "2",
        name: "child 1",
        children: [],
      },
      {
        id: "3",
        name: "child 2",
        children: [
          {
            id: "4",
            name: "child 2.1",
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: "5",
    name: "root 2",
    children: [
      {
        id: "6",
        name: "child 1",
        children: [],
      },
      {
        id: "7",
        name: "child 2",
        children: [
          {
            id: "8",
            name: "child 2.1",
            children: [],
          },
        ],
      },
    ],
  },
]

export function Tree() {
  return (
    <ul className="tree ml-[calc(var(--radius)-var(--spacing))] pl-0">
      {tree.map((tree) => (
        <TreeNode key={tree.id} item={tree} />
      ))}
    </ul>
  )
}

function TreeNode({
  item,
  ...props
}: { item: TreeItem } & React.ComponentProps<"li">) {
  const hasChildren = item.children.length > 0

  return (
    <li
      {...props}
      className={cn(
        `relative  flex border-l-2 border-solid border-[var(--tree-border-color)]
          pl-[calc(2*var(--spacing)-var(--radius))] last:border-transparent `,
        props.className,
      )}
    >
      {hasChildren ? (
        <details open>
          <summary className="p-1">{item.name}</summary>
          <ul className="ml-2">
            {item.children.map((child) => (
              <TreeNode item={child} />
            ))}
          </ul>
        </details>
      ) : (
        <div className="p-1">{item.name}</div>
      )}
    </li>
  )
}
