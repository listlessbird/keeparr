import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
  useTransition,
} from "react"
import { useRouter } from "next/navigation"
import { File, Folder } from "lucide-react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { TreeView } from "@/components/tree"
import { TreeItem } from "@/app/(notes)/_components/TreeItem"
import { DefaultNoteBlock } from "@/app/(notes)/blocks"

import { createNoteAction, updateNoteAction } from "../../[noteId]/action"

export type FileTreeItemAttr =
  | {
      id: string
      name: string
      type: "folder"
      // to be used for new files
      fresh?: boolean
      children: FileTreeItemAttr[]
    }
  | {
      id: string
      name: string
      fresh?: boolean
      type: "file"
      children: []
    }

export type FileTree = Record<FileTreeItemAttr["id"], FileTreeItemAttr>

enum FileTreeActionTypes {
  SET_TREE = "SET_TREE",
  CREATE_FILE = "CREATE_FILE",
  CREATE_FOLDER = "CREATE_FOLDER",
  DELETE_FILE = "DELETE_FILE",
  UPDATE_FILE = "UPDATE_FILE",
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
  | {
      type: FileTreeActionTypes.UPDATE_FILE
      payload: FileTreeItemAttr
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
          fresh: true,
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

    case FileTreeActionTypes.UPDATE_FILE:
      return {
        ...state,
        [action.payload.id]: action.payload,
      }

    default:
      return state
  }
}

type FileTreeContextType = {
  tree: FileTree
  mutateFile: (item: FileTreeItemAttr) => void
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
  mutateFile: () => {},
})

export function FileTreeProvider({ children }: { children: ReactNode }) {
  const [tree, dispatch] = useReducer(fileTreeReducer, initialFileTree)

  const mutateTreeItem = useCallback(
    (item: FileTreeItemAttr) => {
      dispatch({
        type: FileTreeActionTypes.UPDATE_FILE,
        payload: item,
      })
    },
    [dispatch],
  )

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
      mutateFile: mutateTreeItem,
    }),
    [tree, createFile, createFolder, deleteFile, setTree, mutateTreeItem],
  )
  return (
    <fileTreeContext.Provider value={contextValue}>
      {children}
    </fileTreeContext.Provider>
  )
}

export function useFileTree() {
  const context = useContext(fileTreeContext)

  const getTreeItem = (id: string) => context?.tree[id]

  if (!context) {
    throw new Error("useFileTree must be used within a FileTreeProvider")
  }

  const ctx = { ...context, getTreeItem }

  return ctx
}
