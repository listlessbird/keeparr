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
  const customAction = typeof props.onClick === "function"
  console.log({ customAction, onClick: props.onClick })
  return (
    <Button
      {...props}
      className={cn(
        "group aspect-square size-full min-h-[100px] min-w-[50px] max-w-[157px] cursor-pointer rounded-2xl p-0 shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-xl lg:aspect-square lg:h-[250px] lg:max-w-[250px]",
        props.className,
      )}
      asChild={!customAction}
    >
      <div className="flex flex-col items-center justify-center gap-0">
        {!customAction && (
          <Link href={href ?? "/dashboard"}>
            {Icon}
            <span
              className="text-white transition-[visible] group-focus-within:visible group-hover:visible sm:block lg:invisible lg:hidden"
              aria-hidden
            >
              {text}
            </span>
            <span className="sr-only">{text}</span>
          </Link>
        )}
        {customAction && (
          <div className="flex flex-col items-center justify-center">
            {Icon}
            <span
              className="text-white transition-[visible] group-focus-within:visible group-hover:visible sm:block lg:invisible lg:hidden"
              aria-hidden
            >
              {text}
            </span>
            <span className="sr-only">{text}</span>
          </div>
        )}
      </div>
    </Button>
  )
}
