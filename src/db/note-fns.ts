import { db } from "@/db/db"
import { notesDirectoryTable, notesTable } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function createNoteInDb({
  userId,
  title = "Untitled Note",
  directoryId,
}: {
  userId: string
  title?: string
  directoryId?: string
}) {
  const id = crypto.randomUUID().slice(0, 8)

  let s3Key = `notes/${userId}/note-${id}.json`

  if (directoryId) {
    const directory = await getDirectory(directoryId)
    if (!directory) throw new Error("Invalid directory ID")
    s3Key = `notes/${directory.name}/${userId}/note-${id}.json`
  }

  const note = await db
    .insert(notesTable)
    .values({
      id,
      userId,
      title,
      s3key: s3Key,
    })
    .returning({
      id: notesTable.id,
      s3Key: notesTable.s3key,
    })

  return note
}

export async function getDirectory(directoryId: string) {
  const directory = await db.query.notesDirectoryTable.findFirst({
    where: eq(notesDirectoryTable.id, directoryId),
    columns: { id: true, name: true },
  })

  return directory
}
