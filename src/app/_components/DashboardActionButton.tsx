import { ReactNode } from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function DashboardActionButton({
  Icon,
  text,
  href,
  ...props
}: { Icon: ReactNode; text: ReactNode; href?: string } & React.ComponentProps<
  typeof Button
>) {
  return (
    <Button
      {...props}
      className={cn(
        "group aspect-square size-full min-h-[100px] min-w-[50px] max-w-[157px] cursor-pointer rounded-2xl p-0 shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-xl lg:aspect-square lg:h-[250px] lg:max-w-[250px]",
        props.className,
      )}
      asChild
    >
      <Link href={href ?? "/dashboard"}>
        <div className="flex flex-col items-center justify-center gap-0">
          {Icon}
          <span
            className="invisible hidden text-white transition-[visible] group-focus-within:visible group-hover:visible sm:block"
            aria-hidden
          >
            {text}
          </span>
          <span className="sr-only">{text}</span>
        </div>
      </Link>
    </Button>
  )
}
