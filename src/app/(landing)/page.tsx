import Navbar from "./_components/nav"
import { Landing } from "./_landing"

export default function Home() {
  return (
    <div className="grid min-h-dvh">
      <div>
        <header className="max-h-min fixed top-0 z-10">
          <Navbar />
        </header>
        <Landing />
      </div>
    </div>
  )
}
