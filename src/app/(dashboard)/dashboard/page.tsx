import { DashboardActionButton } from "@/app/_components/DashboardActionButton"
import { Separator } from "@/components/ui/separator"
import Typography from "@/components/ui/typography"
import { getSession } from "@/lib/auth"
import { Plus, NotebookPen, Bookmark, List, Brush } from "lucide-react"
import { UserIndicator } from "./user-indicator"

export default async function Dashboard() {
  return (
    <div className="lg:mt-10 mt-3 p-4 space-y-4">
      {/* <UserIndicator /> */}
      <Typography variant={"h3"} className="text-center w-fit">
        Welcome to your dashboard, what would you like to do?
      </Typography>
      <div className=" grid grid-cols-[minmax(50px,1fr)_minmax(20px,0.2fr)_minmax(50px,1fr)] items-center justify-evenly justify-items-center gap-y-[98px] min-h-[90dvh] content-center lg:grid-cols-3 lg:min-h-[unset] lg:gap-y-0 lg:justify-items-start">
        <DashboardActionButton
          Icon={<Plus size={48} stroke="white" />}
          text={"Create something..."}
          className="mt-auto"
        />
        <DashboardActionButton
          Icon={<NotebookPen size={48} stroke="white" />}
          text={"Document"}
          className="lg:w-[75%] lg:h-[75%] mt-auto"
        />
        <DashboardActionButton
          Icon={<Bookmark size={48} stroke="white" />}
          text={"Add bookmark"}
          className="lg:w-[75%] lg:h-[75%] mt-auto"
        />
        <Separator className="lg:col-span-3 lg:my-[71px] h-full w-[1px] lg:h-[1px] lg:w-full col-start-2 row-start-1 row-span-3 lg:row-span-[auto] lg:row-auto" />
        <DashboardActionButton
          Icon={<List size={48} stroke="white" />}
          text={"Add to reading list"}
          className="lg:w-[75%] lg:mt-auto lg:h-[75%] "
        />
        <DashboardActionButton
          Icon={<Brush size={48} stroke="white" />}
          text={"Canvas"}
          className="lg:w-[75%] mt-auto lg:h-[75%] "
        />
      </div>
    </div>
  )
}
