import {
  Bookmark,
  Brush,
  List,
  LucideIcon,
  NotebookPen,
  Play,
  Plus,
} from "lucide-react"
import { NavLink as Link } from "react-router"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { UserButton, WelcomeMessage } from "./user-indicator"

interface DashboardCardProps {
  to: string
  Icon: LucideIcon
  title: string
  description: string
  gradientFrom: string
  gradientTo: string
}

function DashboardCard({
  to,
  Icon,
  title,
  description,
  gradientFrom,
  gradientTo,
}: DashboardCardProps) {
  return (
    <Link to={to} className="group block">
      <Card className="h-full overflow-hidden border-primary/10 transition-all duration-300 hover:border-primary hover:shadow-md">
        <CardHeader
          className={`flex flex-row items-center gap-3 bg-gradient-to-br from-${gradientFrom} to-${gradientTo} px-6 py-4`}
        >
          <div className="rounded-full bg-white/20 p-2">
            <Icon size={24} className="text-white" />
          </div>
          <CardTitle className="text-white">{title}</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <CardDescription className="text-base">{description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  )
}

export default function Dashboard() {
  const dashboardCards = [
    {
      to: "/dashboard",
      Icon: Play,
      title: "Continue",
      description: "Continue working on your last project",
      gradientFrom: "primary/80",
      gradientTo: "primary",
    },
    {
      to: "/notes",
      Icon: NotebookPen,
      title: "Document",
      description: "Create or edit your documents and notes",
      gradientFrom: "purple-700",
      gradientTo: "indigo-600",
    },
    {
      to: "/dashboard",
      Icon: Bookmark,
      title: "Bookmarks",
      description: "Add and manage your bookmarks for quick access",
      gradientFrom: "blue-700",
      gradientTo: "cyan-600",
    },
    {
      to: "/dashboard",
      Icon: List,
      title: "Reading List",
      description: "Organize articles and content to read later",
      gradientFrom: "amber-600",
      gradientTo: "orange-600",
    },
    {
      to: "/dashboard",
      Icon: Brush,
      title: "Canvas",
      description: "Create visual diagrams, sketches, and mindmaps",
      gradientFrom: "pink-600",
      gradientTo: "rose-600",
    },
  ]

  return (
    <div className="relative min-h-screen">
      <div className="absolute right-6 top-6">
        <UserButton />
      </div>

      <div className="px-6 pb-10 pt-24">
        <WelcomeMessage />

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dashboardCards.map((cardProps) => (
            <DashboardCard key={cardProps.title} {...cardProps} />
          ))}
        </div>
      </div>
    </div>
  )
}
