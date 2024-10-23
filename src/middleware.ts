import { NextRequest, NextResponse } from "next/server"

import { isValidReturnPath } from "@/lib/utils"

export async function middleware(request: NextRequest) {
  const publicPaths = ["/", "/auth", "/auth/google", "/auth/google/callback"]

  const isPublic = publicPaths.some((path) => {
    if (path === "/") return path === request.nextUrl.pathname
    return request.nextUrl.pathname.startsWith(path)
  })

  if (isPublic) {
    return NextResponse.next()
  }

  if (request.method === "GET") {
    const response = NextResponse.next()
    const token = request.cookies.get("session")?.value ?? null

    if (token === null) {
      return handleUnauthorized(request)
    }

    if (token !== null) {
      response.cookies.set("session", token, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "lax",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
    }

    return response
  }

  const originHeader = request.headers.get("Origin")

  const hostHeader = request.headers.get("x-forwarded-host")

  console.log({ originHeader, hostHeader })

  if (originHeader === null || hostHeader === null) {
    return new NextResponse(null, {
      status: 403,
    })
  }

  let origin: URL

  try {
    origin = new URL(originHeader)
  } catch (e) {
    return new NextResponse(null, { status: 403 })
  }

  if (origin.host !== hostHeader) {
    return new NextResponse(null, { status: 403 })
  }

  return NextResponse.next()
}

function handleUnauthorized(request: NextRequest) {
  const currentpath = request.nextUrl.pathname
  const searchParams = request.nextUrl.searchParams

  const fullPath = `${currentpath}${searchParams}`

  const isVailidRedirectUrl = isValidReturnPath(fullPath)

  console.log({ isVailidRedirectUrl })

  const validatedPath = isVailidRedirectUrl ? fullPath : "/"

  const authURl = new URL("/auth", request.url)

  const redirectResponse = NextResponse.redirect(authURl)

  redirectResponse.cookies.set("return_to", validatedPath, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60,
  })

  return redirectResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - public assets
     */
    "/((?!_next/static|_next/image|favicon.ico|public/|assets/).*)",
  ],
}
