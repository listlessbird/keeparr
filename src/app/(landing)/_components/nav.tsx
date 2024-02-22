"use client"
import Link from "next/link"
import { Logo } from "@/app/_components/logo"
import { Button } from "@/components/ui/button"

import { ModeToggle } from "./darkmode-toggle"
import { ReactElement } from "react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navbar() {
  return (
    <nav className="flex justify-between p-4">
      <div>
        <Link href="/" className="flex gap-1">
          <Logo className="h-8 w-8 text-blue-600 dark:text-blue-300" />
          <span className="text-2xl font-bold text-brand_blue">KeepArr</span>
        </Link>
      </div>
      <div>
        <div className="fixed right-[8%] top-[2%]">
          <ModeToggle />
        </div>
        <SMNav Items={<LandingNavItems />} />
      </div>
    </nav>
  )
}

function LandingNavItems() {
  return (
    <ul className="flex gap-2 flex-col">
      <li>
        <Link
          href="/login"
          className="text-sm font-medium hover:underline underline-offset-4 transition-colors text-foreground/60 hover:text-foreground/80"
        >
          Login
        </Link>
      </li>
      <li>
        <Link
          href="#features"
          className="text-sm font-medium hover:underline underline-offset-4 transition-colors text-foreground/60 hover:text-foreground/80"
        >
          Features
        </Link>
      </li>
      <li>
        <Link
          href="#about"
          className="text-sm font-medium hover:underline underline-offset-4 transition-colors text-foreground/60 hover:text-foreground/80"
        >
          About
        </Link>
      </li>
      <li>
        <Link
          href="/contact"
          className="text-sm font-medium hover:underline underline-offset-4 transition-colors text-foreground/60 hover:text-foreground/80"
        >
          Contact
        </Link>
      </li>
    </ul>
  )
}

function SMNav({ Items }: { Items: ReactElement }) {
  return (
    // create an isloated stacking context here.
    <DropdownMenu>
      <div className="relative">
        <div className="flex fixed right-[2%] top-[2%] z-1">
          <DropdownMenuTrigger asChild>
            <Button
              variant={"plain"}
              size={"icon"}
              className="border border-black/40 aspect-square rounded-full hover:border-black/80 dark:border-white/40 dark:hover:border-white/80"
            >
              <svg className="w-6 h-6 " fill="currentColor" viewBox="0 0 20 20">
                <path
                  clipRule="evenodd"
                  d="M4 5a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zm0 5a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zm0 5a1 1 0 011-1h6a1 1 0 110 2H5a1 1 0 01-1-1z"
                ></path>
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="p-2">{Items}</div>
          </DropdownMenuContent>
        </div>
      </div>
    </DropdownMenu>
  )
}
