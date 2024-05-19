import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
} from "react"

import { TreeView } from "@/components/tree"

export type FileTreeItemAttr =
  | {
      id: string
      name: string
      type: "folder"
      children: FileTreeItemAttr[]
    }
  | {
      id: string
      name: string
      type: "file"
      children: []
    }

export type FileTree = Record<FileTreeItemAttr["id"], FileTreeItemAttr>

enum FileTreeActionTypes {
  SET_TREE = "SET_TREE",
  CREATE_FILE = "CREATE_FILE",
  CREATE_FOLDER = "CREATE_FOLDER",
  DELETE_FILE = "DELETE_FILE",
}

type FileTreeAction =
  | {
      type: FileTreeActionTypes.SET_TREE
      payload: FileTree
    }
  | {
      type: FileTreeActionTypes.CREATE_FILE
      payload: FileTreeItemAttr
    }
  | {
      type: FileTreeActionTypes.CREATE_FOLDER
      payload: FileTreeItemAttr
    }
  | {
      type: FileTreeActionTypes.DELETE_FILE
      payload: Pick<FileTreeItemAttr, "id">
    }

export function fileTreeReducer(
  state: FileTree,
  action: FileTreeAction,
): FileTree {
  switch (action.type) {
    case FileTreeActionTypes.SET_TREE:
      return action.payload

    case FileTreeActionTypes.CREATE_FILE:
      return {
        ...state,
        [action.payload.id]: {
          id: action.payload.id,
          name: action.payload.name,
          type: "file",
          children: [],
        },
      }

    case FileTreeActionTypes.CREATE_FOLDER:
      return {
        ...state,
        [action.payload.id]: {
          id: action.payload.id,
          name: action.payload.name,
          type: "folder",
          children: action.payload.children || [],
        },
      }

    case FileTreeActionTypes.DELETE_FILE:
      const { [action.payload.id]: _, ...rest } = state
      return rest

    default:
      return state
  }
}

type FileTreeContextType = {
  tree: FileTree
  createFile: (name: string) => void
  createFolder: (name: string) => void
  deleteFile: (id: string) => void
  setTree: (tree: FileTree) => void
}

const initialFileTree: FileTree = {}
const fileTreeContext = createContext<FileTreeContextType | undefined>({
  tree: initialFileTree,
  createFile: () => {},
  createFolder: () => {},
  deleteFile: () => {},
  setTree: () => {},
})

export function FileTreeProvider({ children }: { children: ReactNode }) {
  const [tree, dispatch] = useReducer(fileTreeReducer, initialFileTree)

  const createFile = useCallback(
    (name: string) => {
      const id = Math.random().toString(36).substr(2, 9)
      dispatch({
        type: FileTreeActionTypes.CREATE_FILE,
        payload: { id, name, type: "file", children: [] },
      })
    },
    [dispatch],
  )

  const createFolder = useCallback(
    (name: string) => {
      const id = Math.random().toString(36).substr(2, 9)
      dispatch({
        type: FileTreeActionTypes.CREATE_FOLDER,
        payload: { id, name, type: "folder", children: [] },
      })
    },
    [dispatch],
  )

  const deleteFile = useCallback(
    (id: string) => {
      dispatch({
        type: FileTreeActionTypes.DELETE_FILE,
        payload: { id },
      })
    },
    [dispatch],
  )

  const setTree = useCallback(
    (tree: FileTree) => {
      dispatch({
        type: FileTreeActionTypes.SET_TREE,
        payload: tree,
      })
    },
    [dispatch],
  )

  const contextValue = useMemo(
    () => ({
      tree,
      createFile,
      createFolder,
      deleteFile,
      setTree,
    }),
    [tree, createFile, createFolder, deleteFile, setTree],
  )
  return (
    <fileTreeContext.Provider value={contextValue}>
      {children}
    </fileTreeContext.Provider>
  )
}

export function useFileTree() {
  const context = useContext(fileTreeContext)
  if (!context) {
    throw new Error("useFileTree must be used within a FileTreeProvider")
  }
  return context
}

export function SidebarFileTree({ tree }: { tree: FileTree }) {
  const [selected, select] = useState<string | null>(null)

  const nodes = Object.values(tree)

  return (
    <TreeView.Root
      className="size-full border-[1.5px] border-slate-200"
      value={selected}
      onSelectChange={select}
    >
      {nodes.map((node) => (
        <TreeView.Node node={node} key={node.id}>
          {node.name}
        </TreeView.Node>
      ))}
    </TreeView.Root>
  )
}
