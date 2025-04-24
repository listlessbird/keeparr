"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { createNewNoteAction } from "@/keeparr-notes/actions/action"
import {
  Clock,
  FilePlus,
  Folder,
  MoreHorizontal,
  Plus,
  Search,
  Star,
  Tag,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserButton } from "@/app/(dashboard)/dashboard/user-indicator"

export default function Page() {
  return <NotesPage />
}

interface Note {
  id: string
  title: string
  lastEdited: string
  content?: string
  thumbnail: string
  starred?: boolean
  tags?: string[]
}

const templateNotes = [
  {
    id: "t1",
    title: "Blank note",
    description: "Start with a clean slate",
    thumbnail: "/notes.png",
  },
  {
    id: "t2",
    title: "To-do list",
    description: "Stay organized with tasks",
    thumbnail: "/notes.png",
  },
  {
    id: "t3",
    title: "Meeting notes",
    description: "Capture important discussions",
    thumbnail: "/notes.png",
  },
]

function NoteCard({ note }: { note: Note }) {
  return (
    <Link href={`/notes/${note.id}`}>
      <Card className="h-full overflow-hidden outline-none transition-all hover:shadow-md hover:outline hover:outline-primary">
        <CardHeader className="p-4 pb-2">
          <div className="flex items-start justify-between">
            <h3 className="line-clamp-1 font-medium">{note.title}</h3>
            <div className="flex items-center">
              {note.starred && <Star className="mr-1 size-4 text-amber-500" />}
              <Button variant="ghost" size="icon" className="size-8">
                <MoreHorizontal className="size-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-4 py-2">
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {note.content}
          </p>
        </CardContent>
        <CardFooter className="flex items-center justify-between p-4 pt-2">
          <div className="flex gap-1">
            {note.tags?.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-muted px-2 py-0.5 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {note.lastEdited}
          </span>
        </CardFooter>
      </Card>
    </Link>
  )
}

function TemplateCard({ template }: { template: (typeof templateNotes)[0] }) {
  return (
    <Card
      className="flex cursor-pointer flex-col transition-all hover:shadow-md"
      onClick={async () => {
        await createNewNoteAction()
      }}
    >
      <CardContent className="flex-1 p-0">
        <div className="flex h-40 items-center justify-center bg-gradient-to-br from-purple-700/20 to-indigo-600/20">
          <FilePlus className="size-12 text-primary" />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4">
        <h3 className="font-medium">{template.title}</h3>
        <p className="text-sm text-muted-foreground">{template.description}</p>
      </CardFooter>
    </Card>
  )
}

function NotesPage() {
  const [recentNotes, setRecentNotes] = useState<Note[]>([
    {
      id: "1",
      title: "Work Notes",
      lastEdited: "Edited Oct 26",
      content: "Project deadlines and meeting summaries...",
      thumbnail: "/notes.png",
      starred: true,
      tags: ["work", "meetings"],
    },
    {
      id: "2",
      title: "Personal Goals",
      lastEdited: "Edited Oct 25",
      content: "Things I want to accomplish this year...",
      thumbnail: "/notes.png",
      tags: ["personal", "goals"],
    },
    {
      id: "3",
      title: "Recipe Ideas",
      lastEdited: "Edited Oct 24",
      content: "New recipes to try this weekend...",
      thumbnail: "/notes.png",
      starred: true,
      tags: ["food", "cooking"],
    },
    {
      id: "4",
      title: "Book Recommendations",
      lastEdited: "Edited Oct 23",
      content: "Books recommended by friends...",
      thumbnail: "/notes.png",
      tags: ["books", "reading"],
    },
    {
      id: "5",
      title: "Travel Plans",
      lastEdited: "Edited Oct 22",
      content: "Upcoming trip details and itinerary...",
      thumbnail: "/notes.png",
      tags: ["travel", "vacation"],
    },
  ])

  return (
    <div className="flex h-screen flex-col">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-background px-6 py-3">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="mr-2">
              <Folder className="size-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold">Notes</h1>
        </div>
        <div className="relative mx-4 max-w-md flex-1">
          <Search className="absolute left-2 top-2.5 size-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search notes..."
            className="w-full pl-8"
          />
        </div>
        <div className="flex items-center">
          <UserButton />
        </div>
      </header>

      <div className="grid flex-1 grid-cols-12 overflow-hidden">
        {/* Sidebar */}
        <div className="col-span-2 hidden overflow-y-auto border-r p-3 md:block">
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <Clock className="mr-2 size-4" />
              Recent
            </Button>
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <Star className="mr-2 size-4" />
              Starred
            </Button>
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <Tag className="mr-2 size-4" />
              Tags
            </Button>
          </div>

          <div className="mt-6">
            <h3 className="mb-2 px-2 text-sm font-medium">Tags</h3>
            <div className="space-y-1">
              {Array.from(
                new Set(recentNotes.flatMap((note) => note.tags || [])),
              ).map((tag) => (
                <Button
                  key={tag}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                >
                  <span className="mr-2 size-2 rounded-full bg-primary"></span>
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="col-span-12 overflow-y-auto p-6 md:col-span-10">
          <Tabs defaultValue="recent" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="starred">Starred</TabsTrigger>
            </TabsList>

            <TabsContent value="recent" className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {recentNotes.map((note) => (
                  <NoteCard key={note.id} note={note} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="templates">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {templateNotes.map((template) => (
                  <TemplateCard key={template.id} template={template} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="starred">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {recentNotes
                  .filter((note) => note.starred)
                  .map((note) => (
                    <NoteCard key={note.id} note={note} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Button
        size="lg"
        className="fixed bottom-6 right-6 rounded-full text-white shadow-lg"
        onClick={async () => {
          await createNewNoteAction()
        }}
      >
        <Plus className="mr-2 size-4" /> New Note
      </Button>
    </div>
  )
}
