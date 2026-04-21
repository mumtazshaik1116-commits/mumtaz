import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAuth = !!token
    const isAdminPage = req.nextUrl.pathname.startsWith("/admin")
    const isStudentPage = req.nextUrl.pathname.startsWith("/student")

    if (isAdminPage && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/login", req.url))
    }

    if (isStudentPage && token?.role !== "STUDENT") {
      return NextResponse.redirect(new URL("/login", req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: ["/admin/:path*", "/student/:path*"],
}
