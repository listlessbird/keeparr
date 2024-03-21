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

  return (
    <div className="relative">
      <UserIndicator indicatorColor={`${UserIndicatorColor}`} />
      <div className="mt-3 space-y-4 p-4 lg:mt-10">
        <WelcomeMessage />

        <div className=" grid min-h-[90dvh] grid-cols-[minmax(50px,1fr)_minmax(20px,0.2fr)_minmax(50px,1fr)] content-center items-center justify-evenly justify-items-center gap-y-[98px] lg:min-h-[unset] lg:grid-cols-3 lg:justify-items-start lg:gap-y-0">
          <DashboardActionButton
            Icon={<Plus size={48} stroke="white" />}
            text={"Create something..."}
            className="mt-auto"
          />
          <DashboardActionButton
            Icon={<NotebookPen size={48} stroke="white" />}
            text={"Document"}
            className="mt-auto lg:size-3/4"
            href="/notes"
          />
          <DashboardActionButton
            Icon={<Bookmark size={48} stroke="white" />}
            text={"Add bookmark"}
            className="mt-auto lg:size-3/4"
          />
          <Separator className="lg:row-span-[auto] col-start-2 row-span-3 row-start-1 h-full w-px lg:col-span-3 lg:row-auto lg:my-[71px] lg:h-px lg:w-full" />
          <DashboardActionButton
            Icon={<List size={48} stroke="white" />}
            text={"Add to reading list"}
            className="lg:mt-auto lg:size-3/4 "
          />
          <DashboardActionButton
            Icon={<Brush size={48} stroke="white" />}
            text={"Canvas"}
            className="mt-auto lg:size-3/4 "
          />
        </div>
      </div>
    </div>
  )
}
