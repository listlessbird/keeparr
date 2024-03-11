import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"

export async function middleware(request: NextRequest) {
  console.log(`[Middleware]: Request to ${request.nextUrl.pathname}`)

  console.log(
    `[Middleware]: Request headers: `,
    request.headers.get("cookie") || "",
  )

  const session = await getSession(request.headers.get("cookie") || "")

  console.log(`Session: `, { session })
  if (!session.user && !request.nextUrl.pathname.startsWith("/auth")) {
    return Response.redirect(new URL("/auth", request.url))
  }

  if (session.user && request.nextUrl.pathname.startsWith("/auth")) {
    return Response.redirect(new URL("/dashboard", request.url))
  }
}

export const config = {
  matcher: ["/((?!register|api|_next/static|_next/image).*)"],
}
