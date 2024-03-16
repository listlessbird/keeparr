import { Dispatch, MutableRefObject, SetStateAction } from "react"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Iconify } from "@/components/iconify"

export function NotesMobileNav({
  expander,
}: {
  expander: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <>
      <nav className=" flex w-full justify-between bg-[#f0f0f5] p-2 shadow-sm md:p-4">
        <Button
          // asChild
          onClick={() => {
            expander((prev) => !prev)
          }}
          variant={"icon"}
          size={"icon"}
          className="size-6 cursor-pointer bg-transparent hover:bg-transparent"
        >
          <Menu size={24} className="fill-[#888888]" />
        </Button>
        <div className="flex items-center justify-center gap-2">
          <Iconify
            icon="codicon:open-preview"
            className="size-6 fill-[#888888]"
          />
        </div>
      </nav>
    </>
  )
}
