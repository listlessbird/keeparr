import { Bookmark, Brush, List, NotebookPen, Plus } from "lucide-react"

import { getSession } from "@/lib/auth"
import { getRandomDark } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import Typography from "@/components/ui/typography"
import { DashboardActionButton } from "@/app/_components/DashboardActionButton"

import { UserIndicator, WelcomeMessage } from "./user-indicator"

export default async function Dashboard() {
  // TODO: Make this stable across a session.
  // Maybe use a cookie or something to store the color
  const UserIndicatorColor = getRandomDark()
  const iconSize = 20

  return (
    <div className="relative">
      <UserIndicator indicatorColor={`${UserIndicatorColor}`} />
      <div className="mt-3 space-y-4 p-4 lg:mt-10">
        <WelcomeMessage />

        <div className="flex flex-col gap-4">
          <DashboardActionButton
            Icon={<Plus size={iconSize} stroke="white" />}
            text={"Create something..."}
          />
          <DashboardActionButton
            Icon={<NotebookPen size={iconSize} stroke="white" />}
            text={"Document"}
            href="/notes"
          />
          <DashboardActionButton
            Icon={<Bookmark size={iconSize} stroke="white" />}
            text={"Add bookmark"}
          />

          <DashboardActionButton
            Icon={<List size={iconSize} stroke="white" />}
            text={"Add to reading list"}
          />
          <DashboardActionButton
            Icon={<Brush size={iconSize} stroke="white" />}
            text={"Canvas"}
          />
        </div>
      </div>
    </div>
  )
}
