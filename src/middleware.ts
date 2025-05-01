import { NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  // Only apply CSRF protection for non-GET requests
  if (request.method !== "GET") {
    const originHeader = request.headers.get("Origin")
    const hostHeader = request.headers.get("x-forwarded-host")

    if (originHeader === null || hostHeader === null) {
      return new NextResponse(null, { status: 403 })
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
  }

  return NextResponse.next()
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
