import Link from "next/link"
import {
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

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sidebar } from "@/app/(notes)/notes/(note)/_components/sidebar"

// Mock data
const recentNotes = [
  { id: "1", title: "Work Notes", date: "Oct 26" },
  { id: "2", title: "Personal Goals", date: "Oct 25" },
  { id: "3", title: "Recipe Ideas", date: "Oct 24" },
]

const tags = [
  { id: "1", name: "work", color: "bg-blue-500" },
  { id: "2", name: "personal", color: "bg-green-500" },
  { id: "3", name: "ideas", color: "bg-amber-500" },
  { id: "4", name: "important", color: "bg-red-500" },
]

export function NoteSidebar() {
  return (
    <Sidebar className="hidden w-64 border-r md:block">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b p-4">
          <Link href="/notes">
            <Button variant="ghost" size="sm" className="text-lg font-semibold">
              Notes
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="h-4 w-4" />
          </Button>
        </div>

        <div className="relative px-3 py-2">
          <Search className="absolute left-5 top-[14px] h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search notes..." className="pl-8" />
        </div>

        <ScrollArea className="flex-1">
          <div className="space-y-6 p-3">
            {/* Quick actions */}
            <div className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start"
                size="sm"
              >
                <FileText className="mr-2 h-4 w-4" />
                All Notes
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                size="sm"
              >
                <Clock className="mr-2 h-4 w-4" />
                Recent
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                size="sm"
              >
                <Star className="mr-2 h-4 w-4" />
                Starred
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                size="sm"
              >
                <Tag className="mr-2 h-4 w-4" />
                Tags
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                size="sm"
              >
                <List className="mr-2 h-4 w-4" />
                To-do Lists
              </Button>
            </div>

            {/* Recent notes */}
            <div>
              <h3 className="mb-2 px-2 text-sm font-medium">Recent Notes</h3>
              <div className="space-y-1">
                {recentNotes.map((note) => (
                  <Link href={`/notes/${note.id}`} key={note.id}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left"
                      size="sm"
                    >
                      <div className="mr-2 h-4 w-4 flex-shrink-0 rounded-full bg-muted" />
                      <span className="truncate">{note.title}</span>
                      <span className="ml-auto text-xs text-muted-foreground">
                        {note.date}
                      </span>
                    </Button>
                  </Link>
                ))}
              </div>
            </div>

            {/* Tags */}
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
                      className={`h-2 w-2 rounded-full ${tag.color} mr-2`}
                    ></span>
                    {tag.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="border-t p-3">
          <Button size="sm" className="w-full" onClick={() => {}}>
            <Plus className="mr-2 h-4 w-4" /> New Note
          </Button>
        </div>
      </div>
    </Sidebar>
  )
}
