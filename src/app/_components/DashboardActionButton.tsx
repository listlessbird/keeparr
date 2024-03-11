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
        "lg:max-w-[250px] lg:aspect-square lg:h-[250px] group max-w-[157px] aspect-square min-h-[100px] rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer px-0 py-0 min-w-[50px] w-full h-full",
        props.className,
      )}
    >
      <div className="flex flex-col items-center justify-center gap-0">
        {Icon}
        <span
          className="hidden sm:block invisible group-hover:visible group-focus:visible transition-[visible] text-white"
          aria-hidden
        >
          {text}
        </span>
        <span className="sr-only">{text}</span>
      </div>
    </Button>
  )
}
