import { NotesProviders } from "@/app/(notes)/providers"

export default async function NotesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <NotesProviders>{children}</NotesProviders>
}
