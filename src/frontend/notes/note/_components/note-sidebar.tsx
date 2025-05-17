"use client"

import Link from "next/link"
import { CreateNoteButton } from "@/frontend/notes/create-new-note-btn"
import { Sidebar } from "@/frontend/notes/note/_components/sidebar"
import {
  ChevronDown,
  Clock,
  FileText,
  Folder,
  List,
  Plus,
  Search,
  Settings,
  Star,
  Tag,
} from "lucide-react"

import { useDexieQuery } from "@/hooks/use-dexie-query"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

const tags = [
  { id: "1", name: "work", color: "bg-blue-500" },
  { id: "2", name: "personal", color: "bg-green-500" },
  { id: "3", name: "ideas", color: "bg-amber-500" },
  { id: "4", name: "important", color: "bg-red-500" },
]

function formatDate(date: Date): string {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]
  return `${months[date.getMonth()]} ${date.getDate()}`
}

export function NoteSidebar() {
  const { data: recentNotes, loading } = useDexieQuery(
    (db) => db.notes.orderBy("updatedAt").reverse().limit(5).toArray(),
    [],
  )

  return (
    <Sidebar className="hidden w-64 border-r md:block">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b px-4 py-2 ">
          <Link href="/notes">
            <Button variant="ghost" size="sm" className="text-lg font-semibold">
              Notes
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="size-8">
            <Settings className="size-4" />
          </Button>
        </div>

        <div className="relative px-3 py-2">
          <Search className="absolute left-5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search notes..." className="pl-8" />
        </div>

        <ScrollArea className="flex-1">
          <div className="space-y-6 p-3">
            <div className="space-y-1">
              <Collapsible className="group/collapsible">
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    size="sm"
                  >
                    <FileText className="mr-2 size-4" />
                    All Notes{" "}
                    <ChevronDown className="ml-auto size-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="space-y-1 ps-4">
                    {recentNotes?.map((note) => (
                      <Link href={`/notes/${note.id}`} key={note.id}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                        >
                          {note.title}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
              <Collapsible className="group/collapsible">
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    size="sm"
                  >
                    <Star className="mr-2 size-4" />
                    Starred
                    <ChevronDown className="ml-auto size-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="space-y-1 ps-4">
                    {recentNotes?.map((note) => (
                      <Link href={`/notes/${note.id}`} key={note.id}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                        >
                          {note.title}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
              <Button
                variant="ghost"
                className="w-full justify-start"
                size="sm"
              >
                <Tag className="mr-2 size-4" />
                Tags
              </Button>
            </div>

            <div>
              <h3 className="mb-2 px-2 text-sm font-medium">Recent Notes</h3>
              <div className="space-y-1">
                {loading ? (
                  <div className="px-2 py-1 text-sm text-muted-foreground">
                    Loading notes...
                  </div>
                ) : recentNotes && recentNotes.length > 0 ? (
                  recentNotes.map((note) => (
                    <Link href={`/notes/${note.id}`} key={note.id}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-left"
                        size="sm"
                      >
                        <div className="mr-2 size-4 shrink-0 rounded-full bg-muted" />
                        <span className="truncate">{note.title}</span>
                        <span className="ml-auto text-xs text-muted-foreground">
                          {formatDate(note.updatedAt)}
                        </span>
                      </Button>
                    </Link>
                  ))
                ) : (
                  <div className="px-2 py-1 text-sm text-muted-foreground">
                    No recent notes
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="mb-2 px-2 text-sm font-medium">Tags</h3>
              <div className="space-y-1">
                {tags.map((tag) => (
                  <Button
                    key={tag.id}
                    variant="ghost"
                    className="w-full justify-start"
                    size="sm"
                  >
                    <span
                      className={`mr-2 size-2 rounded-full ${tag.color}`}
                    ></span>
                    {tag.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="border-t p-3">
          <CreateNoteButton />
        </div>
      </div>
    </Sidebar>
  )
}
