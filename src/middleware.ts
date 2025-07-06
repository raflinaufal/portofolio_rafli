import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAuth = !!token
    const isAuthPage = req.nextUrl.pathname.startsWith('/auth')
    const isChatPage = req.nextUrl.pathname.startsWith('/chat')
    const isDashboardProfilePage = req.nextUrl.pathname.startsWith('/dashboard/profile')
    const isAdminLoginPage = req.nextUrl.pathname === '/auth/admin'

    // Jika sudah login dan mencoba akses halaman auth, redirect ke home
    if (isAuthPage && isAuth && !isAdminLoginPage) {
      return NextResponse.redirect(new URL('/', req.url))
    }

    // Jika sudah login sebagai admin dan akses halaman admin login, redirect ke dashboard
    if (isAdminLoginPage && isAuth && token?.role === 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    // Jika belum login dan akses halaman yang memerlukan auth
    if ((isChatPage || isDashboardProfilePage) && !isAuth) {
      // Untuk dashboard/profile, redirect ke admin login
      if (isDashboardProfilePage) {
        return NextResponse.redirect(new URL('/auth/admin', req.url))
      }
      // Untuk chat, redirect ke signin biasa
      return NextResponse.redirect(new URL('/auth/signin', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Untuk halaman auth, selalu izinkan akses
        if (req.nextUrl.pathname.startsWith('/auth')) {
          return true
        }
        // Untuk dashboard/profile dan chat, cek token
        if (req.nextUrl.pathname.startsWith('/dashboard/profile') || req.nextUrl.pathname.startsWith('/chat')) {
          return !!token
        }
        // Untuk halaman lain (dashboard umum), public
        return true
      }
    },
  }
)

export const config = {
  matcher: ['/chat/:path*', '/dashboard/:path*', '/auth/:path*']
} 