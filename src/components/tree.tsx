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
import isHotkey from "is-hotkey"

import { cn } from "@/lib/utils"

import {
  getFirstFocusableId,
  getLastFocusableId,
  getNextFocusableId,
  getParentFocusableId,
  getPrevFocusableId,
  RovingIndexTabItem,
  RovingTabIndexRoot,
  useRovingTabIndex,
} from "./roving-index"

export type TreeViewState = Map<string, boolean>

export type TreeViewContext = {
  open: TreeViewState
  openNode: (id: string) => void
  closeNode: (id: string) => void
  selectedId: string | null
  selectId: (id: string) => void
}

export const TreeViewContext = createContext<TreeViewContext>({
  open: new Map<string, boolean>(),
  openNode: (id: string) => {},
  closeNode: (id: string) => {},
  selectedId: null,
  selectId: (id: string) => {},
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

function TreeViewProvider({
  children,
  selectedId,
  selectId,
}: {
  children: ReactNode
  selectedId: string | null
  selectId: (id: string | null) => void
}) {
  const [open, dispatch] = useReducer(treeReducer, new Map<string, boolean>())

  const openNode = (id: string) => {
    dispatch({ type: TreeViewActionTypes.OPEN_NODE, id })
  }

  const closeNode = (id: string) => {
    dispatch({ type: TreeViewActionTypes.CLOSE_NODE, id })
  }

  return (
    <TreeViewContext.Provider
      value={{ open, openNode, closeNode, selectId, selectedId }}
    >
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
  value: string | null
  onSelectChange: (value: string | null) => void
  label?: string
} & React.ComponentProps<"ul">

export function Root({
  children,
  value,
  onSelectChange,
  label,
  ...props
}: RootProps) {
  return (
    <TreeViewProvider selectId={onSelectChange} selectedId={value}>
      <RovingTabIndexRoot
        as={"ul"}
        className={cn("flex flex-col overflow-auto", props.className)}
        aria-label={label ?? "filetree"}
        aria-multiselectable="false"
        role="tree"
        {...props}
      >
        {children}
      </RovingTabIndexRoot>
    </TreeViewProvider>
  )
}

type NodeProps = {
  node: TreeNodeType
} & React.ComponentProps<"li">

export function Node({ node: { name, children, id }, ...props }: NodeProps) {
  const { open, openNode, closeNode, selectId, selectedId } = useTreeView()
  const { getOrderedItems, getRovingProps, isFocusable } = useRovingTabIndex(id)
  const isOpen = open.get(id)
  const handleClick = () => {
    if (isOpen) {
      closeNode(id)
    } else {
      openNode(id)
    }
    if (id) selectId(id)
  }

  return (
    <li
      {...getRovingProps<"li">({
        className: cn(
          "group flex cursor-pointer select-none flex-col focus:outline-none",
          props.className,
        ),
        "aria-expanded": children?.length ? Boolean(isOpen) : undefined,
        "aria-selected": selectedId === id,
        role: "treeitem",
        onKeyDown: (e) => {
          e.stopPropagation()
          const items = getOrderedItems()

          let nextFocusable: RovingIndexTabItem | undefined
          if (isHotkey("up", e)) {
            e.preventDefault()
            nextFocusable = getPrevFocusableId(items, id)
          } else if (isHotkey("down", e)) {
            e.preventDefault()
            nextFocusable = getNextFocusableId(items, id)
          } else if (isHotkey("right", e)) {
            if (isOpen && children?.length) {
              nextFocusable = getNextFocusableId(items, id)
            } else {
              openNode(id)
            }
          } else if (isHotkey("left", e)) {
            if (isOpen && children?.length) {
              closeNode(id)
            } else {
              nextFocusable = getParentFocusableId(items, id)
              console.log(nextFocusable)
            }
          } else if (isHotkey("home", e)) {
            e.preventDefault()
            nextFocusable = getFirstFocusableId(items)
          } else if (isHotkey("end", e)) {
            e.preventDefault()
            nextFocusable = getLastFocusableId(items)
          } else if (isHotkey("space", e)) {
            e.preventDefault()
            selectId(id)
          }

          nextFocusable?.element.focus()
        },
      })}
      // className={}
      // {...props}
    >
      <div
        className={cn(
          "flex items-center space-x-2 rounded-sm border-[1.5px] border-transparent px-1 font-mono font-medium",
          {
            "bg-slate-300": selectedId === id,
            "hover:bg-slate-200": selectedId !== id,
          },
          isFocusable && "group-focus:border-slate-500",
        )}
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
        <ul className="pl-4" role="group">
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
