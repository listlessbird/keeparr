import { Button } from "@/components/ui/button"
import Typography from "@/components/ui/typography"

export function Landing() {
  return (
    <main className="container bg-white dark:bg-black dark:text-white text-black grid items-center h-full">
      <section className="mx-auto w-fit space-y-2">
        <Typography variant="h1">KeepArr</Typography>
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
