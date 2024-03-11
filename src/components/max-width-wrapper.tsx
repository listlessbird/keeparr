export function MaxWidthWrapper({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`max-w-screen-xl w-full mx-auto px-2.5 sm:px-6 lg:px-20 ${className}`}
    >
      {children}
    </div>
  )
}
