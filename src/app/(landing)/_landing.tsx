import { Button } from "@/components/ui/button"
import Typography from "@/components/ui/typography"

export function Landing() {
  return (
    <main className="container  dark:text-white text-black grid items-center h-full">
      <section className="mx-auto w-fit space-y-2">
        <Typography
          variant="h1"
          className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8"
        >
          KeepArr
        </Typography>
        <Typography variant="h2" affects="large">
          Keep your life organized
        </Typography>
        <Typography variant="p" affects="removePMargin">
          A simple, intuitive, and fast task manager.
        </Typography>
        <div className="flex gap-4">
          <Button>Get started</Button>
          <Button variant="secondary">Learn more</Button>
        </div>
      </section>
    </main>
  )
}
