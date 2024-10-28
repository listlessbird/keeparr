import { Bookmark, Brush, List, NotebookPen, Plus } from "lucide-react"

import { getRandomDark } from "@/lib/utils"
import { DashboardActionButton } from "@/app/_components/DashboardActionButton"

import { UserButton, WelcomeMessage } from "./user-indicator"

export default async function Dashboard() {
  const UserIndicatorColor = getRandomDark()
  const iconSize = 20

  return (
    <div className="relative">
      <UserButton />
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
