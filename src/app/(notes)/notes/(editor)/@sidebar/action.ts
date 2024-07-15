"use server"

import { cookies } from "next/headers"

import * as NOTESAPITYPES from "@/types/notes"

import { FileTree } from "./filetree"

function toFileTreeState<
  T extends { id: string; title: string; [key: string]: any },
>(data: T[]): FileTree {
  if (!data) return {}

  const items = data.reduce((acc, item) => {
    if (item?.type === "folder") {
      return {
        ...acc,
        [item.id]: {
          id: item.id,
          name: item.title,
          type: item.type,
          children: item.children.map((child: any) => child.id) || [],
        },
      }
    }

    return {
      ...acc,
      [item.id]: {
        id: item.id,
        name: item.title,
        type: "file",
        children: [],
      },
    }
  }, {} as FileTree)

  // console.log("transformed items", items)
  return items
}

export async function constructFileItemsAction() {
  const authCookie = cookies().get("auth_session")?.value

  const res = await fetch(process.env.API_URL + "notes", {
    headers: {
      Cookie: `auth_session=${authCookie}`,
    },
  })

  if (!res.ok) {
    console.log(res)
    throw new Error("Failed to fetch notes")
  }

  const json: NOTESAPITYPES.ApiNotesByUserResponse = await res.json()

  if (!json.success) {
    throw new Error(json.error)
  }

  let notes = new Map(Object.entries(json.data))

  const notesList = Array.from(notes).map(([key, value]) => {
    return {
      ...value,
    }
  })

  console.log({ notesList })

  const transformed = toFileTreeState(notesList)

  return transformed
}

export async function createDirectoryAction(dirname: string) {
  const body = {
    directory: {
      name: dirname,
    },
  }

  try {
    const res = await fetch(process.env.API_URL + "notes/directory", {
      method: "POST",
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      throw new Error("Failed to create directory")
    }

    const json: NOTESAPITYPES.ApiNotesDirectoryResponse = await res.json()

    if (!json.success) {
      throw new Error(json.error)
    }

    return json.data
  } catch (error: any) {
    return {
      error: error.message,
    }
  }
}
