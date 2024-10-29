"use client"

import { useState } from "react"
import Image from "next/image"
import { Menu, MoreVertical, Plus, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { UserButton } from "@/app/(dashboard)/dashboard/user-indicator"

export default function Page() {
  return <NotesPage />
}

interface Note {
  id: string
  title: string
  lastEdited: string
  thumbnail: string
}

const templateNotes: Note[] = [
  {
    id: "t1",
    title: "Blank note",
    lastEdited: "",
    thumbnail: "/notes.png",
  },
]

function NotesPage() {
  // dummy for now
  const [recentNotes, setRecentNotes] = useState<Note[]>([
    {
      id: "1",
      title: "Work Notes",
      lastEdited: "Edited Oct 26",
      thumbnail: "/notes.png",
    },
    {
      id: "2",
      title: "Personal Goals",
      lastEdited: "Edited Oct 25",
      thumbnail: "/notes.png",
    },
    {
      id: "3",
      title: "Recipe Ideas",
      lastEdited: "Edited Oct 24",
      thumbnail: "/notes.png",
    },
  ])

  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center justify-between border-b p-4">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold">Keeparr/Notes</h1>
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 size-4 text-muted-foreground" />
          <Input type="search" placeholder="Search" className="w-64 pl-8" />
        </div>
        <div className="flex items-center space-x-2">
          <Button size="icon" variant="ghost">
            <UserButton />
          </Button>
        </div>
      </header>
      <MaxWidthWrapper>
        <main className="flex-1 overflow-auto p-6">
          <section className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Start a new note</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
              {templateNotes.map((note) => (
                <Button key={note.id} asChild onClick={() => {}}>
                  <Card
                    key={note.id}
                    className="cursor-pointer transition-colors hover:bg-accent"
                  >
                    <CardContent className="p-0">
                      <Image
                        src={note.thumbnail}
                        alt={note.title}
                        className="h-32 w-full object-cover"
                        width={240}
                        height={240}
                      />
                    </CardContent>
                    <CardFooter className="p-2">
                      <p className="text-sm">{note.title}</p>
                    </CardFooter>
                  </Card>
                </Button>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Recent notes</h2>
            </div>
            <ScrollArea className="h-[calc(100vh-400px)]">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {recentNotes.map((note) => (
                  <Card
                    key={note.id}
                    className="cursor-pointer transition-colors hover:bg-accent"
                  >
                    <CardContent className="p-0">
                      <Image
                        src={note.thumbnail}
                        alt={note.title}
                        className="h-32 w-full object-cover"
                        width={120}
                        height={120}
                      />
                    </CardContent>
                    <CardFooter className="flex items-center justify-between p-2">
                      <div>
                        <p className="text-sm font-medium">{note.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {note.lastEdited}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="size-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </section>
        </main>
      </MaxWidthWrapper>

      <Button
        size="lg"
        className="fixed bottom-8 right-8 rounded-full shadow-lg"
        onClick={() => {
          const newNote = {
            id: (recentNotes.length + 1).toString(),
            title: "Untitled Note",
            lastEdited: "Just now",
            thumbnail: "/placeholder.svg?height=160&width=120",
          }
          setRecentNotes([newNote, ...recentNotes])
        }}
      >
        <Plus className="mr-2 h-4 w-4" /> New Note
      </Button>
    </div>
  )
}
