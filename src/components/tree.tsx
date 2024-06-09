/*
TODO: 
  - Add expand all and collapse all buttons
  - Add search functionality
  - Add drag and drop functionality
  - Add right click context menu
  - Add double click to edit
*/
import React, { createContext, ReactNode, useContext, useReducer } from "react"
import { ChevronRightIcon } from "@radix-ui/react-icons"
import { AnimatePresence, motion, MotionConfig } from "framer-motion"
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

export function Node({
  node: { name, children, id },
  children: childNode,
  ...props
}: NodeProps) {
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
      <MotionConfig
        transition={{
          ease: [0.164, 0.84, 0.43, 1],
          duration: 0.25,
        }}
      >
        <div
          className={cn(
            "flex items-center space-x-2 rounded-md border-[1.5px] border-transparent p-2 font-mono font-medium",
            {
              "bg-gray-200 dark:bg-gray-800": selectedId === id,
              "hover:bg-gray-200 dark:hover:bg-gray-800": selectedId !== id,
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
          {/* <span className="truncate">{name}</span> */}
          {/* <div className="truncate">{childNode}</div> */}
          {childNode}
        </div>
        <AnimatePresence>
          {children?.length && isOpen && (
            <motion.ul
              className="relative pl-4"
              role="group"
              key={"ul"}
              initial={{
                height: "0",
                opacity: "0",
              }}
              animate={{
                height: "auto",
                opacity: 1,
                transition: {
                  height: {
                    duration: 0.25,
                  },
                  opacity: {
                    duration: 0.2,
                    delay: 0.05,
                  },
                },
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: {
                  height: {
                    duration: 0.25,
                  },
                  opacity: {
                    duration: 0.2,
                  },
                },
              }}
            >
              {children.map((node) => (
                <Node node={node} key={node.id} />
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </MotionConfig>
    </li>
  )
}

export const TreeView = { Root, Node }
