import "./globals.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"

// import { HydrationOverlay } from "@builder.io/react-hydration-overlay"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: `KeerpArr | ${process.env.NODE_ENV}`,
  description: "Keep your life simplified",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* <HydrationOverlay>{children}</HydrationOverlay> */}
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
