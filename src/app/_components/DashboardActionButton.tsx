import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

export function DashboardActionButton({
  Icon,
  text,
  ...props
}: { Icon: ReactNode; text: ReactNode } & React.ComponentProps<typeof Button>) {
  return (
    <Button
      {...props}
      className={cn(
        "lg:w-[250px] lg:aspect-square lg:h-[250px] group",
        props.className,
      )}
    >
      <div className="flex flex-col items-center justify-center gap-0">
        {Icon}
        <span className="invisible group-hover:visible group-focus:visible transition-[visible] text-white">
          {text}
        </span>
      </div>
    </Button>
  )
}
