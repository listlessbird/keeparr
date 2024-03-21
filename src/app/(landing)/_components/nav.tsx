"use client"

import { ReactElement } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Logo } from "@/app/_components/logo"

import { ModeToggle } from "./darkmode-toggle"

export default function Navbar() {
  return (
    <nav className="flex justify-between p-4">
      <div>
        <Link href="/" className="flex gap-1">
          <Logo className="size-8 text-blue-600 dark:text-blue-300" />
          <span className="text-2xl font-bold text-brand_blue">KeepArr</span>
        </Link>
      </div>
      <div>
        <div className="fixed right-[16%] top-[2%] md:right-[10%] lg:right-[8%]">
          <ModeToggle />
        </div>
        <SMNav Items={<LandingNavItems />} />
      </div>
    </nav>
  )
}

function LandingNavItems() {
  return (
    <ul className="flex flex-col gap-2">
      <li>
        <Link
          href="/auth"
          className="text-sm font-medium text-foreground/60 underline-offset-4 transition-colors hover:text-foreground/80 hover:underline"
        >
          Login
        </Link>
      </li>
      <li>
        <Link
          href="#features"
          className="text-sm font-medium text-foreground/60 underline-offset-4 transition-colors hover:text-foreground/80 hover:underline"
        >
          Features
        </Link>
      </li>
      <li>
        <Link
          href="#about"
          className="text-sm font-medium text-foreground/60 underline-offset-4 transition-colors hover:text-foreground/80 hover:underline"
        >
          About
        </Link>
      </li>
      <li>
        <Link
          href="/contact"
          className="text-sm font-medium text-foreground/60 underline-offset-4 transition-colors hover:text-foreground/80 hover:underline"
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
        <div className="z-1 fixed right-[2%] top-[2%] flex">
          <DropdownMenuTrigger asChild>
            <Button
              variant={"plain"}
              size={"icon"}
              data-testid="nav-menu"
              className="aspect-square rounded-full border border-black/40 hover:border-black/80 dark:border-white/40 dark:hover:border-white/80"
            >
              <svg className="size-6 " fill="currentColor" viewBox="0 0 20 20">
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
