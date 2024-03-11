import { MaxWidthWrapper } from "@/components/max-width-wrapper"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MaxWidthWrapper className="min-h-dvh">{children}</MaxWidthWrapper>
}
