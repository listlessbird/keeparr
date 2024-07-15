import { Note } from "./note"

export default function Page({
  params: { noteId },
}: {
  params: { noteId: string }
}) {
  return <Note noteId={noteId} />
}
