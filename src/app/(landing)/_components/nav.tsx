"use client"
import Link from "next/link"

import { useState, type ReactElement, useRef } from "react"

import { useClickOutside } from "@/hooks/useClickOutside"

import { Logo } from "@/app/_components/logo"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// TODO: Add a dark mode toggle here and a pointing arrow for the nav dropdown.

export default function Navbar() {
  return (
    <nav className="flex justify-between p-4">
      <div>
        <Link href="/" className="flex gap-1">
          <Logo className="h-8 w-8 text-blue-600 dark:text-blue-300" />
          <span className="text-2xl font-bold text-brand_blue">KeepArr</span>
        </Link>
      </div>
      <SMNav Items={<LandingNavItems />} />
    </nav>
  )
}

function LandingNavItems() {
  return (
    <ul className="flex gap-2 flex-col">
      <li>
        <Link
          href="/login"
          className="text-sm font-medium hover:underline underline-offset-4"
        >
          Login
        </Link>
      </li>
      <li>
        <Link
          href="#features"
          className="text-sm font-medium hover:underline underline-offset-4"
        >
          Features
        </Link>
      </li>
      <li>
        <Link
          href="#about"
          className="text-sm font-medium hover:underline underline-offset-4"
        >
          About
        </Link>
      </li>
      <li>
        <Link
          href="/contact"
          className="text-sm font-medium hover:underline underline-offset-4"
        >
          Contact
        </Link>
      </li>
    </ul>
  )
}

function SMNav({ Items }: { Items: ReactElement }) {
  const [isOpen, setIsOpen] = useState(false)

  const ref = useRef(null)
  useClickOutside(ref, () => setIsOpen(false))
  return (
    // create an isloated stacking context here.
    <div className="relative z-1" ref={ref}>
      <Button
        variant={"plain"}
        size={"icon"}
        onClick={() => setIsOpen(!isOpen)}
        className="border border-black/40 aspect-square rounded-full hover:border-black/80 fixed right-[2%] top-[2%] z-10"
      >
        <svg
          className="w-6 h-6 text-blue dark:text-blue fill-brand_blue"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            clipRule="evenodd"
            d="M4 5a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zm0 5a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zm0 5a1 1 0 011-1h6a1 1 0 110 2H5a1 1 0 01-1-1z"
            fillRule="evenodd"
          ></path>
        </svg>
      </Button>
      <div
        className={cn({
          "w-0 overflow-x-hidden animate-in fade-in-5": !isOpen,
          "p-4 bg-white dark:bg-black border border-black/40 rounded-md shadow-md min-w-fit w-[8vw] fixed right-[2%] top-[5%] before:w-[2rem] before:aspect-[2/1] before:border-b-2 before:border-l-2 before:border-r-2 before:bg-red-400 before:block":
            isOpen,
        })}
      >
        {Items}
      </div>
    </div>
  )
}
