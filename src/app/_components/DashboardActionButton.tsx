import { ReactNode } from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Typography from "@/components/ui/typography"

export function DashboardActionButton({
  Icon,
  text,
  href,
  ...props
}: { Icon: ReactNode; text: ReactNode; href?: string } & React.ComponentProps<
  typeof Button
>) {
  return (
    <div className="flex gap-2">
      <Button
        {...props}
        className={cn("size-12 rounded-none", props.className)}
        // asChild={!customAction}
      >
        <div className="flex  flex-col items-center justify-center gap-0">
          <Link href={href ?? "/dashboard"}>
            {Icon}

            <span className="sr-only">{text}</span>
          </Link>
          {/* {customAction && (
            <div className="flex size-8 flex-col items-center justify-center">
              {Icon}
              <span
                className="text-white transition-[visible] group-focus-within:visible group-hover:visible sm:block lg:invisible lg:hidden"
                aria-hidden
              >
                {text}
              </span>
              <span className="sr-only">{text}</span>
            </div>
          )} */}
        </div>
      </Button>
      <div>
        <p className="text-lg text-white" aria-hidden>
          {text}
        </p>
      </div>
    </div>
  )
}
