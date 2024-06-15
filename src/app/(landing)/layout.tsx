import Navbar from "./_components/nav"

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="landing-root grid min-h-dvh">
      <div className="relative">
        <header className="fixed top-0 z-10 max-h-min">
          <Navbar />
        </header>
        {children}
      </div>
    </div>
  )
}
