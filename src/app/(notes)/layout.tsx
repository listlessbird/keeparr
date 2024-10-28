import { validateRequest } from "@/lib/auth"
import { NotesProviders } from "@/app/(notes)/providers"

export default async function NotesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = await validateRequest()
  return <NotesProviders user={user}>{children}</NotesProviders>
}
