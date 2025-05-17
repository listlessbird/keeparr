import { Bookmark, Brush, List, NotebookPen, Play, Plus } from "lucide-react"
import { NavLink as Link } from "react-router"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { UserButton, WelcomeMessage } from "./user-indicator"

export default function Dashboard() {
  const iconSize = 24

  return (
    <div className="relative min-h-screen">
      <div className="absolute right-6 top-6">
        <UserButton />
      </div>

      <div className="px-6 pb-10 pt-24">
        <WelcomeMessage />

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link to="/dashboard" className="group block">
            <Card className="h-full overflow-hidden border-primary/10 transition-all duration-300 hover:border-primary hover:shadow-md">
              <CardHeader className="flex flex-row items-center gap-3 bg-gradient-to-br from-primary/80 to-primary px-6 py-4">
                <div className="rounded-full bg-white/20 p-2">
                  <Play size={iconSize} className="text-white" />
                </div>
                <CardTitle className="text-white">Continue</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <CardDescription className="text-base">
                  Continue working on your last project
                </CardDescription>
              </CardContent>
            </Card>
          </Link>

          <Link to="/notes" className="group block">
            <Card className="h-full overflow-hidden border-primary/10 transition-all duration-300 hover:border-primary hover:shadow-md">
              <CardHeader className="flex flex-row items-center gap-3 bg-gradient-to-br from-purple-700 to-indigo-600 px-6 py-4">
                <div className="rounded-full bg-white/20 p-2">
                  <NotebookPen size={iconSize} className="text-white" />
                </div>
                <CardTitle className="text-white">Document</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <CardDescription className="text-base">
                  Create or edit your documents and notes
                </CardDescription>
              </CardContent>
            </Card>
          </Link>

          <Link to="/dashboard" className="group block">
            <Card className="h-full overflow-hidden border-primary/10 transition-all duration-300 hover:border-primary hover:shadow-md">
              <CardHeader className="flex flex-row items-center gap-3 bg-gradient-to-br from-blue-700 to-cyan-600 px-6 py-4">
                <div className="rounded-full bg-white/20 p-2">
                  <Bookmark size={iconSize} className="text-white" />
                </div>
                <CardTitle className="text-white">Bookmarks</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <CardDescription className="text-base">
                  Add and manage your bookmarks for quick access
                </CardDescription>
              </CardContent>
            </Card>
          </Link>

          <Link to="/dashboard" className="group block">
            <Card className="h-full overflow-hidden border-primary/10 transition-all duration-300 hover:border-primary hover:shadow-md">
              <CardHeader className="flex flex-row items-center gap-3 bg-gradient-to-br from-amber-600 to-orange-600 px-6 py-4">
                <div className="rounded-full bg-white/20 p-2">
                  <List size={iconSize} className="text-white" />
                </div>
                <CardTitle className="text-white">Reading List</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <CardDescription className="text-base">
                  Organize articles and content to read later
                </CardDescription>
              </CardContent>
            </Card>
          </Link>

          <Link to="/dashboard" className="group block">
            <Card className="h-full overflow-hidden border-primary/10 transition-all duration-300 hover:border-primary hover:shadow-md">
              <CardHeader className="flex flex-row items-center gap-3 bg-gradient-to-br from-pink-600 to-rose-600 px-6 py-4">
                <div className="rounded-full bg-white/20 p-2">
                  <Brush size={iconSize} className="text-white" />
                </div>
                <CardTitle className="text-white">Canvas</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <CardDescription className="text-base">
                  Create visual diagrams, sketches, and mindmaps
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
