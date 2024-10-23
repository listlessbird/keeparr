import { validateRequest } from "@/lib/auth"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"

import { DashboardProviders } from "./providers"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = await validateRequest()

  return (
    <DashboardProviders user={user}>
      <MaxWidthWrapper className="min-h-dvh lg:min-h-screen">
        {children}
      </MaxWidthWrapper>
    </DashboardProviders>
  )
}
