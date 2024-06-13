import {NextResponse, type NextRequest} from 'next/server'
//cannot import bcrypt
//https://nextjs.org/learn/dashboard-app/adding-authentication

export async function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('session')?.value

  console.log('middleware currentUser', currentUser)

  if (!currentUser && !request.nextUrl.pathname.startsWith('/exercises/auth')) {
    console.log('middleware redirect to /exercises/auth')
    return Response.redirect(new URL('/exercises/auth', request.url))
  }

  return await updateSession(request)
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get('session')?.value

  if (!session) return
  // Refresh the session so it doesn't expire
  const parsed = JSON.parse(session) //await decrypt(session)

  parsed.expires = new Date(Date.now() + 10 * 1000)
  const res = NextResponse.next()
  res.cookies.set({
    name: 'session',
    value: JSON.stringify(parsed), //await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  })
  console.log('middleware updateSession', parsed)
  return res
}
