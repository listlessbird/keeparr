import Link from "next/link"

import { Button } from "@/components/ui/button"
import Typography from "@/components/ui/typography"

export function Landing() {
  return (
    <main className="container grid h-full items-center text-black dark:text-white">
      <section className="mx-auto w-fit space-y-2">
        <Typography
          variant="h1"
          className="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text py-8 text-4xl font-bold text-transparent sm:text-7xl"
        >
          KeepArr
        </Typography>
        <Typography variant="h2" affects="large">
          The perfect brainstorming tool for developers.
        </Typography>
        <Typography variant="p" affects="removePMargin">
          A simple, intuitive, and fast task manager for developers.
        </Typography>
        <div className="flex gap-4">
          <Button asChild>
            <Link href={"/dashboard"} className="text-white">
              Get started
            </Link>
          </Button>
          <Button variant="secondary">Learn more</Button>
        </div>
      </section>
    </main>
  )
}
