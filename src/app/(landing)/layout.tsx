import Navbar from "./_components/nav"

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid min-h-dvh landing-root">
      <div className="relative">
        <header className="max-h-min fixed top-0 z-10">
          <Navbar />
        </header>
        {children}
      </div>
    </div>
  )
}
