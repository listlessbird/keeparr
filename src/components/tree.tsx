/*
TODO: 
  - Add expand all and collapse all buttons
  - Add search functionality
  - Add drag and drop functionality
  - Add keyboard navigation
  - Add right click context menu
  - Add double click to edit
*/
import React, { createContext, ReactNode, useContext, useReducer } from "react"
import { ChevronRightIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"

export type TreeViewState = Map<string, boolean>

export type TreeViewContext = {
  open: TreeViewState
  openNode: (id: string) => void
  closeNode: (id: string) => void
}

export const TreeViewContext = createContext<TreeViewContext>({
  open: new Map<string, boolean>(),
  openNode: (id: string) => {},
  closeNode: (id: string) => {},
})

enum TreeViewActionTypes {
  OPEN_NODE = "OPEN_NODE",
  CLOSE_NODE = "CLOSE_NODE",
}

type TreeViewReducerAction =
  | {
      type: TreeViewActionTypes.OPEN_NODE
      id: string
    }
  | {
      type: TreeViewActionTypes.CLOSE_NODE
      id: string
    }

function treeReducer(state: TreeViewState, action: TreeViewReducerAction) {
  switch (action.type) {
    case TreeViewActionTypes.OPEN_NODE:
      return new Map(state.set(action.id, true))
    case TreeViewActionTypes.CLOSE_NODE:
      return new Map(state.set(action.id, false))
    default:
      return state
  }
}

function TreeViewProvider({ children }: { children: ReactNode }) {
  const [open, dispatch] = useReducer(treeReducer, new Map<string, boolean>())

  const openNode = (id: string) => {
    dispatch({ type: TreeViewActionTypes.OPEN_NODE, id })
  }

  const closeNode = (id: string) => {
    dispatch({ type: TreeViewActionTypes.CLOSE_NODE, id })
  }

  return (
    <TreeViewContext.Provider value={{ open, openNode, closeNode }}>
      {children}
    </TreeViewContext.Provider>
  )
}

export function useTreeView() {
  const ctx = useContext(TreeViewContext)
  if (!ctx) {
    throw new Error("useTreeView must be used within a TreeViewProvider")
  }
  return ctx
}

export type TreeNodeType = {
  id: string
  name: string
  children?: TreeNodeType[]
}

export type RootProps = {
  children: ReactNode | ReactNode[]
} & React.ComponentProps<"ul">

export function Root({ children, ...props }: RootProps) {
  return (
    <TreeViewProvider>
      <ul className={cn("flex flex-col overflow-auto", props.className)}>
        {children}
      </ul>
    </TreeViewProvider>
  )
}

type NodeProps = {
  node: TreeNodeType
} & React.ComponentProps<"li">

export function Node({ node: { name, children, id }, ...props }: NodeProps) {
  const { open, openNode, closeNode } = useTreeView()
  const isOpen = open.get(id)
  const handleClick = () => {
    if (isOpen) {
      closeNode(id)
    } else {
      openNode(id)
    }
  }

  return (
    <li
      className={cn(
        "flex cursor-pointer select-none flex-col",
        props.className,
      )}
    >
      <div
        className="flex items-center space-x-2 rounded-sm px-1 font-mono font-medium"
        onClick={handleClick}
      >
        {children?.length ? (
          <ChevronRightIcon
            className={cn(
              "size-4 origin-center transition-transform duration-200",
              isOpen ? "rotate-90" : "rotate-0",
            )}
          />
        ) : (
          <span className="size-4 shrink-0" />
        )}
        <span className="truncate">{name}</span>
      </div>
      {children?.length && isOpen && (
        <ul className="pl-4">
          {children.map((node) => (
            <Node node={node} key={node.id} />
          ))}
        </ul>
      )}
    </li>
  )
}

export const TreeView = { Root, Node }

// function Tree({ children }: { children: React.ReactNode }) {
//   return (
//     <ul className="tree ml-[calc(var(--radius)-var(--spacing))] pl-0">
//       {children}
//     </ul>
//   )
// }

// interface TreeNodeType<T extends TreeItem<T>>
//   extends React.ComponentPropsWithoutRef<"li"> {
//   item: T
//   renderSubTree?: (item: T) => React.ReactNode
// }

// function TreeNode<T extends TreeItem<T>>({
//   item,
//   renderSubTree,
//   ...props
// }: TreeNodeType<T>) {
//   // const hasChildren = item.children.length > 0

//   return (
//     <li
//       {...props}
//       className={cn(
//         `relative flex w-full border-l-2 border-solid
//           border-[var(--tree-border-color)] pl-[calc(2*var(--spacing)-var(--radius))] last:border-transparent`,
//         props.className,
//       )}
//     >
//       {renderSubTree ? (
//         <details open>
//           <summary className="cursor-pointer rounded-[10px] p-2 hover:bg-zinc-200">
//             {item.name}
//           </summary>
//           <ul className="ml-2">
//             {/* {item.children.map((child) => (
//               <TreeNode item={child} />
//             ))} */}
//             {renderSubTree(item)}
//           </ul>
//         </details>
//       ) : (
//         <div className="cursor-pointer rounded-[10px] p-2 hover:bg-zinc-200">
//           {props.children && props.children}
//         </div>
//       )}
//     </li>
//   )
// }

// export { Tree, TreeNode }
