import type {NextRequest} from 'next/server'

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('currentUser')?.value
  console.log('middleware currentUser', currentUser)
  if (currentUser && !request.nextUrl.pathname.startsWith('/exercises')) {
    return Response.redirect(new URL('/exercises', request.url))
  }

  if (!currentUser && !request.nextUrl.pathname.startsWith('/exercises/auth')) {
    return Response.redirect(new URL('/exercises/auth', request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
